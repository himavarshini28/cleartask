import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskListGrid from '../components/TaskList';
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import TaskFormModal from '../components/CreateTaskModal';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const fetchTasks = () => {
    axios.get('http://localhost:4000/tasks').then((res) => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'white',
          height: '60px',
          px: 3,
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Tasks
        </Typography>
        <Button variant="contained" color="primary" size="small" onClick={() => setOpenModal(true)}>
          Create Task
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, bgcolor: '#fafafa' }}>
        <TaskListGrid tasks={tasks} fetchTasks={fetchTasks} />
      </Box>

      <TaskFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => {
          fetchTasks();
          setSnackbar({ open: true, message: 'Task created successfully!' });
        }}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: '' })}
      >
        <Alert severity="success" onClose={() => setSnackbar({ open: false, message: '' })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskPage;
