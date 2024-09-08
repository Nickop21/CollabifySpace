"use client";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { createdocument } from "@/lib/actions/room.actions";
import { useRouter } from "next/navigation";

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();
  const addDocumentHandler = async () => {
    try {
      const room = await createdocument({ userId, email });
      if (room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`w-full  rounded-xl border-dashed border-2 p-8 md:p-4 border-[#CEC4EB]  flex items-center justify-center flex-col 
   `}
    >
      <img src="/assets/astronaut.svg" alt="astronaut" />

      <Button
        type="submit"
        className=" flex gap-4 p-4  rounded-lg  shadow-lg bg-[#6947BF] shadow-gray-300  hover:bg-slate-700 "
        onClick={addDocumentHandler}
      >
        <div>
          <Image
            src={"/assets/icons/add.svg"}
            alt="add"
            width={24}
            height={24}
          />
        </div>
        <p
          className={`  text-[#E5ECF3] font-extrabold text-[16px] cursor-pointer  `}
        >
          Start a blank document
        </p>
      </Button>
    </div>
  );
};

export default AddDocumentBtn;
