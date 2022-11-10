import React from 'react';

import { list } from './data';
import List from './List';

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Deeply nested li list</h1>
      <List title="main-list" list={list} />
    </div>
  );
}

export default App;
