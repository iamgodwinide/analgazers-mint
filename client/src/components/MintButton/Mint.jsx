import { useEffect, useRef, useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import newcontract from './Newcontract.json';
import { useAlert } from 'react-alert';
import { Progress } from 'reactstrap'

const newcontractAddress = "0x17cC48c7e5C2D76b371cC4FbB96C2F91470fEe41";

const Mint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const [freemintAmount] = useState(1);
    const [totalSupply, settotalSupply] = useState("0");
    const [maxSupply, setMaxSupply] = useState("0");
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState(0);
    const audio = useRef();
    const alert = useAlert();

    async function handleMint() {
        playAudio();
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                newcontractAddress,
                newcontract,
                signer
            );
            const cost = await contract.cost();
            console.log("cost ---- ", cost)
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther( mintAmount > 1 ? (price * mintAmount).toFixed(3) : 0 )
                });
                alert.success("minted successfully");
                console.log(response);
            } catch (err) {
                alert.error(err?.reason);
                console.log("error: ", err)
            };
        };
    };

    async function handlefreeMint() {
        playAudio();
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                newcontractAddress,
                newcontract,
                signer
            );
            try {
                const value = ethers.utils.parseEther((0).toString())
                const response = await contract.mint(BigNumber.from(freemintAmount), {
                    value
                });
                alert.success("minted successfully");
                console.log(response)
            } catch (err) {
                alert.error(err?.reason);
                console.log("error: ", err)
            };
        };
    };

    // for getting price
    const getPrice = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            newcontractAddress,
            newcontract,
            signer
        );
        const cost = await contract.cost();
        const truncatedPrice = (cost / 1000000000000000000)
        setPrice(truncatedPrice)
    }

    //for getting the total supply
    async function gettotalsupply() {
        try {
            // Get the provider from web3Modal, which in our case is MetaMask
            // No need for the Signer here, as we are only reading state from the blockchain
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // We connect to the Contract using a Provider, so we will only
            // have read-only access to the Contract
            const contract = new ethers.Contract(
                newcontractAddress,
                newcontract,
                signer
            );
            // call the tokenIds from the contract
            const _totalsupply = await contract.totalSupply();
            const _maxsupply = await contract.maxSupply();
            //_tokenIds is a `Big Number`. We need to convert the Big Number to a string
            settotalSupply(_totalsupply.toString());
            setMaxSupply(_maxsupply.toString());
            setLoading(false);
            setTimeout(gettotalsupply, 5000)
        } catch (err) {
            setTimeout(gettotalsupply, 5000);
            console.error(err);
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
        playAudio();
    };
    const handleIncrement = () => {
        if (mintAmount >= 10) return;
        setMintAmount(mintAmount + 1);
        playAudio();
    };

    // connect button
    async function connectAccount() {
        playAudio();
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }

    async function disconnectAccount() {
        setAccounts([]);
        playAudio();
    }

    const mint = () => {
        playAudio();
        if (mintAmount > 1) {
            handleMint();
        } else {
            handlefreeMint();
        }
    }

    const playAudio = () => {
        const audio = new Audio(`/assets/farts/fart${Math.floor(Math.random()*12)+1}.mp3`);
        audio.play()
    }

    useEffect(() => {
        if (accounts[0]) gettotalsupply();
        getPrice();
    }, [accounts])


    return (
        <>
        <audio ref={audio} src='/assets/farts/fart4.mp3' preload="auto" />
        {
        typeof accounts[0] !== 'undefined'
        ?
            <div>
                <button onClick={mint} className='mint-button'>
                    <img src='/assets/MINT.png'/>
                </button>
                <div className='buttons-wrap'>
                    <button onClick={handleDecrement}>
                        <img src='/assets/-.png'/>    
                    </button>
                    <h3 className='amount'>
                        {mintAmount}
                    </h3>
                    <button onClick={handleIncrement}>
                        <img src='/assets/+.png'/>    
                    </button>
                </div>

                <div className="bottom-nav">
                    <div className="price-wrap n-item">
                        <h4>Price: { mintAmount > 1 ? (price * mintAmount).toFixed(3) : "Free" }</h4>
                    </div>


                    <div className="supply-wrap n-item">
                        <p className='text-dark tex-center'>
                        {totalSupply}/{maxSupply} Minted
                        </p>
                        <Progress
                            animated
                            className="my-3"
                            color="danger"
                            value={Math.round((totalSupply/maxSupply)*100)}
                            style={{
                                height: "2em",
                                width: "100%",
                                fontSize: "1em",
                                color:"#000"
                            }}
                        >
                        </Progress>
                    </div>
                </div>

            </div>
            
        :
        <div>
            <button onClick={connectAccount} className='mint-button connect'>
                <img src='/assets/poop.png'/>
            </button>
        </div>
        }
        </>
)}

export default Mint;