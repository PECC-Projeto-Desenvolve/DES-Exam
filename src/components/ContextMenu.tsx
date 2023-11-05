import { Button, Typography } from '@material-tailwind/react';
import React from 'react';

import { Scissors, CheckCircle2, Bookmark } from 'lucide-react';

interface ContextMenuProps {
  top: number;
  left: number;
  label: string;
  onClose?: () => void;
}

interface IMenuItemProps {
    label: string,
    icon: React.ReactNode
}

const MenuItem = ({label, icon}: IMenuItemProps) => {
  return (
    <>
      <Button className='flex items-center gap-4'>
        {icon}
        {label}
      </Button>
    </>
  );
};


const ContextMenu: React.FC<ContextMenuProps> = ({ top, left, label, onClose }) => {

  return (
    <div
      className="fixed z-50 bg-white border border-gray-300 p-2 shadow-2xl rounded-md flex flex-col gap-1"
      style={{ top, left }}

    >
      <Typography variant="small">Alternativa:
        <strong>
          {label}
        </strong>
      </Typography>
      <MenuItem label="marcar" icon={<CheckCircle2 />}/>
      <MenuItem label="razurar" icon={<Scissors />}/>
      <MenuItem label="salvar" icon={<Bookmark />}/>
    </div>

  );
};

export default ContextMenu;
