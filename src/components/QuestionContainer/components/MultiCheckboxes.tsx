import React from 'react';
import ContextMenu from './ContextMenu';
import { savedStyle, savedText, scratchedStyle, scratchedText, selectedStyle, selectedText } from '../../../styles/question-container-styles';

/**
 * Represents the structure of a single checkbox item.
 *
 * @typedef {Object} CheckboxItem
 * @property {number} id - Unique identifier for the checkbox item.
 * @property {string} label - Display label for the checkbox item.
 * @property {boolean} selected - Indicates if the checkbox is selected.
 * @property {boolean} scratched - Indicates if the checkbox is scratched.
 * @property {boolean} saved - Indicates if the checkbox state is saved.
 */
interface CheckboxItem {
  id: number;
  label: string;
  selected: boolean;
  scratched: boolean;
  saved: boolean;
}

/**
 * Defines the prop types for the MultiCheckboxes component.
 *
 * @typedef {Object} IMultiCheckboxesProps
 * @property {number|undefined} fontSize - The font size to be used for checkbox labels.
 * @property {CheckboxItem[]} alternatives - Array of CheckboxItem objects.
 * @property {function} onCheckboxStateChange - Callback function called when the state of a checkbox changes.
 * @property {Object} questionId - Object containing the ID of the associated question.
 */
interface IMultiCheckboxesProps {
  fontSize: number | undefined;
  alternatives: CheckboxItem[];
  onCheckboxStateChange: (id: number, state: { selected: boolean; scratched: boolean; saved: boolean }) => void;
  questionId: { id: number };
}

/**
 * MultiCheckboxes component is a React component that renders a list of checkboxes with custom styles and behaviors.
 * The component allows for selecting, scratching, and saving states for each checkbox. It also supports a context menu for each checkbox.
 *
 * @param {object} props - The props for the MultiCheckboxes component.
 * @param {number|undefined} props.fontSize - The font size for the checkbox labels.
 * @param {CheckboxItem[]} props.alternatives - Array of checkbox items to display.
 * @param {function} props.onCheckboxStateChange - Callback function invoked when the state of any checkbox changes.
 * @param {object} props.questionId - Object containing the ID of the question.
 * @returns {JSX.Element} A JSX element representing a list of styled checkboxes with a context menu.
 *
 * @component
 */
function MultiCheckboxes({ fontSize, alternatives, questionId, onCheckboxStateChange }: IMultiCheckboxesProps): JSX.Element {
  const [contextMenu, setContextMenu] = React.useState<{ mouseX: number; mouseY: number; } | null>(null);
  const [checkboxes, setCheckboxes] = React.useState<CheckboxItem[]>(alternatives);
  const [lastClickTime, setLastClickTime] = React.useState(0);
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [selectedLabel, setSelectedLabel] = React.useState<string>('');

  /**
 * Effect hook to initialize the state of checkboxes based on stored values in localStorage.
 * On component mount or when the `alternatives` or `questionId` props change, this effect retrieves
 * the saved state of checkboxes from localStorage and updates the state of checkboxes accordingly.
 */
  React.useEffect(() => {
    const storedStates = JSON.parse(localStorage.getItem('questionStates') || '{}');
    const questionStates = storedStates[questionId.id];

    const updatedAlternatives = alternatives.map(alt => {
      if (questionStates && alt.id === questionStates.id) {
        return {
          ...alt,
          selected: questionStates.selected,
          saved: questionStates.saved,
          scratched: false
        };
      }
      return {
        ...alt,
        selected: false,
        saved: false,
        scratched: false
      };
    });

    setCheckboxes(updatedAlternatives);
  }, [alternatives, questionId]);

  /**
 * Closes the context menu.
 * This function resets the state related to the context menu, effectively closing it.
 * @callback
 */
  const handleClose = React.useCallback(() => {
    setContextMenu(null);
  }, []);

  /**
 * Handles the opening of the context menu for a checkbox.
 * This function is triggered by a right-click event on a checkbox and sets the position and details for the context menu.
 *
 * @param {React.MouseEvent} event - The mouse event that triggered the context menu.
 * @param {number} id - The ID of the checkbox for which the context menu is being opened.
 * @param {string} label - The label of the checkbox for which the context menu is being opened.
 * @callback
 */
  const handleContextMenu = React.useCallback((event: React.MouseEvent, id: number, label: string) => {
    event.preventDefault();
    setSelectedId(id);
    setSelectedLabel(label);
    setContextMenu({ mouseX: event.clientX + 2, mouseY: event.clientY - 100 });
  }, []);

  /**
 * Updates the state of a specific checkbox and manages the state of all checkboxes accordingly.
 * This function is called to change the selected, scratched, or saved status of a checkbox.
 * It also ensures that the changes are propagated correctly to other checkboxes if needed.
 *
 * @param {number} id - The ID of the checkbox to be updated.
 * @param {Partial<CheckboxItem>} newState - The new state to apply to the checkbox.
 * @callback
 */
  const updateCheckboxState = React.useCallback((id: number, newState: Partial<CheckboxItem>) => {
    setCheckboxes(checkboxes => checkboxes.map(checkbox => {
      if (checkbox.id === id) {
        onCheckboxStateChange(id, {
          selected: newState.selected !== undefined ? newState.selected : checkbox.selected,
          scratched: newState.scratched !== undefined ? newState.scratched : checkbox.scratched,
          saved: newState.saved !== undefined ? newState.saved : checkbox.saved
        });
        return { ...checkbox, ...newState };
      }
      if (newState.selected || newState.saved) {
        return { ...checkbox, selected: false, saved: false };
      }
      return checkbox;
    }));

    handleClose();
  }, [handleClose, onCheckboxStateChange]);

  /**
 * Handles changes to the state of a checkbox based on user interactions.
 * This function determines the new state of a checkbox based on the type of mouse event.
 * It supports different actions for left-click, middle-click, right-click, and double-click events.
 *
 * @param {number} id - The ID of the checkbox being interacted with.
 * @param {React.MouseEvent} event - The mouse event that triggered the change.
 * @callback
 */
  const handleCheckboxChange = React.useCallback((id: number, event: React.MouseEvent) => {
    const currentTime = new Date().getTime();
    const doubleClickThreshold = 300;

    if (event.button === 2) return;
    if (currentTime - lastClickTime < doubleClickThreshold) {
      updateCheckboxState(id, { selected: false, scratched: false, saved: true });
    } else if (event.button === 1) {
      event.preventDefault();
      updateCheckboxState(id, { selected: false, scratched: true, saved: false });
    } else {
      updateCheckboxState(id, { selected: true, scratched: false, saved: false });
    }
    setLastClickTime(currentTime);
  }, [lastClickTime, updateCheckboxState]);

  return (
    <>
      <div className="flex flex-col items-center gap-2 overflow-hidden">
        {checkboxes.map((checkbox, index) => (
          <div
            key={index}
            className={`${
              checkbox.saved
                ? `${savedStyle}`
                : checkbox.selected
                  ? `${selectedStyle}`
                  : checkbox.scratched
                    ? `${scratchedStyle}`
                    : 'border-transparent bg-modal-heading'
            } flex w-full cursor-pointer items-center gap-3 rounded-md border-2 px-2 py-3 text-white transition ease-in-out hover:border-gray-400`}
            onMouseDown={(event) => handleCheckboxChange(checkbox.id, event)}
            onContextMenu={(e) => handleContextMenu(e, checkbox.id, index.toString())}
          >
            <div className={`${
              checkbox.saved
                ? `${savedText}`
                : checkbox.selected
                  ? `${selectedText}`
                  : checkbox.scratched
                    ? `${scratchedText}`
                    : 'bg-white text-black'}  flex h-8 w-8 select-none items-center justify-center rounded-full`}>
              {String.fromCharCode(64 + index + 1)}
            </div>
            <p style={{ fontSize: fontSize }} className={`select-none ${checkbox.scratched ? 'line-through' : ''}`}>
              {checkbox.label}
            </p>
          </div>
        ))}
        {contextMenu && (
          <>
            <ContextMenu
              label={selectedLabel}
              top={contextMenu.mouseY}
              left={contextMenu.mouseX}
              onSave={() => updateCheckboxState(selectedId, { selected: false, scratched: false, saved: true })}
              onSelect={() => updateCheckboxState(selectedId, { selected: true, scratched: false, saved: false })}
              onScratch={() => updateCheckboxState(selectedId, { selected: false, scratched: true, saved: false })}
            />
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/30 backdrop-blur-[3px]" onClick={handleClose} />
          </>
        )}
      </div>
    </>
  );
}

export { MultiCheckboxes };
