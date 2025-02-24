export default function Dashboard() {
  return (
    <div>
      <div className='flex justify-between items-center border px-5 py-4'>
        <h1 className='text-2xl font-bold'>Payments Dashboard</h1>
        <div className='flex gap-3 items-center'>
          <div>Hello, User</div>
          <div className='bg-slate-100 size-8 flex justify-center items-center rounded-full'>U</div>
        </div>
      </div>
      <div className='font-bold px-5 py-5'>Your Balance (INR): 50000</div>
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
        />
      </div>
      <div className='flex flex-col px-5 mt-8'>
        <div className='flex w-full justify-between'>
          <div className='flex items-center gap-2'>
            <div className='size-10 bg-slate-100 rounded-full flex items-center justify-center'>U1</div>
            <div className="font-bold" >User 1</div>
          </div>
          <button className="bg-black text-white rounded-md px-4 py-2" >Send Money</button>
        </div>
      </div>
    </div>
  );
}
