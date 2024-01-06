import { Button, Typography } from '@material-tailwind/react';
import { Timer } from 'lucide-react';

/**
 * Defines the prop types for the Banner component.
 *
 * @typedef {Object} IBannerProps
 * @property {string} title - The title text to be displayed in the banner.
 * @property {string} content - The main content text of the banner.
 * @property {string} buttonLabel - Label for the button in the banner.
 * @property {boolean} [hasCountdown] - Optional flag to indicate if the banner includes a countdown timer.
 * @property {string} [schedule] - Optional schedule time, relevant if `hasCountdown` is true.
 * @property {function} [onClick] - Optional click handler for the button.
 */
interface IBannerProps {
  title: string
  content: string
  buttonLabel: string;
  hasCountdown?: boolean;
  schedule?: string;

  onClick?: () => void;
}

/**
 * Banner component is a React component that displays a customizable banner with text, an optional button, and an optional countdown timer.
 *
 * @param {IBannerProps} props - The props for the Banner component.
 * @returns {JSX.Element} A JSX element representing a styled banner with optional interactive elements.
 *
 * @component
 */
function Banner({ title, content, buttonLabel, hasCountdown, schedule, onClick }: IBannerProps): JSX.Element {

  return (
    <div className="h-full rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
      <Typography variant="h5">{title}</Typography>
      <Typography variant="paragraph" className='mt-2'>{content}</Typography>
      <div className="mt-4 flex w-full flex-row-reverse">
        {
          hasCountdown ? (
            <>
              <div className='flex w-full items-end justify-between'>
                <Typography variant='lead'>A prova irá inicar às <strong>{schedule}</strong></Typography>
                <Button disabled className='flex items-center gap-2 bg-secondary-400 disabled:bg-secondary-200'>
                  <Timer size={20} />
                Aguarde</Button>
              </div>
            </>
          ) : (
            <>
              <Button onClick={onClick} className='bg-secondary-400'>{buttonLabel}</Button>
            </>
          )
        }
      </div>
    </div>
  );
}

export { Banner };
