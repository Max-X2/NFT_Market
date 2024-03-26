import Posts from '@/components/Posts'
import Trending from '@/components/Trending'

export default function Home() {
  return (
    <main className="ml-[300px] flex justify-center">
      <Posts />
      <Trending />
    </main>
  )
}
