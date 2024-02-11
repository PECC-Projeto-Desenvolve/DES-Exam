// import { Typography } from '@material-tailwind/react';
import React from 'react';
import { decryptRightAnswer } from '../../utils/cryptoUtils';
import { stringResizer } from '../../utils/StringResizer';

import Aos from 'aos';
import 'aos/dist/aos.css';

import { Button, IconButton, Tooltip, Typography } from '@material-tailwind/react';
import { getActualDate } from '../../utils/GetDate';

import { useNavigate } from 'react-router-dom';
import { Eye, RefreshCcw } from 'lucide-react';
import QuestionPreviewDialogWithFetch from '../../components/Dialogs/QuestionPreviewDialog/QuestionPreviewDialogWithFetch';

interface ExamSimulation {
    id: string;
    title: string;
    startAt: string | null;
    endsAt: string | null;
    difficulty: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    __questions__: Question[];
  }

  interface Question {
    id: number;
    title: string;
    statement: string;
    rightAnswer: string;
    difficulty: number;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    position?: number;
  }

interface QuestionInfo {
  currentQuestionId: number;
  id: number;
  position: number;
  selected: boolean;
  saved: boolean;
}

function SimulationResult() {
  const [examSimulation, setExamSimulation] = React.useState<ExamSimulation | null>(null);
  const [correctCount, setCorrectCount] = React.useState<number>(0);

  const [openQuestionPreview, setOpenQuestionPreview] = React.useState(false);
  const [questionToPreview, setQuestionToPreview] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }

    Aos.init({ duration: 400 });

    const storedItem = localStorage.getItem('exam_simulation');
    const storedQuestions = localStorage.getItem('questionStates');

    if (storedItem) {
      const parsedItem: ExamSimulation = JSON.parse(storedItem);

      if (storedQuestions) {
        const parsedQuestions: { [key: string]: QuestionInfo } = JSON.parse(storedQuestions);

        parsedItem.__questions__ = parsedItem.__questions__.map(question => ({
          ...question,
          position: parsedQuestions[question.id]?.position,
        }));
      }

      setExamSimulation(parsedItem);
    }
  }, []);

  React.useEffect(() => {
    if (examSimulation) {
      const correctAnswers = examSimulation.__questions__.reduce((acc, item) => {
        const decryptedAnswer = decryptRightAnswer(item.rightAnswer);
        const expectedAnswer = String.fromCharCode(64 + (item.position + 1));
        return decryptedAnswer === expectedAnswer ? acc + 1 : acc;
      }, 0);

      setCorrectCount(correctAnswers);
    }
  }, [examSimulation]);

  const handlePreviewQuestion = () => {
    setOpenQuestionPreview(!openQuestionPreview);
  };

  return (
    <>
      <QuestionPreviewDialogWithFetch
        questionToPreview={questionToPreview && questionToPreview}
        handler={handlePreviewQuestion}
        open={openQuestionPreview}
      />

      <section className='flex h-screen w-screen flex-col justify-evenly overflow-hidden px-8 pb-6 pt-12 lg:px-52'>
        <div className='flex flex-col gap-4'>
          <div>
            <Typography variant="h4" color="white">Aqui está o resultado do seu simulado</Typography>
            <Typography variant="lead" color="white">Feito no dia: {getActualDate()}</Typography>
          </div>
          <div className='max-h-[44em] overflow-y-scroll rounded-md border-x-2 border-t-2 shadow-lg' data-aos={'fade-down'}>
            <div className='flex w-full items-center justify-end bg-white px-4 py-4'>
              <span className='flex gap-2'>
                <Typography variant="lead">Acertos:</Typography>
                <Typography variant="lead">
                  {correctCount} / <strong>{examSimulation && examSimulation.__questions__.length}</strong>
                </Typography>
              </span>
            </div>
            {examSimulation && examSimulation.__questions__.map((item, index) => {
              return (
                <>
                  <div
                    key={item.id}
                    className={
                      `grid w-full grid-cols-3 gap-2  border-b-2 p-4 text-white
                      ${decryptRightAnswer(item.rightAnswer) === String.fromCharCode(64 + item.position + 1) ? 'bg-green-500' : 'bg-red-500'}`}
                  >
                    <span className=' col-span-2 flex items-center gap-4'>
                      <p className='flex h-7 w-7 items-center justify-center rounded-md bg-blue-gray-50 text-black'>{index + 1}</p>
                      <span>
                        <Typography>{item.title}</Typography>
                        <div key={index} dangerouslySetInnerHTML={{ __html: stringResizer(item.statement, 50)}}/>
                      </span>
                    </span>
                    <div className='flex items-center justify-between'>
                      <span className='flex flex-col items-center'>
                        <Typography variant="small">Alternativa correta:</Typography>
                        <p>{decryptRightAnswer(item.rightAnswer)}</p>
                      </span>
                      <span className='flex flex-col items-center'>
                        <Typography variant="small">Você marcou:</Typography>
                        {item.position ? (
                          <p> {String.fromCharCode(64 + (item.position + 1))}</p>
                        ) : (
                          <p>####</p>
                        )}
                      </span>
                      <Tooltip content="Visualizar questão">
                        <IconButton color='white' onClick={() => {
                          setQuestionToPreview(item.id);
                          handlePreviewQuestion();
                        }}>
                          <Eye />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className='flex w-full justify-between'>
          <Button color='orange' className='flex items-center gap-2'>
            Refazer o simulado
            <RefreshCcw size={18}/>
          </Button>
          <Button
            color='green'
            className='flex items-center gap-2'
            onClick={() => {
              localStorage.removeItem('questionStates');
              localStorage.removeItem('exam_simulation');
              navigate('/home');
            }}
          >Ir para página inicial</Button>
        </div>
      </section>
    </>
  );
}

export default SimulationResult;
