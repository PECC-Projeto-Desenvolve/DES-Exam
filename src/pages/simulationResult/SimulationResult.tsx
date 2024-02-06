// import { Typography } from '@material-tailwind/react';
import React from 'react';
import { decryptRightAnswer } from '../../utils/cryptoUtils';
import { stringResizer } from '../../utils/StringResizer';

import Aos from 'aos';
import 'aos/dist/aos.css';

interface ExamSimulation {
    id: string;
    title: string;
    startAt: string | null;
    endsAt: string | null;
    difficulty: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    __questions__: Question[];
  }

  interface Question {
    id: number;
    title: string;
    statement: string;
    rightAnswer: string;
    difficulty: number;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }

// interface QuestionInfo {
//   currentQuestionId: number;
//   id: number;
//   position: number;
//   selected: boolean;
//   saved: boolean;
// }

function SimulationResult() {
  const [examSimulation, setExamSimulation] = React.useState<ExamSimulation | null>(null);
  const [questionStates, setQuestionStates] = React.useState(null);

  React.useEffect(() => {
    const storedItem = localStorage.getItem('exam_simulation');

    const storedQuestions = localStorage.getItem('questionStates');

    // setQuestionStates(JSON.parse());

    if (storedItem) {
      const parsedItem = JSON.parse(storedItem);
      setExamSimulation(parsedItem);
    }

    if (storedQuestions) {
      const parsedQuestions = JSON.parse(storedQuestions);
      setQuestionStates(parsedQuestions);
    }
  }, []);

  React.useEffect(() => {
    Aos.init({ duration: 400 });
  }, []);

  return (
    <section className='w-full'>
      <div className='overflow-hidden rounded-md shadow-lg'>
        {examSimulation && examSimulation.__questions__.map((item, index) => (
          <>
            <div className='flex w-full items-center justify-between gap-2 border-b-2 bg-white p-4' data-aos="fade-right" data-aos-delay={100 * index}>
              <span className='flex items-center gap-4'>
                <p className='flex h-7 w-7 items-center justify-center rounded-md bg-blue-gray-50'>{index + 1}</p>
                <div key={index} dangerouslySetInnerHTML={{ __html: stringResizer(item.statement, 50)}}/>
              </span>
              <span>
                <p>{decryptRightAnswer(item.rightAnswer)}</p>
              </span>
            </div>
          </>
        ))}

        {/* {questionStates && questionStates.map((item, index) => (
          <>
            <div key={index}>
              {item.title}
            </div>
          </>
        ))} */}
      </div>
    </section>
  );
}

export default SimulationResult;
