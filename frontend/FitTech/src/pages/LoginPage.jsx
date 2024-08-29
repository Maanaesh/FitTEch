import { Box, Container, Flex, FormControl, FormLabel, Input, useColorModeValue, Text, InputGroup, InputRightElement, IconButton, Button,useToast, Center } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { userStore } from '../store/userstore.js';
import { useNavigate,Link } from 'react-router-dom';

function LoginPage() {
    const toast= useToast();
    const navigate = useNavigate();
    const { login,user } = userStore();
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { success, message } = await login(credentials);
        if(!success){
            toast({
                title: "ERROR",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
        }
        else{
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
              });
              navigate("/")
            
        }
        
    };

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Container w={'90%'} rounded={"md"}>
            <Box bgColor={useColorModeValue("gray.100", "gray.900")} rounded={'md'} padding={6} w={'100%'}>
                <Text as={'h3'} fontWeight={"bold"} align={"center"} fontSize={"25px"} fontFamily={"sans-serif"}>Login</Text>

                <FormControl>
                    <FormLabel>Email Address</FormLabel>
                    <Input 
                        type='email' 
                        placeholder='someone@example.com'
                        onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input 
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                        />
                        <InputRightElement>
                            <IconButton 
                                variant={'link'}
                                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                onClick={() => setShowPassword(!showPassword)} 
                            />
                        </InputRightElement>
                    </InputGroup>
                    <Flex justify={'center'} padding={5}>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </Flex>
                </FormControl>
                <Center mt={4}>
                    <Text>
                        Don't have an account?{' '}
                        <Link to="/signup" style={{fontWeight: 'bold' }}>
                            Signup
                        </Link>
                    </Text>
                </Center>
            </Box>
        </Container>
    );
}

export default LoginPage;
