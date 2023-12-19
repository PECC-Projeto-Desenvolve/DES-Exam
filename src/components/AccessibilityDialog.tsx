import { Button, Dialog, Card, CardBody, Typography, ButtonGroup } from '@material-tailwind/react';
import { useFontSize } from '../context/FontSize';

interface IAccessibilityDialogProps {
  handleOpen: () => void;
  open: boolean;
  confirm: () => void;
}

/**
 * AccessibilityDialog component is a React component that provides a dialog interface for accessibility settings.
 * It allows users to adjust font sizes and confirm their choices.
 *
 * @param {object} props - The props for the AccessibilityDialog component.
 * @param {function} props.handleOpen - Function to handle the opening/closing of the dialog.
 * @param {boolean} props.open - State variable indicating if the dialog is open.
 * @param {function} props.confirm - Function to handle the confirmation of settings.
 * @returns {JSX.Element} A JSX element representing the accessibility settings dialog.
 *
 * @component
 */
function AccessibilityDialog({
  handleOpen,
  open,
  confirm,
}: IAccessibilityDialogProps): JSX.Element {
  const { fontSize, setFontSize } = useFontSize();

  /**
 * Increases the font size in the accessibility settings.
 * This function is invoked to increment the current font size value by 1.
 */
  const handleIncreaseFont = () => {
    setFontSize(fontSize + 1);
  };

  /**
 * Decreases the font size in the accessibility settings.
 * This function is invoked to decrement the current font size value by 1.
 */
  const handleDecreaseFont = () => {
    setFontSize(fontSize - 1);
  };

  /**
 * Resets the font size to its default value.
 * This function is invoked to reset the font size to a standard default value (e.g., 14).
 */
  const handleResetFontSize = () => {
    setFontSize(14); // Valor padrão
  };

  /**
 * Handles the confirmation action for font size settings.
 * This function is invoked when the user confirms their font size choice.
 */
  const handleFontSizeConfirm = () => {
    confirm();
  };

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
                <p className='text-white' style={{ fontSize: fontSize }}>Este é um exemplo</p>
              </div>
              <div className='flex w-full flex-row-reverse'>
                <Button onClick={handleFontSizeConfirm} color='green'>Confirmar</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}

export { AccessibilityDialog };
