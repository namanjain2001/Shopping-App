import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App