import React from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Correct import

function UserCard({ user }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to detailed page when card is clicked
    navigate(`/details/${user._id}`);
  };

  return (
    <>
      {/* Card Component */}
      <Card
        onClick={handleCardClick} // Update this to use the function
        cursor="pointer"
        boxShadow="md"
        bgColor={useColorModeValue("gray.100", "gray.700")}
        _hover={{ boxShadow: "lg" }}
        transition="box-shadow 0.2s"
      >
        <CardHeader>
          <Heading size="md">{user.firstname} {user.lastname}</Heading>
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
