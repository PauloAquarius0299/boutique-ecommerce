"use client"

import useCart from "@/lib/hooks/userCart";
import Link from "next/link";
import { useEffect } from "react";

const SuccessPayment = ()=> {
    const cart = useCart();

    useEffect(() => {
        cart.clearCart();
    }, [])

    return (
        <div className='h-screen flex flex-col justify-center items-center gap-5'>
            <p className="text-heading4-bold text-green-600">Pagamento Efetuado com Sucesso!</p>
            <p>Obrigado pela sua preferencia</p>
            <Link href='/'
            className="p-4 border text-base-bold hover:bg-black hover:text-white"
            >
            CONTINUE A COMPRAR
            </Link>
        </div>
    )
}

export default SuccessPayment;