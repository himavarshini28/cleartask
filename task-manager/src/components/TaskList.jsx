import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Checkbox, Dialog, DialogTitle, DialogActions, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const TaskListGrid = () => {
  const [tasks, setTasks] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:4000/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCheckboxClick = (task) => {
    setSelectedTask(task);
    setOpenConfirm(true);
  };

  const handleConfirmComplete = async () => {
    try {
      await axios.patch(`http://localhost:4000/tasks/${selectedTask.id}`, { completed: true });
      setSnackbar({ open: true, message: 'Task marked as completed!', severity: 'success' });
      setOpenConfirm(false);
      fetchTasks();
    } catch {
      setSnackbar({ open: true, message: 'Failed to update task', severity: 'error' });
    }
  };

  const columns = [
    {
      field: 'completed',
      headerName: 'Complete',
      width: 100,
      renderCell: (params) => (
        <Checkbox
          checked={params.row.completed || false}
          onChange={() => handleCheckboxClick(params.row)}
          disabled={params.row.completed}
        />
      ),
    },
    { field: 'title', headerName: 'Task Title', width: 200 },
    { field: 'priority', headerName: 'Priority', width: 130 },
    { field: 'dueDate', headerName: 'Due Date', width: 150 },
    { field: 'associatedTo', headerName: 'Associated Record', width: 180 },
    { field: 'assignedTo', headerName: 'Assigned To', width: 180 },
  ];

  return (
    <Box height={500} width="100%" p={2}>
      <DataGrid
        rows={tasks}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        pagination
        getRowId={(row) => row.id}
      />

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Mark this task as complete?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="secondary">Cancel</Button>
          <Button onClick={handleConfirmComplete} color="primary" variant="contained">Confirm</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ open: false, message: '' })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ open: false, message: '' })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskListGrid;
