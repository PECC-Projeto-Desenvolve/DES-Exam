import { Button, Input, Typography } from '@material-tailwind/react';
import React from 'react';
import Logo from '../../assets/logo-pd-colored.svg';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import BG from '../../assets/bg.png';

import astronauts from '../../assets/astronauts.svg';

function Login() {
  const [cpf, setCpf] = React.useState<string>('');
  const [birthday, setBirthday] = React.useState<string>('');
  const [cpfAlert, setCpfAlert] = React.useState<boolean>(false);
  const [birthdayAlert, setBirthdayAlert] = React.useState<boolean>(false);
  const [disbleInput, setDisableInput] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const checkIfMobile = () => {
    const userAgent = navigator.userAgent || navigator.vendor;

    return /android|ipad|iphone|ipod/i.test(userAgent);
  };

  React.useEffect(() => {
    if (checkIfMobile()) {
      navigate('/mobile');
      return;
    }
  }, []);

  const tokenGenerate = () => {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  const formattedCPF = cpf.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    '$1.$2.$3-$4'
  );

  const userVerify = async () => {
    if (!cpf || !birthday) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_LOGIN_API}/form/cpf/${cpf}`, {
        headers: {
          'api-key': `${import.meta.env.VITE_API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error('Falha na requisição');
      }

      const userData = await response.json();
      if (userData.cpf === cpf && userData.dataNasc === birthday) {
        const token = tokenGenerate();
        localStorage.setItem('authToken', token);

        setDisableInput(true);

        const authenticated_user = {
          cpf,
          birthday,
          token,
          name: userData.nomeCompleto
        };

        localStorage.setItem('authenticated_user', JSON.stringify(authenticated_user));
        localStorage.setItem('confirmedFont', '16');

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: 'success',
          title: 'Login realizado com sucesso',
          text: 'Você será redirecionado em instantes',
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            navigate('/home');
          }
        });

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'As credenciais estão incorretas',
        });
      }
    } catch (error) {
      console.error('Erro na autenticação', error);
      // Tratar erro de requisição aqui
      Swal.fire({
        icon: 'error',
        title: 'Erro de conexão',
        text: 'Não foi possível conectar à API',
      });
    }
  };

  const handleLogin = () => {
    if (!cpf) {
      setCpfAlert(true);
    } else if ( cpf ) {
      setCpfAlert(false);
    }

    if (!birthday) {
      setBirthdayAlert(true);
    } else if ( cpf ) {
      setBirthdayAlert(false);
    }

    userVerify();
  };

  return (
    <section className='flex h-screen w-screen items-end justify-center bg-purple-300'>

      <img src={BG}/>

      <img src={astronauts} className='absolute top-0 ml-12 mt-12 animate-blob'/>

      <aside className='flex h-full w-full flex-col items-center justify-center bg-white'>
        <img src={Logo} className='mb-12 w-[10rem]'/>
        <form className='flex h-fit w-[28rem] flex-col gap-2 rounded-md bg-white p-4 transition-transform'>
          <span className='flex flex-col transition-all'>
            <Input
              crossOrigin={undefined}
              label='CPF'
              size='lg'
              className='w-full'
              error={cpfAlert}
              value={formattedCPF}
              disabled={disbleInput}
              onChange={event =>
                setCpf(event.target.value.replace(/[^0-9]/g, ''))
              }
            />

            {cpfAlert && <Typography variant='small' color={'red'} className='animate-fade-in-down'>Preencha o campo com o seu <b>CPF</b>!</Typography>}
          </span>

          <span className='mt-2 flex flex-col transition-all'>

            <Input
              crossOrigin={undefined}
              label='Data de nascimento'
              size='lg'
              className='w-full'
              type='date'
              error={birthdayAlert}
              value={birthday}
              disabled={disbleInput}
              onChange={event => setBirthday(event.target.value)}
            />
            {birthdayAlert && <Typography variant='small' color={'red'} className='animate-fade-in-down'>Preencha o campo com a sua data de <b>nascimento</b>!</Typography>}
          </span>
          <Button
            size='lg'
            className='mt-6 w-full bg-[#8C44FF]'
            disabled={disbleInput}
            onClick={() => handleLogin()}
          >
            Acessar
          </Button>
        </form>
      </aside>
    </section>
  );
}

export default Login;
