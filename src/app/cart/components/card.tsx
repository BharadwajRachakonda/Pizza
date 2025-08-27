"use client";
import React, { useContext } from "react";
import { getItem } from "../../lib/methods";
import ErrorContext from "@/app/context/error/errorcontext";

interface CardProps {
  item: string;
  count: number;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
}

function Card({ item, count, setTotalAmount }: CardProps) {
  const { setError } = useContext(ErrorContext);
  const [itemData, setItemData] = React.useState<any>(null);
  const [error, setErrorState] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    getItem(item).then((data) => {
      if (isMounted) {
        if (data.error) {
          setError(data.error);
          setErrorState(data.error);
        } else {
          setItemData(data);
          setTotalAmount((prev) => prev + data.cost * Number(count));
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [item, count]);

  if (error || !itemData) return null;

  return (
    <div
      key={String(item)}
      className="flex justify-between items-center backdrop-blur-3xl backdrop-brightness-50 shadow-md rounded-2xl p-5 hover:shadow-lg transition"
    >
      <div>
        <h3 className="text-lg font-semibold text-white p-2">
          {itemData.name}
        </h3>
        <p className="text-sm text-gray-300/65 p-2">
          Quantity: {String(count)}
        </p>
      </div>
      <div className="text-right">
        <p className="text-gray-300/65 p-2">₹{itemData.cost}</p>
        <p className="text-green-600 font-bold rounded-full bg-white p-2">
          ₹{Math.round(itemData.cost * Number(count) * 100) / 100}
        </p>
      </div>
    </div>
  );
}

export default Card;
