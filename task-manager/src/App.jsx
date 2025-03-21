import Sidebar from './components/Sidebar';
import { SidebarProvider, useSidebar } from './context/sidebarContext';
import { Box, IconButton } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardPage from './pages/Dashboard';
import ReportsPage from './pages/ReportsPage';
import TaskPage from './pages/TaskPage';

const MainContent = () => {
  const { selectedPage } = useSidebar();

  const renderPage = () => {
    switch (selectedPage) {
      case 'Dashboard':
        return <DashboardPage />;
      case 'Reports':
        return <ReportsPage />;
      case 'Tasks':
        return <TaskPage />;
      default:
        return <TaskPage />;
    }
  };

    return (
      <Box sx={{width:'100%'}}>
       
        <Box
          sx={{
            width: '100%',
            height: 60,
            bgcolor: 'white',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            px: 3,
            borderBottom: '1px solid #e0e0e0',
            m:0,
            p:2,
          }}
        >
          <IconButton>
            <NotificationsNoneIcon />
          </IconButton>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
          Username
        </Box>
    
  
        <Box
          sx={{
            flexGrow: 1,
            p: 0,
            bgcolor: '#f8f9fa',
            color: '#000',
            height: 'calc(100vh - 60px)',
            overflow: 'auto',
          }}
        >
          {renderPage()}
        </Box>
      </Box>
  
  );
};

const App = () => {
  return (
    <SidebarProvider>
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
        <Sidebar />
        <MainContent />
      </Box>
    </SidebarProvider>
  );
};

export default App;
