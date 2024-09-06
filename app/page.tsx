import CollaborativeRoom from "@/components/CollaborativeRoom";
import Header from "@/components/Header";
import AddDocumentBtn from "@/components/AddDocumentBtn";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default async function Home() {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const Document = []; 
  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex">
          Notification
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        
      </Header>
      {Document.length > 0 ? (
        <div></div>
      ) : (
        <div className="document-list-empty">
          <Image
            src="/assets/icons/doc.svg"
            alt="Document"
            width={40}
            height={40}
            className="mx-auto"
          />
          <AddDocumentBtn
            userId={clerkUser?.id}
            email={clerkUser?.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
}
