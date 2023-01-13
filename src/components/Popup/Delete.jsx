import React from 'react';
import { deleteCountry } from '../../services';

function Delete(props) {

  const { setShowDel, id, country, setCountry } = props

  const cancleDel = () => {
    setShowDel(false)
  }

  const handleDel = async () => {
    await deleteCountry(id)
    const newCountry = country.filter((item) => {
      return item._id !== id
    })
    setCountry(newCountry)
    setShowDel(false)
  }

  return (
    <div className="container-delete">
        <h2>Bạn có muốn xóa không?</h2>
        <div className="button-group">
            <button onClick={cancleDel}>Không</button> 
            <button onClick={handleDel}>Có</button> 
        </div>
    </div>
  )
}

export default Delete