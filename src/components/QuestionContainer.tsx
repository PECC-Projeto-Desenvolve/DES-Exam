import React from 'react';
import { MultiCheckboxes } from './MultiCheckboxes';
import { SaveButton } from './SaveButton';

/**
 * @typedef {Object} IQuestionTypes
 * @property {number} id - Unique identifier for the question.
 * @property {string} title - The title of the question.
 * @property {string} statement - The statement or content of the question.
 * @property {string} rightAnswer - The correct answer to the question.
 * @property {number} difficulty - The difficulty level of the question.
 * @property {string} createdAt - The creation date of the question.
 * @property {string} updatedAt - The last update date of the question.
 * @property {string | null} deletedAt - The deletion date of the question, if applicable.
 */
interface IQuestionTypes {
    id: number;
    title: string;
    statement: string;
    rightAnswer: string;
    difficulty: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

interface IQuestionContainerProps {
    question: IQuestionTypes[];
    questionIndex: number;
}

interface AlternativeItem {
    id: number;
    text: string;
    questionId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }

/**
 * A container component that displays a question and its alternatives.
 *
 * @param {object} props - The properties for the QuestionContainer component.
 * @param {IQuestionTypes[]} props.question - An array of question objects.
 * @param {number} props.questionIndex - The index of the current question to display.
 * @returns {JSX.Element} A React component rendering the current question, its statement, and alternatives.
 */
function QuestionContainer({ question, questionIndex }: IQuestionContainerProps): JSX.Element {
  const confirmedFontFromLocalStorage = parseInt(localStorage.getItem('confirmedFont') || '14', 10);
  const [alternatives, setAlternatives] = React.useState([]);

  const fontSize = confirmedFontFromLocalStorage;

  const currentQuestion = question[questionIndex];

  React.useEffect(() => {
    if (currentQuestion && currentQuestion.id) {
      fetch(`http://localhost:3000/alternatives/${currentQuestion.id}`)
        .then(response => response.json())
        .then(data => {
          const newAlternatives = data.map((item: AlternativeItem) => ({
            id: item.id,
            label: item.text,
            selected: false,
            scratched: false,
            saved: false
          }));

          setAlternatives(newAlternatives);
        })
        .catch(error => {
          console.error('Erro ao buscar alternativas:', error);
        });
    }
  }, [currentQuestion]);

  if (!currentQuestion) {
    return <div>Carregando questão...</div>;
  }

  return (
    <>
      <section className="h-[74vh] w-full overflow-hidden rounded-lg border border-border bg-modal-bg shadow-lg">
        <div className='flex h-full flex-col justify-between pb-8'>
          <div className='h-fit'>
            <div className="flex h-20 w-full select-none items-center justify-between bg-modal-heading px-8">
              <p className="select-none text-white" style={{ fontSize: fontSize + 4}}>
                {currentQuestion.title}

              </p>
              <SaveButton />
            </div>

            <div className="w-full space-y-8 p-8">
              <p className="select-none text-white" style={{ fontSize: fontSize }}>
                {currentQuestion.statement}
              </p>
            </div>
          </div>
          <div className=' flex h-fit w-full flex-col justify-end px-8'>
            <MultiCheckboxes fontSize={fontSize} alternatives={alternatives}/>
          </div>
        </div>


      </section>
    </>
  );
}

export { QuestionContainer};
