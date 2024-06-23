"use client"

import Image from "next/image";
import React, { useState } from 'react'
import Link from 'next/link'
import {ShoppingCart, Menu, CircleUserRound, Search} from 'lucide-react';
import { UserButton, useUser } from "@clerk/nextjs";
import SvgIcon from "@/public/svg/svgIcon";
import useCart from '@/lib/hooks/userCart';
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname() 
    const {user} = useUser();
    const [dropdownMenu, setDropdownMenu] = useState(false)
    const cart = useCart();
    const [query, setQuery] = useState("");
    const router = useRouter()

  return (
    <div className='sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2'>
        <Link href='/' className="flex items-center space-x-4">
      <div className='flex items-center justify-center bg-purple-600 rounded-lg p-4 w-16 h-16 md:ml-2'>
        <SvgIcon  />
      </div>
      <h1 className=' text-heading2-bold font-bold cursor-pointer max-md:hidden'><span className='text-purple-600 '>Boutique</span> <span >Loja</span></h1>
    </Link>
        <div className='flex gap-4 text-base-bold max-lg:hidden'>
            <Link href='/'  className={`hover:text-purple-600 ${
            pathname === "/" && "text-purple-600"
          }`}>Home</Link>
            <Link href={user ? '/wishlist' : '/sign-in'}  className={`hover:text-purple-600 ${
            pathname === "/wishlist" && "text-purple-600"
          }`} >Favoritos</Link>
            <Link href={user ? '/orders' : '/sign-in'}  className={`hover:text-purple-600 ${
            pathname === "/orders" && "text-purple-600"
          }`} >Pedidos</Link>
        </div>

        <div className=' flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg'>
          <input className='outline-none max-sm:max-w-[120px]' placeholder="Pesquisar..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <button disabled={query === ""} onClick={() => router.push(`/search/${query}`)} >
            <Search className='cursor-pointer h-4 w-4 hover:text-purple-600' />
          </button>
        </div>

        <div className="relative flex gap-3 items-center">
            <Link href='/cart' className='flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-md:hidden'>
            <ShoppingCart />
            <p className='text-base-bold'>Carrinho ({cart.cartItems.length})</p>
            </Link>

            <Menu className='cursor-pointer lg:hidden' 
            onClick={()=> setDropdownMenu(!dropdownMenu)} />

            {dropdownMenu && (
                <div className='absolute top-12 right-5 flex flex-col gap-4 rounded-lg border bg-white text-base-bold p-4 lg:hidden'>
                    <Link href='/wishlist' className='hover:text-purple-600'>Favoritos
                    </Link>
                    <Link href='/orders' className='hover:text-purple-600'>Pedidos
                    </Link>
                    <Link href='/cart' className='flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white'>
                  <ShoppingCart />
                   <p className='text-base-bold'>Carrinho ({cart.cartItems.length})</p>
                  </Link>

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