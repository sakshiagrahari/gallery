import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gallery from './components/Gallery';
import DataFetcher from './components/DataFetcher';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/dataFetcher" element={<DataFetcher />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
