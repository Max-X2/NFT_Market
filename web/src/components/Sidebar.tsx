'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import '@/styles/sidebar.css'
import Link from 'next/link'

import { FiHome } from 'react-icons/fi'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineAccountBalanceWallet, MdOutlineExplore } from 'react-icons/md'

const Sidebar = () => {
  return (
    <div>
      <div className="sidebar">
        <div className="logo">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="logo-heading">
            <h1>SocioMarket</h1>
          </div>
        </div>

        <div className="links">
          <p>Socio-market</p>
          <ul>
            <li>
              <FiHome style={{ marginRight: '5px' }} />
              <Link href="/home">Home</Link>
            </li>
            <li>
              <MdOutlineExplore style={{ marginRight: '5px' }} />
              <Link href="/home/explore">Explore</Link>
            </li>
            <li>
              <IoIosAddCircleOutline style={{ marginRight: '5px' }} />
              <Link href="/home/newpost">Add</Link>
            </li>
          </ul>
          <p>Account</p>
          <ul>
            <li>
              <MdOutlineAccountBalanceWallet style={{ marginRight: '5px' }} />
              <Link href="/home/account"> My Account</Link>
            </li>
            <li>
              <IoSettingsOutline style={{ marginRight: '5px' }} />
              <Link href="/home/settings">Settings</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
