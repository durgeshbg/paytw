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
