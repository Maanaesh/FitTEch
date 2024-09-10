import React from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom'; // Correct import

function UserCard({ user }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to detailed page when card is clicked
    navigate(`/details/${user._id}`);
  };

  return (
    <>
     
      <Card
        onClick={handleCardClick}
        cursor="pointer"
        boxShadow="md"
        bgColor={useColorModeValue("gray.100", "gray.700")}
        _hover={{ boxShadow: "lg" }}
        transition="box-shadow 0.2s"
        position="relative" 
      >
        <CardHeader>
          <Heading size="md">
            {user.firstname} {user.lastname}
          </Heading>


          <Box position="absolute" top="10px" right="10px">
            <IconButton
              colorScheme="gray"
              aria-label="Edit user"
              icon={<EditIcon />}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/edit/${user._id}`);
              }}
            />
          </Box>
        </CardHeader>
        <CardBody>
          <Text>Email: {user.email}</Text>
          <Text>Role: {user.role}</Text>
        </CardBody>
      </Card>
    </>
  );
}

export default UserCard;
