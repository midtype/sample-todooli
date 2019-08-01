import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
body {
  margin: 0;
  font-family: Avenir, Helvetica, sans-serif, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body * {
  box-sizing: border-box;
}

p, input, textarea {
  margin: 0;
  font-size: 1rem;
  line-height: 1.2rem;
}

h1,h2,h3,h4,h5 {
  margin: 0;
  padding: 0;
  font-weight: 500;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

a, button {
  font-family: Avenir, Helvetica, sans-serif, Arial, sans-serif;
  text-decoration: none;
  cursor: pointer;
  border: 0;
  outline: none;
  padding: 0;
  font-size: inherit;
  color: blue;
}

ul, li {
  list-style: none;
  padding: 0;
  margin: 0;
}
`;
