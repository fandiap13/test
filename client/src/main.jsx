import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./contexts/SidebarContext.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Buat tema baru dengan disableFontFace disetel ke true
const theme = extendTheme({
  fonts: {
    body: "'Quicksand', sans-serif",
    heading: "'Quicksand', sans-serif", // Juga ubah untuk judul jika perlu
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </ChakraProvider>
  </BrowserRouter>
);
