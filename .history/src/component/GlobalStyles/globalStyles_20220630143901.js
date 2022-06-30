import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

body {

background: "black";

color: ${({ theme }) => theme.text};

font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;

transition: all 0.50s linear;

}
`;
