"use client"

import Image from "next/image";
import React, { useState } from 'react'
import Link from 'next/link'
import {ShoppingCart, Menu, CircleUserRound} from 'lucide-react';
import { UserButton, useUser } from "@clerk/nextjs";
import SvgIcon from "@/public/svg/svgIcon";
import useCart from '@/lib/hooks/userCart';

const Navbar = () => {
    const {user} = useUser();
    const [dropdownMenu, setDropdownMenu] = useState(false)
    const cart = useCart();
  return (
    <div className='sticky top-0 z-10 py-2 px-10 flex justify-between items-center bg-white'>
        <Link href='/' className="flex items-center space-x-4">
      <div className='flex items-center justify-center bg-purple-600 rounded-lg p-4 w-16 h-16'>
        <SvgIcon />
      </div>
      <h1 className=' text-heading2-bold font-bold cursor-pointer'><span className='text-purple-600'>Boutique</span> Loja</h1>
    </Link>
        <div>
            <Link href='/'>Home</Link>
        </div>

        <div className="relative flex gap-3 items-center">
            <Link href='/cart' className='flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white'>
            <ShoppingCart />
            <p className='text-base-bold'>Carrinho ({cart.cartItems.length})</p>
            </Link>

           {user && <Menu className='cursor-pointer' onClick={()=> setDropdownMenu(!dropdownMenu)} />} 

            {user && dropdownMenu && (
                <div className='absolute top-10 right-5 flex flex-col gap-2 rounded-lg border bg-white text-base-bold'>
                    <Link href='/wishlist' className='hover:text-purple-600'>Favoritos</Link>
                    <Link href='/orders' className='hover:text-purple-600'>Pedidos</Link>
                </div>
            )}

            {user ? 
            (<UserButton afterSignOutUrl="/sign-in" />
            ) : (<Link href='sign-in'>
                <CircleUserRound />
            </Link>
        )}
        </div>
    </div>
  )
}

export default Navbar