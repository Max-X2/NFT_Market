'use client'
import '@/styles/cards.css'
import { Badge } from '@/components/ui/badge'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { Button } from './ui/button'

const Card = () => {
  return (
    <div className="card">
      <div className="info flex bg-[#1c1c24] text-[whitesmoke]">
        <p className="mr-[10px] bg-[#1c1c24]  ">u/username</p>{' '}
        <p className="bg-[#1c1c24] text-[smokewhite] text-sm">12:00 AM</p>
      </div>
      <img src="/monkey.avif" />
      <div className="options">
        <Badge style={{ padding: '10px' }}>
          <button>
            <FaArrowUp
              style={{
                color: 'whitesmoke',
                fontSize: '25px',
                padding: '5px',
                backgroundColor: 'transparent',
              }}
            />{' '}
          </button>
          <p style={{ color: 'whitesmoke', fontSize: '25px' }}>|</p>
          <button>
            <FaArrowDown
              style={{
                color: 'whitesmoke',
                fontSize: '25px',
                padding: '5px',
                backgroundColor: 'transparent',
              }}
            />
          </button>
        </Badge>
        <Button>Buy</Button>
      </div>
    </div>
  )
}

export default Card
