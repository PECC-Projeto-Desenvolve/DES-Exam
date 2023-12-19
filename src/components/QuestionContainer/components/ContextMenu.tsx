import { Button, Typography } from '@material-tailwind/react';
import React from 'react';

import { Scissors, CheckCircle2, Bookmark } from 'lucide-react';
import { color } from '@material-tailwind/react/types/components/alert';

interface ContextMenuProps {
  top: number;
  left: number;
  label: string;
  onSave: () => void;
  onSelect: () => void;
  onScratch: () => void;
}

interface IMenuItemProps {
    label: string | number;
    icon: React.ReactNode;
    color: color;
}

/**
 * Represents a menu item with a label, an icon, and a color.
 *
 * @param {object} props - The properties for the MenuItem component.
 * @param {string} props.label - The text label for the menu item.
 * @param {React.ReactNode} props.icon - The icon displayed next to the label.
 * @param {color} props.color - The color theme for the button.
 * @param {() => void} [props.onClick] - An optional click handler for the menu item.
 * @returns {JSX.Element} A React component representing a menu item.
 */
const MenuItem = ({ label, icon, color, onClick }: IMenuItemProps & { onClick?: () => void }) => {
  return (
    <>
      <Button className='flex items-center gap-8 px-4' onClick={onClick} color={`${color}`}>
        {icon}
        {label}
      </Button>
    </>
  );
};

/**
 * Displays a context menu with various actions.
 *
 * @param {object} props - The properties for the ContextMenu component.
 * @param {number} props.top - The top position for the menu.
 * @param {number} props.left - The left position for the menu.
 * @param {string} props.label - The label displayed at the top of the menu.
 * @param {() => void} props.onSave - Callback for the save action.
 * @param {() => void} props.onSelect - Callback for the select action.
 * @param {() => void} props.onScratch - Callback for the scratch action.
 * @returns {JSX.Element} A React component representing a context menu.
 */
const ContextMenu: React.FC<ContextMenuProps> = ({ top, left, label, onSave, onSelect, onScratch }) => {

  return (
    <div
      className="fixed z-50 flex animate-fade-in-down flex-col gap-1 rounded-md border border-gray-300 bg-white p-2 shadow-2xl"
      style={{ top, left }}

    >
      <span className='mb-2 flex w-full flex-col items-center rounded-md bg-[#000]/10 py-2'>
        <Typography variant="small">Alternativa:</Typography>
        <strong className='flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-white'>
          {String.fromCharCode(64 + Number(label) + 1)}
        </strong>
      </span>
      <MenuItem label="marcar" icon={<CheckCircle2 />} onClick={onSelect} color='green'/>
      <MenuItem label="razurar" icon={<Scissors />} onClick={onScratch} color='blue-gray'/>
      <MenuItem label="salvar" icon={<Bookmark />} onClick={onSave} color='orange'/>
    </div>

  );
};

export default ContextMenu;
