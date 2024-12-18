import { Button, Carousel, Chip, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react';

import Step1 from '../../assets/tutorial/Step1.png';
import Step2 from '../../assets/tutorial/Step2.png';
import Step3 from '../../assets/tutorial/Step3.png';
import Step4 from '../../assets/tutorial/Step4.png';

interface ITutorialDialogProps {
    handleOpenTutorial: () => void;
    openTutorial: boolean;
}

function TutorialDialog({handleOpenTutorial, openTutorial}: ITutorialDialogProps) {
  return (
    <Dialog
      handler={() => handleOpenTutorial}
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
        <Button color='red' onClick={handleOpenTutorial}>Fechar</Button>
      </DialogFooter>
    </Dialog>
  );
}

export  {TutorialDialog};
