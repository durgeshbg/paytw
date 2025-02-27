import axios from 'axios';
import { url } from './config';
import { getCookie } from './useCookie';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import { Token } from './types';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const token = getCookie('token');
  const navigate = useNavigate();
  const [tokenData, settokenData] = useState<Token>();
  const [balance, setbalance] = useState('0');
  const [sendUser, setSendUser] = useState({});
  const [users, setUsers] = useState<[]>([]);

  useEffect(() => {
    if (!token) navigate('/signin');

    settokenData(decodeToken(token as string));

    if (token) {
      (async () => {
        try {
          const { data } = await axios.get(url + '/account/balance', { withCredentials: true });
          setbalance(data.balance);
        } catch (e) {
          toast.error('Error fetching balance.');
          console.error(e);
        }
      })();

      (async () => {
        try {
          const { data } = await axios.get(url + '/users', { withCredentials: true });
          setUsers(data.users);
        } catch (e) {
          toast.error('Error fetching your friends.');
          console.error(e);
        }
      })();
    }
  }, [token, navigate]);

  const handleSend = (user: { email: string; name: string }) => {
    setSendUser(user);
    navigate('/transfer');
  };

  return (
    <div>
      <div className='flex justify-between items-center border px-5 py-4'>
        <h1 className='text-2xl font-bold'>Payments Dashboard</h1>
        <div className='flex gap-3 items-center'>
          <div>Hello, {tokenData ? tokenData.name : 'User'}</div>
          <div className='bg-slate-100 size-8 flex justify-center items-center rounded-full'>
            {tokenData ? tokenData.name[0] : 'User'}
          </div>
          <button
            onClick={async () => {
              await axios.post(url + '/users/signout', {}, { withCredentials: true });
              navigate('/signin');
            }}
            className='bg-black text-white rounded-md px-2 py-1'
          >
            Logout
          </button>
        </div>
      </div>
      <Outlet context={{ balance, users, handleSend, setUsers, sendUser }} />
    </div>
  );
}
