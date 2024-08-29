import { Box, Container,Flex,FormControl,FormLabel,Input,useColorModeValue,Text, InputGroup, InputRightElement, IconButton, Button, useToast} from '@chakra-ui/react'
import React, { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { userStore } from '../store/userstore.js';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
    const toast= useToast();
    const navigate=useNavigate()
    const {createuser}=userStore()
    const [newuser,setNewUser]=useState({
        firstname:'',
        lastname:'',
        weight:0,
        height:0,
        email:'',
        password:'',

    })
    const handlesubmit=async (e)=>{
        e.preventDefault();
       const{success,message}= await createuser(newuser);
       console.log(success,message);
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
          navigate("/login")
          
    }
    }
    const [showPassword,setShowPassword]=useState(false);
  return (
    <Container w={'90%'} rounded={"md"}>
        <Box bgColor={useColorModeValue("gray.100","gray.900")} rounded={'md'} padding={6} w={'100%'}>            
            <Text as={'h3'} fontWeight={"bold"} align={"center"} fontSize={"25px"} fontFamily={"sans-serif"}>SignUp</Text>
            <FormControl>
                <FormLabel>FirstName</FormLabel>
                <Input type='text' placeholder='John'
                onChange={(e) => setNewUser({ ...newuser, firstname: e.target.value })}></Input>
            </FormControl>
            <FormControl>
                <FormLabel>LastName</FormLabel>
                <Input type='text' placeholder='Doe'
                onChange={(e) => setNewUser({ ...newuser, lastname: e.target.value })}></Input>
            </FormControl>
            <FormControl>
                <FormLabel>weight</FormLabel>
                <InputGroup>
                <Input type='number' placeholder='69'
                onChange={(e) => setNewUser({ ...newuser, weight: e.target.value })}></Input>
                <InputRightElement>kgs</InputRightElement>
                </InputGroup>
            </FormControl>

             <FormControl>
                <FormLabel>height</FormLabel>
                <InputGroup>
                <Input type='number' placeholder='169'
                onChange={(e) => setNewUser({ ...newuser, height: e.target.value })}></Input>
                <InputRightElement>cms</InputRightElement>
                </InputGroup>
            </FormControl>             
            <FormControl>
                <FormLabel>Email Address</FormLabel>
                <Input type='email' placeholder='someone@exmaple.com'
                onChange={(e) => setNewUser({ ...newuser, email: e.target.value })}></Input>
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                <Input type={ showPassword ? 'text':'password' }
                onChange={(e) => setNewUser({ ...newuser, password: e.target.value })}></Input>
                <InputRightElement> <IconButton variant={'link'}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowPassword(!showPassword)} />
                 </InputRightElement>
                </InputGroup>
                <Flex justify={'center'} padding={5}><Button onClick={handlesubmit}>Submit</Button></Flex>
            </FormControl>
        </Box>
    </Container>
  )
}

export default SignupPage