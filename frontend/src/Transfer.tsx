import { useNavigate } from 'react-router-dom';
import { getCookie } from './getCookie';
import { useEffect } from 'react';

export default function Transfer() {
  const token = getCookie('token');
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate('/signin');
  }, [token, navigate]);

  return (
    <div className='bg-white border min-w-96 max-w-xl mx-auto flex flex-col gap-8 p-8 items-center rounded-md shadow-md mt-32'>
      <p className='text-2xl font-bold'>Transfer Money</p>
      <form className='flex flex-col justify-start space-y-4'>
        <div className='flex items-center gap-2'>
          <div className='text-xl size-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold'>
            A
          </div>
          <p className='text-xl'>Friend's Name</p>
        </div>
        <div className='flex flex-col gap-3 justify-start'>
          <label className='font-bold' htmlFor='amount'>
            Amount (in Rs)
          </label>
          <input
            className='border rounded-md min-w-96 w-11/12 h-10 px-5'
            type='text'
            name='amount'
            id='amount'
            placeholder='Enter amount'
          />
        </div>
        <button className='bg-green-500 text-white py-3 rounded-md'>Initiate Transfer</button>
      </form>
    </div>
  );
}
