import React from 'react'
import '@/styles/trending.css'
const Trending = () => {
  return (
    <div className="bg-[#1c1c24] rounded-[20px] p-4 w-[250px] h-[400px] ml-10 text-[whitesmoke] trending">
      <h1 className="bg-[#1c1c24] ">Trending</h1>
      <ul className="bg-[#1c1c24]">
        <li>
          <p>1. #NFT</p>
        </li>
        <li>
          <p>2. #ReactJS</p>
        </li>
        <li>
          <p>3. #JavaScript</p>
        </li>
        <li>
          <p>4. #WebDevelopment</p>
        </li>
        <li>
          <p>5. #Coding</p>
        </li>
        <li>
          <p>6. #TechNews</p>
        </li>
      </ul>
    </div>
  )
}

export default Trending
