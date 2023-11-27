import React, {  Children, ElementType,ReactNode,useState} from 'react'
import { Home, Repeat, Clapperboard,Library, ChevronUp,ChevronDown,
  History,
  PlaySquare,
  Clock, ListVideo } from 'lucide-react'
import Button, { buttonStyles } from './Button'
import { twMerge } from 'tailwind-merge'
import { playlists } from '@/data/sidebar'


const Sidebar = () => {
  return (
    <>
    <aside className='sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden'>
      <SmallSidebarItem IconOrUrl={Home} title="Home" url='/'/>
      <SmallSidebarItem IconOrUrl={Repeat} title="Shorts" url='/shorts'/>
      <SmallSidebarItem IconOrUrl={Clapperboard} title="Subscriptions" url='/shorts'/>
      <SmallSidebarItem IconOrUrl={Library} title="Library" url='/shorts'/>

    </aside>
    <aside className="w-56 lg:sticky absolute top-0 overflow-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 flex ">
      <LargeSidebarSection title='' >
        <LargeSidebarItems  isActive={true} IconOrUrl={Home} title="Home" url='/'/>
        <LargeSidebarItems isActive IconOrUrl={Clapperboard} title="Subscription" url='/'/>
      </LargeSidebarSection>
      <hr/>
      <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItems
            IconOrUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSidebarItems
            IconOrUrl={History}
            title="History"
            url="/history"
          />
          <LargeSidebarItems
            IconOrUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItems
            IconOrUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map(playlist => (
             <LargeSidebarItems
             key={playlist.id}
             IconOrUrl={ListVideo}
             title={playlist.name}
             url="/playlist?list=WL"
           />
          ))}
      </LargeSidebarSection>
      <hr/>
      <LargeSidebarSection title='Sbscription' >
        <LargeSidebarItems isActive={true} IconOrUrl={Home} title="Home" url='/'/>
        <LargeSidebarItems isActive IconOrUrl={Clapperboard} title="Subscription" url='/'/>
      </LargeSidebarSection>
    </aside>
    </>
  )
}

export default Sidebar

type SmallSidebarItemProps = {
  IconOrUrl: ElementType | string,
  title: string,
  url: string
}


function SmallSidebarItem({IconOrUrl, title, url}:SmallSidebarItemProps) {
  return(
    <a href={url} className={twMerge( buttonStyles({variant: 'ghost'}),"py-4 px-1 flex flex-col items-center rounded-lg gap-1")}>
      <IconOrUrl className="w-6 h-6"/>
      <div className="text-small">{title}</div>
    </a>
  )
}
type LargeSidebarSectionProps = {
  children: ReactNode,
  title?: string,
  visibleItemCount?: number

}
function LargeSidebarSection({children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY
}:LargeSidebarSectionProps) {
    const [isExpend, setIsExpend] = useState(false)
    const chidlrenArray = Children.toArray(children).flat()
    const showExpandButton =chidlrenArray.length > visibleItemCount
    const visibleChildren = isExpend ? chidlrenArray : chidlrenArray.slice(0,visibleItemCount)
    const ButtonIconOrUrl = isExpend ? ChevronUp : ChevronDown
  return (
    <div>
      {title && (
        <div className='ml-4 mt-2 text-lg mb-1  '>{title}</div>
      )}
      {visibleChildren}
      {showExpandButton && ( 
        <Button
        onClick={()=> setIsExpend(e => !e)}
        variant="ghost" className='w-full flex items-center rounded-lg gap-4 p-3' >
          <ButtonIconOrUrl className="w-6 h-6" />
          <div>{isExpend ? 'Show Less' : 'Show More'}</div>
        </Button>
      )}
    </div>
  )
}
type LargeSidebarItemsProps = {
  IconOrUrl: ElementType,
  title:string,
  url: string,
  isActive: boolean
}

function LargeSidebarItems({IconOrUrl, title, url, isActive= false}:LargeSidebarItemsProps) {
  return(
    <a href={url} className={twMerge( buttonStyles({variant: 'ghost'}),`w-full flex items-center rounded-lg gap-4 p-3${isActive ? "font-bold bg-natural-100 hover:bg-secondary" : undefined}`)}>
      <IconOrUrl className="w-6 h-6"/>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
    </a>
  )
}