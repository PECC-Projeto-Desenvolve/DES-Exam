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

interface IMapDialogProps {
    handleOpen: () => void;
    open: boolean;
}

function MapDialog({
  handleOpen,
  open,
}: IMapDialogProps): JSX.Element {
  const questionItems = Array(45).fill(null);

  const getRandomLetter = () => {
    const letters = ['A', 'B', 'C', 'D', 'E'];
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-2xl select-none"
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

            <div className='w-full min-h-[10rem] rounded-lg grid grid-cols-9 p-2 border border-border gap-x-2 gap-y-3 '>
              {questionItems.map((_, index) => (
                <QuestionItem key={index} index={index} answer={''} questionState={4}/>
              ))}
            </div>

          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}

export { MapDialog };
