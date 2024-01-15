import {
  Dialog,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Button,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { getActualDate } from '../../utils/GetDate';


interface IAbandonDialogProps {
    handleOpen: () => void;
    open: boolean;
}

function AbandonDialog({
  open,
  handleOpen,
}: IAbandonDialogProps): JSX.Element {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // localStorage.clear('exam_simulation');
    localStorage.removeItem('exam_simulation');
    localStorage.removeItem('mapOpened');
    localStorage.removeItem('questionStates');

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    navigate('/home');

  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="border border-gray-800 bg-white"
      >
        <DialogHeader className='flex rounded-t-lg'>
          <div className='w-full'>
            <Typography variant="h4" className='text-blue-gray-900'>
            Você deseja abandonar?
            </Typography>

            <div className='flex w-full justify-between' >
              <Typography variant='lead' className='text-blue-gray-700'>
                <strong className='text-blue-gray-700'>Bom Despacho</strong> - {getActualDate()}
              </Typography>

            </div>
          </div>
        </DialogHeader>

        <DialogBody className=''>
          <div className='grid grid-cols-9 gap-2'>

          </div>

        </DialogBody>
        <DialogFooter className='flex gap-4'>
          <Button color='red' onClick={() => handleConfirm()}>Sim</Button>
          <Button color='green' variant='outlined' onClick={() => handleOpen()}>Não</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export { AbandonDialog };
