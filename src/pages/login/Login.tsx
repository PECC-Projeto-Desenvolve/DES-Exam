import { Button, Input } from '@material-tailwind/react';
import React from 'react';
import Logo from '../../assets/logo-pd.svg';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [cpf, setCpf] = React.useState<string>('');
  const [birthday, setBirthday] = React.useState<string>('');
  const navigate = useNavigate();

  const user = {
    cpf: '12345678900',
    birthday: '01012000',
  };

  const tokenGenerate = () => {
    const array = new Uint8Array(16); // 8 bytes = 64 bits
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  const userVerify = () => {
    if (cpf === user.cpf && birthday === user.birthday) {
      const token = tokenGenerate();
      localStorage.setItem('authToken', token);
      alert('authenticated');
      navigate('/home'); // Redireciona para a página home
    } else {
      alert('not authenticated');
    }
  };

  const handleLogin = () => {
    if (cpf) {
      localStorage.setItem('cpf', cpf);
    }

    if (birthday) {
      localStorage.setItem('birth', birthday);
    }

    userVerify();
  };

  return (
    <section className='flex h-screen w-screen flex-col items-center justify-center bg-[##0094FF]'>
      <img src={Logo} className='mb-12 w-[10rem]'/>
      <div className='flex h-fit w-fit flex-col gap-2 rounded-md bg-white p-4'>
        <Input
          crossOrigin={false}
          label='CPF'
          size='lg'
          className='w-[25rem]'
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <Input
          crossOrigin={false}
          label='Data de nascimento'
          size='lg'
          className='w-[25rem]'
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <Button
          color='green'
          className='mt-6 w-full'
          onClick={() => handleLogin()}
        >
            Acessar
        </Button>
      </div>
    </section>
  );
}

export default Login;
