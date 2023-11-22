"use client"
import { useState } from 'react';
import Buntton from '@/components/Buntton';
import {Menu,Upload,Bell, User, Mic,Search,ArrowLeft} from 'lucide-react'
import Link from '../../node_modules/next/link';

export function PageHeader(){
  const [searchFull, setSearchFull] = useState(false)
  return <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
    <div className={` gap-4 items-center flex-shirink-0 ${searchFull ? "hidden" : "flex"}`}>
      <Buntton variant="ghost" size="icon"><Menu/></Buntton>
      <Link  href='/'><p className="font-sans text-lg #020617">My Tube</p></Link>
    </div>
    <form className={`  gap-4 flex-grow flex-shirink-0 ${searchFull ? "flex" : "  hidden md:flex"}`}>
   {searchFull && (  <Buntton onClick={()=>setSearchFull(false)}  size="icon" variant="ghost">
        <ArrowLeft/>
      </Buntton>)}
      <div className='flex flex-grow max-w-[600px]' > 
        <input placeholder='Search' type="search" className='py-1 px-4 text-lg w-full rounded-l-full border boder-secondary-border shadow-inner  shadow-secondary focus:boder-blue-500 outline-none'/>
        <Buntton className='py-2 px-4 rounded-r-full boder boder-secondary-border boder-l-0 flex-shirink-0'><Search/></Buntton>
      </div>
      <Buntton className='flex-shirink-0' type='button' size="icon"><Mic/></Buntton>

    </form>
    <div className={` flex-shirink-0 md:gap-2 ${searchFull ? "hidden" : "flex"}`}>
      <Buntton onClick={()=>setSearchFull(true)} className='md:hidden' size="icon" variant="ghost">
        <Search/>
      </Buntton>
    
      <Buntton className='md:hidden' size="icon" variant="ghost">
        <Mic/>
      </Buntton>
      <Buntton size="icon" variant="ghost">
        <Upload/>
      </Buntton>
      <Buntton size="icon" variant="ghost">
        <Bell/>
      </Buntton>
      <Buntton size="icon" variant="ghost">
        <User/>
      </Buntton>
    </div>
  </div>
}