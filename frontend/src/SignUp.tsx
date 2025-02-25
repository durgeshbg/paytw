import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from './getCookie';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { url } from './config';
import { toast } from 'react-toastify';
import { ZodIssue } from 'zod';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const token = getCookie('token');
  const navigate = useNavigate();
  useEffect(() => {
    if (token) navigate('/dashboard');
  }, [token, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        url + '/users/signup',
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      if (res.data.message) {
        toast.success(res.data.message);
        navigate('/dashboard');
      }
    } catch (e) {
      const { response } = e as AxiosError;
      const { data } = response as AxiosResponse;

      if (data.error) {
        data.error.issues.map((issue: ZodIssue) => {
          toast.error(`${issue.path[0]} - ${issue.message}`);
        });
      } else {
        toast.error(data.message);
      }
    }
  };

  return (
    <div className='bg-white border min-w-96 max-w-xl mx-auto flex flex-col gap-8 p-8 items-center rounded-md shadow-md mt-32'>
      <p className='text-2xl font-bold'>Sign Up</p>
      <p className='text-gray-500'>Enter your information to create an account</p>
      <form onSubmit={handleSubmit} className='flex flex-col justify-start space-y-8'>
        <div className='flex flex-col gap-3 justify-start'>
          <label className='font-bold' htmlFor='name'>
            Name
          </label>
          <input
            className='border rounded-md min-w-96 w-11/12 h-10 px-5'
            type='text'
            name='name'
            id='name'
            placeholder='John'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <button className='bg-black text-white py-3 rounded-md'>Sign Up!</button>
      </form>
      <p>
        Already have an account?{' '}
        <Link className='underline' to={'/signin'}>
          Sign In
        </Link>
      </p>
    </div>
  );
}
