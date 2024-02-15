import React from 'react';
import './TodoHead.scss';

const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });


const TodoHead = () => {

    return (
        <div className='TodoHeadBlock'>
            <div className='date'>
              {dateString} {dayName}
              <hr/>
              <div className='tasks-left'>
                남은 할 일 : 2개
              </div>
            </div>
            
        </div>
    );
}
  
  export default TodoHead;