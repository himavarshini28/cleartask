import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

const TaskFormModal = ({ open, onClose, onSuccess }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    type: '',
    assignedTo: '',
    associatedTo: '',
    priority: '',
    dueDate: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (field) => (event) => {
    setTaskData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!taskData.title) newErrors.title = 'Task title is required';
    if (!taskData.type) newErrors.type = 'Task type is required';
    if (!taskData.priority) newErrors.priority = 'Priority is required';
    if (!taskData.assignedTo) newErrors.assignedTo = 'Assigned To is required';
    if (!taskData.associatedTo) newErrors.associatedTo = 'Associated To is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      await axios.post('http://localhost:4000/tasks', taskData);
      setSnackbar({ open: true, message: 'Task created successfully!', severity: 'success' });
      onSuccess();
      onClose();
      setTaskData({
        title: '',
        type: '',
        assignedTo: '',
        associatedTo: '',
        priority: '',
        dueDate: '',
        notes: '',
      });
    } catch {
      setSnackbar({ open: true, message: 'Error creating task', severity: 'error' });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Title *"
            fullWidth
            margin="dense"
            value={taskData.title}
            onChange={handleChange('title')}
            error={!!errors.title}
            helperText={errors.title}
          />
          <FormControl fullWidth margin="dense" error={!!errors.type}>
            <InputLabel shrink>Task Type *</InputLabel>
            <Select
              value={taskData.type}
              onChange={handleChange('type')}
              displayEmpty
              renderValue={(selected) => selected || 'Select Task Type'}
            >
              <MenuItem value="Bug">Bug</MenuItem>
              <MenuItem value="Feature">Feature</MenuItem>
              <MenuItem value="Improvement">Improvement</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" error={!!errors.priority}>
            <InputLabel shrink>Priority *</InputLabel>
            <Select
              value={taskData.priority}
              onChange={handleChange('priority')}
              displayEmpty
              renderValue={(selected) => selected || 'Select Priority'}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Associated To *"
            fullWidth
            margin="dense"
            value={taskData.associatedTo}
            onChange={handleChange('associatedTo')}
            error={!!errors.associatedTo}
            helperText={errors.associatedTo}
          />
          <TextField
            label="Assigned To *"
            fullWidth
            margin="dense"
            value={taskData.assignedTo}
            onChange={handleChange('assignedTo')}
            error={!!errors.assignedTo}
            helperText={errors.assignedTo}
          />
          <TextField
            label="Due Date"
            type="date"
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            value={taskData.dueDate}
            onChange={handleChange('dueDate')}
          />
          <TextField
            label="Notes"
            fullWidth
            margin="dense"
            multiline
            rows={3}
            value={taskData.notes}
            onChange={handleChange('notes')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ open: false, message: '' })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ open: false, message: '' })}
          sx={{ width: '250px' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TaskFormModal;