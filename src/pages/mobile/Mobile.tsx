import { Button, Typography } from '@material-tailwind/react';
import Astro from '../../assets/astronauts.svg';

function Mobile() {

  const handleClick = () => {
    window.location.replace('https://google.com');
  };

  return (
    <section className='flex h-screen w-screen flex-col items-center bg-white p-4 pt-10'>
      <img src={Astro}  className='w-[15rem] animate-blob'/>
      <div className='flex h-fit w-full flex-col items-center gap-6 text-center'>
        <Typography variant="h1">Ops..</Typography>
        <Typography variant="lead" className="text-2xl">A página que você está procurando não está acessível para celulares</Typography>

        <Button size='lg' color='green' fullWidth onClick={handleClick}>Sair</Button>
      </div>
    </section>
  );
}

export default Mobile;
