import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Exam } from '../pages';
import RedirectComponent from '../components/RedirectComponent';

function AppRoutes(): JSX.Element {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-light px-2 sm:px-2 md:px-8 lg:px-64">
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
      </Routes>
    </div>
  );
}

export { AppRoutes };
