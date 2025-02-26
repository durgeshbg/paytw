import { useNavigate, useOutletContext } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { getCookie } from './useCookie';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { url } from './config';
import { toast } from 'react-toastify';
import { ZodIssue } from 'zod';

export default function Transfer() {
  const token = getCookie('token');
  const navigate = useNavigate();
  const [amount, setAmount] = useState('0');
  const { sendUser } = useOutletContext<{ sendUser: { name: string; email: string } }>();

  useEffect(() => {
    if (!token) navigate('/signin');
    if (!sendUser.name) {
      navigate('/dashboard');
    }
  }, [token, navigate, sendUser.name]);

  const sendAmount = async (e: FormEvent) => {
    e.preventDefault();
    if (parseInt(amount) > 0 && sendUser.email) {
      try {
        const res = await axios.post(
          url + '/account/transfer',
          {
            to: sendUser.email,
            amount: parseInt(amount),
          },
          { withCredentials: true }
        );
        if (res.data) {
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
    }
  };

  return (
    <div className='bg-white border min-w-96 max-w-xl mx-auto flex flex-col gap-8 p-8 items-center rounded-md shadow-md mt-32'>
      <p className='text-2xl font-bold'>Transfer Money</p>
      <form onSubmit={sendAmount} className='flex flex-col justify-start space-y-4'>
        <div className='flex items-center gap-2'>
          <div className='text-xl size-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold'>
            {sendUser.name && sendUser.name[0]}
          </div>
          <p className='text-xl'>{sendUser.name && sendUser.name}</p>
        </div>
        <div className='flex flex-col gap-3 justify-start'>
          <label className='font-bold' htmlFor='amount'>
            Amount (in Rs)
          </label>
          <input
            className='border rounded-md min-w-96 w-11/12 h-10 px-5 outline-green-600'
            type='text'
            name='amount'
            id='amount'
            placeholder='Enter amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className='bg-green-500 text-white py-3 rounded-md'>Initiate Transfer</button>
      </form>
    </div>
  );
}
