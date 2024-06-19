"use client"

import Image from "next/image";
import React, { useState } from 'react'
import Link from 'next/link'
import {ShoppingCart, Menu} from 'lucide-react';
import { useUser } from "@clerk/nextjs";

const Navbar = () => {
    const {user} = useUser();
    const [dropdownMenu, setDropdownMenu] = useState(false)
  return (
    <div className='sticky top-0 z-10 py-2 px-10 flex justify-between items-center bg-white'>
        <Link href='/'>
        <Image src="/logo.png" alt="logo" width={130} height={100} />
        </Link>
        <div>
            <Link href='/'>Home</Link>
        </div>

        <div className="relative flex gap-3 items-center">
            <Link href='/cart' className='flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white'>
            <ShoppingCart />
            <p className='text-base-bold'>Carrinho (0)</p>
            </Link>

           {user && <Menu className='cursor-pointer' onClick={()=> setDropdownMenu(!dropdownMenu)} />} 

            {user && dropdownMenu && (
                <div className='absolute top-10 right-5 flex flex-col gap-2 rounded-lg border bg-white text-base-bold'>
                    <Link href='/wishlist' className='hover:text-purple-600'>Favoritos</Link>
                    <Link href='/orders' className='hover:text-purple-600'>Pedidos</Link>
                </div>
            )}
        </div>
    </div>
  )
}

export default Navbar