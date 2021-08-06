import React from 'react'


function createUser(props) {

    const [username,setUsername] = useState("")
    const [userAddress, setUserAddress] = useState("")
    const [privatekey,setPrivatekey] = useState("")
    const [publickey,setPublicKey] = useState("")    
    const [name, setName] = useState("")

    const [dob, setDOB] = useState("")
    const [aadhar,setAadhar] = useState("")
    const [passport, setPassport] = useState("")
    
    return (
        <div>            
            <div style={{display:"block"}}>
                <h3>Create a Public User </h3>
                <p><input value={username} onChange={ (e)=>setUsername(e.target.value)} placeholder="Username..."/></p>
                <p><input value={name} onChange={ (e)=>setName(e.target.value)} placeholder="Name..."/></p>
                <p><input value={publickey} onChange={ (e)=>setPublicKey(e.target.value)} placeholder="Public Key..."/></p>
                <p><input value={privatekey} onChange={ (e)=>setPrivatekey(e.target.value)} placeholder="Private Key..." /></p>
                <p><input value={dob} onChange={ (e)=>setDOB(e.target.value)} placeholder="Date of Birth..." /></p>
                <p><input value={aadhar} onChange={ (e)=>setAadhar(e.target.value)} placeholder="Aadjar ..." /></p>
                <p><input value={passport} onChange={ (e)=>setPassport(e.target.value)} placeholder="Passport No..." /></p>
                <button onClick={handleCreatePublicUser} > Create User</button>
                <p>Address : {userAddress}</p>
            </div>
            <GenerateCrypto/>
        </div>
    )
}


export default createUser

