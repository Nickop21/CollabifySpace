"use client";
import React, { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { getClerkUsers, getDocumentUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";

const Provider = ({ children }: { children: ReactNode }) => {
  const  {user:clerkUsers}=useUser()
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users;
      }}
    //  mention functionality 
      resolveMentionSuggestions={async({text,roomId})=>{
        const roomUsers=await getDocumentUsers({
          roomId,
          currentUser:clerkUsers?.emailAddresses[0].emailAddress!,
          text})
          return roomUsers;
      }}
    >
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
