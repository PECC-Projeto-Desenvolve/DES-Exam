import { Tooltip, Typography } from '@material-tailwind/react';
import React, { useEffect } from 'react';
import { savedStyle, scratchedStyle, selectedStyle } from '../styles/question-container-styles';

interface IQuestionItemProps {
    index: number;
    answer: string;
    questionState?: number;
}

function QuestionItem({ index, answer, questionState }: IQuestionItemProps): JSX.Element {
  const [questionStatus, setQuestionStatus] = React.useState({ saved: false, selected: false, scratched: false });

  useEffect(() => {
    if (questionState === 1) {
      setQuestionStatus({ saved: true, selected: false, scratched: false });
    } else if (questionState === 2) {
      setQuestionStatus({ saved: false, selected: true, scratched: false });
    } else if (questionState === 3) {
      setQuestionStatus({ saved: false, selected: false, scratched: true });
    }
  }, [questionState]);


  return (
    <>
      <Tooltip
        className="master-z-index border border-border bg-white px-4 py-3 shadow-2xl shadow-black/10"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
        content={
          <div className="w-80">
            <Typography color="blue-gray" className="font-bold">
               Questão: {index + 1}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-80"
            >
               Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit omnis, modi dolor nisi quis eum earum! Perferendis
            </Typography>
          </div>
        }
      >
        <div className={'bg-modal-heading border-transparent hover:border-[#c4c4c4] border-2 w-fit rounded-md p-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition ease-in-out'}>

          <Typography variant='h5' className='text-white'>{index + 1}</Typography>

          <div className='p-2 bg-white h-9 w-9 flex justify-center items-center rounded-full'>
            <p className='shadow-sm text-black font-bold'>{answer}</p>
          </div>
        </div>
      </Tooltip>
    </>
  );
}

export { QuestionItem };
