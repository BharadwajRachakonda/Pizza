"use client";

import React, { useContext, Suspense } from "react";
import { useSearchParams } from "next/navigation"; // ✅ for reading query params
import Image from "next/image";
import { getImageURL } from "../lib/methods";
import CatalogContext from "../context/catalog/catalogcontext";
import { motion } from "framer-motion";

function Page() {
  const MotionImage = motion(Image);
  const searchParams = useSearchParams();
  const { item_count, add, subtract } = useContext(CatalogContext);
  const _id = searchParams.get("_id");
  const name = searchParams.get("name");
  const cost = searchParams.get("cost");
  const description = searchParams.get("description");
  const imageURL = searchParams.get("imageURL");

  return (
    <div className="absolute h-screen w-screen overflow-hidden flex flex-col items-center gap-4">
      <div className="mt-10 text-black flex flex-col gap-4 px-2">
        <p className="max-w-md">{description}</p>
        <h1 className="text-2xl font-bold">{name}</h1>
        <div className="flex justify-between">
          <p>${cost}</p>
          <div className="flex items-center px-2 bg-black text-white rounded-full font-bold">
            <button
              onClick={async (e) => {
                e.preventDefault();
                await subtract(_id);
              }}
              className="p-2 cursor-pointer"
            >
              -
            </button>
            <span className="p-2 inline-block text-black bg-white">
              {item_count[_id!] || 0}
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
          {/* <p>Items in cart: {item_count}</p> */}
        </div>
      </div>
      <MotionImage
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: 20 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        src={getImageURL(imageURL ?? "")}
        alt={name ?? "Product image"}
        fill
        className="relative object-contain translate-y-[50%]"
        priority
      />
    </div>
  );
}

function Final() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}

export default Final;
