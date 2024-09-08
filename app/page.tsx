import CollaborativeRoom from "@/components/CollaborativeRoom";
import Header from "@/components/Header";
import AddDocumentBtn from "@/components/AddDocumentBtn";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { getDocuments } from "@/lib/actions/room.actions";
import Link from "next/link";
import { dateConverter } from "@/lib/utils";
import { DeleteModal } from "@/components/DeleteModal";
import Notifications from "@/components/Notifications";
import DocumentCard from "@/components/DocumentCard";

export default async function Home() {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const roomDocument = await getDocuments(
    clerkUser.emailAddresses[0].emailAddress
  );
  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex gap-4 items-center">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      <div className="mx-auto max-w-[1200px] p-4">
        <h1 className="font-bold text-3xl text-[#E5ECF3] text-center">
          Hey Folks! Unsure about the quality of your Document?{" "}
          <span className="text-[#6947BF]">We get you.</span>
        </h1>
        <div className="document-list-empty ">
          <AddDocumentBtn
            userId={clerkUser?.id}
            email={clerkUser?.emailAddresses[0].emailAddress}
          />
        </div>
        {roomDocument.data.length > 0 && (
          <div >
            <h3 className="text-28-semibold">All documents</h3>

            <div className="flex flex-wrap gap-10 w-full py-10">
              {roomDocument.data.map(({ id, metadata, createdAt }: any) => (
                <div className="w-full md:w-[46%]">
                  <DocumentCard
                    id={id}
                    metadata={metadata}
                    createdAt={createdAt}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
