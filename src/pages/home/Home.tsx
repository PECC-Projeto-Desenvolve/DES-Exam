import React from 'react';
import { Navbar, Typography,   Button,
  Dialog,
  Input,
  Card,
  CardBody,
  CardFooter,
  DialogHeader,
  DialogBody,
  Carousel,
  DialogFooter,
  Chip,
} from '@material-tailwind/react';
import { HelpCircle, LogOut, Settings } from 'lucide-react';
import { Banner } from '../../components';
import { useNavigate  } from 'react-router-dom';
import { AccessibilityDialog } from '../../components/Dialogs/AccessibilityDialog';

import Step1 from '../../assets/tutorial/Step1.png';
import Step2 from '../../assets/tutorial/Step2.png';
import Step3 from '../../assets/tutorial/Step3.png';
import Step4 from '../../assets/tutorial/Step4.png';

function Home() {
  const navigate = useNavigate();
  const lore = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint totam odio enim. Laudantium velit recusandae ex non veniam cumque, eum sint quod quasi, autem nesciunt. Et voluptatem esse necessitatibus vel.';
  const [open, setOpen] = React.useState<boolean>(false);
  const [token, setToken] = React.useState<string>('');
  const [font, setFont] = React.useState<number>(14);

  const simulationText = 'Esta é a área de simulados, aqui você pode responder questões do mesmo modelo que da prova do processo seletivo para se habituar com a plataforma';

  const [user, setUser] = React.useState({
    name: ''
  });

  const [openSettings, setOpenSettings] = React.useState<boolean>(false);
  const [openTutorial, setOpenTutorial] = React.useState<boolean>(false);

  React.useEffect(() => {
    const newFont = localStorage.getItem('confirmedFont');
    const newUser = JSON.parse(localStorage.getItem('authenticated_user') || '{}' );

    if (Object.keys(newUser).length === 0) {
      navigate('/');
    } else {
      setUser(newUser);
    }

    setFont(Number(newFont));
  }, [localStorage.getItem('confirmedFont'), localStorage.getItem('authenticated_user')]);

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

  const handleOpenTutorial = () => {
    setOpenTutorial(!openTutorial);
  };

  return (
    <>
      <AccessibilityDialog
        handleOpen={handleOpenSettings}
        open={openSettings}
        confirm={handleOpenSettings}
      />

      <Dialog
        handler={handleOpenTutorial}
        open={openTutorial}
        size='xl'
      >
        <DialogHeader className='-mb-4'>Manual de uso</DialogHeader>
        <DialogBody className='stroke-red'>
          <Carousel
            color='red'
            className="my-carousel rounded-xl"
          >
            <div className=' flex h-fit w-full items-center justify-between gap-4 px-16 pb-12'>
              <div className='flex h-[100%] flex-col'>
                <span className='mb-2 flex gap-4'>
                  <Typography variant="h4" className="text-black">Um clique</Typography>
                  <Chip color='green' value="marcar"/>
                </span>
                <Typography variant="lead" className="text-black">Com apenas um clique você marca a alternativa que você acreditar ser a verdadeira da questão</Typography>
              </div>
              <img
                src={Step1}
                alt="image 1"
                className="w-[30rem]"
              />
            </div>

            <div className=' flex h-fit w-full items-center justify-between gap-4 px-16 pb-12'>
              <div className='flex h-[100%] flex-col'>
                <span className='mb-2 flex gap-4'>
                  <Typography variant="h4" className="text-black">Dois clique  </Typography>
                  <Chip color='orange' value="salvar"/>
                </span>
                <Typography variant="lead" className="text-black">Com dois cliques você marca a questão como <b>salva</b> caso esta com dúvida nela, podendo assim voltar nela ao final da prova</Typography>
              </div>
              <img
                src={Step2}
                alt="image 1"
                className="w-[30rem]"
              />
            </div>

            <div className=' flex h-fit w-full items-center justify-between gap-4 px-16 pb-12'>
              <div className='flex h-[100%] flex-col'>
                <span className='mb-2 flex gap-4'>
                  <Typography variant="h4" className="text-black">Clique no meio</Typography>
                  <Chip className='bg-gray-800/60 line-through' value="rasurar"/>
                </span>
                <Typography variant="lead" className="text-black">Você pode também resolver por eliminação, com um clique no scroll do mouse, você pode <b>rasurar</b> a questão</Typography>
              </div>
              <img
                src={Step3}
                alt="image 1"
                className="w-[30rem]"
              />
            </div>
            <div className=' flex h-fit w-full items-center justify-between gap-4 px-16 pb-12'>
              <div className='flex h-[100%] flex-col'>
                <span className='mb-2 flex gap-4'>
                  <Typography variant="h4" className="text-black">Clique com o botão direito</Typography>
                  <Chip color='blue' value="menu"/>
                </span>
                <Typography variant="lead" className="text-black">Ao clicar com o <b>botão direito</b> do mouse, um menu com as opções listadas é aberto</Typography>
              </div>
              <img
                src={Step4}
                alt="image 1"
                className="w-[30rem]"
              />
            </div>

          </Carousel>
        </DialogBody>
        <DialogFooter>
          <Button color='red' onClick={() => setOpenTutorial(false)}>Fechar</Button>
        </DialogFooter>
      </Dialog>


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

        <Button
          className="flex items-center gap-4"
          color='red'
          onClick={() => {
            navigate('/login');
            localStorage.removeItem('authenticated_user');
            localStorage.removeItem('authToken');
          }}
        >
          Sair <LogOut size={18} />
        </Button>
      </Navbar>

      <div className='mb-4 flex h-[3rem] w-full flex-col justify-center'>
        <Typography variant="lead" color="white" className='text-2xl'>Seja bem vindo(a) <b>{user.name}</b></Typography>
      </div>

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
            <Button className='flex items-center justify-center gap-2' onClick={handleOpenSettings} color='blue-gray'>
                Configurações
              <Settings />
            </Button>
          </div>
        </div>
      </div>

      <div className='mt-4 flex w-full items-center justify-between rounded-md bg-white p-4'>
        <Typography variant="h5" color="black">
            Acesse o tutorial
        </Typography>

        <Button className='flex items-center gap-2' onClick={handleOpenTutorial} color='green'>
          <HelpCircle size={18}/>
            Tutorial
        </Button>
      </div>

      <div className="mt-4 grid h-32 w-full grid-cols-2 gap-4 ">
        <Banner
          title="Simulado"
          content={simulationText}
          buttonLabel='praticar'
          onClick={() => {
            navigate('/practice');
            document.documentElement.requestFullscreen();
          }}/>
        <Banner title="Prova" content={lore} buttonLabel='iniciar prova' hasCountdown={false} schedule='12:00' onClick={handleOpen}/>
      </div>
    </>
  );
}

export { Home };
