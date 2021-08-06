import React, {useState, useContext} from 'react'
import api from "../../../api/index"

const {ORG_NAME,ORG_TYPE} = require('../../../core/constant')

const {GenerateCryptoMaterials,GetPublicKeyFromPrivateKey} = require('../../../utils/generateKey')

const SignTransaction = require('../../../utils/signing')

function ManufacturerUserPage() {    

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

    const handleCreateUser = async (e)=>{
        e.preventDefault()
        const requestTTL = Date.now() + 600000

        const data = {            
            ttl : requestTTL,
            action: "create",
            token: tokenValue,
            data : {
                userid: username,
                publickey: publickey,
                name: name,
                organizationName: ORG_NAME,
                orgtype: ORG_TYPE

            }
        }

        const signedData = SignTransaction(data)

        const payload = {
            username: username,
            data: data,
            signature: signedData
        }
        try {

            const result = await api.post("/manufacturer/createuser", payload)
            //console.log(result.data)
            setUserAddress(result.data.data.address);

            
        } catch (error) {
            
        }
    }


    const handleGetUserInfo= async(e)=>{
        e.preventDefault()         

        try {

            const result = await api.get("/manufacturer/address/"+userAddress)       
            if(result.status == 200)
            {
                console.log(result.data)
                setUserData(result.data)
            }     
            
        } catch (error) {

                   
        }
        

    }
    const handleGetUserInfoUsername= async(e)=>{
        e.preventDefault()         

        try {

            const result = await api.get("/manufacturer/user/"+username)       
            if(result.status == 200)
            {
                console.log(result.data)
                setUserData(result.data)
            }     
            
        } catch (error) {

                   
        }
        

    }

    const handleLogin = async (e)=>{
        
        e.preventDefault()
        const requestTTL = Date.now() + 600000

        console.log("Login TIME : "+ requestTTL)
        const data = {
            username: username,
            ttl:requestTTL,
            action: "login",

        }

        const signedData = SignTransaction(data)

        const payload = {
            username: username,
            data : data,
            signature : signedData
        }
        try{
            
            const result = await api.post("/manufacturer/user/login", payload)
            if(result.status == 200)
            {
                console.log(result.data)
            }
        }
        catch(error)
        {
            console.log(error)
        }
        

    }
    const hangleImportPrivateKey = (e)=>{
        e.preventDefault()

        console.log("Import private key")
        const publicKey = GetPublicKeyFromPrivateKey(privatekey)
        setPublicKey(publicKey)
        
        localStorage.setItem("publickey", publickey)
        localStorage.setItem("privatekey", privatekey)
        
    }    

    const DisplayUserData = ()=>{

        if(userData == null)
            return(<></>)

        return(
            <>
                <br/>
                <label htmlFor="">Address : {userData.address}</label><br/>
                <label htmlFor="">Name : {userData.name}</label><br/>
                <label htmlFor="">Organization : {userData.orgname}</label><br/>
                <label htmlFor="">Org Type : {userData.orgtype}</label><br/>
                <label htmlFor="">Public Key : {userData.publickey}</label><br/>
                <label htmlFor="">User Id : {userData.userid}</label><br/>
            </>
        )
    }

    
    const CheckForPrivateKey = ()=>{

        const LocalPrivateKey = localStorage.getItem("privatekey")
        if(!LocalPrivateKey)
        {
            return(
                <div>
                    <p>Import Private Key</p>
                    <input value={privatekey} onChange={(e)=> setPrivatekey(e.target.value)} placeholder="Private key..." />                    
                    <button onClick={hangleImportPrivateKey}>Import</button>
                </div>
            )
        }

        return (
            <div>
                <p> Private Key Found!</p><br/>
                <div>
                    <p>Import Private Key</p>
                    <input value={privatekey} onChange={(e)=> setPrivatekey(e.target.value)} placeholder="Private key..." />                    
                    <button onClick={hangleImportPrivateKey}>Import</button>
                </div>
            </div>

        )
    }

    
        
    return (
        <div>
            <div>
                <h3>Login User</h3>
                <input value={username} onChange={(e)=> setUsername(e.target.value)} placeholder="Username..." /> <br/>
                <input value={tokenValue} onChange={(e)=> setTokenValue(e.target.value)} placeholder="Token Value" /> <br/>
                <button onClick={handleLogin}>Login</button>
            </div>
            <CheckForPrivateKey/>
            <div>
                <h3>Generate Crytpo Materials For user </h3>                
                <label>Private Key : {privatekey}</label> <br/>
                <label>Public Key: {publickey}</label>< br/>
                <button onClick={handleGenerateCrytpo}>Generate Crytpo</button>
            </div>

            <div>
                <h3>Create User</h3>
                <input value={username} onChange={(e)=> setUsername(e.target.value)} placeholder="Username..." /> <br/>
                <input value={name} onChange={(e)=> setName(e.target.value)} placeholder="Name..." /> <br/>
                <input value={tokenValue} onChange={(e)=> setTokenValue(e.target.value)} placeholder="Token Value" /> <br/>
                
                <button onClick={handleCreateUser}>Create User</button> <br/>

                <label>Return User Address <br/> <b>{userAddress} </b> </label>

            </div>           

            <div>
                <h3>Get User Details From Blockchain</h3>
                <input value={userAddress} onChange={(e)=> setUserAddress(e.target.value)} placeholder="User Address..." /> <br/>

                <button onClick={handleGetUserInfo}>Get UserDetails</button>
                <DisplayUserData/>
            </div>
            <div>
                <h3>Get User Details From Blockchain By Username</h3>
                <input value={username} onChange={(e)=> setUsername(e.target.value)} placeholder="Username..." /> <br/>

                <button onClick={handleGetUserInfoUsername}>Get UserDetails</button>
                <DisplayUserData/>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default ManufacturerUserPage
