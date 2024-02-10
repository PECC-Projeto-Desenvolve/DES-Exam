// import { Typography } from '@material-tailwind/react';
import React from 'react';
import { decryptRightAnswer } from '../../utils/cryptoUtils';
import { stringResizer } from '../../utils/StringResizer';

import Aos from 'aos';
import 'aos/dist/aos.css';
import { Typography } from '@material-tailwind/react';

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
    position?: number;
  }

interface QuestionInfo {
  currentQuestionId: number;
  id: number;
  position: number;
  selected: boolean;
  saved: boolean;
}

function SimulationResult() {
  const [examSimulation, setExamSimulation] = React.useState<ExamSimulation | null>(null);

  React.useEffect(() => {
    const storedItem = localStorage.getItem('exam_simulation');
    const storedQuestions = localStorage.getItem('questionStates');

    if (storedItem) {
      const parsedItem: ExamSimulation = JSON.parse(storedItem);

      if (storedQuestions) {
        const parsedQuestions: { [key: string]: QuestionInfo } = JSON.parse(storedQuestions);

        parsedItem.__questions__ = parsedItem.__questions__.map(question => ({
          ...question,
          position: parsedQuestions[question.id]?.position,
        }));
      }

      setExamSimulation(parsedItem);
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
            <div
              className={
                `grid w-full grid-cols-4 gap-2 border-b-2 p-4 text-white
                ${decryptRightAnswer(item.rightAnswer) === String.fromCharCode(64 + item.position + 1) ? 'bg-green-500' : 'bg-red-500'}`}
              data-aos="fade-right" data-aos-delay={100 * index}
            >
              <span className='col-span-2 flex items-center gap-4'>
                <p className='flex h-7 w-7 items-center justify-center rounded-md bg-blue-gray-50 text-black'>{index + 1}</p>
                <span>
                  <Typography>{item.title}</Typography>
                  <div key={index} dangerouslySetInnerHTML={{ __html: stringResizer(item.statement, 50)}}/>
                </span>
              </span>
              <span className='flex flex-col items-center'>
                <Typography variant="small">Alternativa correta:</Typography>
                <p>{decryptRightAnswer(item.rightAnswer)}</p>
              </span>
              <span className='flex flex-col items-center'>
                <Typography variant="small">Você marcou:</Typography>
                <p> {String.fromCharCode(64 + item.position + 1)}</p>
              </span>
            </div>
          </>
        ))}
      </div>
    </section>
  );
}

export default SimulationResult;
