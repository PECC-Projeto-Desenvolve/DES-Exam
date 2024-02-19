import { Routes, Route } from 'react-router-dom';
import { Home, Exam } from '../pages';
import RedirectComponent from '../components/RedirectComponent';
import { Simulation } from '../pages/simulation/Simulation';
import Login from '../pages/login/Login';

import { useLocation } from 'react-router-dom';
import Mobile from '../pages/mobile/Mobile';
import SimulationResult from '../pages/simulationResult/SimulationResult';
import Tag from '../pages/tag/Tag';
import Result from '../pages/result/Result';


function AppRoutes(): JSX.Element {

  const handleLocation = () => {
    const location = useLocation();

    if (location.pathname === '/practice' || location.pathname === '/exam') {
      return 'bg-[#435969]';
    } else if (location.pathname === '/result') {
      return 'bg-[#eee]';
    } else {
      return 'bg-[#0094FF]';
    }
  };

  return (
    <div className={`flex h-screen w-full flex-col items-center justify-center  px-2 md:px-8 lg:px-40 ${handleLocation()} transition-colors duration-200 ease-in`}>
      {/* <SpeedDialWithTextOutside /> */}
      <Routes>
        <Route path="/mobile" element={<Mobile />}/>
        <Route path="/simulation-results" element={<SimulationResult />}/>
        <Route path="/result" element={<Result />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<RedirectComponent />} />
        <Route path="/tag" element={<Tag />} />
        <Route path='/home' element={
          <>
            <div className='h-full w-full py-5'>
              <Home />
            </div>
          </>
        }/>
        <Route path='/exam' element={
          <Exam />
        }/>
        <Route path='/practice' element={
          <Simulation />
        }/>
      </Routes>
    </div>
  );
}

export { AppRoutes };
