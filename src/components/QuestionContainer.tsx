import React from 'react';
import { MultiCheckboxes } from './MultiCheckboxes';
import { SaveButton } from './SaveButton';

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

function QuestionContainer({ question, questionIndex }: IQuestionContainerProps): JSX.Element {
  const confirmedFontFromLocalStorage = parseInt(localStorage.getItem('confirmedFont') || '14', 10);
  const [fontSize, setFontSize] = React.useState<number>(confirmedFontFromLocalStorage);

  const currentQuestion = question[questionIndex];

  if (!currentQuestion) {
    return <div>Carregando questão...</div>; // ou algum outro fallback
  }

  return (
    <>
      <section className="h-[74vh] w-full overflow-hidden rounded-lg border border-border bg-modal-bg shadow-lg">
        <div className="flex h-20 w-full select-none items-center justify-between bg-modal-heading px-8">
          <p className="select-none text-2xl text-white">
            {currentQuestion.title}

          </p>
          <SaveButton />
        </div>

        <div className="w-full space-y-8 p-8">
          <p className="select-none text-white" style={{ fontSize: fontSize }}>
            {currentQuestion.statement}
          </p>
        </div>

        <div className='mb-8 w-full px-8'>
          <MultiCheckboxes fontSize={fontSize}/>
        </div>
      </section>
    </>
  );
}

export { QuestionContainer};
