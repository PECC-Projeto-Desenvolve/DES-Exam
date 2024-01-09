import React from 'react';
import { QuestionContainer } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography } from '@material-tailwind/react';
import { AccessibilityDialog } from '../../components/Dialogs/AccessibilityDialog';
import { MapDialog } from '../../components/Dialogs/MapDialog';
import { useNavigate } from 'react-router-dom';
import { FinishDialog } from '../../components/Dialogs/FinishDialog';
import { AbandonDialog } from '../../components/Dialogs/AbandonDialog';
import { populateExam } from '../../store/slices/examSlice';
import { RootState } from '../../store/store';
import { ChevronLeft, ChevronRight, Map, Settings } from 'lucide-react';

function Exam(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [openMap, setOpenMap] = React.useState(false);
  const [openFinishDialog, setOpenFinishDialog] = React.useState(false);
  const [openAbandonDialog, setOpenAbandonDialog] = React.useState(false);

  const [questions, setQuestions] = React.useState([]);

  const [examPosition, setExamPosition] = React.useState(0);

  const dispatch = useDispatch();
  const examId = '4978f8c0-d0ad-4c2f-ab98-f0d2daa9942c';

  React.useEffect(() => {
    fetch(`http://localhost:3000/exams/${examId}`)
      .then(response => response.json())
      .then(data => {
        dispatch(populateExam(data));
        localStorage.setItem('exam_simulation', JSON.stringify(data));
      })
      .catch(error => console.error('Erro ao buscar exames:', error));
  }, [dispatch]);

  const examState = useSelector((state: RootState) => state.exam.exam);

  React.useEffect(() => {
    if (examState && examState.__questions__) {
      setQuestions(examState.__questions__);
    }
  }, [examState]);

  const handleOpen = () => setOpen((cur) => !cur);

  const handleOpenFinishDialog = () => setOpenFinishDialog((cur) => !cur);

  const handleOpenAbandonDialog = () => setOpenAbandonDialog((cur) => !cur);

  const handleOpenMap = () => {
    setOpenMap((cur) => !cur);

    setTimeout(() => {
      localStorage.setItem('mapOpened', '1');
    }, 200);
  };

  const handleQuestionIndex = (index) => {
    if (onEnd) {
      setOnEnd(false);
    }

    if (openFinishDialog) {
      setOpenFinishDialog(false);
    }

    if (openMap) {
      handleOpenMap();
    }

    setExamPosition(index);
  };

  const [onEnd, setOnEnd] = React.useState<boolean>(false);

  const handleEnd = () => {
    console.log('no fim porra');
    setOnEnd(!onEnd);
  };

  const handleBackButton = () => {
    if (onEnd) {
      setOnEnd(false);
      setExamPosition(examPosition - 1);
    }

    setExamPosition(examPosition - 1);
  };

  const [hasTabChanged, setHasTabChanged] = React.useState(false);
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

  return (
    <>
      {hasTabChanged ? (
        <>
          <div className='h-full w-full px-12 py-48'>
            <div className='flex h-full w-full flex-col items-center justify-center rounded-xl bg-white/50'>
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
          <div>
            <AccessibilityDialog
              handleOpen={handleOpen}
              open={open}
              confirm={handleOpen}
            />

            <MapDialog
              open={openMap}
              handleOpen={handleOpenMap}
              questions={questions}
              handleQuestionIndex={handleQuestionIndex}
            />

            <FinishDialog
              open={openFinishDialog}
              handleOpen={handleOpenFinishDialog}
              questions={questions}
              handleQuestionIndex={handleQuestionIndex}
            />

            <AbandonDialog
              open={openAbandonDialog}
              handleOpen={handleOpenAbandonDialog}
            />
          </div>

          <div className='flex w-full flex-col gap-4'>
            <div className='flex justify-between'>
              <div className='flex gap-2'>
                <Button variant='filled' size="sm" color='orange'>Finalizar</Button>
                <Button variant='filled' size="sm" color='red' onClick={() => handleOpenAbandonDialog()}>Abandonar</Button>
              </div>
              <div>
                <Button size='sm' color='blue' className='flex items-center gap-3' onClick={handleOpen} ><Settings /> Ajustes</Button>
              </div>
            </div>
            <QuestionContainer question={questions} questionIndex={examPosition} onLastQuestion={() => handleEnd()}/>
            <div className='flex w-full justify-between'>
              <Button
                variant="text"
                className='flex items-center gap-2'
                size="md"
                disabled={examPosition == 0}
                onClick={() => handleBackButton()}> <ChevronLeft /> Voltar</Button>
              <Button className='flex items-center gap-3' size="md" onClick={handleOpenMap}>
                <Map />
              Mapa
              </Button>
              {onEnd ? (
                <>
                  <Button
                    variant="filled"
                    className='flex items-center px-6'
                    size="sm"
                    color='orange'
                    onClick={() => handleOpenFinishDialog()}
                  >Finalizar</Button>
                </>
              ):(
                <>
                  <Button
                    variant="text"
                    className='flex items-center gap-2'
                    size="sm"
                    onClick={() => setExamPosition(examPosition + 1)}
                  >Avançar <ChevronRight /></Button>
                </>
              )}

            </div>
          </div>
        </>
      )}
    </>
  );
}

export { Exam };
