import React from 'react';
import { QuestionContainer } from '../../components';
import { Button } from '@material-tailwind/react';
// import { Button, ButtonGroup } from '@material-tailwind/react';
import { ChevronRight, ChevronLeft, Map, Settings } from 'lucide-react';
import { AccessibilityDialog } from '../../components/AccessibilityDialog';
import { MapDialog } from '../../components/MapDialog';

function Exam(): JSX.Element {
  const [fontSize, setFontSize] = React.useState<number>(14);
  const [confirmedFont, setConfirmedFont] = React.useState<number>(14);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const [openMap, setOpenMap] = React.useState(false);
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

      <div className='w-full flex flex-col gap-4'>
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
        <div className='w-full flex justify-between'>
          <Button variant="text" className='flex items-center gap-2' size="md"> <ChevronLeft /> Voltar</Button>
          <Button className='flex items-center gap-3' size="md" onClick={handleOpenMap}>
            <Map />
            Mapa
          </Button>
          <Button variant="text" className='flex items-center gap-2' size="md">Avançar <ChevronRight /></Button>
        </div>
      </div>
    </>
  );
}

export { Exam };
