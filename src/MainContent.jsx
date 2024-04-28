import React,{useContext} from "react"
import { TransactionContext } from "./utils/TransactionContext";




export default function MainContent() {
  const {handleChange, connectWallet,currentAccount,createCampaign,allCampaigns } = React.useContext(TransactionContext);

  return (
    <section >
    <div className='flex justify-center items-center flex-wrap py-24 w-[80%] mr-auto ml-auto gap-x-44 gap-y-20'>
    <div className="text-xl  text-white w-[45%] gap-16 max-xl:hidden"  >
        <h1 className='text-8xl leading-100 max-xl:text-7xl pb-5'>CrowdFunding<br/>PlatForm:</h1>
        <p>Fueling dreams, fostering innovation, and empowering change—one contribution at a time. Join us in making dreams a reality.</p>
     </div>
    <div className='flex justify-start  flex-col
    blue-glassmorphism px-10 py-5 rounded-md h-[500px] w-[400px]'>
        <h1 className="text-xl mb-3 text-center text-zinc-50">Create Campigne</h1>
    <label className='text-white'>Title</label>
       <input  type="text" placeholder='Enter Title' className='mb-5 rounded-lg px-3 py-2' name='title' onChange={handleChange}/>
       <label className='text-white'>Discription</label>
       <input  type="text" placeholder='Enter Discription' className='mb-5 rounded-lg px-3 py-2' name='descrpition' onChange={handleChange}/>
       <label className='text-white'>Target Amount</label>
       <input  type="number" placeholder='Enter Target Amount 'className='mb-5 rounded-lg px-3 py-2' name='target' onChange={handleChange}/>
       <label className='text-white'>Deadline</label>
       <input  type="date" className='mb-5 rounded-lg px-3 py-2 text-black'  name='deadline' onChange={handleChange}/>
       <button className='bn30 w-[50%] mr-auto ml-auto mt-4' onClick={createCampaign}>Submit</button>
    </div>
    </div>
</section>
  )
}