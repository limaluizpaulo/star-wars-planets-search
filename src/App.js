import React from 'react';
import Provider from './Provider';
import Table from './components/Table';
import Filter from './components/Filter';
import './App.css';

function App() {
  return (
    <section>
      <Provider>
        <Filter />
        <Table />
      </Provider>
    </section>
  );
}

export default App;
