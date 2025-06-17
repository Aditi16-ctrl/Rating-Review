import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background-color: #0f172a;
    color: #e2e8f0;
  }
`;

export const Container = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: auto;
`;

export const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
`;

export const Input = styled.input`
  padding: 8px;
  margin: 6px 0;
  width: 100%;
`;

export const TextArea = styled.textarea`
  padding: 8px;
  width: 100%;
  margin-top: 6px;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
`;

export const Image = styled.img`
  width: 100%;
  max-width: 200px;
  border-radius: 8px;
`;
