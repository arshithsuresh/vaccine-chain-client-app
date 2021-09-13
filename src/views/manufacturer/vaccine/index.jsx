import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import api from "../../../api/index"

const {ORG_NAME,ORG_TYPE} = require('../../../core/constant')

const GenerateCryptoMaterials = require('../../../utils/generateKey')

const SignTransaction = require('../../../utils/signing')

const {GetPublicKeyFromPrivateKey} = require('../../../utils/generateKey')

function ManufacturerVaccinePage(){    

    const [batchId,setBatchId] = useState("")
    const [vaccineCount,setVaccineCount] = useState(12)

    const [manufactureDate,setManufactureDate] = useState()
    const [expiryDate,setExpirtDate] = useState("")
    const [transferDate, setTransferDate] = useState("")

    const [latitude,setLatitude] = useState("9.28")
    const [longitude, setLongitude] = useState("76.5")

    const [manufacturer, setManufacturer] = useState("")
    const [manufactureruser, setManufacturerUser] = useState("")
    const [vaccineowner, setVaccineOwner] = useState("")


    const [username,setUsername] = useState("")   
    const [privatekey,setPrivatekey] = useState("")
    const [publickey,setPublicKey] = useState("")
    const [monitorData, setMonitorData] = useState()

    const [currentPage, setCurrentPage] = useState(0)

    const [transferAddress, setTransferAddress] = useState("")

    useEffect(()=>{
        const LocalPrivateKey = localStorage.getItem("privatekey")
        if(LocalPrivateKey)
            {
                setPrivatekey(LocalPrivateKey)
            }
    },[])

    const handleCreateVaccine = async(e)=>{

        e.preventDefault();

        const requestTTL = Date.now() + 600000

        const vaccineData = {
            action:"create",
            batchid: batchId,
            count: vaccineCount,
            manufactureDate,
            expiryDate,
            location:{
                lat: latitude,
                long: longitude
            }

        }

        const signature = SignTransaction(vaccineData)

        const payload = {
            username: username,
            data: vaccineData,
            signature: signature
        }
        
        try {

            const result = await api.post("/manufacturer/vaccine/create", payload);
            

        } catch (error) {
            
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
                alert("Login Successfull")
                setCurrentPage(1)
            }
        }
        catch(error)
        {
            alert("Login Failed! Authentication Failed")
            console.log(error)
        }
        

    }

    const handleGetVaccineDetails = async ()=>{

        try {

            const result = await api.get("/manufacturer/getbatch/"+batchId)
            if(result.status == 200)
            {  
                const returnData = result.data
                console.log(returnData)

                setBatchId(returnData.data.batchId)
                setVaccineCount(returnData.data.count)
                setManufactureDate(returnData.data.manufactureDate)
                setExpirtDate(returnData.data.expiryDate)
                setManufacturer(returnData.data.manufacturer)
                setManufacturerUser(returnData.data.manufactureruser)
                setLongitude(returnData.data.location.long)
                setLatitude(returnData.data.location.lat)
                setVaccineOwner(returnData.data.owner)
                setMonitorData(returnData.data.monitordata)
            }
            else
            {
                alert("Invalid BatchId");
            }

        } catch (error) {
            console.log(error)
            alert("Invalid BatchId");
        }

    }

    const handleTransferVaccine = async ()=>{

        try {
            
            const data= {
                action:"transfer",
                userid: username,
                tranferaddress: transferAddress,
                batchId : batchId,
                location:{
                    lat: latitude,
                    long: longitude
                }
            }

            const signature = SignTransaction(data)

            const payload = {
                username: username,
                payload: data,
                signature: signature
            }

            const result = await api.post("/manufacturer/vaccine/transfer", payload)

        } catch (error) {
            
        }
    }
    const handleGoToCreatePage =()=>{

        setCurrentPage(2)
    }

    const handleGoToTransferPage =()=>{

        setCurrentPage(3)
    }

    const handleGoToGetVaccinePage =()=>{

        setCurrentPage(4)
    }

    
    
    if(currentPage == 0) //Login 
    {
        return (
            <>
            <div>
                <h3>Login User</h3>
                <p> Username <input value={username} onChange={(e)=> setUsername(e.target.value)} placeholder="Username..." /> </p>
                <p> Private Key <input disabled value={privatekey} onChange={(e)=> setPrivatekey(e.target.value)} placeholder="Token Value" /> </p>
                <button onClick={handleLogin}>Login</button><Link to="/manufacturer/user">Create User</Link>
            </div>
            <div>
                <p>Import Private Key</p>
                <input value={privatekey} onChange={(e)=> setPrivatekey(e.target.value)} placeholder="Private key..." />                    
                <button onClick={hangleImportPrivateKey}>Import</button>
            </div>
            </>
        )

    }
    else if(currentPage == 1) // List Functions
    {
        return(
            <>
                <button onClick={ handleGoToCreatePage } > Create Vaccine  </button>
                <button onClick={ handleGoToTransferPage } > Transfer Vaccine  </button>
                <button onClick={ handleGoToGetVaccinePage } > Get Vaccine Details  </button>

            </>
        )
    }
    else if(currentPage == 2) // Create Vaccine
    {
        
        return (
        <>
        
        <div style={{display:"block"}}>
            <h3> Create Vaccine</h3>
            <p>Batch Id : <input value={batchId} onChange={(e)=>setBatchId(e.target.value)} /> </p>
            <p>Vaccine Count : <input value={vaccineCount} onChange={(e)=>setVaccineCount(e.target.value)} /> </p>
            <p>Manufacture Date : <input type={"date"} value={manufactureDate} onChange={(e)=>setManufactureDate(e.target.value)} /> </p>
            <p>Expiry Date : <input type={"date"} value={expiryDate} onChange={(e)=>setExpirtDate(e.target.value)} /> </p>
            <h4>Location</h4>
            <p>Lat : <input value={latitude} onChange={(e)=>setLatitude(e.target.value)} /> </p>
            <p>Lat : <input value={longitude} onChange={(e)=>setLongitude(e.target.value)} /> </p>
            
            <button onClick={handleCreateVaccine}>Create Vaccine</button>
        </div>
        <br/>
        <br/>
        <button onClick={ handleGoToCreatePage } > Create Vaccine  </button>
        <button onClick={ handleGoToTransferPage } > Transfer Vaccine  </button>
        <button onClick={ handleGoToGetVaccinePage } > Get Vaccine Details  </button>
        </>
        )

    }
    else if(currentPage == 3) // Transfer Vaccine
    {
        return (
            <>
                <div style={{display:"block"}}>
                <h3>Transfer Vaccine </h3>
                <p>Vaccine Batch Id : <input value ={batchId} onChange={(e)=> setBatchId(e.target.value)}/> </p>
                <p>Transfer Address : <input value={transferAddress} onChange={(e)=> setTransferAddress(e.target.value)} /> </p>
                <p><input type="date" value={transferDate} onChange={(e)=> setTransferDate(transferDate)} /></p>
                <h4>Location</h4>
                <p>Lat : <input value={latitude} onChange={(e)=>setLatitude(e.target.value)} /> </p>
                <p>Lat : <input value={longitude} onChange={(e)=>setLongitude(e.target.value)} /> </p>
                <button onClick={handleTransferVaccine} > Tranfer Vaccine</button>
                </div>
                <br/>
                <br/>
                <button onClick={ handleGoToCreatePage } > Create Vaccine  </button>
                <button onClick={ handleGoToTransferPage } > Transfer Vaccine  </button>
                <button onClick={ handleGoToGetVaccinePage } > Get Vaccine Details  </button>
            </>
        )

    }
    else if(currentPage == 4) // Get Vaccine Details

    return(
        <>    
        
        <div>
            <h3>Get Vaccine Details</h3>
            <p>Batch Id: <input value={batchId} onChange={(e)=> setBatchId(e.target.value)} /></p>
            <button onClick={handleGetVaccineDetails} >Get Vaccine Details</button>
            <p>Batch Id : {batchId} </p>
            <p>Vaccine Count : {vaccineCount}  </p>
            <p>Manufacture Date : {manufactureDate}  </p>
            <p>Expiry Date : {expiryDate}  </p>
            <h4>Location</h4>
            <p>Lat : {latitude}  </p>
            <p>Lat : {longitude}  </p>
            <b>Monitor Data</b>
            <p> { JSON.stringify(monitorData)} </p>
        </div>
        <br/>
        <br/>
        <button onClick={ handleGoToCreatePage } > Create Vaccine  </button>
        <button onClick={ handleGoToTransferPage } > Transfer Vaccine  </button>
        <button onClick={ handleGoToGetVaccinePage } > Get Vaccine Details  </button>
        </>
    )

}

export default ManufacturerVaccinePage