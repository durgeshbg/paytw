import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, useSubmit } from './utils';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const token = getToken();
  const navigate = useNavigate();
  const { handleSubmit } = useSubmit();
  useEffect(() => {
    if (token) navigate('/');
  }, [token, navigate]);

  return (
    <>
      <h1 className='text-center text-5xl font-bold mt-10'>PayTW</h1>
      <div className='bg-white border min-w-96 max-w-xl mx-auto flex flex-col gap-8 p-8 items-center rounded-md shadow-md mt-32'>
        <p className='text-2xl font-bold'>Sign In</p>
        <p className='text-gray-500'>
          Enter your credentials to access your account
        </p>
        <form
          onSubmit={(e) => {
            handleSubmit(e, { email, password }, 'signin');
          }}
          className='flex flex-col justify-start space-y-8'
        >
          <div className='flex flex-col gap-3 justify-start'>
            <label className='font-bold' htmlFor='email'>
              Email
            </label>
            <input
              className='border rounded-md min-w-96 w-11/12 h-10 px-5'
              type='email'
              name='email'
              id='email'
              placeholder='john@mail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-3 justify-start'>
            <label className='font-bold' htmlFor='password'>
              Password
            </label>
            <input
              className='border rounded-md min-w-96 w-11/12 h-10 px-5'
              type='password'
              name='password'
              id='password'
              placeholder='******'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex justify-between gap-5'>
            <button
              type='submit'
              className='bg-black text-white py-3 rounded-md px-6 w-full'
            >
              Sign In
            </button>
            <button
              type='button'
              onClick={() => {
                setEmail('test@mail.com');
                setPassword('testtest');
              }}
              className='bg-black text-white py-3 rounded-md px-6 w-full'
            >
              Test Credentials
            </button>
          </div>
        </form>
        <p>
          Don't have an account?{' '}
          <Link className='underline' to={'/signup'}>
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}
