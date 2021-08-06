import React from 'react'
import { useParams } from 'react-router-dom'

function PublicVerificationPage() {

    const { id } = useParams()

    return (
        <div>
            <div>
                <h2>Verify Certificate</h2>
                <p>User Address : {id} </p>
            </div>
            <div>
                <h3>User Information</h3>
                <p>Name : {}</p>
                <p>Date of Birt : {}</p>
                <p>Passport No : {}</p>
                <p></p>
            </div>            
        </div>
    )
}

export default PublicVerificationPage
