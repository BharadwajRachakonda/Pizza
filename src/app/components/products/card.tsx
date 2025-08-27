"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { getImageURL } from "@/app/lib/methods";
import { cursive } from "../../../../font";
import CatalogContext from "@/app/context/catalog/catalogcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function Card({
  _id,
  name,
  cost,
  description,
  imageURL,
  item_count,
}: {
  _id: string;
  name: string;
  cost: number;
  description: string;
  imageURL: string;
  item_count: number;
}) {
  const { add, subtract } = useContext(CatalogContext);
  const { replace } = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      key={_id}
      className="flex flex-col items-center justify-between gap-2 bg-gray-400/65 rounded-4xl w-80 h-80"
    >
      <div
        onClick={() => {
          const URLParams = new URLSearchParams({
            _id,
            name,
            cost: cost.toString(),
            description,
            imageURL,
          }).toString();
          replace(`/products?${URLParams}`);
        }}
        className="flex items-center gap-2 rounded-t-4xl justify-center bg-black w-full h-10 cursor-pointer"
      >
        <h2 className={`${cursive.className} antialiased`}>{name}</h2>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </div>

      <Image src={getImageURL(imageURL)} alt={name} width={200} height={200} />
      <div className="flex items-center justify-around w-full h-16 bg-black rounded-b-4xl">
        <p className="bg-white text-black p-2 rounded-full">${cost}</p>
        <div className="flex items-center px-2 bg-white text-black rounded-full font-bold">
          <button
            onClick={async (e) => {
              e.preventDefault();
              await subtract(_id);
            }}
            className="p-2 cursor-pointer"
          >
            -
          </button>
          <span className="p-2 inline-block text-white bg-black">
            {item_count || 0}
          </span>
          <button
            onClick={async (e) => {
              e.preventDefault();
              await add(_id);
            }}
            className="p-2 cursor-pointer"
          >
            +
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
