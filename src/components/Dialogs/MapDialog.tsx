import React from 'react';
import {
  Dialog,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Button,
} from '@material-tailwind/react';

import {getActualDate} from '../../utils/GetDate';

import { QuestionItem } from '..';
// import { stringResizer } from '../../utils/StringResizer';

import Aos from 'aos';
import 'aos/dist/aos.css';

/**
 * Type definition for question-related properties.
 *
 * @typedef {Object} IQuestionTypes
 * @property {number} id - Unique identifier for the question.
 * @property {number} position - Alternative position on the array
 * @property {string} title - Title of the question.
 * @property {string} statement - Full statement of the question.
 * @property {string} rightAnswer - The correct answer for the question.
 * @property {number} difficulty - Difficulty rating of the question.
 * @property {string} createdAt - Timestamp of when the question was created.
 * @property {string} updatedAt - Timestamp of when the question was last updated.
 * @property {string|null} deletedAt - Timestamp of when the question was deleted, null if not deleted.
 * @property {boolean} saved - Indicates if the question state is saved.
 * @property {boolean} selected - Indicates if the question is currently selected.
 * @property {number} index - Index of the question in the list.
 */
type IQuestionTypes = {
    id: number;
    position: number;
    title: string;
    statement: string;
    rightAnswer: string;
    difficulty: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    saved: false,
    selected: false,
    index: number,
}

/**
 * Defines the prop types for the MapDialog component.
 *
 * @typedef {Object} IMapDialogProps
 * @property {function} handleOpen - Function to handle opening or closing the dialog.
 * @property {boolean} open - State variable indicating if the dialog is open.
 * @property {IQuestionTypes[]} questions - Array of question objects to be displayed.
 * @property {function} handleQuestionIndex - Function to handle setting the index of the currently selected question.
 */
interface IMapDialogProps {
    handleOpen: () => void;
    open: boolean;
    questions: IQuestionTypes[];
    handleQuestionIndex: (questionIndex: number) => void;
    timer?: number | string;
}

/**
 * MapDialog component is a React component that provides an interface for displaying and interacting with a list of questions.
 * It allows users to view a map of questions and select a specific question to focus on.
 *
 * @param {IMapDialogProps} props - The props for the MapDialog component.
 * @returns {JSX.Element} A JSX element representing the map of questions dialog.
 *
 * @component
 */
function MapDialog({
  open,
  questions,
  handleOpen,
  handleQuestionIndex,
  timer
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
        className="border border-gray-800 bg-modal-bg"
      >
        <DialogHeader className='flex rounded-t-lg'>
          <div className='w-full'>
            <Typography variant="h4" className='text-blue-gray-100'>
              Mapa de prova
            </Typography>

            <div className='flex w-full justify-between' >
              <Typography variant='lead' className='text-blue-gray-300'>
            Processo seletivo <strong className='text-blue-gray-300'>Pequi</strong> - {getActualDate()}
              </Typography>

              <>
                <span className='text-white'>
                  {timer}
                </span>
              </>

            </div>
          </div>
        </DialogHeader>

        <DialogBody className=''>
          <div className='grid grid-cols-9 gap-2'>
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
                <span key={question.id} data-aos={localStorage.getItem('mapOpened') != '1' && 'fade-down'} data-aos-delay={50 * index} className='w-full' onClick={() => handleQuestionIndex(index)}>
                  <QuestionItem
                    index={index}
                    answer={currentQuestionState && currentQuestionState.position}
                    questionState={questionState}
                    statement={question.statement}
                  />
                </span>
              );
            })}
          </div>

        </DialogBody>
        <DialogFooter>
          <Button color='red' onClick={() => handleOpen()}>Fechar</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export { MapDialog };
