import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = ({children,className}:HeaderProps) => {
  return (
    <div className={cn('header shadow-sm shadow-white ',className)}>
      <Link href='/' className=''>
      <Image src="/assets/logo.svg" alt='logo' width={180} height={50} className='hidden sm:block'/>
      <Image src="/assets/logo.svg" alt='logo' width={120} height={32} className='sm:hidden'/>
      </Link>
      {children}
    </div>
  )
}

export default Header