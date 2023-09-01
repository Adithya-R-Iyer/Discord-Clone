import Image from 'next/image'
import { Button } from "@/components/ui/button"


export default function Home() {
  return (
    <div className='flex flex-col'>
      <p className='text-3xl font-bold text-indigo-500'>Discord CLone</p>
      <Button variant='destructive'>Button</Button>
    </div>
  )
}
