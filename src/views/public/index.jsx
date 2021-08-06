import PublicUserPage from "./user";
import { Link } from "react-router-dom";

import React from 'react'


const UserPage = ()=>{
    return (
        <>
        <p><Link to="/public/user" >Public User Functions</Link></p>
        <p><Link to="/public/vaccine">Public Vaccination Functions</Link></p>
        <p><Link to="/public/verify">Public Verification Functions</Link></p>
        </>
    )
}

export default UserPage

