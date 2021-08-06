import logo from './logo.svg';
import './App.css';
import API from './api/index'
import {UserContextProvider} from "./context/UserContext"
import Routes from './routes';


const {createContext, CryptoFactory} = require('sawtooth-sdk/signing')
const { Secp256k1PublicKey, Secp256k1PrivateKey } = require('sawtooth-sdk/signing/secp256k1')
const { createHash } =require('crypto')


const SignTesting = async()=>
{
  const context = createContext('secp256k1')
  const privateKeyHex = 'ac3185edd25a530f579a160c5cf1708f0c44ae4ada0f56a86097a11485b10418'
  const privateKey = Secp256k1PrivateKey.fromHex(privateKeyHex)
  const signer = new CryptoFactory(context).newSigner(privateKey)
  
  const transcationData={
    action : "withdraw",
    id : "testuser",
    data :{
      id: "testuser",
      amount : 2000
    }
  }
  
  const publicKey = signer.getPublicKey() 
  
  const hash = createHash('sha256')

  hash.update(JSON.stringify(transcationData))  
  const hashedPayload = hash.digest('hex') 
  const signedPayload = signer.sign(hashedPayload)  
  
  const data = {
    username: 8137856339,
    data: transcationData,
    signature: signedPayload,
  }

  
}

function App() {

  //SignTesting()

  return (
    <UserContextProvider>
      <div>
        <Routes/>
      </div>
    </UserContextProvider>
  );
}

export default App;
