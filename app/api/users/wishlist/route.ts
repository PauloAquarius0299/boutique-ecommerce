import {NextRequest, NextResponse} from 'next/server';
import {auth} from '@clerk/nextjs/server'
import {connectToDB} from '@/lib/mongoDB';
import User from '@/lib/models/User'

export const POST = async (req: NextRequest) => {
    try{
        const {userId} = auth()

        if(!userId){
            return new NextResponse('Unauthorized', {status:401})
        }

        await connectToDB()

        const user = await User.findOne({clerkId: userId})

        if (!user){
            return new NextResponse('Usuario não encontrado', {status: 404})
        }

        const {productId} = await req.json()

        if(!productId){
            return new NextResponse('Product id required', {status:400})
        }

        const isLiked = user.wishlist.includes(productId)

        if(isLiked){
            //dislike
            user.wishlist= user.wishlist.filter((id: string) => id !== productId)
        } else{
            //like
            user.wishlist.push(productId)
        }
    } catch(err){
        console.log("[wishilist_POST]", err);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}