import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';
import { userStore } from '../store/userstore.js';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { authToken, logout } = userStore();

  return (
    <Container maxW="container.xl" px={4}>
      <Flex 
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", md: "row" }}
        py={2}
      >
        <Text
          fontSize={{ base: 22, sm: 28 }}
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-l, #8e0683, #e71313)"
          bgClip="text"
          fontWeight="bold"
        >
          <Link to="/">FitTech</Link>
        </Text>

        <HStack spacing={4} alignItems="center">
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? "🌞" : "🌙"}
          </Button>
          {!authToken ? (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          ) : (
            <Button onClick={logout}>Logout</Button>
          )}
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
