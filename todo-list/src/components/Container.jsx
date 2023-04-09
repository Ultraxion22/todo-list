import React, { useState } from 'react';
import CheckBox from './CheckBox';
import Form from './Form';
import List from './List';

function Container() {
    const [list, setList] = useState([]);
  const handleAddItem = addItem => {
    setList([...list, addItem]);
  };
  return (
    <div>
      <Form handleAddItem={handleAddItem} />
      <List list={list} setList={setList} />
    </div>
  );
}

export default Container;