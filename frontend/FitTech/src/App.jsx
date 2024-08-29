import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";
import { ChakraProvider,useColorModeValue,Box, Container } from "@chakra-ui/react";
import LoginPage from "./pages/LoginPage";
import DetailsPage from "./pages/DetailsPage";

function App() {
  const bg = useColorModeValue("gray.100", "gray.900");
  return (
    <>
      <Navbar/>
      <Container>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
      </Container>
    </>
  );
}

export default App;
