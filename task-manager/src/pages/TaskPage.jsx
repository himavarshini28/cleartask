import { Box, Typography, Button } from '@mui/material';

const TaskPage = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'white',
          p: 3,
          borderRadius: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          mb: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Tasks
        </Typography>
        <Button variant="contained" color="primary">
          Create Task
        </Button>
      </Box>

      
    </Box>
  );
};

export default TaskPage;
