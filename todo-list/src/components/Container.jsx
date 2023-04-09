import React, { useState } from 'react';
import CheckBox from './CheckBox';
import Form from './Form';
import List from './List';

function Container() {
    const [list, setList] = useState([]); // (B-1)

  // (A-2)
  const handleAddItem = addItem => {
    setList([...list, addItem]); // (B-2)
  };
  return (
    <div>
      {/*(A-1)*/}
      <Form handleAddItem={handleAddItem} />
      {/*(C)*/}
      <List list={list} setList={setList} />
    </div>
  );
}

export default Container;