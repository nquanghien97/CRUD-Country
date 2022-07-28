import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import Delete from '../Popup/Delete';
import AddCountry from '../Popup/AddCountry'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Container, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@mui/material'

function Countries() {

  const [showAdd, setShowAdd] = useState(false)

  const [country, setCountry] = useState([])

  const [status, setStatus] = useState()

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
                    {country.map((item, index) => {
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
                  </TableBody>
                </Table>
            </TableContainer>
      </Box>
    </Container>
  )
}

export default Countries