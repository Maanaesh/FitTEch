import React, { useEffect } from 'react';
import { Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { userStore } from '../store/userstore.js';

import AdminUserGrid from '../components/AdminUserGrid.jsx';
import AssigneeTasksPage from '../components/AsigneeTasks.jsx';

function HomePage() {
  const navigate = useNavigate();
  const { users, authToken, fetchUsers, user } = userStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }
  }, [authToken, navigate]);

  if (!user) {
    return <h1>loading</h1>; // Add a loading state while the user data is being fetched
  }

  return (
    <>
    
      {user.role === 'admin' ? (
        <AdminUserGrid users={users} />
      ) : (
        <AssigneeTasksPage></AssigneeTasksPage>
      )}

    </>
  );
}

export default HomePage;
