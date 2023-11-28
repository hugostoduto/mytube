"use client"
import { useState } from 'react';
import Button from '@/components/Button';
import {Menu,Upload,Bell, User, Mic,Search,ArrowLeft} from 'lucide-react'
import Link from '../../node_modules/next/link';
import { useSidebarcontext } from '@/contexts/SidebarContext';

export function PageHeader(){
  const [searchFull, setSearchFull] = useState(false)
  
  return <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
   <PageHeaderFristSection hidden={searchFull}/>
    <form className={`  gap-4 flex-grow flex-shirink-0 ${searchFull ? "flex" : "  hidden md:flex"}`}>
   {searchFull && (  <Button onClick={()=>setSearchFull(false)}  size="icon" variant="ghost">
        <ArrowLeft/>
      </Button>)}
      <div className='flex flex-grow max-w-[600px]' > 
        <input placeholder='Search' type="search" className='py-1 px-4 text-lg w-full rounded-l-full border boder-secondary-border shadow-inner  shadow-secondary focus:boder-blue-500 outline-none'/>
        <Button className='py-2 px-4 rounded-r-full boder boder-secondary-border boder-l-0 flex-shirink-0'><Search/></Button>
      </div>
      <Button className='flex-shirink-0' type='button' size="icon"><Mic/></Button>

    </form>
    <div className={` flex-shirink-0 md:gap-2 ${searchFull ? "hidden" : "flex"}`}>
      <Button onClick={()=>setSearchFull(true)} className='md:hidden' size="icon" variant="ghost">
        <Search/>
      </Button>
    
      <Button className='md:hidden' size="icon" variant="ghost">
        <Mic/>
      </Button>
      <Button size="icon" variant="ghost">
        <Upload/>
      </Button>
      <Button size="icon" variant="ghost">
        <Bell/>
      </Button>
      <Button size="icon" variant="ghost">
        <User/>
      </Button>
    </div>
  </div>
}
type PageHeaderFristSectionProps = {
  hidden?:boolean
}
export function PageHeaderFristSection({hidden = false}:PageHeaderFristSectionProps) {
  const {toggle} = useSidebarcontext()
  return <div className={` gap-4 items-center flex-shirink-0 ${hidden ? "hidden" : "flex"}`}>
  <Button onClick={toggle} variant="ghost" size="icon" ><Menu/></Button>
  <Link  href='/'><p className="font-sans text-lg #020617">My Tube</p></Link>
</div>
}