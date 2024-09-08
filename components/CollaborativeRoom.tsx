"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import ActiveCollaborators from "./ActiveCollaborators";
import { Input } from "./ui/input";
import Image from "next/image";
import { updateDocument } from "@/lib/actions/room.actions";
import ShareModal from "./ShareModal";
import Loader from "./Loader";

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
  users,
  currentUserType,
}: CollaborativeRoomProps) => {
  const [documentTitle, setdocumentTitle] = useState(roomMetadata.title);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  function titleEditing() {
    setEditing(!editing);
  }
  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key == "Enter") {
      setLoading(true);
      try {
        if (documentTitle != roomMetadata.title) {
          const updatedDocument = await updateDocument(roomId, documentTitle);
          if (updatedDocument) {
            setEditing(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
        updateDocument(roomId, documentTitle);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [documentTitle]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <Header>
          <div
            ref={containerRef}
            className="flex items-center justify-center flex-col gap-2"
          >
            <div className="flex">
              {editing && !loading ? (
                <Input
                  type=""
                  value={documentTitle}
                  ref={inputRef}
                  placeholder="Enter title"
                  onKeyDown={updateTitleHandler}
                  className="document-title-input"
                  onChange={(e) => setdocumentTitle(e.target.value)}
                  disabled={!editing}
                />
              ) : (
                <p className="document-title">{documentTitle}</p>
              )}
                <div className="flex items-center gap-2">
                  
              {currentUserType === "editor" && !editing && (
                
                <Image
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                  onClick={() => titleEditing()}
                  className="cursor-pointer"
                />
              )}

              {currentUserType !== "editor" && !editing && (
                <p className="view-only-tag ml-2">view only</p>
              )}
              {loading && <p className="text-sm text-gray-400">saving...</p>}
                </div>
            </div>
          </div>
          <div className="flex gap-4 ">
            <ShareModal
              roomId={roomId}
              collaborators={users}
              creatorId={roomMetadata.creatorId}
              currentUserType={currentUserType}
            />
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </Header>
        
        <Editor roomId={roomId} currentUserType={currentUserType} />
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
