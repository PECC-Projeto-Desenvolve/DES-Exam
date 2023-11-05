import React from 'react';
import { Button, Typography } from '@material-tailwind/react';
import { Timer } from 'lucide-react';

interface IBannerProps {
  title: string
  content: string
  buttonLabel: string;
  hasCountdown?: boolean;
  schedule?: string;
}

function Banner({ title, content, buttonLabel, hasCountdown, schedule }: IBannerProps): JSX.Element {

  return (
    <div className="duration-400 h-full rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
      <Typography variant="h5">{title}</Typography>
      <Typography variant="paragraph" className='mt-2'>{content}</Typography>
      <div className="w-full mt-4 flex flex-row-reverse">
        {
          hasCountdown ? (
            <>
              <div className='w-full flex justify-between items-end'>
                <Typography variant='lead'>A prova irá inicar às <strong>{schedule}</strong></Typography>
                <Button disabled className='flex items-center gap-2 disabled:bg-secondary-200'>
                  <Timer size={20} />
                Aguarde</Button>
              </div>
            </>
          ) : (
            <>
              <Button >{buttonLabel}</Button>
            </>
          )
        }
      </div>
    </div>
  );
}

export { Banner };
