import React from 'react'
import { useParams } from 'react-router-dom'

function PublicVerifyVaccinePage() {

    const { id } = useParams()

    return (
        <div>
            <div>
                <h2>Verfy Vacine</h2>
                <p>Vaccine Address Id : {id}</p>                
            </div>
            <div>
                <h3> Verficcation Information</h3>
                <p>Batch Id : </p>
                <p>Manufacturer : </p>
                <p>Manufacturer Address: <link to=""></link></p>
                <p>Vaccine Count : </p>
                <p>Location : </p>
                <p>Current Status : </p>
                <h3>Transit Records</h3>
                <ul>
                    <li></li>
                </ul>
            </div>
            
        </div>
    )
}

export default PublicVerifyVaccinePage
