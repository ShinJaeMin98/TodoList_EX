import React from 'react';
import { FiPlusSquare } from 'react-icons/fi';
import styled from 'styled-components';

const FormBox = styled.form`
  display: flex;
  height: 50px;

  input {
    flex-grow: 1;
    border-color: #000;
    padding: 0 10px;
  }

  button {
    width: 50px;
    background: #000;
    color: #fff;
    border: 0;
    cursor: pointer;

    svg {
      font-size: 2.5rem;
    }
  }
`;

const TodoForm = ({ onSubmit, onChange, title }) => {
  return (
    <FormBox autoComplete="off" onSubmit={onSubmit}>
      <input type="text" name="title" value={title} onChange={onChange} />
      <button type="submit">
        <FiPlusSquare />
      </button>
    </FormBox>
  );
};

export default React.memo(TodoForm);