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
            action: "vaccinate",
            
        }
    }

    const [batchId,setBatchId] = useState("")
    const [vaccineCount,setVaccineCount] = useState(12)
    const [vaccinatedDate,setVaccinatedDate] = useState()
    const [expiryDate,setExpirtDate] = useState("")
    const [latitude,setLatitude] = useState("9.28")
    const [longitude, setLongitude] = useState("76.5")
    const [userid,setuserid] = useState("")

    const handleVaccinated = async()=>{

        const data= {

            batchid:batchId,
            userid:userid,
            date: vaccinatedDate,            
            location:{
                lat:latitude,
                long:longitude
            }
        }
        

        const payload = {
            username:"",
            data: data,
            signature: ""
        }

        try {
            
            const result = await api.post("/vaccinator/vaccinate", payload)
            
            if(result.status==200)
            {

            }
            
        } catch (error) {
            
        }

    }

    return(
        <div style={{display:"block"}}>
            <h3> Vaccinate</h3>
            <p>Batch Id : <input value={batchId} onChange={(e)=>setBatchId(e.target.value)} /> </p>            
            <p>Userid/Mobile : <input value={userid} onChange={(e)=>setuserid(e.target.value)} /></p>

            <p>Date : <input type="date" value={vaccinatedDate} onChange={(e)=>setVaccinatedDate(e.target.value)} /> </p>
            <h4>Location</h4>
            <p>Lat : <input value={latitude} onChange={(e)=>setLatitude(e.target.value)} /> </p>
            <p>Lat : <input value={longitude} onChange={(e)=>setLongitude(e.target.value)} /> </p>
            <button onClick={handleVaccinated}> Vaccinate User</button>
        </div>
    )

}

export default VaccinePage