
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { TextField, Grid } from '@mui/material';
import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IoReorderThreeOutline } from "react-icons/io5";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Input, Avatar } from '@mui/material';
import { Button, Modal } from 'react-bootstrap';
import { Offcanvas } from 'react-bootstrap';
import { BiGridAlt, BiBox, BiBarChart, BiPlug } from 'react-icons/bi';
import './main.css'
import { RiUserAddFill } from "react-icons/ri";
// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dashboards from './Dasboards';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import myapp from './Firebase'

const demoTheme = createTheme({
    palette: { mode: 'dark' },
});

const Dashboard1 = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [age, setAge] = useState('');
    const [popularity, setPopularity] = useState('');
    const [alldata, setData] = useState([]);
    const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
    const [imageURL, setImageURL] = useState("");
    const [uploading, setuploading] = useState("");

    const [updatId, setupdateId] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const [selectedUserId, setSelectedUserId] = useState(null);
    const [activeSection, setActiveSection] = useState('dashboard');
    const [showSidebar, setShowSidebar] = useState(false);
    const handleAddUserClick = () => setIsAddUserFormOpen(true);
    const handleCloseAddUserForm = () => setIsAddUserFormOpen(false);

    const handleSidebarToggle = () => setShowSidebar(!showSidebar);
    const [selectedFile, setSelectedFile] = useState(null);



    const hideModal = () => {
        setIsModalVisible(false);

    };

    const [deleteId, setDeleteId] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setDeleteId('')
    }

    const handleShow = (id) => {
        setDeleteId(id)
        setShow(true);
    }


    const adduser = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            image: imageURL,
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
                    setAge("")
                    setName("")
                    setEmail("")
                    setCity("")
                    setState("")
                    setPopularity("")
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


    const updateUser = async (userId) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                image: imageURL,
                "name": name,
                "email": email,
                "city": city,
                "state": state,
                "popularity": popularity,
                "age": age
            });

            const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch(`http://localhost:3000/api/v1/admin/participant/update/${userId}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.status === "true") {
                        updateClose();
                        getUser();
                        setName("")
                        setEmail("")
                        setCity("")
                        setState("")
                        setPopularity("")
                    }
                })
                .catch((error) => console.error(error));
        } catch (error) {
            console.error(error);

        }
    };


    const updateOpen = () => {
        setOpen(true);
    };

    const updateClose = () => {
        setOpen(false);
    };

    const handleFormChange = (setter) => (event) => {
        setter(event.target.value);
    };




    // **********************************image change *********************************


    async function handleImageChange(e) {
        const image = e.target.files[0];
        console.log(e.target.files[0]);
        if (image) {
            try {
                setuploading(true);
                const storage = getStorage(myapp);
                const storageRef = ref(storage, "images/" + image.name);
                await uploadBytes(storageRef, image);
                const downloadURL = await getDownloadURL(storageRef);
                console.log(downloadURL);
                setImageURL(downloadURL);
            } catch (error) {
                console.log(error);
            } finally {
                setuploading(false);
            }
        }
    }

    useEffect(() => {
        getUser();
    }, []);


    return (
        <ThemeProvider theme={demoTheme}>
            <AppProvider

                theme={demoTheme}
            >
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-lg-2 sidebar d-none d-lg-block" style={{ backgroundColor: '#1e1e1e', boxShadow: '2px 0 5px rgba(0,0,0,0.1)', borderRadius: '5px' }}>
                            <div className="sidebar-content">
                                <h3 className="text-white">Toolpad</h3>
                                <nav className="nav flex-column mt-4">
                                    <button
                                        className={`nav-link fs-5 btn btn-link text-left d-flex align-items-center ${activeSection === 'dashboard' ? 'active' : ''}`}
                                        style={{ color: '#fff', transition: 'background-color 0.3s ease', borderRadius: '5px', marginBottom: '10px' }}
                                        onClick={() => setActiveSection('dashboard')}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#34495e'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <BiGridAlt className="mr-2 me-2" style={{ transition: 'transform 0.2s ease' }} /> dasboard
                                    </button>
                                    <button
                                        className={`nav-link fs-5 btn btn-link text-left d-flex align-items-center ${activeSection === 'participants' ? 'active' : ''}`}
                                        style={{ color: '#fff', transition: 'background-color 0.3s ease', borderRadius: '5px', marginBottom: '10px' }}
                                        onClick={() => setActiveSection('participants')}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#34495e'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <BiBox className="mr-2 me-2" style={{ transition: 'transform 0.2s ease' }} /> Participants
                                    </button>
                                    <button
                                        className={`nav-link fs-5 btn btn-link text-left d-flex align-items-center ,  ${activeSection === 'users' ? 'active' : ''}`}
                                        style={{ color: '#fff', transition: 'background-color 0.3s ease', borderRadius: '5px', marginBottom: '10px' }}
                                        onClick={() => setActiveSection('users')}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#34495e'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <BiBarChart className="mr-2 me-2" style={{ transition: 'transform 0.2s ease' }} /> Users
                                    </button>
                                    <button
                                        className={`nav-link fs-5 btn btn-link text-left d-flex align-items-center ${activeSection === 'integrations' ? 'active' : ''}`}
                                        style={{ color: '#fff', transition: 'background-color 0.3s ease', borderRadius: '5px', marginBottom: '10px' }}
                                        onClick={() => setActiveSection('integrations')}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#34495e'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <BiPlug className="mr-2 me-2" style={{ transition: 'transform 0.2s ease' }} /> Integrations
                                    </button>
                                </nav>
                            </div>
                        </div>


                        <div className="col-lg-10">
                            <Button variant="primary" onClick={handleSidebarToggle} className="d-lg-none mb-3">
                                <IoReorderThreeOutline />
                            </Button>
                            <div className="topbar d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: '#1e1e1e', color: '#fff', position: "fixed", width: "83%" }}>
                                <h2>{`${activeSection[0].toUpperCase()}${activeSection.slice(1)}`}</h2>
                                <div className='m-1'>
                                    <Button
                                        onClick={handleAddUserClick}
                                        className='btn btn-dark'
                                    >
                                        <RiUserAddFill className='me-1' />Add User
                                    </Button>
                                    {/* <Button variant="secondary" className="mr-2 ms-2">Edit</Button>
                                    <Button variant="success ms-2">Create</Button> */}
                                </div>
                            </div>

                            <div className=" p-3 scroll_overflow ">
                                {activeSection === 'participants' ? (
                                    <div className="table-container" style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '8px' }}>
                                        <div className='table_container'>
                                            <Table striped bordered hover variant="dark" responsive>
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
                                                                    src={user.image}
                                                                    alt={user.name}
                                                                    style={{ width: 50, height: 50, borderRadius: '50%' }}
                                                                />
                                                            </TableCell>
                                                            <TableCell>{user.name}</TableCell>
                                                            <TableCell>{user.email}</TableCell>
                                                            <TableCell>{user.age}</TableCell>
                                                            <TableCell>{user.popularity >= 100 ? <Chip label="Peak" color="success" /> : user.popularity >= 50 ? <Chip label="Medium" color="primary" /> : 'Average 😭'}</TableCell>
                                                            <TableCell>{user.city}</TableCell>
                                                            <TableCell>{user.state}</TableCell>
                                                            <TableCell>
                                                                <IconButton color="inherit" onClick={(e) => {
                                                                    updateOpen()
                                                                    setupdateId(user._id)
                                                                }}>
                                                                    <EditIcon />
                                                                </IconButton>
                                                                <IconButton onClick={() => handleShow(user._id)} color="inherit">
                                                                    <Tooltip title="Delete">
                                                                        <IconButton>
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                ) : activeSection === 'dashboard' ? (
                                    <div style={{ backgroundColor: '', padding: '20px', borderRadius: '8px' }}>

                                        <Dashboards />

                                    </div>
                                ) : activeSection === 'users' ? (
                                    <div style={{ backgroundColor: '#333', padding: '20px', borderRadius: '8px' }}>
                                        <h3>users Section</h3>
                                        {/* Render reports content here */}
                                    </div>
                                ) : activeSection === 'integrations' && (
                                    <div style={{ backgroundColor: '#333', padding: '20px', borderRadius: '8px' }}>
                                        <h3>Integrations Section</h3>
                                        {/* Render integrations content here */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <Offcanvas show={showSidebar} onHide={handleSidebarToggle} className="d-lg-none" style={{ backgroundColor: '#343a40' }}>
                        <Offcanvas.Header closeButton closeVariant="white">
                            <Offcanvas.Title className="text-white">Toolpad</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <nav className="nav flex-column">
                                <button
                                    className={`nav-link btn btn-link text-left d-flex align-items-center ${activeSection === 'dashboard' ? 'active' : ''}`}
                                    style={{ color: '#fff' }}
                                    onClick={() => { setActiveSection('dashboard'); setShowSidebar(false); }}
                                >
                                    <BiGridAlt className="mr-2" /> Dashboard
                                </button>
                                <button
                                    className={`nav-link btn btn-link text-left d-flex align-items-center ${activeSection === 'participants' ? 'active' : ''}`}
                                    style={{ color: '#fff' }}
                                    onClick={() => { setActiveSection('participants'); setShowSidebar(false); }}
                                >
                                    <BiBox className="mr-2" /> Participants
                                </button>
                                <button
                                    className={`nav-link btn btn-link text-left d-flex align-items-center ${activeSection === 'reports' ? 'active' : ''}`}
                                    style={{ color: '#fff' }}
                                    onClick={() => { setActiveSection('users'); setShowSidebar(false); }}
                                >
                                    <BiBarChart className="mr-2" /> Users
                                </button>
                                <button
                                    className={`nav-link btn btn-link text-left d-flex align-items-center ${activeSection === 'integrations' ? 'active' : ''}`}
                                    style={{ color: '#fff' }}
                                    onClick={() => { setActiveSection('integrations'); setShowSidebar(false); }}
                                >
                                    <BiPlug className="mr-2" /> Integrations
                                </button>
                            </nav>
                        </Offcanvas.Body>
                    </Offcanvas>



                    {/* <Dialog open={open} onClose={updateClose}>
                        <DialogTitle>Edit Participant</DialogTitle>
                        <DialogContent>
                            <form>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={name}
                                    onChange={handleFormChange(setName)}
                                />
                                <TextField
                                    margin="dense"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                    value={email}
                                    onChange={handleFormChange(setEmail)}
                                />
                                <TextField
                                    margin="dense"
                                    label="City"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={city}
                                    onChange={handleFormChange(setCity)}
                                />
                                <TextField
                                    margin="dense"
                                    label="State"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={state}
                                    onChange={handleFormChange(setState)}
                                />
                                <TextField
                                    margin="dense"
                                    label="Age"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    value={age}
                                    onChange={handleFormChange(setAge)}
                                />
                                <TextField
                                    margin="dense"
                                    label="Popularity"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    value={popularity}
                                    onChange={handleFormChange(setPopularity)}
                                />
                                <DialogActions>
                                    <Button onClick={updateClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button color="primary" onClick={()=>{
                                        updateUser(updatId);
                                        updateClose();
                                    }}>
                                      Update
                                    </Button>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </Dialog> */}


                    <Dialog open={open} onClose={updateClose}>
                        <DialogTitle>Edit Participant</DialogTitle>
                        <DialogContent>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Avatar
                                    alt="Profile Picture"
                                    src={'/path/to/default/profile.jpg'}
                                    sx={{ width: 100, height: 100, marginBottom: '16px' }}
                                />
                                <label htmlFor="upload-button-file">
                                    <Input
                                        accept="image/*"
                                        id="upload-button-file"
                                        type="file"
                                        sx={{ display: 'block`' }}
                                        onChange={handleImageChange}

                                    />
                                    <Button className='btn btn-dark text-light' variant="contained" component="span" sx={{ marginBottom: '16px' }}>
                                        Change profile picture
                                    </Button>
                                </label>
                            </Box>

                            <form>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={name}
                                    onChange={handleFormChange(setName)}
                                />
                                <TextField
                                    margin="dense"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                    value={email}
                                    onChange={handleFormChange(setEmail)}
                                />
                                <TextField
                                    margin="dense"
                                    label="City"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={city}
                                    onChange={handleFormChange(setCity)}
                                />
                                <TextField
                                    margin="dense"
                                    label="State"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={state}
                                    onChange={handleFormChange(setState)}
                                />
                                <TextField
                                    margin="dense"
                                    label="Age"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    value={age}
                                    onChange={handleFormChange(setAge)}
                                />
                                <TextField
                                    margin="dense"
                                    label="Popularity"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    value={popularity}
                                    onChange={handleFormChange(setPopularity)}
                                />
                                <DialogActions>
                                    <Button onClick={updateClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary"
                                        onClick={() => {
                                            updateUser(updatId);
                                            updateClose();
                                        }}
                                    >
                                        Update
                                    </Button>
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </Dialog>


                    <Modal show={isModalVisible} onHide={hideModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* Add your form fields here to edit the user */}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={hideModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => console.log("Save changes")}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {isAddUserFormOpen && (
                        <Box
                            sx={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100vw',
                                height: '100vh',
                                bgcolor: 'rgba(0, 0, 0, 0.5)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 1000,
                            }}
                            onClick={handleCloseAddUserForm}
                        >
                            <Box
                                sx={{
                                    bgcolor: '#333',
                                    padding: '30px',
                                    borderRadius: '10px',
                                    width: '90%',
                                    maxWidth: '500px',
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Typography variant="h6" gutterBottom>
                                    Add User
                                </Typography>
                                <Grid container spacing={2}>
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        <Avatar
                                            alt="Profile Picture"
                                            src={'/path/to/default/profile.jpg'}
                                            sx={{ width: 100, height: 100, marginBottom: '16px' }}
                                        />
                                        <label htmlFor="upload-button-file">
                                            <Input
                                                accept="image/*"
                                                id="upload-button-file"
                                                type="file"
                                                sx={{ display: 'block`' }}
                                                onChange={handleImageChange}

                                            />
                                            <Button className='btn btn-dark text-light' variant="contained" component="span" sx={{ marginBottom: '16px' }}>
                                                Change profile picture
                                            </Button>
                                        </label>
                                    </Box>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="City"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="State"
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Age"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Popularity"
                                            value={popularity}
                                            onChange={(e) => setPopularity(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Box mt={3} display="flex" justifyContent="space-between">
                                    <Button variant="secondary" onClick={handleCloseAddUserForm}>
                                        Cancel
                                    </Button>
                                    <Button onClick={adduser} className="btn btn-primary">
                                        Add User
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </div>



                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    centered // Center the modal
                    className="custom-modal " // Add a custom class
                >
                    <Modal.Header closeButton className="modal-header-dark bg-dark text-light">
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body-dark bg-dark text-light">
                        Are you sure you want to delete this participant? This action cannot be undone.
                    </Modal.Body>
                    <Modal.Footer className="modal-footer-dark bg-dark text-light">
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => {
                                deletparticipant(deleteId);
                                handleClose();
                            }}
                        >
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>



            </AppProvider>
        </ThemeProvider >
    );
};


export default Dashboard1;
