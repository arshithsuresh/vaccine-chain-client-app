import PublicUserPage from "./user";
import { Link } from "react-router-dom";

import React from 'react'


const ManufacturerPage = ()=>{
    return (
        <>
        <p><Link to="/manufacturer/user" >Manufacturer User Functions</Link></p>
        <p><Link to="/manufacturer/vaccine" >Vaccine Functions</Link></p>
        </>
    )
}

export default ManufacturerPage

