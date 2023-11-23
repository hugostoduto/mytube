"use client"
import CategoryPills from '@/components/CategoryPills';
import Sidebar from '@/components/Sidebar';
import VideoGridComponent from '@/components/VideoGridComponent';
import { categories, videos } from '@/data/home';
import { PageHeader } from '@/layouts/PageHeader';
import { useState } from 'react';


export default function Home() {
  
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  
  return (
    <div className="max-h-screen flex flex-col">
     <PageHeader/>
     <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
      <Sidebar/>
      <div className="overflow-x-hidden px-8 pb-4">
        <div className="sticky top-0 bg-white z-10 pb-4">
          <CategoryPills  selectedCategory={selectedCategory} onSelect={setSelectedCategory} categories={categories}/>
        </div>
        <div className="grid gap-4 grid-cols-[reapeat(auto-fill,minmax(300px,1fr))]">
          {videos.map(video => (
            <VideoGridComponent key={video.id} {...video} />
          ))}
        </div>
      </div>
     </div>
    </div>
  )
}
