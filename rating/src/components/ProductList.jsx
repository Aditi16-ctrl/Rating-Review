import React from 'react';
import ProductCard from './ProductCard';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  background-color: #0f172a;
  min-height: 100vh;
`;

const products = [
  { id: 1, name: 'FitPro Band X1', description: 'Advanced fitness tracker with 24/7 heart monitoring.', imagePath: '1.jpeg' },
  { id: 2, name: 'Galaxy Smartwatch 5', description: 'Stylish smartwatch with GPS, NFC, and AMOLED display.', imagePath: '11.jpeg' },
  { id: 3, name: 'Mi Band 7', description: 'Affordable fitness band with 120 sports modes.', imagePath: '3.jpeg' },
  { id: 4, name: 'Noise Pulse Go Buzz', description: 'BT calling, fast charging, and health tracking.', imagePath: '4.jpeg' },
  { id: 5, name: 'Amazfit GTS 4', description: 'Large display with Alexa and long battery life.', imagePath: '5.jpeg' },
  { id: 6, name: 'Garmin Forerunner 255', description: 'Premium GPS smartwatch for runners.', imagePath: '6.jpeg' },
  { id: 7, name: 'boAt Storm Call', description: 'Bluetooth calling smartwatch with health suite.', imagePath: '7.jpeg' },
  { id: 8, name: 'Fire-Boltt Ninja Call Pro', description: 'Full-touch smartwatch with camera control.', imagePath: '88.jpeg' },
  { id: 9, name: 'Realme Band 2', description: 'Heart rate + SpO2 monitor with 1.4" display.', imagePath: '9.jpeg' },
  { id: 10, name: 'Honor Band 6', description: 'Compact AMOLED fitness band with sleep tracking.', imagePath: '10.jpeg' },
];

const ProductList = () => (
  <Grid>
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </Grid>
);

export default ProductList;
