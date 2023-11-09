import React from 'react';
import { Navbar, Typography,   Button,
  Dialog,
  Input,
  Card,
  CardBody,
  CardFooter,
} from '@material-tailwind/react';
import { LogOut } from 'lucide-react';
import { Banner } from '../../components';
import { useNavigate  } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const lore = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint totam odio enim. Laudantium velit recusandae ex non veniam cumque, eum sint quod quasi, autem nesciunt. Et voluptatem esse necessitatibus vel.';
  const [open, setOpen] = React.useState<boolean>(false);
  const [token, setToken] = React.useState<string>('');

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

  return (
    <>
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
            <Input label="Token do tutor" size="lg" value={token} onChange={event => setToken(event.target.value)} />
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

      <Navbar className="flex items-center justify-between">
        <Typography variant="h5" color="black">
          Desenvolve
        </Typography>

        <Button className="flex items-center gap-4">
          Sair <LogOut size={20} />
        </Button>
      </Navbar>

      <div className="mt-4 grid h-32 w-full grid-cols-2 gap-4">
        <Banner title="Aquecimento" content={lore} buttonLabel='praticar' onClick={() => navigate('/practice')}/>
        <Banner title="Prova" content={lore} buttonLabel='iniciar prova' hasCountdown={false} schedule='12:00' onClick={handleOpen}/>
      </div>
    </>
  );
}

export { Home };
