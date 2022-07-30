import { AppBar, Toolbar, IconButton, TextField, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Search from '../search/Search'
import useComponentVisible from './useComponentVisible';
import { useEffect } from 'react';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
    },
    searchContainer: {
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'flex-end',
        borderRadius: '10px',
        marginRight: '16px',
    },
    searchIcon: {
        color: 'black',
        margin: '0 0 6px 8px',
    },
    input: {
        padding: '2px 0',
        borderRadius: '10px'
    },
    searchResults: {
        color: 'black',
        position: 'absolute',
        top: '64px',
        right: '12px'
    }
})

function PageHeader(props) {

    const classes = useStyles()

    const { open, handleOpen } = props

    const { data, setData } = Search()

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true)

    useEffect(() => {
        setIsComponentVisible(false)
    },[setIsComponentVisible])

  return (
    <>
        <AppBar open={open}>
            <Toolbar className={classes.container}>
                <IconButton
                    sx={{mr: 2, ...(open && {display: 'none'})}}
                    onClick={handleOpen}
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
                <Box className={classes.searchContainer}>
                    <SearchIcon className={classes.searchIcon} sx={{fontSize:32}} />
                    <TextField
                        className={classes.input}
                        label="Tìm kiếm" 
                        variant="filled"
                        size="small"
                        value={data.name}
                        onChange= {(e) => {
                            setData({ ...data, name:e.target.value})
                            setIsComponentVisible(true)
                        }}
                    />
                    <Box ref={ref}>
                        {isComponentVisible &&
                        (
                            <Box className={classes.searchResults}>
                                {data.results.length > 0 ?
                                    <TableContainer component={Paper}>
                                    <Table>
                                    <TableHead>
                                        <TableRow>
                                        <TableCell>Tên</TableCell>
                                        <TableCell>Mã</TableCell>
                                        <TableCell>Mô tả</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                            <TableRow key={data.results[0].id}>
                                            <TableCell>{data.results[0].name}</TableCell>
                                            <TableCell>{data.results[0].code}</TableCell>
                                            <TableCell>{data.results[0].des}</TableCell>
                                            </TableRow>
                                    </TableBody>
                                    </Table>
                                </TableContainer>
                                : null
                                }
                            </Box>
                            )
                        }
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default PageHeader