const {createContext, CryptoFactory} = require('sawtooth-sdk/signing')
const { Secp256k1PublicKey, Secp256k1PrivateKey } = require('sawtooth-sdk/signing/secp256k1')
const { createHash } =require('crypto')

const GetPublicKeyFromPrivateKey=(privatekey)=>{
    const context = createContext('secp256k1')
    const privateKeyBuffer = Secp256k1PrivateKey.fromHex(privatekey);

    const signer = new CryptoFactory(context).newSigner(privateKeyBuffer) 

    const publicKey = signer.getPublicKey().asHex()

    return publicKey

}
const GenerateCryptoMaterials=()=>{
    const context = createContext('secp256k1')
    const privateKeyBuffer = context.newRandomPrivateKey()
    const privateKey = privateKeyBuffer.asHex()
    
    const signer = new CryptoFactory(context).newSigner(privateKeyBuffer) 

    const publicKey = signer.getPublicKey().asHex()
    
    return {
        privateKey,
        publicKey
    }
}

module.exports = {
    GenerateCryptoMaterials,
    GetPublicKeyFromPrivateKey}