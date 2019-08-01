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

a {
  text-decoration: none;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}
`;
