import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import WEB3 from 'web3'

function App() {

  const [block, setBlock] = useState({
    blockNumber: 0,
    dificulty: 0,
    gasPrice: 0,
    latestBlocks: []
  })
  useEffect(() => {
    async function fetchData() {
      // LOAD web3
      let web3 = new WEB3('https://mainnet.infura.io/v3/dfdb3777dbdf437197002773ab9cf808 ')
      //Fetch latestBlock
      let latestBlock = await web3.eth.getBlock('latest')
      //Fetch gasPrice
      let gasPrice = await web3.eth.getGasPrice()

      // if (window.ethereum) {
      //   try { } catch (error) { }
      // }
      // return () => { }
      // UPDATE STATE
      // setTimeout(() => {
      if (gasPrice && latestBlock) {
        setBlock({
          ...block,
          blockNumber: latestBlock.number,
          dificulty: latestBlock.difficulty,
          gasPrice: gasPrice
        })
        // console.log("block", block);
      }
      // }, 1000);
    }
    fetchData();

  }, [block])

  return (
    <div className="App">
      <header className="App-header">
        <p> Latest Block: {block.blockNumber} </p>
        <p> Dificulty: {block.dificulty} </p>
        <p> Gas Price: {block.gasPrice} </p>

      </header>
    </div >
  );
}

export default App;
