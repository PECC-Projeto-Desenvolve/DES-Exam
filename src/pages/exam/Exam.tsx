import React from 'react';
import { QuestionContainer } from '../../components';
import { Button, ButtonGroup } from '@material-tailwind/react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

function Exam(): JSX.Element {
  const [fontSize, setFontSize] = React.useState<number>(14);

  const handleIncreaseFont = () => {
    setFontSize(fontSize + 1);
  };

  const handleResetFont = () => {
    setFontSize(14);
  };

  const handleDecreaseFont = () => {
    setFontSize(fontSize - 1);
  };


  return (
    <div className='w-full flex gap-4'>
      <QuestionContainer fontSize={fontSize}/>
      <div className='w-64 h-32 bg-white border rounded-lg shadow-lg'>
        <ButtonGroup>
          <Button onClick={handleDecreaseFont}>
            <Minus />
          </Button>
          <Button onClick={handleResetFont}>
            <RotateCcw />
          </Button>
          <Button onClick={handleIncreaseFont}>
            <Plus />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export { Exam };
