import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import Delete from '../Popup/Delete';
import AddCountry from '../Popup/AddCountry'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Container, Box, Typography,
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Paper, Button, TableFooter, TablePagination} from '@mui/material'
import TablePaginationActions from '../Pagination/TablePaginationActions'

function Countries() {

  const [showAdd, setShowAdd] = useState(false)

  const [country, setCountry] = useState([])

  const [status, setStatus] = useState()

  const [page, setPage] = useState(0)

  const [rowsPerPage, setRowsPerPage] = useState(5)

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - country.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const getAllCountry = async () => {
      try {
        const country = await axios.get("https://62a591d8b9b74f766a3ba5db.mockapi.io/api/country")
        setCountry(country.data)
      } catch (error) {
        console.log("Something is Wrong")
      }
    }
    getAllCountry()
  },[])

  const handleDel = async id => {
    await axios.delete(`https://62a591d8b9b74f766a3ba5db.mockapi.io/api/country/${id}`)
    const newCountry = country.filter((item) => {
      return item.id !== id
    })
    setCountry(newCountry)
  }

  if(status) {
    return <Countries />
  }

  return (
    <Container style={{position:"relative", height: "100vh", display: "flex",justifyContent: "center", alignItems: "center"}}>
      {showAdd ? <AddCountry setShowAdd={setShowAdd} status={status} setStatus={setStatus}/> : ""}
      <Box style={{position:"relative", width: "100vw"}}>
        {/* {showDel ? <Delete setShowDel={setShowDel} /> : "" } */}
            <Button sx={{m:1}} variant="contained" onClick={() => setShowAdd(true)}>Thêm mới</Button>
            <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Thao tác</TableCell>
                      <TableCell>Tên</TableCell>
                      <TableCell>Mã</TableCell>
                      <TableCell>Mô tả</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0 ? country.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage): country
                    ).map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            <Typography component="span">
                              <Link to={`/edit/${item.id}`}><EditIcon style={{color:"#00bfc7", cursor:"pointer"}} /></Link>
                            </Typography>
                            <Typography component="span">
                              <DeleteIcon style={{color:"#fb9678", cursor:"pointer"}} onClick={()=>handleDel(item.id)}/>
                            </Typography>
                          </TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.code}</TableCell>
                          <TableCell>{item.des}</TableCell>
                        </TableRow>
                          )
                        })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={country.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            'aria-label': 'rows per page',
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
            </TableContainer>
      </Box>
    </Container>
  )
}

export default Countries