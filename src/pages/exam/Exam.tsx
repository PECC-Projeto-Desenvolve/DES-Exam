import React from 'react';
import { QuestionContainer } from '../../components';
import { Button, Typography } from '@material-tailwind/react';
import { ChevronRight, ChevronLeft, Map, Settings } from 'lucide-react';
import { AccessibilityDialog } from '../../components/Dialogs/AccessibilityDialog';
import { MapDialog } from '../../components/Dialogs/MapDialog';
import { useNavigate } from 'react-router-dom';

function Exam(): JSX.Element {
  const [hasTabChanged, setHasTabChanged] = React.useState(false);

  const [fontSize, setFontSize] = React.useState(14);
  const [confirmedFont, setConfirmedFont] = React.useState(14);
  const [open, setOpen] = React.useState(false);
  const [openMap, setOpenMap] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        setHasTabChanged(true);
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  React.useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      sessionStorage.setItem('pageReloaded', 'true');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    if (sessionStorage.getItem('pageReloaded')) {
      navigate('/home');
      sessionStorage.removeItem('pageReloaded');
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);


  const handleOpen = () => setOpen((cur) => !cur);

  const handleOpenMap = () => setOpenMap((cur) => !cur);

  const handleIncreaseFont = () => {
    setFontSize(fontSize + 1);
  };

  const handleDecreaseFont = () => {
    setFontSize(fontSize - 1);
  };

  const handleResetFontSize = () => {
    setFontSize(14);
  };

  const handleFontSizeConfirm = () => {
    setConfirmedFont(fontSize);
    handleOpen();
  };


  return (
    <>
      {hasTabChanged ? (
        <>
          <div className='h-full w-full px-12 py-48'>
            <div className='flex h-full w-full flex-col items-center justify-center rounded-md bg-[#eee]'>
              <Typography variant='h4'>
        Infelizmente você mudou de aba, portanto você está desclassificado.
              </Typography>
              <Button size='lg' className='mt-6' onClick={() => navigate('/home')}>
                Voltar para tela inicial
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <AccessibilityDialog
            fontSize={fontSize}
            handleResetFontSize={handleResetFontSize}
            handleDecreaseFont={handleDecreaseFont}
            handleFontSizeConfirm={handleFontSizeConfirm}
            handleIncreaseFont={handleIncreaseFont}
            handleOpen={handleOpen}
            open={open}
          />

          <MapDialog
            open={openMap}
            handleOpen={handleOpenMap}
          />

          <div className='flex w-full flex-col gap-4'>
            <div className='flex justify-between'>
              <div className='flex gap-2'>
                <Button variant='outlined' size="md">Finalizar</Button>
                <Button variant='outlined' size="md">Abandonar</Button>
              </div>
              <div>
                <Button size='md' className='flex items-center gap-3' onClick={handleOpen}><Settings /> Ajustes</Button>
              </div>
            </div>
            <QuestionContainer fontSize={confirmedFont}/>
            <div className='flex w-full justify-between'>
              <Button variant="text" className='flex items-center gap-2' size="md"> <ChevronLeft /> Voltar</Button>
              <Button className='flex items-center gap-3' size="md" onClick={handleOpenMap}>
                <Map />
              Mapa
              </Button>
              <Button variant="text" className='flex items-center gap-2' size="md">Avançar <ChevronRight /></Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export { Exam };
