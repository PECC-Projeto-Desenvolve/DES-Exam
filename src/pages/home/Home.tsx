import React from 'react';
import { Navbar, Typography,   Button,
  Dialog,
  Input,
  Card,
  CardBody,
  CardFooter,
} from '@material-tailwind/react';
import { LogOut, Settings } from 'lucide-react';
import { Banner } from '../../components';
import { useNavigate  } from 'react-router-dom';
import { AccessibilityDialog } from '../../components/Dialogs/AccessibilityDialog';

function Home() {
  const navigate = useNavigate();
  const lore = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint totam odio enim. Laudantium velit recusandae ex non veniam cumque, eum sint quod quasi, autem nesciunt. Et voluptatem esse necessitatibus vel.';
  const [open, setOpen] = React.useState<boolean>(false);
  const [token, setToken] = React.useState<string>('');
  const [font, setFont] = React.useState(14);

  const [openSettings, setOpenSettings] = React.useState<boolean>(false);

  React.useEffect(() => {
    const newFont = localStorage.getItem('confirmedFont');
    setFont(Number(newFont));
  }, [localStorage.getItem('confirmedFont')]);

  const handleDisable = () => {
    if (token.length >= 5) {
      return false;
    }
    return true;
  };

  const handleOpen = () => {
    setOpen(!open);
    setToken('');
  };


  const handleOpenSettings = () => {
    setOpenSettings(!openSettings);
  };

  return (
    <>
      <AccessibilityDialog
        handleOpen={handleOpenSettings}
        open={openSettings}
        confirm={handleOpenSettings}
      />


      <Dialog open={open} handler={handleOpen} className='bg-transparent shadow-none'>
        <Card className='mx-auto w-full max-w-[40rem]'>
          <CardBody className="flex flex-col gap-4">
            <Typography variant='h4' color="blue-gray">Confirme</Typography>

            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
                Confirme o token do seu tutor para iniciar a prova
            </Typography>
            <Input crossOrigin={''} label="Token do tutor" size="lg" value={token} onChange={event => setToken(event.target.value)} />
          </CardBody>
          <CardFooter className='flex justify-between'>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancelar</span>
            </Button>
            <Button disabled={handleDisable()} variant="gradient" color="green" onClick={() => navigate('/exam')}>
              <span>Confirmar</span>
            </Button>
          </CardFooter>
        </Card>

      </Dialog>

      <Navbar fullWidth className='mx-auto mb-5 flex items-center justify-between rounded-md p-4'>
        <Typography variant="h5" color="black">
          Desenvolve
        </Typography>

        <Button className="flex items-center gap-4">
          Sair <LogOut size={20} />
        </Button>
      </Navbar>

      <div className='h-fit w-full rounded-md border bg-white shadow-md'>

        <div className='flex w-full items-end justify-end '>
          <span className="relative -mr-1 -mt-2 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-gray-200 opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-blue-gray-500"></span>
          </span>
        </div>

        <div className='w-full p-4'>
          <Typography variant="h5" color="black">
          Configurações
          </Typography>

          <p className='mt-2' style={{ fontSize: font }}>Complete as configurações para que você tenha uma boa experiência </p>
          <div className='mt-4 flex w-full items-end justify-end'>
            <Button className='flex items-center justify-center gap-2' onClick={handleOpenSettings}>
                Configurações
              <Settings />
            </Button>
          </div>
        </div>

      </div>

      <div className="mt-4 grid h-32 w-full grid-cols-2 gap-4 ">
        <Banner title="Simulado" content={lore} buttonLabel='praticar' onClick={() => navigate('/practice')}/>
        <Banner title="Prova" content={lore} buttonLabel='iniciar prova' hasCountdown={false} schedule='12:00' onClick={handleOpen}/>
      </div>
    </>
  );
}

export { Home };
