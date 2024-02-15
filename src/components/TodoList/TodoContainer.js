import { useState, useRef, useCallback } from "react";
import TodoTemplate from "./TodoTemplate";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";
import TodoHead from "./TodoHead";
import TodoEdit from "./TodoEdit";

const TodoContainer = () => {
  const [todos, setTodos] = useState([
    {
      id : 1,
      text : '모닝 커피 마시기',
      checked : true,
    },
    {
      id : 2,
      text : 'Todo List 만들기',
      checked : false,
    },{
      id : 3,
      text : '운동가기',
      checked : false,
    }
  ]);

  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);


  // 고유값으로 사용될 id
	// ref를 사용하여 변수 담기
	const nextId = useRef(4);

  const onInsertToggle = useCallback(() => {
    if(selectedTodo) {
      setSelectedTodo((selectedTodo) => null);
    }
    setInsertToggle((prev) => !prev);
  },[selectedTodo]);

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo((selectedTodo) => todo);
  };

	const onInsert = useCallback(
		(text) => {
			const todo = {
				id: nextId.current,
				text,
				checked: false,
			};
			setTodos((todos) => todos.concat(todo));
      //concat(): 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열 반환
			nextId.current += 1; // nextId 1씩 더하기
		},[]);

  const onRemove = useCallback(
    (id) => {
      if(window.confirm('정말 삭제하겠습니까?')) {
        setTodos((todos) => todos.filter(todo => todo.id !== id));
      }
    },[]);

  const onUpdate = useCallback(
    (id, text) => {
      onInsertToggle();
      setTodos((todos) =>
        todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
      );
    },
    [onInsertToggle],
  );

  const onToggle = useCallback(
    (id) => {
      setTodos((todos) =>
				todos.map((todo) => todo.id === id ? { ...todo, checked: !todo.checked} : todo),
			);
    }, []);

  // const percentTodo = () => {
  //   const todosPercent = todos.filter((todo) => todo.isDone).length;
  //   return todos.length ? ((todosPercent / todos.length) * 100).toFixed(2) : 0;
  // };

  return (
          <TodoTemplate>
            <TodoHead />
            <TodoList 
              todos={todos} 
              onRemove={onRemove} 
              onToggle={onToggle}
              onChangeSelectedTodo={onChangeSelectedTodo}
              onInsertToggle={onInsertToggle}
            />
            <TodoInsert onInsert={onInsert} />
            {insertToggle && (
              <TodoEdit
                onInsert={onInsert}
                selectedTodo={selectedTodo}
                onInsertToggle={onInsertToggle}
                onUpdate={onUpdate}
                insertToggle={insertToggle}
              />
            )}
          </TodoTemplate>
  );
};

export default TodoContainer;