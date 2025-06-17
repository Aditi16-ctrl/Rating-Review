import React from 'react';
import ProductList from './components/ProductList';
import { GlobalStyle } from './components/Styled';

function App() {
  return (
    <>
      <GlobalStyle />
      <div style={{ padding: '1rem' }}>
        <h1>🌊 Gadget Ratings & Reviews</h1>
        <ProductList />
      </div>
    </>
  );
}


export default App;
