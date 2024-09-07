import React, { useEffect, useState } from 'react';
import { taskStore } from '../store/taskstore.js';
import { useParams } from 'react-router-dom'; // Use 'react-router-dom' to ensure proper imports
import { Box, Checkbox, VStack, Heading, Text, Button } from '@chakra-ui/react';

function AssignedAdmin() {
  const { id } = useParams(); // Get the 'id' from the route parameters
  const [tasks, setTasks] = useState([]); // Initialize tasks state as an empty array
  const { fetchTasksForAssignee,updateTask } = taskStore(); // Get the fetch function from the store

  // Async function to fetch tasks and set them in state
  const getTasks = async () => {
    const fetchedTasks = await fetchTasksForAssignee(id); // Fetch the tasks asynchronously
    setTasks(fetchedTasks.data); // Set the tasks in state
  };

  // useEffect hook to call getTasks when the component mounts or when 'id' changes
  useEffect(() => {
    if (id) { // Ensure that 'id' exists before trying to fetch
      getTasks();
    }
  }, [id]); // Dependency array ensures the effect runs when 'id' changes

  console.log(tasks); // Log the tasks to check the fetched data
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
    <div>
      <Box p={4} maxW="lg" mx="auto">
      {tasks.length === 0 ? (
        <Text>No tasks assigned</Text>
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
      <Button colorScheme="teal" onClick={getTasks}>Refresh Tasks</Button>
    </Box>
    </div>
  );
}

export default AssignedAdmin;
