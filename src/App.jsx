import React from "react"
import Favourites from "./Components/Favourites";
import Photos from "./Components/Photos";
import { FaSearch } from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { useState,useEffect } from "react";


function App() {
  const [query,setQuery] = useState("");
  const handleSearch = (e)=>{
    e.preventDefault();
    setQuery(e.target[0].value)
  }
  return (
    <>
    <BrowserRouter>
      <div>
        <nav className="navbar">
        <div className="navbar_logo">
          FotoFlix
        </div>
        <form action="" className="navbar_search_form" onSubmit={handleSearch}>
          <input type="text" className="form-input" placeholder="search"/>
          <button type="submit" className="submit-btn">
            <FaSearch/>
          </button>
        </form>
        <div className="navbar_links">
          <Link to={"/"}>Home</Link>
          <Link to={"/Favourites"}>Favourites</Link>
        </div>
        </nav>
        <Routes>
        <Route path='/' element={<Photos/>}/>
        <Route path='/Favouriteas' element={<Favourites/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
