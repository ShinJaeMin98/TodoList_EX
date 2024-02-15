import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { produce } from 'immer';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const ContentBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  background: #f8f8f8;
  padding: 25px;

  * {
    box-sizing: border-box;
  }
`;

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      setTodos(
        produce((draft) => {
          draft.push({ id: draft.length + 1, title });
        }),
      );

      setTitle('');
    },
    [title],
  );

  const onChange = useCallback(
    (e) => setTitle(() => e.target.value.trim()),
    [],
  );

  const onDoubleClick = useCallback(
    (id) =>
      setTodos(
        produce((draft) => {
          draft.splice(
            draft.findIndex((todo) => todo.id === id),
            1,
          );
        }),
      ),
    [],
  );

  return (
    <ContentBox>
      <TodoForm onSubmit={onSubmit} onChange={onChange} title={title} />
      <TodoList todos={todos} onDoubleClick={onDoubleClick} />
    </ContentBox>
  );
};

export default React.memo(TodoContainer);