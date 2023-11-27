import React, { useState } from 'react';
import ContextMenu from './ContextMenu';
import { savedStyle, savedText, scratchedStyle, scratchedText, selectedStyle, selectedText } from '../styles/question-container-styles';

interface CheckboxItem {
  id: number;
  label: string;
  selected: boolean;
  scratched: boolean;
  saved: boolean;
}

interface IMultiCheckboxesProps {
    fontSize: number | undefined;
}

function MultiCheckboxes({fontSize}: IMultiCheckboxesProps):JSX.Element {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
          mouseX: event.clientX + 2,
          mouseY: event.clientY - 6,
        }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const [checkboxes, setCheckboxes] = useState<CheckboxItem[]>([
    {
      id: 1,
      label: 'Capacidade de transporte de oxigênio para os tecidos.',
      selected: false,
      scratched: false,
      saved: false,
    },
    {
      id: 2,
      label: 'Produção de hormônios anabólicos.',
      selected: false,
      scratched: false,
      saved: false,
    },
    {
      id: 3,
      label: 'Agilidade e coordenação motora.',
      selected: false,
      scratched: false,
      saved: false,
    },
    {
      id: 4,
      label: 'Velocidade de recuperação pós-exercício.',
      selected: false,
      scratched: false,
      saved: false,
    },
    {
      id: 5,
      label: 'Força e potência muscular.',
      selected: false,
      scratched: false,
      saved: false,
    },
  ]);

  const [lastClickTime, setLastClickTime] = useState(0);
  const [answer, setAnswer] = useState<string>('');

  const handleCheckboxChange = (id: number, event: React.MouseEvent) => {
    const currentTime = new Date().getTime();
    const doubleClickThreshold = 300;

    if (event.button === 2) {
      // Verifica se o botão pressionado foi o botão direito do mouse (código 2)
      return;
    }

    if (currentTime - lastClickTime < doubleClickThreshold) {
      // Double-click
      const updatedCheckboxes = checkboxes.map((checkbox) => {
        if (checkbox.id === id) {
          return {
            ...checkbox,
            selected: false,
            scratched: false,
            saved: true,
          };
        } else {
          return { ...checkbox, saved: false };
        }
      });
      setCheckboxes(updatedCheckboxes);
    } else if (event.button === 1) {
      // Middle button
      event.preventDefault();
      const updatedCheckboxes = checkboxes.map((checkbox) => {
        if (checkbox.id === id) {
          return {
            ...checkbox,
            selected: false,
            saved: false,
            scratched: true,
          };
        }
        return checkbox;
      });
      setCheckboxes(updatedCheckboxes);
    } else {
      // Single-click
      const updatedCheckboxes = checkboxes.map((checkbox) => {
        if (checkbox.id === id) {
          return {
            ...checkbox,
            selected: true,
            scratched: false,
            saved: false,
          };
        } else {
          return { ...checkbox, selected: false };
        }
      });
      setCheckboxes(updatedCheckboxes);
    }

    setLastClickTime(currentTime);
  };

  return (
    <>
      <div onContextMenu={handleContextMenu} className="flex flex-col items-center gap-2 overflow-hidden">

        {checkboxes.map((checkbox) => (
          <>
            <div
              key={checkbox.id}
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
              onContextMenu={(e) => {
                e.preventDefault();
                setAnswer(String.fromCharCode(64 + checkbox.id));
              }}
            >
              <div className={`${
                checkbox.saved
                  ? `${savedText}`
                  : checkbox.selected
                    ? `${selectedText}`
                    : checkbox.scratched
                      ? `${scratchedText}`
                      : 'bg-white text-black'}  flex h-8 w-8 select-none items-center justify-center rounded-full`}>
                {String.fromCharCode(64 + checkbox.id)}
              </div>
              <p style={{ fontSize: fontSize }} className={`label select-none ${checkbox.scratched ? 'line-through' : 'none'}`}>
                {checkbox.label}
              </p>
            </div>
          </>
        ))}

        {contextMenu && (
          <>
            <ContextMenu label={answer} top={contextMenu.mouseY} left={contextMenu.mouseX} />
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-blurred backdrop-blur-sm" onClick={handleClose} />
          </>

        )}

      </div>
    </>
  );
}

export { MultiCheckboxes };
