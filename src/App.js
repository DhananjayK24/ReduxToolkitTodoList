import './App.css';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add_task, success_task, remove_task } from './features/todo/todoSlice';

function App() {

  const [todo, setTodo] = useState('');
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const userRef = useRef('');

  const {todos} = useSelector((state)=>state.Todo);

  const dispatch = useDispatch();

  const handleSubmit = (e) =>{
      e.preventDefault();
      dispatch(add_task(todo));
      userRef.current.value = '';
  };
  
  return (
    <div className="App">
      <header className="App-header">
        
      <h1 className="text-center text-white my-3 mb-4 text-5xl leading-none tracking-tight text-gray-900 md:text-4xl lg:text-6xl dark:text-white">Enter a <span className="text-blue-600 dark:text-blue-500">Todo</span></h1>
          
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="my-7 relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add a Task"
                  onChange={(e)=>{
                  setTodo(e.currentTarget.value);
                  }}
                  ref={userRef}
                  required />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
            </div>
        </form>

        <ul className='flex flex-col gap-2 items-start pl-3.5 mx-auto max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400'>

          {todos.map((t)=>(
            
            <li key={t.id} className={`flex items-center justify-between text-2xl ${t.success ? 'text-gray-500 dark:text-gray-400' : 'text-white'}`}
              onMouseEnter={() => setShowDeleteButton(t.id)}
              onMouseLeave={() => setShowDeleteButton(null)}
            >
              <svg onClick={()=>{dispatch(success_task(t));}} className={`w-5 h-5 me-2 ${t.success ? 'text-green-500 dark:text-green-400 flex-shrink-0' : 'text-gray-500 dark:text-gray-400 flex-shrink-0'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" style={{cursor: 'pointer'}}>
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
              </svg>
               {t.todo}
              <button type="button"
               style={{ display: showDeleteButton === t.id ? 'block' : 'none', cursor: 'pointer' }}
               className="delete-button ms-2 mt-1 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-small rounded-lg text-xs px-3 py-1.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"  
               onClick={() => {dispatch(remove_task(t));}}
              >Delete</button>
            </li>
          ))}

        </ul>
        
      </header>
    </div>
  );
}

export default App;
