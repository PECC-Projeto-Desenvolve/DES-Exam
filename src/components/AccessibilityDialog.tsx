import React from 'react';
import {
  Button,
  Dialog,
  Card,
  CardBody,
  Typography,
  ButtonGroup, } from '@material-tailwind/react';

interface IAccessibilityDialogProps {
    handleOpen: () => void;
    open: boolean;
    confirm: () => void;
}

function AccessibilityDialog({
  handleOpen,
  open,
  confirm,
}: IAccessibilityDialogProps): JSX.Element {
  const [fontSize, setFontSize] = React.useState(16);

  const [confirmedFont, setConfirmedFont] = React.useState<number>(
    () => parseInt(localStorage.getItem('confirmedFont') || '16', 10)
  );

  React.useEffect(() => {
    const font = localStorage.getItem('confirmedFont');
    setFontSize(Number(font));
  }, []);

  const handleIncreaseFont = () => {
    setFontSize(fontSize + 1);
  };

  const handleDecreaseFont = () => {
    setFontSize(fontSize - 1);
  };

  const handleResetFontSize = () => {
    setFontSize(16);
  };

  const handleFontSizeConfirm = () => {
    setConfirmedFont(fontSize);
  };

  React.useEffect(() => {
    localStorage.setItem('confirmedFont', confirmedFont.toString());
  }, [confirmedFont]);

  return (
    <>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Acessibilidade e afins
            </Typography>

            <div className='flex flex-col gap-3 rounded-md border p-2'>
              <div className='flex justify-between'>
                <Typography variant='lead'>Tamanho da fonte</Typography>
                <ButtonGroup>
                  <Button onClick={handleDecreaseFont}>-</Button>
                  <Button onClick={handleResetFontSize}>R</Button>
                  <Button onClick={handleIncreaseFont}>+</Button>
                </ButtonGroup>
              </div>
              <div className='w-full rounded-lg border bg-modal-bg p-4'>
                <p className='text-white' style={{ fontSize: fontSize}}>Este é um exemplo</p>
              </div>
              <div className='flex w-full flex-row-reverse'>
                <Button onClick={() => {handleFontSizeConfirm(); confirm();}} color='green'>Confirmar</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}

export { AccessibilityDialog };
