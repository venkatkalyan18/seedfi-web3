import React, { useState } from 'react'
import logo from './assets/logo.c8a4712a.svg'
import close from './assets/close.svg'
import open from './assets/open.svg'
import { TransactionContext } from './utils/TransactionContext'

const Navbar = () => {
    const[toggle, setToggle] = useState(false)
    const{currentAccount,connectWallet} = React.useContext(TransactionContext);

   
  return (
    <nav className='fixed top-0 w-screen flex justify-between items-center px-7 py-3 gradient-bg-welcome border-b-2 border-gray-50 z-50'>
        <img src={logo} alt="Logo" />
        <ul className=" flex items-center gap-16 text-white max-lg:hidden text-xl  ">
            <li className='cursor-pointer' >WhitePapers</li>
            <li className='cursor-pointer'>Project</li>
            <li className='cursor-pointer'>Donation</li>
            <li className='cursor-pointer'>Members</li>
        </ul>
        <button className="bn5 max-lg:px-3 py-2 max-lg:ml-auto mr-10 max-sm:ml-auto max-sm:mr-5" onClick={connectWallet}>{currentAccount ? `${currentAccount.slice(0,5)}....${currentAccount.slice(38)}` : 'Connect Wallet'}</button>
        <img src={open} alt=" open-menu-button" className="img relative hidden max-lg:block" onClick={()=>setToggle(true)}/>
      

        {toggle && <div className="absolute right-0 top-0 blue-glassmorphism p-10">
         
            <ul className=" flex flex-col text-xl gap-16 h-screen justify-start items-center text-stone-50 cursor-pointer">
            <img src={close} width={25} onClick={()=>setToggle(false)} className='img'/>
            <li className='cursor-pointer'>WhitePapers</li>
            <li  className='cursor-pointer'>Project</li>
            <li  className='cursor-pointer'>Donation</li>
            <li  className='cursor-pointer'>Members</li>
           
        </ul>
            
            </div>}
        
    </nav>
  )
}

export default Navbar