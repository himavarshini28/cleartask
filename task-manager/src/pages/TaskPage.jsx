import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from "../components/TaskList"
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import TaskFormModal from '../components/CreateTaskModal'; 

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    taskType: '',
    dueDate: '',
    assignedTo: '',
    priority: '',
  });

  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:4000/tasks').then((res) => setTasks(res.data));
  };

  const handleFilterChange = (field) => (event) => {
    setFilters((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const filteredTasks = tasks.filter((task) =>
    (!filters.taskType || task.type === filters.taskType) &&
    (!filters.dueDate || task.dueDate === filters.dueDate) &&
    (!filters.assignedTo || task.assignedTo === filters.assignedTo) &&
    (!filters.priority || task.priority === filters.priority)
  );

  return (
    <Box sx={{ width: '100%', p: 0, m: 0 }}>
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

      {/* Filters */}
      <Box
        sx={{
          bgcolor: 'white',
          p: 2,
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold" sx={{ width: '100%' }}>
          Quick Filters
        </Typography>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Task Type</InputLabel>
          <Select value={filters.taskType} label="Task Type" onChange={handleFilterChange('taskType')}>
            <MenuItem value="Bug">Bug</MenuItem>
            <MenuItem value="Feature">Feature</MenuItem>
            <MenuItem value="Improvement">Improvement</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Task List */}
    <TaskList/>
      {/* ✅ Call TaskFormModal */}
      <TaskFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => {
          fetchTasks();
          setSnackbar({ open: true, message: 'Task created successfully!' });
        }}
      />

      {/* Snackbar */}
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
