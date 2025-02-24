import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <div className='bg-white border min-w-96 max-w-xl mx-auto flex flex-col gap-8 p-8 items-center rounded-md shadow-md mt-32'>
      <p className='text-2xl font-bold'>Sign In</p>
      <p className='text-gray-500'>Enter your credentials to access your account</p>
      <form className='flex flex-col justify-start space-y-8'>
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
          />
        </div>
        <button className='bg-black text-white py-3 rounded-md'>Sign In</button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link className='underline' to={'/signup'}>
          Sign Up
        </Link>
      </p>
    </div>
  );
}
