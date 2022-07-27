import './countries.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import Delete from '../Popup/Delete';
import AddCountry from '../Popup/AddCountry'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

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
    <div className="container-country">
      {/* {showDel ? <Delete setShowDel={setShowDel} /> : "" } */}
      {showAdd ? <AddCountry setShowAdd={setShowAdd} status={status} setStatus={setStatus}/> : ""}
      {/* {showEdit ? <EditCountry setShowEdit={setShowEdit} /> : ""} */}
          <button className="addcountry" onClick={() => setShowAdd(true)}>Thêm mới</button>
          <table>
              <tbody>
                <tr>
                  <th>Thao tác</th>
                  <th>Tên</th>
                  <th>Mã</th>
                  <th>Mô tả</th>
                </tr>
          {country.map((item, index) => {
            return (
                <tr key={index}>
                  <td>
                    <span><Link to={`/edit/${item.id}`}><EditIcon style={{color:"#00bfc7", cursor:"pointer"}} /></Link></span>
                    <span><DeleteIcon style={{color:"#fb9678", cursor:"pointer"}} onClick={()=>handleDel(item.id)}/></span>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.code}</td>
                  <td>{item.des}</td>
                </tr>
                  )
                })}
              </tbody>
          </table>
    </div>
  )
}

export default Countries