'use client'
import '@/styles/navbar.css'
import { CiSearch } from 'react-icons/ci'
// import { MetaMaskProvider } from "@metamask/sdk-react";
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
const Navbar = () => {
  return (
    <div>
      {' '}
      <div className="navbar">
        <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px] ">
          <input
            type="text"
            placeholder="Search for Projects"
            className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
          />

          <div className="w-[72px] h-full rounded-[20px] bg-[#5b205f] flex justify-center items-center cursor-pointer text-white">
            <CiSearch style={{ backgroundColor: '#5b205f' }} size={20} />
          </div>
        </div>
        <div className="profile">
          <Link href="/account">
            <Avatar className="w-[70px] h-[70px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
