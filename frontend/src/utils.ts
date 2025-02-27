import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { ZodIssue } from 'zod';
import { url } from './config';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSubmit = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent, data: object, type: 'signin' | 'signup') => {
    e.preventDefault();
    try {
      const res = await axios.post(
        url + '/users/' + type,
        {
          ...data,
        },
        { withCredentials: true }
      );
      if (res.data.message) {
        toast.success(res.data.message);
        navigate('/');
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

  return { handleSubmit };
};

export const getRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((past.getTime() - now.getTime()) / 1000);

  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const units: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 },
  ];

  for (const { unit, seconds } of units) {
    if (Math.abs(diffInSeconds) >= seconds) {
      return formatter.format(Math.round(diffInSeconds / seconds), unit);
    }
  }

  return 'just now';
};
