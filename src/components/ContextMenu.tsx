import { Button, Typography } from '@material-tailwind/react';
import React from 'react';

import { Scissors, CheckCircle2, Bookmark } from 'lucide-react';

interface ContextMenuProps {
  top: number;
  left: number;
  label: string;
  onSave: () => void;
}

interface IMenuItemProps {
    label: string,
    icon: React.ReactNode
}

const MenuItem = ({ label, icon, onClick }: IMenuItemProps & { onClick?: () => void }) => {
  return (
    <>
      <Button className='flex items-center gap-4' onClick={onClick}>
        {icon}
        {label}
      </Button>
    </>
  );
};


const ContextMenu: React.FC<ContextMenuProps> = ({ top, left, label, onSave }) => {

  return (
    <div
      className="fixed z-50 flex animate-fade-in-down flex-col gap-1 rounded-md border border-gray-300 bg-white p-2 shadow-2xl"
      style={{ top, left }}

    >
      <Typography variant="small">Alternativa:
        <strong>
          {label}
        </strong>
      </Typography>
      <MenuItem label="marcar" icon={<CheckCircle2 />}/>
      <MenuItem label="razurar" icon={<Scissors />}/>
      <MenuItem label="salvar" icon={<Bookmark />} onClick={onSave}/>
    </div>

  );
};

export default ContextMenu;
