"use client";
import React, { useContext, useEffect, useState } from "react";
import { getItems } from "@/app/lib/methods";
import CatalogContext from "@/app/context/catalog/catalogcontext";
import Card from "./card";

function Cards() {
  const [items, setItems] = useState<any[]>([]);
  const { item_count } = useContext(CatalogContext);
  console.log("item_count in Cards:", item_count); // ✅ log item_count

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        if (Array.isArray(data)) {
          setItems(data);
        } else if (data?.items && Array.isArray(data.items)) {
          setItems(data.items);
        } else {
          console.error("Unexpected getItems response:", data);
          setItems([]); // fallback to empty
        }
      } catch (err) {
        console.error("Failed to fetch items:", err);
        setItems([]);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-4">
      {items.map(
        (element: {
          _id: string;
          name: string;
          cost: number;
          description: string;
          imageURL: string;
        }) => (
          <Card
            {...element}
            key={element._id}
            item_count={item_count[element._id] || 0} // ✅ default to 0
          />
        )
      )}
    </div>
  );
}

export default Cards;
