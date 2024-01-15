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

  const [user, setUser] = React.useState<string>('');
  const [userDocument, setUserDocument] = React.useState<string>('');

  const [questions, setQuestions] = React.useState([]);

  const [examPosition, setExamPosition] = React.useState(0);

  const [disableFetchButton, setDisableFetchButton] = React.useState(false);

  const [time, setTime] = React.useState({ minutes: 0, seconds: 0 });

  const dispatch = useDispatch();

  React.useEffect(() => {
    const authenticatedUserStr = localStorage.getItem('authenticated_user');
    if (!authenticatedUserStr) {
      navigate('/');
      return;
    }

    const authenticatedUser = JSON.parse(authenticatedUserStr);

    setUser(authenticatedUser.name);
    setUserDocument(authenticatedUser.cpf);

    fetch(`${import.meta.env.VITE_API_URL}/exams/${import.meta.env.VITE_EXAM_ID}`)
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

  const getUserExam = () => {
    setDisableFetchButton(!disableFetchButton);

    const storedQuestions = JSON.parse(localStorage.getItem('questionStates'));
    const storedExamData = JSON.parse(localStorage.getItem('exam_simulation'));
    const extractedQuestions = storedQuestions
      ? Object.keys(storedQuestions).map(key => ({
        questionId: parseInt(key, 10),
        id: storedQuestions[key].id,
        position: storedQuestions[key].position
      }))
      : [];

    const userData = {
      name: user,
      document: userDocument,
      examId: storedExamData.id,
      questions: extractedQuestions
    };

    sendUserExamData(userData);
  };

  const sendUserExamData = async (userData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/userexams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      localStorage.setItem('finishedExam', 'true');
      navigate('/home');
    } catch (error) {
      setDisableFetchButton(disableFetchButton);
      console.error('Erro ao enviar os dados:', error);
    }
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
      {hasTabChanged ? (
        <>
          <div className='h-full w-full px-12 py-48'>
            <div className='flex h-full w-full flex-col items-center justify-center rounded-xl bg-white/50 text-center'>
              <Typography variant='h4'>
        Infelizmente você mudou de aba, portanto você está desclassificado.
              </Typography>
              <Button
                size='lg'
                className='mt-6'
                onClick={() => {
                  localStorage.setItem('disqualified', 'true');
                  navigate('/home');
                }}
                color='green'>
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
              timer={`${time.minutes} : ${time.seconds}`}
            />

            <FinishDialog
              open={openFinishDialog}
              handleOpen={handleOpenFinishDialog}
              questions={questions}
              handleQuestionIndex={handleQuestionIndex}
              handleFinish={() => getUserExam()}
              disableBtn={disableFetchButton}
            />

            <AbandonDialog
              open={openAbandonDialog}
              handleOpen={handleOpenAbandonDialog}
            />
          </div>

          <div className='flex w-full flex-col gap-4'>
            <div className='flex justify-between'>
              <div className='flex gap-2'>
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
                color='white'
                disabled={examPosition == 0}
                onClick={() => handleBackButton()}> <ChevronLeft /> Voltar</Button>
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
