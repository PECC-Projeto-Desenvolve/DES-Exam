import React from 'react';
import { QuestionContainer } from '../../components';
import { Button, Tooltip } from '@material-tailwind/react';
import { ChevronRight, ChevronLeft, Map, Settings } from 'lucide-react';
import { MapDialog } from '../../components/Dialogs/MapDialog';

import { useSelector, useDispatch } from 'react-redux';
import { populateExam } from '../../store/slices/examSlice';
import { RootState } from '../../store/store';
import { AccessibilityDialog } from '../../components/Dialogs/AccessibilityDialog';
import { FinishDialog } from '../../components/Dialogs/FinishDialog';
import { AbandonDialog } from '../../components/Dialogs/AbandonDialog';
import Swal from 'sweetalert2';

function Simulation(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [openMap, setOpenMap] = React.useState(false);
  const [openFinishDialog, setOpenFinishDialog] = React.useState(false);
  const [openAbandonDialog, setOpenAbandonDialog] = React.useState(false);

  const [questions, setQuestions] = React.useState([]);

  const [examPosition, setExamPosition] = React.useState(0);

  const [data, setData] = React.useState({ name: '', examId: '', __questions__: [] });

  const [user, serUser] = React.useState<string>('');

  const dispatch = useDispatch();
  const examId = '4978f8c0-d0ad-4c2f-ab98-f0d2daa9942c';

  React.useEffect(() => {
    const authenticatedUser = JSON.parse(localStorage.getItem('authenticated_user'));
    serUser(authenticatedUser.name);

    fetch(`http://localhost:3000/exams/${examId}`)
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

  //   React.useEffect(() => {
  //     if (document.documentElement.requestFullscreen) {
  //       document.documentElement.requestFullscreen();
  //     }
  //   }, []);

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

    // Limpeza: remover o event listener quando o componente é desmontado
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const getUserExam = () => {
    const storedQuestions = JSON.parse(localStorage.getItem('questionStates'));
    const storedExamData = JSON.parse(localStorage.getItem('exam_simulation'));
    const extractedQuestions = storedQuestions
      ? Object.keys(storedQuestions).map(key => ({
        questionId: parseInt(key, 10),
        id: storedQuestions[key].id,
        position: storedQuestions[key].position
      }))
      : [];

    setData(
      {
        name: user,
        examId: storedExamData.id,
        __questions__: extractedQuestions
      });
  };

  React.useEffect(() => {
    console.log(data);
  }, [data]);


  return (
    <>

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
        handleFinish={() => getUserExam()}
      />

      <AbandonDialog
        open={openAbandonDialog}
        handleOpen={handleOpenAbandonDialog}
      />

      <div className='flex w-full flex-col gap-4'>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Tooltip content='Você pode finalizar apenas quando marcar todas as questões'>
              <span>
                <Button variant='filled' size="sm" color='orange' className='h-full' disabled>Finalizar</Button>
              </span>
            </Tooltip>
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
            color='white'
            onClick={() => handleBackButton()}
          >
            <ChevronLeft />
            Voltar
          </Button>
          <Button className='flex items-center gap-3' size="md" onClick={handleOpenMap} color='indigo'>
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
