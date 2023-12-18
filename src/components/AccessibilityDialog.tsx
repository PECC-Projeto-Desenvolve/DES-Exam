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
    handleDecreaseFont: () => void;
    handleResetFontSize: () => void;
    handleIncreaseFont: () => void;
    fontSize: number;
    handleFontSizeConfirm: () => void;
    open: boolean;
}

function AccessibilityDialog({
  fontSize,
  handleDecreaseFont,
  handleFontSizeConfirm,
  handleIncreaseFont,
  handleOpen,
  open,
  handleResetFontSize}: IAccessibilityDialogProps): JSX.Element {
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
              <div className='items flex justify-between'>
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
                <Button onClick={handleFontSizeConfirm}>Confirmar</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}

export { AccessibilityDialog };
