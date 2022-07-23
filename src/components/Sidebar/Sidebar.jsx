import './sidebar.css';
import { useState } from 'react';
import Countries from '../Menu/Countries';
import HomePage from '../Menu/HomePage';
import { Link } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';

function Sidebar() {

  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <div className="navbar">
        <div className="icon">
          {sidebar ? <CloseIcon style={{color:'white', cursor: 'pointer'}} onClick={showSidebar}/> : <MenuIcon style={{color:'white', cursor: 'pointer'}} onClick={showSidebar} /> }
        </div>
      </div>
      <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <Link className="sidebar-items" to="/"><span><HomeIcon /></span>HomePage</Link>
        <Link className="sidebar-items" to="countries"><span><PublicIcon /></span>Countries</Link>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/countries" element={<Countries />} />
      </Routes> 
    </>
  )
  
}

export default Sidebar