import { createContext, ReactNode,useContext,useEffect,useState} from 'react'

type SidebarProviderProps ={
  children: ReactNode
}

type SidebarContextType = {

  isLargeOpen: boolean
  isSmallOpen: boolean
  toggle: () => void
  close: () => void
}
const SidebarContext = createContext<SidebarContextType |  null>(null)
export function useSidebarcontext(){
  const value = useContext(SidebarContext)
  if(value === null) throw Error("Cannot use outside of Sidebar Provider")
  return value

}
export function SidebarProvide({children}:SidebarProviderProps) {
  const [isLargeOpen, setIsLargeOpen] = useState(true)
  const [isSmallOpen, setIsSmallOpen] = useState(false)
  useEffect(()=>{
    const handle = () => {
      if(!isScreenSmall()) setIsSmallOpen(false)
    }
    window.addEventListener('resize', handle)
    return () => {
      window.removeEventListener('resize', handle)
    }
  },[])
  function isScreenSmall(){
    return window.innerWidth < 1024
  }
  function toggle() {
    if(isScreenSmall()){
      setIsSmallOpen(s => !s)
    }
    if(isScreenSmall()){
      setIsLargeOpen(l => !l)
    }
  }

  function close() {
    if(isScreenSmall()){
      setIsSmallOpen(false)
    }
    if(isScreenSmall()){
      setIsLargeOpen(false)
    }
  }


  return <SidebarContext.Provider value={
  {
    isLargeOpen,
    isSmallOpen,
    toggle,
    close
  }
  }>
    {children}
  </SidebarContext.Provider>
}