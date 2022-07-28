import React from 'react'
import { AppBar, Toolbar, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

function PageHeader(props) {

    const { open, handleOpen } = props
  return (
    <>
        <AppBar open={open}>
            <Toolbar>
                <IconButton
                    sx={{mr: 2, ...(open && {display: 'none'})}}
                    onClick={handleOpen}
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default PageHeader