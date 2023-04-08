import React, {useRef, useState} from 'react'
import Mint from './components/MintButton/Mint'

function App() {
  const [accounts, setAccounts] = useState([]);


  async function connectAccount() {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setAccounts(accounts);
    }
}


  return (
    <div>
      <img className='bg-img' src='/assets/MINT PAGE background.png'/>
      
      <nav>
        <ul>
          <li>
            <a href="#">
              <img src='/assets/opensea.png'/>
            </a>
          </li>
          <li>
            <a target="_blank" 
                href="https://twitter.com/AnalGazers">
              <img src='/assets/twitter.png'/>
            </a>
          </li>
        </ul>
        {
         typeof accounts[0] == 'undefined'
         &&
         <button onClick={connectAccount} className='nav-connect'>
          <img src='/assets/poop.png'/>
        </button>
        }
      </nav>

      {/* mint button */}

      <Mint accounts={accounts} setAccounts={setAccounts} />
    </div>
  )
}

export default App