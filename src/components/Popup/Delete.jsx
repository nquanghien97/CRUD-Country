import React from 'react'
import './delete.css'

function Delete(props) {


    const {setShowDel} = props

    const handleDel = () => {
        setShowDel(false)
    }

    const cancleDel = () => setShowDel(false)

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