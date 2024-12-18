import { Typography } from '@material-tailwind/react';

function QuestionContainerSkelleton() {
  return (
    <div className='flex h-[74vh] w-full flex-col justify-between rounded-lg border border-border bg-modal-bg'>

      <div className='flex h-[3rem] w-full flex-col justify-center rounded-sm bg-modal-heading px-8' >
        <Typography className="animate-pulse text-white" variant="h5">Carregando ...</Typography>
      </div>

      <div className='mx-8 h-[30%]'>
        <Typography className="animate-pulse text-white" variant="paragraph">Et esse aliquip cupidatat dolor ipsum dolore occaecat esse deserunt enim. Cupidatat labore est exercitation consequat magna velit pariatur nostrud irure sunt. Quis duis magna duis do. Labore commodo tempor cillum ea enim duis velit sunt et fugiat duis esse. Aute magna occaecat mollit laborum quis cupidatat irure non cupidatat dolor eiusmod. Consectetur enim dolor culpa cillum in sint Lorem. Labore adipisicing consectetur enim irure nostrud excepteur et dolor sunt eiusmod qui enim tempor nostrud ad. Lorem incididunt officia elit irure labore officia do laborum id dolore tempor reprehenderit. Est exercitation amet aliquip sit. Esse nulla eu ex amet dolore.</Typography>
      </div>

      <div className=' mb-4 flex h-fit w-full flex-col justify-end gap-2 px-8'>
        <div className='flex h-[3rem] w-full animate-pulse flex-col justify-center rounded-sm bg-modal-heading px-2'>
          <Typography className="font-bold text-white">Et esse aliquip cupidatat dolor ipsum dolore</Typography>
        </div>
        <div className='flex h-[3rem] w-full animate-pulse flex-col justify-center rounded-sm bg-modal-heading px-2'>
          <Typography className="font-bold text-white">Et esse aliquip cupidatat dolor ipsum dolore</Typography>
        </div>
        <div className='flex h-[3rem] w-full animate-pulse flex-col justify-center rounded-sm bg-modal-heading px-2'>
          <Typography className="font-bold text-white">Et esse aliquip cupidatat dolor ipsum dolore</Typography>
        </div>
        <div className='flex h-[3rem] w-full animate-pulse flex-col justify-center rounded-sm bg-modal-heading px-2'>
          <Typography className="font-bold text-white">Et esse aliquip cupidatat dolor ipsum dolore</Typography>
        </div>
        <div className='flex h-[3rem] w-full animate-pulse flex-col justify-center rounded-sm bg-modal-heading px-2'>
          <Typography className="font-bold text-white">Et esse aliquip cupidatat dolor ipsum dolore</Typography>
        </div>

      </div>
    </div>
  );
}

export default QuestionContainerSkelleton;
