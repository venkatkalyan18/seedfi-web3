import { use } from 'chai';
import React,{createContext, useEffect, useState} from 'react'
import {ethers} from 'ethers'
import { contractABI, contractAddress } from './Constants';


export const TransactionContext = React.createContext();
const{ethereum} = window;

const getEthereumContract =async () => {
    const provider =  new ethers.providers.Web3Provider(window.ethereum)
    const signer =  provider.getSigner();
 

   const contrac = new ethers.Contract(contractAddress, contractABI, signer);

   return contrac;
}

const TransactionProvider = ({children}) => {
    const[currentAccount, setCurrentAccount] = useState('');
    const[formData, setFormData] = useState({title:'', description:'', target:'', deadline:''});
    const[allCampaigns, setAllCampaigns] = useState([]);
    const[ownerCampaigns, setOwnerCampaigns] = useState([]);
    const handleChange = (e) => {
        setFormData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value,
        }))
      
    }

    const getAllCampaigns = async () => {
        const EthContract = await getEthereumContract()
        const campaign = await EthContract.getCampaigns();

        const camapigns = campaign.map((data)=>({
            owner:data.owner,
            title:data.title,
            description: data.description,
            target:ethers.utils.formatEther(data.targetAmount),
            deadline:  new Date(data.deadline.toNumber()).toLocaleString(),
            amountRaised:ethers.utils.formatEther(data.amountCollected.toString()),
            id:parseInt(data.id, 16),
        }))

        setAllCampaigns(camapigns);
       
    }

    const yourCampaigns = async () => {
        const EthContract = await getEthereumContract()
        const campaign = await EthContract.getCampaigns();
        const accounts = await ethereum.request({method:'eth_accounts'});
        let account='';
        if(accounts){
             account = accounts[0]
        }

        const filteredCampaigns = campaign.filter((data)=> account.toUpperCase()===data.owner.toUpperCase());
        const camapigns = filteredCampaigns.map((data)=>({
            owner:data.owner,
            title:data.title,
            description: data.description,
            target:ethers.utils.formatEther(data.targetAmount),
            deadline:  new Date(data.deadline.toNumber()).toLocaleString(),
            amountRaised:ethers.utils.formatEther(data.amountCollected.toString()),
            id:parseInt(data.id, 16),
        }))
        setOwnerCampaigns(camapigns);


    }


    const createCampaign = async () => {
        try {
            if(!window.ethereum) return alert("Please Install Metamask");
            const{title, description, target, deadline} = formData;
            console.log(title, description, target, new Date(deadline).getTime())
            const EthContract = await getEthereumContract();
            const hash = await EthContract.createCampagin(title, description, ethers.utils.parseUnits(target),  new Date(deadline).getTime());
            await hash.wait()
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
        

     }

    const checkIfWalletExists = async () =>{
        try{
            if(!window.ethereum) return alert("Please install Metamask");

            const accounts = await ethereum.request({method:'eth_accounts'});
            if(accounts.length){
                setCurrentAccount(accounts[0]);
                yourCampaigns();
            }else{
                console.log("No accounts");
            }

        }catch(error){
            console.log(error);
            throw new error("No Ethereum object");
        }
    }

    const connectWallet = async () =>{
        try{
            if(!window.ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method:'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
            getAllCampaigns();
            yourCampaigns();
        }catch(error){
            console.log(error);
        }

    }

    const donateToCamapign = async (id,amount) => {
        if(!window.ethereum) return alert("Please install Metamask")
        if(currentAccount.length===0){
            alert("Please Connect to Metamask Wallet")
            return;
        }

        const EthContract = await getEthereumContract();
        const hash = EthContract.donateToCampaign(id,{value: ethers.utils.parseEther(amount.toString())})
        await hash.wait();
        window.location.reload();
    }

    useEffect(()=>{
        checkIfWalletExists();
        getAllCampaigns();
        yourCampaigns();

    },[])

    return(
        <TransactionContext.Provider value={{handleChange, connectWallet, currentAccount,createCampaign,donateToCamapign, allCampaigns,ownerCampaigns}}>
            {children}
        </TransactionContext.Provider>
    )

}

export default TransactionProvider;