import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Exam } from '../pages';
import RedirectComponent from '../components/RedirectComponent';
import { Simulation } from '../pages/simulation/Simulation';
import { SpeedDialWithTextOutside } from '../components/Development/SpeedDial';

function AppRoutes(): JSX.Element {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#CCEAFF] px-2 md:px-8 lg:px-40">
      <SpeedDialWithTextOutside />
      <Routes>
        <Route path="/" element={<RedirectComponent />} />
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
