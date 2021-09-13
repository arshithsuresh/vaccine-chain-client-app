import React, {useState, useContext} from 'react'
import api from "../../../api/index"

const {ORG_NAME,ORG_TYPE} = require('../../../core/constant')

const {GenerateCryptoMaterials,GetPublicKeyFromPrivateKey} = require('../../../utils/generateKey')

const SignTransaction = require('../../../utils/signing')

function PublicUserPage()
{
    const [username,setUsername] = useState("")
    const [userAddress, setUserAddress] = useState("")
    const [privatekey,setPrivatekey] = useState("")
    const [publickey,setPublicKey] = useState("")
    const [tokenValue, setTokenValue] = useState("")
    const [name, setName] = useState("")

    const [dob, setDOB] = useState("")
    const [aadhar,setAadhar] = useState("")
    const [passport, setPassport] = useState("")
    
    const [userData, setUserData] = useState(null)

    const handleCreatePublicUser =  async(e)=>{

        e.preventDefault()
    
        const userData = {
            action:"createpublic",
            username:username,
            data:{
                userid:username,
                name:name,
                publickey:publickey,
                dob:dob,
                aadhar:aadhar,
                passport:passport
            }
        }

        const signedData = SignTransaction(userData)

        const payload = {
            username: username,
            data : userData,
            signature : signedData
        }

        try {
            
            console.log("rest")
            const result = await api.post("/public/create", payload)
            
            if(result.status == 200)
            {   
                const addr = result.data.data.address;                
                setUserAddress(addr)
                alert("User Created!")
            }

        } catch (error) {
            
        }
        
    }
    
    const handleGenerateCrytpo= async(e)=>{

        e.preventDefault()

        const crytoMaterials = GenerateCryptoMaterials()
        const pvKey = crytoMaterials.privateKey
        const pbKey = crytoMaterials.publicKey

        setPrivatekey(pvKey)
        setPublicKey(pbKey)
        
        localStorage.setItem("privatekey", pvKey)
        localStorage.setItem("publickey", pbKey)
    }   

    const GenerateCrypto = ()=>{
        return (
            <div>
                <h3>Generate Crytpo Materials For user </h3>              
                <label>Private Key : {privatekey}</label> <br/>
                <label>Public Key: {publickey}</label>< br/>
                <button onClick={handleGenerateCrytpo}>Generate Crytpo</button>
            </div>
        )
    }

    return(
        <div>  
            <h2>Public User Page</h2>
            <button>Get User Details</button>          
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

export default PublicUserPage;


