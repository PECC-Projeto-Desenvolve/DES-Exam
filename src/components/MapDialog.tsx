import React from 'react';
import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Tooltip,
} from '@material-tailwind/react';

import { Clock } from 'lucide-react';

import { QuestionItem } from '.';
import { stringResizer } from '../utils/StringResizer';

import Aos from 'aos';
import 'aos/dist/aos.css';

type IQuestionTypes = {
    id: number;
    title: string;
    statement: string;
    rightAnswer: string;
    difficulty: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    saved: false,
    selected: false,
}

interface IMapDialogProps {
    handleOpen: () => void;
    open: boolean;
    questions: IQuestionTypes[];
}

function MapDialog({
  handleOpen,
  open,
  questions,
}: IMapDialogProps): JSX.Element {
  const [questionStates, setQuestionStates] = React.useState({});

  React.useEffect(() => {
    Aos.init({ duration: 400 });
  }, []);

  React.useEffect(() => {
    if (open) {
      const storedStates = JSON.parse(localStorage.getItem('questionStates') || '{}');
      setQuestionStates(storedStates);
    }
  }, [open]);

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="select-none bg-transparent shadow-2xl"
      >
        <Card className="mx-auto w-fit max-w-[50rem] bg-modal-bg">
          <CardBody className="flex flex-col gap-4">
            <div>

              <Typography variant="h4" className='text-blue-gray-100'>
              Mapa de prova
              </Typography>

              <div className='flex justify-between'>
                <Typography variant='lead'>
            Processo seletivo <strong>cidade</strong> - data
                </Typography>

                <Tooltip
                  content="Tempo decorrido de prova"
                  className="master-z-index"
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >

                  <Typography variant='lead' className='flex items-center '>
                    <Clock size={20} className='mr-2'/>
                    02 <span className='animate-blink mx-[2px]'> : </span> 30
                  </Typography>
                </Tooltip>
              </div>
            </div>

            <div className='grid min-h-[10rem] grid-cols-5 gap-x-4 gap-y-3 rounded-lg border border-border bg-black/20 p-2 lg:grid-cols-9'>
              {questions && questions.map((question, index) => {
                const currentQuestionState = questionStates[question.id];
                let questionState = 3;

                if (currentQuestionState) {
                  if (currentQuestionState.saved) {
                    questionState = 1;
                  } else if (currentQuestionState.selected) {
                    questionState = 2;
                  }
                }

                return (
                  <span key={question.id} data-aos={localStorage.getItem('mapOpened') != '1' && 'fade-down'} data-aos-delay={50 * index}>
                    <QuestionItem
                      index={index}
                      answer={0}
                      questionState={questionState}
                      statement={`${stringResizer(question.statement, 50)} ...`}
                    />
                  </span>
                );
              })}
            </div>

          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}

export { MapDialog };
