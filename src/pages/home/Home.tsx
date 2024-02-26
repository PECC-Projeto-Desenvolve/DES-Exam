import React from 'react';
import { Navbar, Typography,   Button,
  Dialog,
  Input,
  Card,
  CardBody,
  CardFooter,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { HelpCircle, LogOut, Settings } from 'lucide-react';
import { Banner } from '../../components';
import { useNavigate  } from 'react-router-dom';
import { AccessibilityDialog } from '../../components/Dialogs/AccessibilityDialog';

import { TutorialDialog } from '../../components/Dialogs/TutorialDialog';

function Home() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState<boolean>(false);
  const [token, setToken] = React.useState<string>('');
  const [font, setFont] = React.useState<number>(14);
  const [bold, setBold] = React.useState<boolean>(false);

  const [disqualified, setDisqualified] = React.useState(false);
  const [finished, setFinished] = React.useState(false);
  const [finishedModal, setFinishedModal] = React.useState(false);

  const simulationText = 'Esta é a área de simulados, aqui você pode responder questões do mesmo modelo que da prova do processo seletivo para se habituar com a plataforma';
  const ExamText = 'Esta é a área da prova qualificatório para estudar junto do Projeto Desenvolve.';

  const [user, setUser] = React.useState({
    name: ''
  });

  const [openSettings, setOpenSettings] = React.useState<boolean>(false);
  const [openTutorial, setOpenTutorial] = React.useState<boolean>(false);

  const [testerMode, setTesterMode] = React.useState('');

  React.useEffect(() => {
    const newFont = localStorage.getItem('confirmedFont');
    const newUser = JSON.parse(localStorage.getItem('authenticated_user') || '{}' );

    const testerMode = localStorage.getItem('tester-mode');
    setTesterMode(testerMode);

    localStorage.setItem('mapOpened', '1');

    if (localStorage.getItem('disqualified') == 'true') {
      setDisqualified(true);
    }

    if (localStorage.getItem('IsBoldActive') == 'true') {
      setBold(true);
    } else if (localStorage.getItem('IsBoldActive') == 'false') {
      setBold(false);
    }

    if (localStorage.getItem('finishedExam') === 'true') {
      setFinished(true);
      setFinishedModal(true);
    }

    if (Object.keys(newUser).length === 0) {
      navigate('/');
    } else {
      setUser(newUser);
    }

    setFont(Number(newFont));
  }, [localStorage.getItem('confirmedFont'), localStorage.getItem('authenticated_user'), localStorage.getItem('IsBoldActive')]);

  const handleDisable = () => {
    if (token == import.meta.env.VITE_ACESS_TOKEN) {
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

  const handleFinishModal = () => {
    localStorage.removeItem('exam');
    localStorage.removeItem('questionStates');
    localStorage.removeItem('exam_simulation');
    setFinishedModal(false);
  };

  return (
    <>
      <AccessibilityDialog
        handleOpen={handleOpenSettings}
        open={openSettings}
        confirm={handleOpenSettings}
      />

      <TutorialDialog
        handleOpenTutorial={handleOpenTutorial}
        openTutorial={openTutorial}
      />

      <Dialog
        open={finishedModal}
        handler={handleFinishModal}
      >
        <DialogBody className='-mt-4'>
          <span className='flex w-full flex-col items-center justify-center'>
            <Typography variant="h3" className="mt-6" color="black">Você concluiu a prova!</Typography>
            <p style={{ fontSize: 100}} className='m-0'>🎉</p>
          </span>
          <Typography variant="lead" className="mt-6 text-center" color="black">Avise ao responsável por aplicar a prova e em breve divulgaremos os resultados.</Typography>
        </DialogBody>
        <DialogFooter>
          <Button color='red' onClick={() => handleFinishModal()}>Fechar</Button>
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
            <Button disabled={handleDisable()} variant="gradient" color="green" onClick={() => {
              document.documentElement.requestFullscreen();
              navigate('/exam');
            }}
            >
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
            localStorage.removeItem('exam');
            localStorage.removeItem('questionStates');
            localStorage.removeItem('exam_simulation');
            localStorage.removeItem('finishedExam');
          }}
        >
          Sair <LogOut size={18} />
        </Button>
      </Navbar>

      <div className='mb-4 flex h-[3rem] w-full flex-col justify-center'>
        <Typography variant="lead" color="white" className='text-2xl'>Seja bem vindo(a) <b>{user.name}</b></Typography>
      </div>

      {testerMode == 'on' &&


      <Card className='mb-4 flex flex-row justify-between rounded-md p-2'>
        <Typography>Resultado</Typography>

        <Button onClick={ () => navigate('/result') } color='light-green'>Ver seu resultado</Button>
      </Card>
      }

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

          <p className={`mt-2 ${bold && 'font-bold'}`} style={{ fontSize: font }}>Complete as configurações para que você tenha uma boa experiência </p>
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
            Tutorial
          <HelpCircle size={18}/>
        </Button>
      </div>

      <div className="mt-4 grid h-32 w-full grid-cols-2 gap-4 ">
        <Banner
          title="Simulado"
          content={simulationText}
          font={font}
          bold={bold}
          buttonLabel='praticar'
          onClick={() => {
            navigate('/practice');
            document.documentElement.requestFullscreen();
          }}/>
        <Banner
          title="Prova"
          content={ExamText}
          font={font}
          bold={bold}
          buttonLabel='iniciar prova'
          hasCountdown={false}
          schedule='12:00'
          onClick={handleOpen}
          btnDisabled={disqualified || finished}
        />
      </div>
    </>
  );
}

export { Home };
