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
}

interface IMapDialogProps {
    handleOpen: () => void;
    open: boolean;
    questions: IQuestionTypes[];
    isMapOpened: number
}

function MapDialog({
  handleOpen,
  open,
  questions,
  isMapOpened,
}: IMapDialogProps): JSX.Element {
  const [mapIsAlreadyOpened, setMapIsAlreadyOpened] = React.useState(localStorage.getItem('mapOpened'));

  React.useEffect(() => {
    Aos.init({duration: 400});


  }, []);

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="select-none bg-transparent shadow-2xl"
      >
        <Card className="mx-auto w-fit max-w-[50rem]">
          <CardBody className="flex flex-col gap-4">
            <div>

              <Typography variant="h4" color="blue-gray">
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

            <div className='grid min-h-[10rem] w-full grid-cols-9 gap-x-2 gap-y-3 rounded-lg border border-border p-2 '>
              {questions && questions.map((question, index) => (
                <>
                  <span data-aos={localStorage.getItem('mapOpened') != '1' && 'fade-down'} data-aos-delay={50 * index}>
                    <QuestionItem key={index} index={index} answer={''} questionState={4} statement={`${stringResizer(question.statement, 50)} ...`}/>
                  </span>
                </>
              ))}
            </div>

          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}

export { MapDialog };
