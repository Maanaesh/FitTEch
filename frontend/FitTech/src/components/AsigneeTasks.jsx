import React, { useEffect, useState } from 'react';
import { Box, Checkbox, VStack, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { userStore } from '../store/userstore.js';
import { taskStore } from '../store/taskstore.js';

const AssigneeTasksPage = () => {
  const navigate = useNavigate();
  const { user } = userStore();
  const { fetchTasksForAssignee, updateTask } = taskStore();
  const [tasks, setTasks] = useState([]);
  //console.log(tasks);
  useEffect(() => {
    if (!user || user.authToken === '') {
      navigate('/login');
    } else {
      loadTasks();
    }
  }, [user, navigate]);

  const loadTasks = async () => {
    const fetchedTasks = await fetchTasksForAssignee(user._id);
   // console.log(fetchedTasks);
    if (Array.isArray(fetchedTasks.data)) {  // Ensure fetchedTasks is an array
      setTasks(fetchedTasks.data);
    } else {
      setTasks([]);  // Default to an empty array if fetchedTasks is not valid
    }
  };

  const handleToggleCompletion = async (taskId, subtaskIndex) => {
    const updatedTasks = tasks.map(task => {
      if (task._id === taskId) {
        const updatedSubTasks = task.subTasks.map((subTask, index) => {
          if (index === subtaskIndex) {
            return { ...subTask, isCompleted: !subTask.isCompleted };
          }
          return subTask;
        });
        return { ...task, subTasks: updatedSubTasks };
      }
      return task;
    });
    setTasks(updatedTasks);
    await updateTask(taskId, updatedTasks.find(task => task._id === taskId));
  };

  return (
    <Box p={4} maxW="lg" mx="auto">
      <Heading as="h2" mb={6}>welcome {user.firstname}!</Heading>
      {tasks.length === 0 ? (
        <Text>No tasks assigned to you.</Text>
      ) : (
        tasks.map(task => (
          <Box key={task._id} mb={8} p={4} border="1px solid gray" borderRadius="md">
            <Heading as="h4" size="md">{task.title}</Heading>
            <Text>{task.description}</Text>
            <VStack mt={4} align="flex-start">
              {task.subTasks.map((subTask, index) => (
                <Checkbox
                  key={index}
                  isChecked={subTask.isCompleted}
                  onChange={() => handleToggleCompletion(task._id, index)}
                >
                  {subTask.title} {subTask.description}
                </Checkbox>
              ))}
            </VStack>
          </Box>
        ))
      )}
      <Button colorScheme="teal" onClick={loadTasks}>Refresh Tasks</Button>
    </Box>
  );
};

export default AssigneeTasksPage;
