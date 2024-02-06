import React from 'react';
import { MultiCheckboxes } from './components/MultiCheckboxes';
import { useFontSize } from '../../context/FontSize';
import { QuestionContainerSkelleton } from '../';
import { Button, Dialog, DialogBody, DialogFooter, Typography } from '@material-tailwind/react';

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
    image: string;
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
    image: string;
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
  const [openImageModal, setOpenImageModal] = React.useState(false);
  const [bold, setBold] = React.useState(false);

  const currentQuestion = question[questionIndex];

  React.useEffect(() => {
    let isMounted = true;

    if (currentQuestion && currentQuestion.id) {
      fetch(`${import.meta.env.VITE_API_URL}/alternatives/${currentQuestion.id}`)
        .then(response => response.json())
        .then(data => {
          const newAlternatives = data.map((item: AlternativeItem) => ({
            id: item.id,
            position: item.position,
            label: item.text,
            imageSrc: item.image,
            selected: false,
            scratched: false,
            saved: false
          }));

          if (isMounted) {
            setAlternatives(newAlternatives);
          }
        })
        .catch(error => {
          console.error('Erro ao buscar alternativas:', error);
        });
    }

    return () => {
      isMounted = false;
    };
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

  React.useEffect(() => {
    if (localStorage.getItem('IsBoldActive') == 'true') {
      setBold(true);
    } else if (localStorage.getItem('IsBoldActive') == 'false') {
      setBold(false);
    }
  }, [localStorage.getItem('IsBoldActive')]);

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

  const handleOpenImageModal = () => {
    setOpenImageModal(!openImageModal);
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
      bold={bold}
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
      <Dialog
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        handler={handleOpenImageModal}
        open={openImageModal} className='' size='lg'>
        <DialogBody className='flex items-center justify-center'>
          <img src={currentQuestion.image} className='h-full min-w-[45rem] '/>
        </DialogBody>
        <DialogFooter>
          <Button
            color='red'
            onClick={() => setOpenImageModal(false)}
          >fechar</Button>
        </DialogFooter>
      </Dialog>

      <section className="h-[80vh] w-full overflow-y-scroll rounded-lg border border-border bg-modal-bg shadow-lg">
        <div className='flex h-full flex-col justify-between'>
          <div className="flex min-h-[4rem] w-full select-none items-center justify-between bg-modal-heading px-8">
            <span className='flex items-center gap-4'>
              {/* <p className="select-none text-white" style={{ fontSize: `${fontSize + 4}px`}}>
                {questionIndex + 1}
              </p> */}
              <p className={`select-none text-white ${bold && 'font-bold'}`} style={{ fontSize: `${fontSize + 2}px`}}>
                {currentQuestion.title}
              </p>
            </span>
            {/* <SaveButton /> */}
          </div>

          <div className='flex h-fit w-full flex-col items-end justify-end'>
            {currentQuestion.statement.length > 5 &&
            <div className="w-full space-y-8 p-8">
              <div className='select-none text-white' dangerouslySetInnerHTML={{ __html: currentQuestion.statement }}  style={{ fontSize: `${fontSize}px` }}/>
              {/* <p className={`select-none text-white ${bold && 'font-bold'}`} style={{ fontSize: `${fontSize}px` }}>
                {currentQuestion.statement}
              </p> */}
            </div>
            }
            {
              currentQuestion.image &&
              <div className='mb-6 flex h-fit w-full cursor-pointer flex-col items-center justify-center px-[20rem] py-6' >
                <img src={currentQuestion.image} className={`w-[100%] rounded ${currentQuestion.statement.length < 5 ? 'max-w-[23rem]' : 'max-w-[32rem]'}`} onClick={() => handleOpenImageModal()}/>
                <Typography color="white" onClick={() => handleOpenImageModal()}>Clique para ampliar imagem</Typography>
              </div>
            }
          </div>

          <div className='mt-2 flex h-fit w-full flex-col justify-end px-8 pb-8'>
            {memoizedMultiCheckboxes}
          </div>
        </div>
      </section>
    </>
  );
}

export { QuestionContainer};
