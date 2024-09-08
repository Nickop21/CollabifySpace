import React from "react";
import { DeleteModal } from "./DeleteModal";
import { dateConverter } from "@/lib/utils";
import Link from "next/link";

function DocumentCard({ id, metadata, createdAt }: any) {
  const colors = [
    "bg-gradient-to-r from-[#030E1A] via-[#102C46] to-[#B08850]",
    "bg-gradient-to-r from-[#001219] via-[#005F73] to-[#94D2BD]",
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);

  return (
    <div
      className={`border-[rgba(54,54,64,1)] relative md:w-[100%] flex flex-rows gap-5 p-6 rounded-xl border-[1px] ${colors[randomIndex]}  shadow-md transition-all duration-500 animate-fade-in `}
    >
      <div className="h-20 px-2 flex bg-[#FFFFFF] rounded-[8px] border-2 border-[#EAF0F2] ">
        <img src="/assets/paper.svg" alt="paper" className="w-full h-full " />
      </div>
      <div className="w-[100%] relative">
        <div className="absolute -right-5 -top-5   z-10 text-2xl hover:animate-bounce ">
          <DeleteModal roomId={id} />
          
        </div>

          <Link href={`/documents/${id}`}>
        <div className=" w-[85%] cursor-pointer ">
            <h3 className="font-extrabold text-[18px] line-clamp-2 mb-2">
              {metadata.title}
            </h3>
            <span className="bg-[#FFFFFF] rounded-2xl  ">
              <span className="text-[11px] text-black font-semibold p-4">
                 {dateConverter(createdAt)}
              </span>
            </span>
        </div>
          </Link>
      </div>
    </div>
  );
}

export default DocumentCard;
