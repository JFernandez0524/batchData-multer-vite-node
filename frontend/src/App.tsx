import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <main>
        <div className='skip-container md:max-w-screen-xl md:w-1/3 mx-auto'>
          <div className='px-4 text-center'>
            <form action='' className='flex flex-col gap-4 md: text center'>
              <label htmlFor='csvFile' className='bold text-xl'>
                Upload CSV File
              </label>
              <input
                type='file'
                name='csvFile'
                className='px-4 rounded border-transparent'
              />
              <button
                type='submit'
                className='px-4 py-2 capitalize bg-sky-600 rounded hover:bg-sky-800 hover:cursor-pointer '
              >
                upload
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
