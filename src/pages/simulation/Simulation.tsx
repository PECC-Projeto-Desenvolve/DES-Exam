import React from 'react';
import { QuestionContainer } from '../../components';
import { Button } from '@material-tailwind/react';
import { ChevronRight, ChevronLeft, Map, Settings } from 'lucide-react';
import { AccessibilityDialog } from '../../components/AccessibilityDialog';
import { MapDialog } from '../../components/MapDialog';

import { useSelector, useDispatch } from 'react-redux';
import { populateExam } from '../../store/slices/examSlice';
import { RootState } from '../../store/store';

function Simulation(): JSX.Element {
  const [fontSize, setFontSize] = React.useState(14);
  const [confirmedFont, setConfirmedFont] = React.useState(14);
  const [open, setOpen] = React.useState(false);
  const [openMap, setOpenMap] = React.useState(false);

  const [isMapOpened, setIsMapOpened] = React.useState(0);

  const [exam, setExam] = React.useState({});
  const [questions, setQuestions] = React.useState([]);

  const [examPosition, setExamPosition] = React.useState(0);

  const dispatch = useDispatch();
  const examId = '817ed206-8ce5-44ff-81ae-d2e835d7ead1';

  React.useEffect(() => {
    fetch(`http://localhost:3000/exams/${examId}`)
      .then(response => response.json())
      .then(data => {
        dispatch(populateExam(data));
      })
      .catch(error => console.error('Erro ao buscar exames:', error));
  }, [dispatch]);

  const examState = useSelector((state: RootState) => state.exam.exam);

  React.useEffect(() => {
    if (examState && examState.__questions__) {
      setQuestions(examState.__questions__);
    }

  }, [examState]);

  React.useEffect(() => {
    console.log(questions[0]);
  }, [questions]);


  React.useEffect(() => {
    const fontSize = localStorage.getItem('confirmedFont');
    setConfirmedFont(Number(fontSize));
  }, []);


  const handleOpen = () => setOpen((cur) => !cur);

  const handleOpenMap = () => {
    setOpenMap((cur) => !cur);

    setTimeout(() => {
      localStorage.setItem('mapOpened', '1');
    }, 3500);
  };

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
        questions={questions}
        isMapOpened={isMapOpened}
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
        <QuestionContainer question={questions} questionIndex={examPosition}/>
        <div className='flex w-full justify-between'>
          <Button
            variant="text"
            className='flex items-center gap-2'
            size="md"
            disabled={examPosition == 0}
            onClick={() => setExamPosition(examPosition - 1)}> <ChevronLeft /> Voltar</Button>
          <Button className='flex items-center gap-3' size="md" onClick={handleOpenMap}>
            <Map />
              Mapa
          </Button>
          <Button
            variant="text"
            className='flex items-center gap-2'
            size="md"
            onClick={() => setExamPosition(examPosition + 1)}
          >Avançar <ChevronRight /></Button>
        </div>
      </div>
    </>
  );
}

export { Simulation };
