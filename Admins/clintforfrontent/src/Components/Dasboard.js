import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { TextField, Grid } from '@mui/material';
import './Admin.css';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Button, Modal } from 'react-bootstrap';

const demoTheme = createTheme({
  palette: { mode: 'dark' },
});

const Dashboard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [age, setAge] = useState('');
  const [popularity, setPopularity] = useState('');
  const [alldata, setData] = useState([]);
  const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleAddUserClick = () => setIsAddUserFormOpen(true);
  const handleCloseAddUserForm = () => setIsAddUserFormOpen(false);

  const hideModal = () => {
    setIsModalVisible(false);
    setSelectedUserId(null);
  };

  const showModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalVisible(true);
  };

  const adduser = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name,
      email,
      city,
      state,
      popularity: Number(popularity),
      age: Number(age),
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3000/api/v1/admin/participant", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "true") {
          handleCloseAddUserForm();
          getUser(); 
        }
      })
      .catch((error) => console.error(error));
  };

  const getUser = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      const res = await fetch("http://localhost:3000/api/v1/admin/participant", requestOptions);
      const result = await res.json();
      setData(result.patricipants);
    } catch (error) {
      console.log(error);
    }
  };

  // const update 

  const deletparticipant = async (userId) => {
   
  
    try {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow",
      };
  
      const res = await fetch(`http://localhost:3000/api/v1/admin/participant/${userId}`, requestOptions);
      const result = await res.json();
      if (result.message === "User deleted successfully") {
        getUser();
       
      }
    } catch (error) {
      console.error("Failed to delete user", error);
     
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const NAVIGATION = [
    { kind: 'header', title: 'Main items' },
    { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon />, onClick: () => setActiveSection('dashboard') },
    { segment: 'orders', title: 'Orders', icon: <ShoppingCartIcon />, onClick: () => setActiveSection('orders') },
    { kind: 'divider' },
    { kind: 'header', title: 'Analytics' },
    {
      segment: 'reports', title: 'Reports', icon: <BarChartIcon />, children: [
        { segment: 'sales', title: 'Sales', icon: <DescriptionIcon /> },
        { segment: 'traffic', title: 'Traffic', icon: <LayersIcon /> }
      ]
    },
    { segment: 'integrations', title: 'Integrations', icon: <LayersIcon /> },
  ];

  return (
    <ThemeProvider theme={demoTheme}>
      <AppProvider
        navigation={NAVIGATION}
        router={{ pathname: '/dashboard', searchParams: new URLSearchParams(), navigate: () => { } }}
        theme={demoTheme}
      >
        <DashboardLayout className="mt-5">
          <Box sx={{ py: 4, px: { xs: 2, sm: 4 } }}>
            <div className="Dashboard">
              <div className="dashboard-header">
                <Typography variant="h4">Dashboard</Typography>
                <Button
                  onClick={handleAddUserClick}
                  className='btn btn-primary'
                  style={{ top: '100px', right: '10px', position: 'fixed', zIndex: 1000 }}
                >
                  Add User
                </Button>
              </div>
            </div>

            {activeSection === 'dashboard' && (
              <TableContainer
                component={Paper}
                sx={{ mt: 5 , overflow:'scroll' }}
              >
                <Table responsive>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell>Popularity</TableCell>
                      <TableCell>City</TableCell>
                      <TableCell>State</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {alldata.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>
                          <img
                            src="https://i.pinimg.com/474x/f3/f7/dc/f3f7dc580642e84036a3a5e00869f3e3.jpg"
                            alt={user.name}
                            style={{ width: 50, height: 50, borderRadius: '50%' }}
                          />
                        </TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.age}</TableCell>
                        <TableCell>
                          {user.popularity >= 100 ? 'Peak 🔥' : user.popularity >= 50 ? 'Medium 👍' : 'Average 😭'}
                        </TableCell>
                        <TableCell>{user.city}</TableCell>
                        <TableCell>{user.state}</TableCell>
                        <TableCell>
                          <IconButton color="primary"><EditIcon /></IconButton>
                          <IconButton style={{backgroundColor:"red"}}  onClick={() => deletparticipant(user._id)}><DeleteIcon /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {activeSection === 'orders' && (
              <Box sx={{ mt: 5 }}>
                <Typography variant="h1" align="center">
                  Order Section
                </Typography>
              </Box>
            )}
          </Box>

          <Modal className="text-dark" show={isAddUserFormOpen} onHide={handleCloseAddUserForm}>
            <Modal.Header closeButton>
              <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
              <Box
                sx={{
                  width: '100%',
                  bgcolor: 'background.dark',
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
                }}
              >
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Enter your Name"
                        variant="outlined"
                        value={name}
                        type='name'
                        onChange={(e) => setName(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Enter your Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Enter your City"
                        variant="outlined"
                        value={city}
                        type='text'
                        onChange={(e) => setCity(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Enter your State"
                        variant="outlined"
                        value={state}
                        type='text'
                        onChange={(e) => setState(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Enter your Age"
                        variant="outlined"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Popularity"
                        variant="outlined"
                        type="number"
                        value={popularity}
                        onChange={(e) => setPopularity(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddUserForm}>Close</Button>
              <Button variant="primary" onClick={adduser}>Save Changes</Button>
            </Modal.Footer>
          </Modal>

          
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
};

export default Dashboard;
