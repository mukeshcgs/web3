
var Tx = require('ethereumjs-tx').Transaction

// import { Transaction } from '@ethereumjs/tx'
// import Common from '@ethereumjs/common'

const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/dfdb3777dbdf437197002773ab9cf808')

//Metamask Account1 Private Key 
const PRIVATE_KEY_1 = Buffer.from('55723cddcf4b411e3f75201c5b1e52c3432491aa511495c7c5e3482f7803c596', 'hex')
const account1 = '0x44d4cB63bD6D6b5d568C79A1Bb7DEB8A870Ff6d7'

//Matamask Account2 Private Key 
const PRIVATE_KEY_2 = Buffer.from('f0c4bd6d7d8bd1658c8f25a6dc2847f37db9b81ac661cab3f4ece6c2d7a31249', 'hex')
const account2 = '0x33025973381A25FA9346020918E07CC93979728a'

// console.log(web3.eth.accounts.create());

// run  export PRIVATE_KEY_0="your private key" form node console and
// you can get that key here using

// console.log(process.env.PRIVATE_KEY_0)
// console.log(PRIVATE_KEY_1)
// console.log(PRIVATE_KEY_2)

// node app.js

web3.eth.getBalance(account1, (err, bal) => {
    console.log("AC1", web3.utils.fromWei(bal, 'ether'));
})
web3.eth.getBalance(account2, (err, bal) => {
    console.log("AC2", web3.utils.fromWei(bal, 'ether'));
})

web3.eth.getTransactionCount(account1, (err, txCount) => {
    console.log("txCount-1", txCount);
})
web3.eth.getTransactionCount(account2, (err, txCount) => {
    console.log("txCount-2", txCount);

    //Build trans
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: account1,
        value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    }

    //Sign trans
    const tx = new Tx(txObject)
    tx.sign(PRIVATE_KEY_2)

    const serializedTransaction = tx.serialize()
    const raw = '0x' + serializedTransaction.toString('hex')
    // console.log(web3.eth);

    //Broadcast
    web3.eth.sendSignedTransaction(raw)
})