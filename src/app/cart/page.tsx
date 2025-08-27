"use client";
import React, { useContext, useState } from "react";
import UserContext from "../context/user/usercontext";
import CatalogContext from "../context/catalog/catalogcontext";
import ErrorContexts from "../context/error/errorcontext";
import Card from "./components/card";

function Page() {
  const { user } = useContext(UserContext);
  const { item_count } = useContext(CatalogContext);
  const [totalAmount, setTotalAmount] = useState(0);

  console.log("on cart: ", item_count.length);

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen py-10 px-4">
        <h1 className="text-4xl font-bold text-gray-500/65 mb-8">Cart</h1>

        {!user ? (
          <p className="text-red-500 font-medium bg-red-100 px-4 py-2 rounded-lg">
            Please log in to view your cart.
          </p>
        ) : (
          <div className="w-full max-w-md">
            {Object.keys(item_count).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(item_count).map(([item, count]) => {
                  return (
                    <Card
                      key={item}
                      item={item}
                      count={Number(count)}
                      setTotalAmount={setTotalAmount}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center text-lg">
                Your cart is empty 🛍️
              </p>
            )}

            {/* Cart Summary */}
            <div className="flex flex-col gap-4 justify-center items-center mt-8 text-center backdrop-blur-3xl backdrop-brightness-50 shadow-md rounded-2xl p-5 hover:shadow-lg transition">
              <h2 className="text-2xl font-bold text-gray-300/65 mb-2">
                Total Amount
              </h2>
              <p className="text-xl text-green-600 font-semibold p-2 bg-white rounded-full inline-block">
                ₹{Math.round(totalAmount * 100) / 100}
              </p>
              <div className="relative">
                <button className="glass2 flex text-white p-2 px-4 rounded-full bg-sky-500/65 cursor-pointer hover:bg-rose-500/65 transition-colors ease-in duration-300">
                  <div className="z-10">Checkout</div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Page;
