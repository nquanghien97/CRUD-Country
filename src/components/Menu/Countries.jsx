import './countries.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Delete from '../Popup/Delete';
import AddCountry from '../Popup/AddCountry'
import { useState, useEffect, useRef } from 'react'

function Countries() {

  const [showDel, setShowDel] = useState(false)

  const handleDel = (id) => {
    setShowDel(true)
    const options = {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
        },
  }

  fetch("https://62a591d8b9b74f766a3ba5db.mockapi.io/api/country" + '/' + id, options)
      .then(res => res.json())
      .then(
          (result) => {
              console.log(result);
          },
      );

    const el = document.getElementById(id)
    if(el) {
      el.remove()
    }
  }

  const [showAdd, setShowAdd] = useState(false)

  const handleAdd = () => {
    setShowAdd(true)
  }

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://62a591d8b9b74f766a3ba5db.mockapi.io/api/country")
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
        },
      )
  },[])

  return (
    <div className="container-country">
      {/* {showDel ? <Delete setShowDel={setShowDel} /> : "" } */}
      {showAdd ? <AddCountry setShowAdd={setShowAdd} /> : ""}
          <button className="addcountry" onClick={handleAdd}>Thêm mới</button>
          <table>
              <tbody>
                <tr>
                  <th>Thao tác</th>
                  <th>Số thứ tự</th>
                  <th>Tên</th>
                  <th>Mã</th>
                  <th>Mô tả</th>
                </tr>
          {items.map((item, index) => {
            return (
                <tr key={index} id={item.id}>
                  <td>
                    <span><EditIcon style={{color:"#00bfc7", cursor:"pointer"}}/></span>
                    <span><DeleteIcon style={{color:"#fb9678", cursor:"pointer"}} onClick={()=>handleDel(item.id)}/></span>
                  </td>
                  <td>{item.id}</td>
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