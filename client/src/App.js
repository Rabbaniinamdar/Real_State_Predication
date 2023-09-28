import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataForm from './DataForm';
import Defalute from './Defalute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/predict" element={<DataForm />} />
        <Route path="/" element={<Defalute />} />
      </Routes>
    </Router>
  );
}

export default App;
