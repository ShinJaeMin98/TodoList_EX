import { useCallback, useEffect, useState } from 'react';
import './TodoEdit.scss';

const TodoEdit = ({ insertToggle, selectedTodo, onUpdate, ModalOpen }) =>  {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onUpdate(selectedTodo.id, value);
      setValue(''); //value 초기화
      //기본이벤트(새로고침) 방지
      e.preventDefault();
    },
    [onUpdate, selectedTodo.id, value],
  );

  useEffect(() => {
    if (selectedTodo) {
      setValue(selectedTodo.text);
    }
  }, [selectedTodo]);

  const openModalHandler = () => {
    // isOpen의 상태를 변경하는 메소드를 구현
    // !false -> !true -> !false
    setIsOpen(!isOpen) 
  };
  
  return (
    <div className="background">
      <form onSubmit={onSubmit} className="todoedit__insert">
        <h2>
          수정하기 
          <button className='ExitBtn' onClick={openModalHandler}>x</button>
        </h2>
        <input
          onChange={onChange}
          value={value}
          placeholder="할 일을 입력하세요"
        />
        <button type="submit">수정</button>
      </form>
    </div>
  );
}

export default TodoEdit;
