import React from 'react';
import { Box, Grid, Text } from '@chakra-ui/react';
import UserCard from './UserCard';

function AdminUserGrid({ users }) {  
  return (
    <Box p={5}>
      {users && users.length > 0 ? ( 
        <Grid
          templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gap={6}
        >
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </Grid>
      ) : (
        <Text fontSize='xl' textAlign="center" fontWeight='bold' color='gray.500'>
          No Users found 😢
        </Text>
      )}
    </Box>
  );
}

export default AdminUserGrid;
