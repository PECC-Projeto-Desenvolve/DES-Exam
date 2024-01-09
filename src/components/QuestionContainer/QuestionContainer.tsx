import React from 'react';
import { MultiCheckboxes } from './components/MultiCheckboxes';
import { useFontSize } from '../../context/FontSize';
import { QuestionContainerSkelleton } from '../';

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

/**
 * Defines the prop types for the QuestionContainer component.
 *
 * @typedef {Object} IQuestionContainerProps
 * @property {IQuestionTypes[]} question - Array of questions to be displayed.
 * @property {number} questionIndex - The index of the current question being displayed.
 */
interface IQuestionContainerProps {
    question: IQuestionTypes[];
    questionIndex: number;
    onLastQuestion: () => void;
}

/**
 * Represents the structure of an alternative item associated with a question.
 *
 * @typedef {Object} AlternativeItem
 * @property {number} id - Unique identifier for the alternative item.
 * @property {number} position - Alternative position on the array
 * @property {string} text - The text content of the alternative.
 * @property {number} questionId - Identifier of the question to which this alternative belongs.
 * @property {string} createdAt - Timestamp of when the alternative was created.
 * @property {string} updatedAt - Timestamp of when the alternative was last updated.
 * @property {string|null} deletedAt - Timestamp of when the alternative was deleted, null if not deleted.
 */
interface AlternativeItem {
    id: number;
    position: number;
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
 * @param {function} props.onLastQuestion - Function to handle the last question of exam.
 * @returns {JSX.Element} A React component rendering the current question, its statement, and alternatives.
 */
function QuestionContainer({ question, questionIndex, onLastQuestion }: IQuestionContainerProps): JSX.Element {
  const [alternatives, setAlternatives] = React.useState([]);
  // const [alternativeState, setAlternativeState] = React.useState();
  const { fontSize } = useFontSize();
  const [hasCalledLastQuestion, setHasCalledLastQuestion] = React.useState(false);

  const currentQuestion = question[questionIndex];

  React.useEffect(() => {
    if (currentQuestion && currentQuestion.id) {
      fetch(`http://localhost:3000/alternatives/${currentQuestion.id}`)
        .then(response => response.json())
        .then(data => {
          const newAlternatives = data.map((item: AlternativeItem) => ({
            id: item.id,
            position: item.position,
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

  React.useEffect(() => {
    if (questionIndex === question.length - 1 && !hasCalledLastQuestion) {
      onLastQuestion();
      setHasCalledLastQuestion(true);
    }

    if (questionIndex !== question.length - 1 && hasCalledLastQuestion) {
      setHasCalledLastQuestion(false);
    }
  }, [questionIndex, question.length, hasCalledLastQuestion, onLastQuestion]);

  /**
 * Handles state changes for checkboxes related to a question.
 * Updates the state of a specific checkbox and stores it in localStorage.
 *
 * @param {number} id - The ID of the checkbox being updated.
 * @param {number} position - Alternative position on the checkbox
 * @param {object} state - The new state of the checkbox, including selected and saved properties.
 */
  const handleCheckboxStateChange = (id, position, state) => {
    const currentQuestionId = currentQuestion.id;
    const checkboxState = { id, position: position, selected: state.selected, saved: state.saved };

    const storedState = localStorage.getItem('questionStates');
    const questionStates = storedState ? JSON.parse(storedState) : {};

    questionStates[currentQuestionId] = checkboxState;

    localStorage.setItem('questionStates', JSON.stringify(questionStates));
  };

  /**
 * Memoized MultiCheckboxes component to optimize rendering.
 * Creates an instance of the MultiCheckboxes component with specific props and memoizes it to prevent unnecessary re-renders.
 *
 * @returns {JSX.Element} Memoized instance of the MultiCheckboxes component.
 */
  const memoizedMultiCheckboxes = React.useMemo(() => (
    <MultiCheckboxes
      fontSize={`${fontSize}px`}
      alternatives={alternatives}
      onCheckboxStateChange={handleCheckboxStateChange}
      questionId={currentQuestion}
    />
  ), [fontSize, alternatives, handleCheckboxStateChange]);

  /**
 * Conditional rendering based on the availability of the current question.
 * Returns a loading message if the current question is not available.
 *
 * @returns {JSX.Element|String} The MultiCheckboxes component or a loading message.
 */
  if (!currentQuestion) {
    return (
      <QuestionContainerSkelleton />
    );
  }

  return (
    <>
      <section className="h-[74vh] w-full overflow-y-scroll rounded-lg border border-border bg-modal-bg pb-8 shadow-lg">
        <div className='flex h-full flex-col justify-between'>
          <div className='h-fit'>
            <div className="flex h-20 w-full select-none items-center justify-between bg-modal-heading px-8">
              <p className="select-none text-white" style={{ fontSize: `${fontSize}px`}}>
                {currentQuestion.title}
              </p>
              {/* <SaveButton /> */}
            </div>

            <div className="w-full space-y-8 p-8">
              <p className="select-none text-white" style={{ fontSize: `${fontSize}px` }}>
                {currentQuestion.statement}
              </p>
            </div>
          </div>
          <div className=' flex h-fit w-full flex-col justify-end px-8'>
            {memoizedMultiCheckboxes}
          </div>
        </div>
      </section>
    </>
  );
}

export { QuestionContainer};
