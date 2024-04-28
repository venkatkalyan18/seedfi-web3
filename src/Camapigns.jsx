import React, { useState } from 'react'
import { TransactionContext } from './utils/TransactionContext'
import logo from './assets/download.jpeg'
import sea from './assets/sarah-lee-QURU8IY-RaI-unsplash.jpg'

import { ethers } from 'ethers'


const Camapigns = () => {

const {allCampaigns,currentAccount,ownerCampaigns,donateToCamapign} = React.useContext(TransactionContext);
const[donationAmount, setDonationAmount] = useState('');

const handleChange = (e) => {
    setDonationAmount(e.target.value)

}
  return (
    <section className='gradient-bg-transactions '>
        <div>
        {currentAccount?(<h1 className='text-5xl text-white text-center max-sm:text-4xl'>Latest Campaigns</h1>):<h1 className='text-4xl text-white text-center'>Connect Wallet see latest transactions</h1>}

   
    <div className='w-[80%]  flex flex-wrap justify-center items-center gap-10 mr-auto ml-auto text-white py-10 font-Montserrat'>
        {
            allCampaigns.map((data,i)=>(
                <div className='white-glassmorphism   leading-8 min-w-100 h-[550px] max-sm:text-sm max-sm:w-screen' key={i}>
                    <img src={sea} className='w-[100%] h-[220px] rounded-xl' loading="lazy"/>
                    <div className='flex flex-col p-5'>
                    <p>Deadline : {data.deadline }</p>
                <span>Owner : <a href={`https://sepolia.etherscan.io/address/${data.owner}`} target="_blank">{`${data.owner.slice(0,5)}...${data.owner.slice(36)}`}</a></span>
                <p>Title : {data.title}</p>
                <p>description : {data.description}</p>
                <div className='flex gap-8 mt-2'>

                <p  className='text-sm'>Target Amount: {data.target} ETH</p>
                <p  className='text-sm'>Amount Raised: {data.amountRaised} ETH</p>
                </div> 
                <div className='flex flex-col gap-5 mt-3'>
                <input placeholder='Enter Donation Amount' className=' rounded-lg px-2 py-1 text-black'  type="text" name="donationField" onChange={handleChange}/>
                <button onClick={()=>donateToCamapign(data.id,donationAmount)} className='bn33'>Donate</button>
                </div>
                </div>
               
                </div>
                
            ))
        }
    </div>
    </div>

   


   { currentAccount && <div>
        {currentAccount?(ownerCampaigns.length ? <h1 className='text-5xl text-white text-center max-sm:text-4xl'>Your Campaigns</h1>:<p></p>):''}

   
    <div className='w-[80%]  flex flex-wrap justify-center items-center gap-10 mr-auto ml-auto text-white py-10 font-Montserrat'>
        {
            ownerCampaigns.map((data,i)=>(
                <div className='white-glassmorphism   leading-8 min-w-100 h-[450px] max-sm:text-sm max-sm:w-screen' key={i}>
                    <img src={sea} className='w-[100%] h-[220px] rounded-xl' loading="lazy"/>
                    <div className='flex flex-col p-5'>
                    <p>Deadline : {data.deadline }</p>
                <span>Owner : <a href={`https://sepolia.etherscan.io/address/${data.owner}`}>{`${data.owner.slice(0,5)}...${data.owner.slice(36)}`}</a></span>
                <p>Title : {data.title}</p>
                <p>description : {data.description}</p>
                <div className='flex gap-8 mt-2'>

                <p  className='text-sm'>Target Amount: {data.target} ETH</p>
                <p  className='text-sm'>Amount Raised: {data.amountRaised} ETH</p>
                </div>
               
                </div>
               
                </div>
                
            ))
        }
    </div>
    </div>}
    </section>
    
  )
}

export default Camapigns