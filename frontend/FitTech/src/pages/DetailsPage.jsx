import React, { useState } from 'react';
import { Button, Input, FormControl, FormLabel, VStack, Box, IconButton, Text } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { userStore } from '../store/userstore.js';
import { taskStore } from '../store/taskstore.js';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
const DetailsPage = () => {
    const navigate=useNavigate();
    const{id}=useParams();
    const{createTask}=taskStore();
  const {user,users,authToken}=userStore();
  const curr_selected = users.find(user=>user._id===id);

 //console.log(authToken);
  const [exercises, setExercises] = useState([{ title: '', description: '', isCompleted: false }]);
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');

  const handleAddExercise = () => {
    setExercises([...exercises, { title: '', description: '', isCompleted: false }]);
  };

  const handleRemoveExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleChangeExercise = (index, event) => {
    const { name, value } = event.target;
    const newExercises = exercises.slice();
    newExercises[index] = { ...newExercises[index], [name]: value };
    setExercises(newExercises);
  };
  

  const handleSubmit = async (event) => {
    const formData = {
        title:workoutName,
        description:workoutDescription,
        owner:user.email,
        asignee:curr_selected.email,
        subTasks:exercises,
    };
    event.preventDefault();
    const { success, message } = await createTask(formData);
    //ADD TOAST HERE -------------------------------------------------------------------->ADD TOAST
    // Handle form submission, e.g., send to API
    //console.log('Form Data Submitted:', formData);

    // Clear the form or provide feedback
    setWorkoutName('');
    setWorkoutDescription('');
    setExercises([{ title: '', description: '', isCompleted: false }]);
  };

 useEffect(() => {
    if (authToken==='') {
        //console.log("hi")
      navigate('/login');
    }
  }, [authToken]);

  

  
  return (
    <Box p={4} maxW="md" mx="auto">
      <VStack as="form" spacing={4} align="flex-start" onSubmit={handleSubmit}>
        <FormControl id="task-title" isRequired>
          <FormLabel>Workout Name</FormLabel>
          <Input
            placeholder="Eg: Chest"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
          />
        </FormControl>
        <FormControl id="task-description">
          <FormLabel>Workout Description</FormLabel>
          <Input
            placeholder="Enter Detailed description"
            value={workoutDescription}
            onChange={(e) => setWorkoutDescription(e.target.value)}
          />
        </FormControl>

        <Box width="full">
          <FormLabel>Exercises</FormLabel>
          <Text mb={2}>Number of Exercises: {exercises.length}</Text>
          {exercises.map((exercise, index) => (
            <Box key={index} mb={4}>
              <FormControl>
                <FormLabel>Exercise Title</FormLabel>
                <Input
                  name="title"
                  value={exercise.title}
                  placeholder="Enter exercise title"
                  onChange={(event) => handleChangeExercise(index, event)}
                />
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>Exercise Description</FormLabel>
                <Input
                  name="description"
                  value={exercise.description}
                  placeholder="Enter exercise description"
                  onChange={(event) => handleChangeExercise(index, event)}
                />
              </FormControl>
              <IconButton
                mt={2}
                colorScheme="red"
                aria-label="Remove exercise"
                icon={<MinusIcon />}
                onClick={() => handleRemoveExercise(index)}
              />
            </Box>
          ))}
          <Button onClick={handleAddExercise} leftIcon={<AddIcon />} colorScheme="teal">
            Add Exercise
          </Button>
        </Box>

        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default DetailsPage;
