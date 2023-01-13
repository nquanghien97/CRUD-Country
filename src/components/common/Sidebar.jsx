import { useState } from 'react';
import Countries from '../Menu/Countries';
import HomePage from '../Menu/HomePage';
import EditCountry from '../Popup/EditCountry'
import { Routes, Route, Link } from "react-router-dom";
import { Close, Home, Public } from '@mui/icons-material';
import PageHeader from './PageHeader'
import { Drawer, Box, Typography, IconButton } from '@mui/material'

function Sidebar() {

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const boxSX = {
    "&:hover": {
      backgroundColor: 'lightblue',
      borderRadius: '5px',
      color: 'black'
    }
  }

  return (
    <>
      <PageHeader open={open} handleOpen={handleOpen} />
      <Drawer
        anchor="left"
        sx={{
          width: 240
        }}
        open={open}
        ModalProps={{ onBackdropClick: handleClose}}
      >
        <Box backgroundColor="#1976d2" display="flex" flexDirection="column" height="100%">
          <Box textAlign="right" p={2}>
            <IconButton sx={{cursor: 'pointer', "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                padding: "8px",
                borderRadius: "50%"
              }}}
              onClick={handleClose}
            >
              <Close />
            </IconButton>
          </Box>
          <Link to="/">
            <Box sx={boxSX} display="flex" alignItems="center" p={3}>
              <Home sx={{mr: 1, fontSize:28}} />
              <Typography fontSize="20px">
                HomePage
              </Typography>
            </Box>
          </Link>
          <Link to="countries">
            <Box sx={boxSX} display="flex" alignItems="center" p={3}>
              <Public sx={{mr: 1, fontSize:28}} />
              <Typography fontSize="20px" >
                Country
              </Typography>
            </Box>
          </Link>
        </Box>
      </Drawer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:countryId" element={<EditCountry />} />
      </Routes> 
    </>
  )
  
}

export default Sidebar