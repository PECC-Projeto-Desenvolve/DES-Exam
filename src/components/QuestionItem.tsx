import { Tooltip, Typography } from '@material-tailwind/react';
import { savedStyle, selectedStyle } from '../styles/question-container-styles';

interface IQuestionItemProps {
    index: number;
    answer: number;
    questionState?: number;
    statement: string;
}

function QuestionItem({ index, answer, questionState, statement }: IQuestionItemProps): JSX.Element {
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
              {statement}
            </Typography>
          </div>
        }
      >
        <div
          className={`
          ${questionState == 1 ? `${savedStyle}` : questionState == 2 ? `${selectedStyle}` : 'border-transparent bg-modal-heading'}
          flex w-fit cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 p-3 transition ease-in-out hover:border-[#c4c4c4] `}
        >

          <Typography variant='h5' className='text-white'>{index + 1}</Typography>

          <div className='flex h-9 w-9 items-center justify-center rounded-full bg-white p-2'>
            <p className='font-bold text-black shadow-sm'>{String.fromCharCode(64 + answer + 1)}</p>
          </div>
        </div>
      </Tooltip>
    </>
  );
}

export { QuestionItem };
