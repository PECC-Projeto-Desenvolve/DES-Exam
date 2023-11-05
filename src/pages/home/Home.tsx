import { Button, Navbar, Typography } from '@material-tailwind/react';
import { LogOut } from 'lucide-react';
import React from 'react';
import { Banner } from '../../components';

function Home() {
  const lore = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint totam odio enim. Laudantium velit recusandae ex non veniam cumque, eum sint quod quasi, autem nesciunt. Et voluptatem esse necessitatibus vel.';

  return (
    <div className="flex h-screen w-full flex-col gap-4 bg-light px-64 py-4">
      <Navbar className="flex items-center justify-between">
        <Typography variant="h5" color="black">
          Desenvolve
        </Typography>

        <Button className="flex items-center gap-4">
          Sair <LogOut size={20} />
        </Button>
      </Navbar>

      <div className="mt-4 grid h-32 w-full grid-cols-2 gap-4">
        <Banner title="Aquecimento" content={lore} buttonLabel='praticar'/>
        <Banner title="Prova" content={lore} buttonLabel='iniciar prova' hasCountdown={true} schedule='12:00'/>
      </div>
    </div>
  );
}

export { Home };
