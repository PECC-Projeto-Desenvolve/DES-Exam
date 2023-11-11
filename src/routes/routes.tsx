import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Exam } from '../pages';

function AppRoutes(): JSX.Element {
  return (
    <div className="flex h-screen w-full flex-col bg-light lg:px-64 md:px-8 sm:px-2 px-2 items-center justify-center">
      <Routes>
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
