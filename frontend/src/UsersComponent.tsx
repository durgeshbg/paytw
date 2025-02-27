import axios from 'axios';
import { useEffect, useState } from 'react';
import { url } from './config';
import { Link, useOutletContext } from 'react-router-dom';

export default function UsersComponent() {
  const { balance, users, handleSend, setUsers } = useOutletContext<{
    balance: string;
    users: [];
    handleSend: (user: { email: string; name: string }) => void;
    setUsers: React.Dispatch<React.SetStateAction<[]>>;
  }>();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(url + '/users?filter=' + query, { signal, withCredentials: true });
        if (!signal.aborted) {
          setUsers(res.data.users);
        }
      } catch (e) {
        if (!signal.aborted) {
          console.error(e);
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      abortController.abort();
    };
  }, [query, setUsers]);

  return (
    <>
      <div className='flex w-full justify-between'>
        <div className='font-bold px-5 py-5'>Your Balance (INR): {balance}</div>
        <Link
          to={'/transactions'}
          className='mx-5 my-3 px-3 flex items-center justify-center border border-black rounded-md font-bold'
        >
          Transactions
        </Link>
      </div>
      <div className='flex flex-col gap-3 justify-start px-5'>
        <label className='font-bold' htmlFor='query'>
          Users
        </label>
        <input
          className='border rounded-md min-w-96 w-11/12 h-10 px-5 outline-gray-500'
          type='text'
          name='query'
          id='query'
          placeholder='Search Users...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className='flex flex-col px-5 mt-8 space-y-5'>
        {users.length > 0 ? (
          users.map((user: { name: string; email: string }) => (
            <div key={user.email} className='flex w-full justify-between'>
              <div className='flex items-center gap-4'>
                <div className='size-10 bg-slate-100 rounded-full flex items-center justify-center'>{user.name[0]}</div>
                <div className='font-bold'>{user.name}</div>
              </div>
              <button
                className='bg-black text-white rounded-md px-4 py-2'
                onClick={() => {
                  handleSend(user);
                }}
              >
                Send Money
              </button>
            </div>
          ))
        ) : (
          <div className='text-center text-2xl font-bold'>No friends found! 🫣</div>
        )}
      </div>
    </>
  );
}
