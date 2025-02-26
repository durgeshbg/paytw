import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import SignUp from './SignUp.tsx';
import Dashboard from './Dashboard.tsx';
import SignIn from './SignIn.tsx';
import Transfer from './Transfer.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import UsersComponent from './UsersComponent.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<UsersComponent />} />
          <Route path='transfer' element={<Transfer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
