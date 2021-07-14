import React, {useState, useContext} from 'react'
import api from "../../api/index"

const {ORG_NAME,ORG_TYPE} = require('../../core/constant')

const GenerateCryptoMaterials = require('../../utils/generateKey')

const SignTransaction = require('../../utils/signing')

function VaccinePage(){    

    const handleCreateVaccine= (e)=>{
        e.preventDefault();

        const requestTTL = Date.now() + 600000

        const data = {            
            ttl : requestTTL,
            action: "create",
            
        }
    }

    const [batchId,setBatchId] = useState("")
    const [vaccineCount,setVaccineCount] = useState(12)
    const [manufactureDate,setManufactureDate] = useState()
    const [expiryDate,setExpirtDate] = useState("")
    const [latitude,setLatitude] = useState("9.28")
    const [longitude, setLongitude] = useState("76.5")

    return(
        <div style={{display:"block"}}>
            <h3> Create Vaccine</h3>
            <p>Batch Id : <input value={batchId} onChange={(e)=>setBatchId(e.target.value)} /> </p>
            <p>Vaccine Count : <input value={vaccineCount} onChange={(e)=>setVaccineCount(e.target.value)} /> </p>
            <p>Manufacture Date : <input type={"date"} value={manufactureDate} onChange={(e)=>setManufactureDate(e.target.value)} /> </p>
            <p>Expiry Date : <input type={"date"} value={expiryDate} onChange={(e)=>setExpirtDate(e.target.value)} /> </p>
            <h4>Location</h4>
            <p>Lat : <input value={latitude} onChange={(e)=>setLatitude(e.target.value)} /> </p>
            <p>Lat : <input value={longitude} onChange={(e)=>setLongitude(e.target.value)} /> </p>
            <button>Create Vaccine</button>
        </div>
    )

}

export default VaccinePage