import React, { useState } from 'react'
import api from "../../api/index"
import { Link } from 'react-router-dom'

const SignTransaction = require('../../utils/signing')

const Home = () => {

    return (
        <>
            <p><Link to="/manufacturer"> Manufacturer Page</Link></p>
            <p><Link to="/public"> Public Portal Page</Link></p>
            <p><Link to="/vaccine"> Vaccinator Portal Page</Link></p>
        </>
    )
    
}

export default Home
