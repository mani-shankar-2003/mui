import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setPage } from '../features/userSlice';
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, IconButton, Container, Box, Snackbar, TextField } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import './Logout.css';

interface FormData {
  email: string;
  name: string;
  surname: string;
  dob: string;
  phoneNo: string;
}

const drawerWidth = 240;

const Logout = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: any) => state.user.currentPage);

  const [formData, setFormData] = React.useState<FormData>({
    email: '',
    name: '',
    surname: '',
    dob: '',
    phoneNo: '',
  });
  const [openDrawer, setOpenDrawer] = React.useState(false); // Initial state is false
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handlePageChange = (page: string) => {
    dispatch(setPage(page));
    setOpenDrawer(false); // Close the drawer when navigating
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = (formData: FormData) => Object.values(formData).every(value => value.trim() !== '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSnackbarOpen(true);
    setFormData({
      email: '',
      name: '',
      surname: '',
      dob: '',
      phoneNo: '',
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dataEntry':
        return (
          <Container className="page-content">
            <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
              <Typography variant="h5" component="h2" gutterBottom>
                Data Entry
              </Typography>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Surname"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone Number"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                type="submit"
                disabled={!isFormValid(formData)}
              >
                Submit
              </Button>
            </Box>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={() => setSnackbarOpen(false)}
              message="Thank you for submitting!"
              action={
                <Button color="inherit" onClick={() => setSnackbarOpen(false)}>
                  <CloseIcon />
                </Button>
              }
            />
          </Container>
        );
      case 'page2':
        return <div>Page 2 Content</div>;
      case 'page3':
        return <div>Page 3 Content</div>;
      case 'page4':
        return <div>Page 4 Content</div>;
      default:
        return <div>Welcome Page</div>;
    }
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpenDrawer(!openDrawer)} // Toggle drawer on click
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
            Welcome
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth } }}
        variant="persistent"
        anchor="left"
        open={openDrawer}
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => handlePageChange('dataEntry')}>
            <ListItemText primary="Data Entry" />
          </ListItem>
          <ListItem button onClick={() => handlePageChange('page2')}>
            <ListItemText primary="Page 2" />
          </ListItem>
          <ListItem button onClick={() => handlePageChange('page3')}>
            <ListItemText primary="Page 3" />
          </ListItem>
          <ListItem button onClick={() => handlePageChange('page4')}>
            <ListItemText primary="Page 4" />
          </ListItem>
        </List>
      </Drawer>

      <main>
        <Toolbar />
        {renderPage()}
      </main>
    </div>
  );
};

export default Logout;
