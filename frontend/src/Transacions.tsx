import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { url } from './config';
import { ZodIssue } from 'zod';
import { getRelativeTime } from './utils';

export default function Transacions() {
  const [transactions, setTransactions] = useState<{ sent: []; received: [] }>({ sent: [], received: [] });
  const [tab, setTab] = useState<'sent' | 'received'>('sent');

  const toOrFrom: 'to' | 'from' = tab === 'sent' ? 'to' : 'from';

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(url + '/transactions', { withCredentials: true });
        setTransactions(res.data);
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
    })();
  }, []);

  return (
    <div className='flex flex-col px-4 gap-5'>
      <div className='flex w-full'>
        <Link to={'/'} className='underline rounded-md px-2 py-1'>
          ⮐ Back
        </Link>
      </div>
      <div className='text-xl font-bold'>Transactions</div>
      <div className='flex gap-3 justify-end'>
        <button className='border-2 border-black rounded-md px-4 py-1' onClick={() => setTab('sent')}>
          Sent
        </button>
        <button className='border-2 border-black rounded-md px-4 py-1' onClick={() => setTab('received')}>
          Recieved
        </button>
      </div>
      <div className='flex flex-col gap-6'>
        {transactions[tab].map((transaction: any, i: number) => (
          <div key={i} className='flex items-center justify-between gap-10 max-w-fit flex-wrap'>
            <div className='flex items-center gap-5'>
              <div className='size-10 bg-gray-200 flex items-center justify-center rounded-full'>O</div>
              <div>{transaction[toOrFrom].name}</div>
            </div>
            <div>
              <div
                className={
                  toOrFrom === 'to' ? 'text-red-600 before:content-["-"]' : 'text-green-600 before:content-["+"]'
                }
              >
                {transaction.amount as number} (INR)
              </div>
              <div className='text-xs text-gray-500'>
                <div>{getRelativeTime(transaction.createdAt)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
