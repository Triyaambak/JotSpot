import React from 'react';

const Memo = (props) => {

  return (
    <div className="flex items-center justify-between w-60">
      {!props.noMemo && props.editID === props.index ?
        (
          <div className='flex items-center'>
            <input
              className='text-base mr-2'
              type='text'
              value={props.editValue}
              onChange={props.changeValue}
            />
            <svg
              className="p-0 size-5 hover:cursor-pointer hover:size-7 transition-all duration-300 ease-in-out mr-5"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              onClick={props.handleEdit}
            >
              <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="9 11 12 14 20 6" />  <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
            </svg>
          </div>
        ) :
        <>
           <div
            className='text-base mr-2'
          >{props.memo}
          </div>
        {
          !props.noMemo && (
            <div className='flex items-center'>
              <svg
                className="p-0 size-5 hover:cursor-pointer hover:size-7 transition-all duration-300 ease-in-out mr-5"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round" stroke-linejoin="round"
                onClick={props.toggleEdit}
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                <line x1="16" y1="5" x2="19" y2="8" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="p-0 size-5 hover:cursor-pointer hover:size-7 transition-all duration-300 ease-in-out"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={props.handleRemove}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )
        }
        </>
      }
    </div>
  );
};

export default Memo;
