import React from 'react';
import { MultiCheckboxes } from './MultiCheckboxes';
import { question } from '../development/questionMock';

interface IQuestionContainerProps {
    fontSize?: number;
}

function QuestionContainer({ fontSize }: IQuestionContainerProps): JSX.Element {
  return (
    <>
      <section className="w-full h-74vh bg-modal-bg rounded-lg overflow-hidden shadow-lg border border-border">
        <div className="h-20 w-full bg-modal-heading flex items-center justify-between px-8">
          <p className="text-white text-2xl">Texto do cabeçalho</p>
          Salvar
        </div>

        <div className="w-full p-8 space-y-8">
          <p className="text-white" style={{ fontSize: fontSize }}>
            {question.statement}
          </p>
          <p className="text-white"  style={{ fontSize: fontSize }}>{question.cta}</p>
        </div>

        <div className='w-full px-8 mb-8'>
          <MultiCheckboxes fontSize={fontSize}/>
        </div>
      </section>
    </>
  );
}

export { QuestionContainer};
