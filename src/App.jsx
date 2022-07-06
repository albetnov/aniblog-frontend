import { useState, React } from "react";
import axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";
import Main from "./Components/Main";

function App() {
  return (
    <ChakraProvider>
      <Main />
    </ChakraProvider>
  );
}

export default App;
