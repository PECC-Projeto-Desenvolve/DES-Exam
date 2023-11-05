import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Exam } from '../pages';

function AppRoutes(): JSX.Element {
  return (
    <div className="flex h-screen w-full flex-col gap-4 bg-light px-64 py-4">
      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/exam' element={<Exam />}/>
      </Routes>
    </div>
  );
}

export { AppRoutes };
