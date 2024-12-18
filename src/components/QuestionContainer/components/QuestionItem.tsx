import { Tooltip, Typography } from '@material-tailwind/react';
import { savedStyle, selectedStyle } from '../../../styles/question-container-styles';
import { stringResizer } from '../../../utils/StringResizer';

/**
 * Defines the prop types for the QuestionItem component.
 *
 * @typedef {Object} IQuestionItemProps
 * @property {number} index - The index of the question in the list.
 * @property {number} answer - The answer index for the question.
 * @property {number} [questionState] - Optional state of the question, affecting its styling.
 * @property {string} statement - The statement text of the question.
 */
interface IQuestionItemProps {
    index: number;
    answer: number;
    questionState?: number;
    statement: string;
}

/**
 * QuestionItem component is a React component that displays a question item with an interactive tooltip.
 * The component shows the question number and answer, and provides additional information on hover.
 *
 * @param {IQuestionItemProps} props - The props for the QuestionItem component.
 * @returns {JSX.Element} A JSX element representing an individual question item with a tooltip.
 *
 * @component
 */
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
            <div dangerouslySetInnerHTML={{ __html: stringResizer(statement, 50) }} className='text-black'/>
          </div>
        }
      >
        <div
          className={`
          ${questionState == 1 ? `${savedStyle}` : questionState == 2 ? `${selectedStyle}` : 'border-transparent bg-modal-heading'}
          flex w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 p-[0.8rem] transition ease-in-out hover:border-[#c4c4c4] `}
        >

          <Typography variant='h5' className='text-white'>{index + 1}</Typography>

          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-white p-2'>
            <p className='font-bold text-black shadow-sm'>{String.fromCharCode(64 + answer + 1)}</p>
          </div>
        </div>
      </Tooltip>
    </>
  );
}

export { QuestionItem };
