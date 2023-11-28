import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Home,
  Library,
  PlaySquare,
  Repeat,
  History,
  ListVideo,
  Flame,
  ShoppingBag,
  Music2,
  Film,
  Radio,
  Gamepad2,
  Newspaper,
  Trophy,
  Lightbulb,
  Shirt,
  Podcast,
} from "lucide-react"
import React, {  Children, ElementType,ReactNode,useState} from 'react'
import Button, { buttonStyles } from './Button'
import { twMerge } from 'tailwind-merge'
import { playlists, subscriptions } from '@/data/sidebar'
import { useSidebarcontext } from '@/contexts/SidebarContext'
import { PageHeaderFristSection } from '@/layouts/PageHeader'


const Sidebar = () => {
  const {isLargeOpen, isSmallOpen, close} = useSidebarcontext()
  return (
    <>
    <aside   className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}>
      <SmallSidebarItem IconOrImgUrl={Home} title="Home" url='/'/>
      <SmallSidebarItem IconOrImgUrl={Repeat} title="Shorts" url='/shorts'/>
      <SmallSidebarItem IconOrImgUrl={Clapperboard} title="Subscriptions" url='/shorts'/>
      <SmallSidebarItem IconOrImgUrl={Library} title="Library" url='/shorts'/>

    </aside>
    {isSmallOpen && (
      <div onClick={close} className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"/>
    )}
    <aside className={`w-56 lg:sticky absolute top-0 overflow-auto scrollbar-hidden pb-4 flex-col gap-2 px-2  ${isLargeOpen ? "lg:flex": "lg:hidden"}  ${isSmallOpen ? "flex z-[999] bg-white max-h-screen": "hidden"}`}>
      <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white"><PageHeaderFristSection/></div>
      <LargeSidebarSection title='' >
        <LargeSidebarItems  isActive={true} IconOrImgUrl={Home} title="Home" url='/'/>
        <LargeSidebarItems isActive IconOrImgUrl={Clapperboard} title="Subscription" url='/'/>
      </LargeSidebarSection>
      <hr/>
      <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItems
            IconOrImgUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSidebarItems
            IconOrImgUrl={History}
            title="History"
            url="/history"
          />
          <LargeSidebarItems
            IconOrImgUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItems
            IconOrImgUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map(playlist => (
             <LargeSidebarItems
             key={playlist.id}
             IconOrImgUrl={ListVideo}
             title={playlist.name}
             url="/playlist?list=WL"
           />
          ))}
      </LargeSidebarSection>
      <hr/>
      <LargeSidebarSection title='Sbscription' >
        {subscriptions.map(subscription => (
             <LargeSidebarItems
             key={subscription.id}
             IconOrImgUrl={subscription.imgUrl}
             title={subscription.channelName}
             url={`@/${subscription.id}`}
           />
        ))}
      </LargeSidebarSection>
      <hr/>
      <LargeSidebarSection title='Explore' >
      <LargeSidebarItems
            IconOrImgUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItems
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItems IconOrImgUrl={Music2} title="Music" url="/music" />
          <LargeSidebarItems
            IconOrImgUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSidebarItems IconOrImgUrl={Radio} title="Live" url="/live" />
          <LargeSidebarItems
            IconOrImgUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
          <LargeSidebarItems IconOrImgUrl={Newspaper} title="News" url="/news" />
          <LargeSidebarItems
            IconOrImgUrl={Trophy}
            title="Sports"
            url="/sports"
          />
          <LargeSidebarItems
            IconOrImgUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSidebarItems
            IconOrImgUrl={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSidebarItems
            IconOrImgUrl={Podcast}
            title="Podcasts"
            url="/podcasts"
          />
      </LargeSidebarSection>
    </aside>
    </>
  )
}

export default Sidebar

type SmallSidebarItemProps = {
  IconOrImgUrl: ElementType | string,
  title: string,
  url: string
}


function SmallSidebarItem({IconOrImgUrl, title, url}:SmallSidebarItemProps) {
  return(
    <a href={url} className={twMerge( buttonStyles({variant: 'ghost'}),"py-4 px-1 flex flex-col items-center rounded-lg gap-1")}>
      <IconOrImgUrl className="w-6 h-6"/>
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
    const ButtonIconOrImgUrl = isExpend ? ChevronUp : ChevronDown
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
          <ButtonIconOrImgUrl className="w-6 h-6" />
          <div>{isExpend ? 'Show Less' : 'Show More'}</div>
        </Button>
      )}
    </div>
  )
}
type LargeSidebarItemsProps = {
  IconOrImgUrl: ElementType,
  title:string,
  url: string,
  isActive: boolean
}

function LargeSidebarItems({IconOrImgUrl, title, url, isActive= false}:LargeSidebarItemsProps) {
  return(
    <a href={url} className={twMerge( buttonStyles({variant: 'ghost'}),`w-full flex items-center rounded-lg gap-4 p-3${isActive ? "font-bold bg-natural-100 hover:bg-secondary" : undefined}`)}>
      {typeof IconOrImgUrl === 'string' ? <img className='h-6 w-6 rounded-full' alt={IconOrImgUrl}  src={IconOrImgUrl} /> : (

      <IconOrImgUrl className="w-6 h-6"/>
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
    </a>
  )
}