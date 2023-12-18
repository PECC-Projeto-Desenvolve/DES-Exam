import React, { useState, useCallback } from 'react';
import ContextMenu from './ContextMenu';
import { savedStyle, savedText, scratchedStyle, scratchedText, selectedStyle, selectedText } from '../styles/question-container-styles';

/**
 * @typedef {Object} CheckboxItem
 * @property {number} id - The unique identifier for the checkbox item.
 * @property {string} label - The text label displayed next to the checkbox.
 * @property {boolean} selected - Indicates if the checkbox is selected.
 * @property {boolean} scratched - Indicates if the checkbox is scratched.
 * @property {boolean} saved - Indicates if the checkbox is saved.
 */
interface CheckboxItem {
  id: number;
  label: string;
  selected: boolean;
  scratched: boolean;
  saved: boolean;
}

interface IMultiCheckboxesProps {
  fontSize: number | undefined;
  alternatives: CheckboxItem[];
}

/**
 * Component representing multiple checkboxes with different states and actions.
 *
 * @param {object} props - The properties for the MultiCheckboxes component.
 * @param {number | undefined} props.fontSize - The font size for the checkbox labels.
 * @param {CheckboxItem[]} props.alternatives - An array of checkbox items, each with an id, label, and state indicators.
 * @returns {JSX.Element} A React component rendering a list of checkboxes with associated actions.
 */
function MultiCheckboxes({ fontSize, alternatives }: IMultiCheckboxesProps): JSX.Element {
  const [contextMenu, setContextMenu] = useState<{ mouseX: number; mouseY: number; } | null>(null);
  const [checkboxes, setCheckboxes] = useState<CheckboxItem[]>(alternatives);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>('');

  React.useEffect(() => {
    setCheckboxes(alternatives);
  }, [alternatives]);


  const handleClose = useCallback(() => {
    setContextMenu(null);
  }, []);

  const handleContextMenu = useCallback((event: React.MouseEvent, id: number, label: string) => {
    event.preventDefault();
    setSelectedId(id);
    setSelectedLabel(label);
    setContextMenu({ mouseX: event.clientX + 2, mouseY: event.clientY - 100 });
  }, []);

  const updateCheckboxState = useCallback((id: number, newState: Partial<CheckboxItem>) => {

    setCheckboxes(checkboxes => checkboxes.map(checkbox => {
      if (checkbox.id === id) {
        return { ...checkbox, ...newState };
      }

      if (newState.selected || newState.saved) {
        return { ...checkbox, selected: false, saved: false };
      }

      return checkbox;
    }));

    handleClose();
  }, []);

  const handleCheckboxChange = useCallback((id: number, event: React.MouseEvent) => {
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
