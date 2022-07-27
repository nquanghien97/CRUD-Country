import './countries.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import Delete from '../Popup/Delete';
import AddCountry from '../Popup/AddCountry'
import EditCountry from '../Popup/EditCountry'
import { useState, useEffect } from 'react'

function Countries() {

  //show Popup Delete Country
  const [showDel, setShowDel] = useState(false)

  //handle Delete Country
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

    const element = document.getElementById(id)
    if(element) {
      element.remove()
    }
  }

  //show Popup AddCountry
  const [showAdd, setShowAdd] = useState(false)

  const handleAdd = () => {
    setShowAdd(true)
  }

  //show Popup Edit Country
  const [showEdit, setShowEdit] = useState(false)

  const handleEdit = () => {
    setShowEdit(true)
    }
  
  //call Api to render table
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("https://62a591d8b9b74f766a3ba5db.mockapi.io/api/country")
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
        },
      )
  },[]);

  return (
    <div className="container-country">
      {/* {showDel ? <Delete setShowDel={setShowDel} /> : "" } */}
      {showAdd ? <AddCountry setShowAdd={setShowAdd} items={items} setItems={setItems} /> : ""}
      {showEdit ? <EditCountry setShowEdit={setShowEdit} /> : ""}
          <button className="addcountry" onClick={handleAdd}>Thêm mới</button>
          <table>
              <tbody>
                <tr>
                  <th>Thao tác</th>
                  <th>Tên</th>
                  <th>Mã</th>
                  <th>Mô tả</th>
                </tr>
          {items.map((item, index) => {
            return (
                <tr key={index} id={item.id}>
                  <td>
                    <span><EditIcon style={{color:"#00bfc7", cursor:"pointer"}} onClick={handleEdit} /></span>
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