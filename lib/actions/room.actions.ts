'user server';
import {nanoid} from 'nanoid'
import { liveblocks } from '../liveblocks';
import { revalidatePath } from 'next/cache';
import { parseStringify } from '../utils';
export const createdocument=async({userId,email}:CreateDocumentParams)=>{
const roomId=nanoid()
try {
    const metadata={
        creatorId:userId,
        email,
        title:'Untitled'
    }
    const usersAccesses:RoomAccesses={
        [email]:['room:write']
    }
    const room = await liveblocks.createRoom(roomId, {
        metadata,
        usersAccesses,
        defaultAccesses: [],
      });

      revalidatePath('/')
      return parseStringify(room) //because serving this from server so to return first parse this
    
} catch (error) {
    console.log(`Error happend while creating a room: ${error}`);
    
}
}