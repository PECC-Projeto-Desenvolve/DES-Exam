import React from 'react';
import { MultiCheckboxes } from './MultiCheckboxes';
import { question } from '../development/questionMock';
import { SaveButton } from './SaveButton';

interface IQuestionContainerProps {
    fontSize?: number;
}

function QuestionContainer({ fontSize }: IQuestionContainerProps): JSX.Element {
  return (
    <>
      <section className="h-74vh w-full overflow-hidden rounded-lg border border-border bg-modal-bg shadow-lg">
        <div className="flex h-20 w-full select-none items-center justify-between bg-modal-heading px-8">
          <p className="select-none text-2xl text-white">Texto do cabeçalho</p>
          <SaveButton />
        </div>

        <div className="w-full space-y-8 p-8">
          <p className="select-none text-white" style={{ fontSize: fontSize }}>
            {question.statement}
          </p>
          <p className="select-none text-white"  style={{ fontSize: fontSize }}>{question.cta}</p>
        </div>

        <div className='mb-8 w-full px-8'>
          <MultiCheckboxes fontSize={fontSize}/>
        </div>
      </section>
    </>
  );
}

export { QuestionContainer};
