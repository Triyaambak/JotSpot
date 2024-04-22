import { useEffect, useState } from 'react'
import Memo from './components/Memo';
import useGetData from './hooks/useGetData';
import useGetUrl from './hooks/useGetUrl';
import useSendMessage from './hooks/useSendMessage';
import useUpdateData from './hooks/useUpdateData';

function App() {

  const { tabUrl } = useGetUrl();
  const { getData } = useGetData();
  const [input, setInput] = useState('');
  const [data, setData] = useState();
  const [editID, setEditID] = useState(-1);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(tabUrl);
        setData(result[tabUrl]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [tabUrl])
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!input.trim()) 
      return;
    useSendMessage(tabUrl, input);
    setData(prevData => {
      if (!prevData)
        return [input];
      return [...prevData, input]; 
    });
    setInput('');
  }

  const handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setInput(value);
  }

  const handleRemove = (event,index) => {
    event.preventDefault();
    data.splice(index, 1);
    useUpdateData(tabUrl, data);
    setData([...data]);
  }

  const toggleEdit = (event, index,element) => {
    event.preventDefault();
    setEditID(index);
    setEditValue(element);
  }

  const handleEdit = (event, index) => {
    event.preventDefault();
    setEditID(-1);
    data[index] = editValue;
    useUpdateData(tabUrl, data);
    setData([...data]);
  }

  const changeValue = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setEditValue(value);
  }

  return (
    <div
      className='flex flex-col items-center justify-start w-72 mb-5'
    >
      <div
        className='font-normal text-2xl tracking-widest p-4 text-white'
      >JotSpot</div>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col justify-center items-center px-6 pb-4 text-base'
      >
        <input
          className="input input-bordered mb-2 h-10 w-60"
          type="text"
          placeholder="Write a Memo"
          value={input}
          name='userInput'
          onChange={handleChange}
        />
        <button
          className="btn btn-outline btn-accent mt-2 h-10 py-2 font-light"
        >Remember
        </button>
      </form>
      <div>
        {
          data && data.length > 0 ? (
            data.map((element, index) => (
              <Memo
                key={index}
                index={index}
                memo={element}
                handleRemove={(event) => handleRemove(event, index)}
                toggleEdit={(event) => toggleEdit(event, index,element)}
                editID={editID}
                handleEdit={(event) => handleEdit(event, index)}
                editValue={editValue}
                changeValue={(event) => changeValue(event)}
              />
            ))
          ) :
          (
              <Memo
                key="default"
                noMemo={true}
                memo="No memos to remember"
              />
          )
        }
      </div>
    </div>
  )
}

export default App
