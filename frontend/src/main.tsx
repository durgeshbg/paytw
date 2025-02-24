import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import SignUp from './SignUp.tsx';
import Dashboard from './Dashboard.tsx';
import SignIn from './SignIn.tsx';
import Transfer from './Transfer.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SignUp />} />
        <Route path='/signup' element={<SignIn />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/transfer' element={<Transfer />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
