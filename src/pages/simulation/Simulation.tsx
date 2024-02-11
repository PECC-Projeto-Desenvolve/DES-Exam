import React from 'react';
import { QuestionContainer } from '../../components';
import { Button } from '@material-tailwind/react';
import { ChevronRight, ChevronLeft, Map, Settings, HelpCircle } from 'lucide-react';
import { MapDialog } from '../../components/Dialogs/MapDialog';

import { useSelector, useDispatch } from 'react-redux';
import { populateExam } from '../../store/slices/examSlice';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { AccessibilityDialog } from '../../components/Dialogs/AccessibilityDialog';
import { FinishDialog } from '../../components/Dialogs/FinishDialogSimulation';
import { AbandonDialog } from '../../components/Dialogs/AbandonDialog';
import { TutorialDialog } from '../../components/Dialogs/TutorialDialog';

function Simulation(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [openMap, setOpenMap] = React.useState(false);
  const [openFinishDialog, setOpenFinishDialog] = React.useState(false);
  const [openAbandonDialog, setOpenAbandonDialog] = React.useState(false);
  const [openTutorial, setOpenTutorial] = React.useState<boolean>(false);
  const [questions, setQuestions] = React.useState([]);
  const [examPosition, setExamPosition] = React.useState(0);

  const [time, setTime] = React.useState({ minutes: 0, seconds: 0 });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  React.useEffect(() => {
    const authenticatedUserStr = localStorage.getItem('authenticated_user');
    if (!authenticatedUserStr) {
      navigate('/');
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/exams/${import.meta.env.VITE_SIMULATION_ID}`)
      .then(response => response.json())
      .then(data => {
        dispatch(populateExam(data));
        localStorage.setItem('exam_simulation', JSON.stringify(data));
      })
      .catch(error => console.error('Erro ao buscar exames:', error));
  }, [dispatch]);

  //   @ts-ignore
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
    setOnEnd(!onEnd);
  };

  const handleBackButton = () => {
    if (onEnd) {
      setOnEnd(false);
      setExamPosition(examPosition - 1);
    }

    setExamPosition(examPosition - 1);
  };

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        Swal.fire({
          title: 'Você mudou de aba!',
          text: 'A troca de aba não é permitida durante esta atividade. Na realização da prova oficial você não será permitido voltar para a prova',
          icon: 'warning',
          confirmButtonText: 'Entendi'
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const getUserExam = () => {
    setTimeout(() => {
      navigate('/simulation-results');
    }, 200);

  };

  const handleOpenTutorial = () => {
    setOpenTutorial(!openTutorial);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime.seconds === 59) {
          if (prevTime.minutes === 59) {
            clearInterval(timer);
            return { minutes: 59, seconds: 59 };
          }
          return { minutes: prevTime.minutes + 1, seconds: 0 };
        }
        return { ...prevTime, seconds: prevTime.seconds + 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>

      <TutorialDialog
        handleOpenTutorial={handleOpenTutorial}
        openTutorial={openTutorial}
      />

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
        timer={`${time.minutes} : ${time.seconds}`}
      />

      <FinishDialog
        open={openFinishDialog}
        handleOpen={handleOpenFinishDialog}
        questions={questions}
        handleQuestionIndex={handleQuestionIndex}
        handleFinish={() => getUserExam()}
        handlePartial={() => console.log('hue')}
        disableBtn={true}
      />

      <AbandonDialog
        open={openAbandonDialog}
        handleOpen={handleOpenAbandonDialog}
      />

      <div className='flex w-full flex-col gap-4'>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Button variant='filled' size="sm" color='red' onClick={() => handleOpenAbandonDialog()}>Abandonar</Button>
          </div>
          <div className='flex gap-2'>
            <Button className='flex items-center gap-2' onClick={handleOpenTutorial} color='green'>
              <HelpCircle size={18}/>
            Tutorial
            </Button>

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
            color='white'
            onClick={() => handleBackButton()}
          >
            <ChevronLeft />
            Voltar
          </Button>
          <Button className='flex items-center gap-3' size="md" onClick={handleOpenMap} color='cyan'>
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
                color='white'
                onClick={() => setExamPosition(examPosition + 1)}
              >
                Avançar
                <ChevronRight />
              </Button>
            </>
          )}

        </div>
      </div>
    </>
  );
}

export { Simulation };
