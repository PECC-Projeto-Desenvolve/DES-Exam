import { Button, Chip } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

function Tag() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col gap-4 text-white'>
      <Button onClick={() => navigate(-1)}>
    Voltar
      </Button>
      <Chip value="1.2.0" color='green' className='flex items-center justify-center'/>19/02/2024
    </div>
  );
}

export default Tag;
