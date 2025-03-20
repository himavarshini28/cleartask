import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TaskIcon from '@mui/icons-material/Task';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { useSidebar } from '../context/sidebarContext';

const Sidebar = () => {
  const { selectedPage, setSelectedPage } = useSidebar();

  const items = [
    { label: 'Dashboard', icon: <DashboardIcon /> },
    { label: 'Reports', icon: <AssessmentIcon /> },
    { label: 'Tasks', icon: <TaskIcon /> },
  ];

  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        bgcolor: '#fff',
        borderRight: '1px solid #e0e0e0',
        flexShrink: 0,
      }}
    >
        <div className="flex items-center px-2">
        <WorkspacesIcon sx={{ mr: 1, color: 'primary.main' }} />
        <div className="font-bold text-2xl py-3 text-blue-900">Task Manager</div>
        </div>
      <List>
        {items.map((item) => (
          <ListItem
            button
            key={item.label}
            onClick={() => setSelectedPage(item.label)}
            sx={{
              bgcolor: selectedPage === item.label ? 'primary.main' : 'transparent',
              '&:hover': { bgcolor: selectedPage === item.label ? 'primary.dark' : '#f0f0f0' },
            }}
          >
            <ListItemIcon sx={{ color: selectedPage === item.label ? '#fff' : '#000' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} sx={{ color: selectedPage === item.label ? '#fff' : '#000' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
