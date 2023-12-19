import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from '@material-tailwind/react';
import {
  PlusIcon,
} from '@heroicons/react/24/outline';
import { Trash } from 'lucide-react';

export function SpeedDialWithTextOutside() {
  const labelProps = {
    variant: 'small',
    color: 'orange',
    className:
        'absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal bg-white p-4 rounded-lg shadow-xl',
  };

  return (

    <div className="absolute bottom-0 right-0 mb-10 mr-10">
      <SpeedDial>
        <SpeedDialHandler>
          <IconButton size="lg" className="rounded-full">
            <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </IconButton>
        </SpeedDialHandler>
        <SpeedDialContent>
          <SpeedDialAction className="relative bg-white" onClick={() => localStorage.removeItem('mapOpened')} >
            <Trash className="h-5 w-5 shadow-xl" />
            <Typography {...labelProps}>LocalStorage: <strong>mapOpened</strong></Typography>
          </SpeedDialAction>
          <SpeedDialAction className="relative bg-white" onClick={() => localStorage.removeItem('questionStates')} >
            <Trash className="h-5 w-5 shadow-xl" />
            <Typography {...labelProps}>LocalStorage: <strong>questionStates</strong></Typography>
          </SpeedDialAction>
        </SpeedDialContent>
      </SpeedDial>
    </div>

  );
}
