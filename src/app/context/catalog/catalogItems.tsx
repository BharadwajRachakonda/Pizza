"use client";
import CatalogContext from "./catalogcontext";
import React, { useEffect, useState, useContext } from "react";
import { getCatalog, updateCatalog } from "@/app/lib/methods";
import ErrorContext from "../error/errorcontext";
import { useDebouncedCallback } from "use-debounce";
import UserContext from "@/app/context/user/usercontext";
import toast from "react-hot-toast";
import { deleteCart, hasSession } from "@/app/lib/methods";

type CatalogItem = {
  _id: string;
  count: number;
};

function CatalogItems({ children }: { children: React.ReactNode }) {
  const [item_count, setItem_count] = useState<{ [key: string]: number }>({});
  const [catalog, setCatalog] = useState<CatalogItem[]>([]); // ✅ always default to []

  const { setError } = useContext(ErrorContext);
  const { user, setUser } = useContext(UserContext);

  const getCount = () => {
    const counts: { [key: string]: number } = {};
    // ✅ safeguard with optional chaining + fallback
    catalog.forEach((item: CatalogItem) => {
      counts[item._id] = item.count ?? 0;
    });
    return counts;
  };

  const add = async (_id: string) => {
    if (!user) {
      const _hasSession = await hasSession();
      if (!_hasSession.hasSession) {
        toast.error("Session time out, pls login");
        return;
      } else {
        setUser(_hasSession.hasSession);
      }
    }

    console.log("Adding item to cart:", _id);

    let updatedCatalog;
    const itemExists = (catalog ?? []).some((item) => item._id === _id);

    if (itemExists) {
      updatedCatalog = (catalog ?? []).map((item) =>
        item._id === _id ? { ...item, count: (item.count || 0) + 1 } : item
      );
    } else {
      updatedCatalog = [...(catalog ?? []), { _id, count: 1 }];
    }

    setCatalog(updatedCatalog);
  };

  const subtract = async (_id: string) => {
    if (!user) {
      const _hasSession = await hasSession();
      if (!_hasSession.hasSession) {
        toast.error("Session time out, pls login");
        return;
      } else {
        setUser(_hasSession.hasSession);
      }
    }

    const itemIndex = (catalog ?? []).findIndex((item) => item._id === _id);
    if (itemIndex === -1) return;

    const updatedCatalog = (catalog ?? [])
      .map((item) =>
        item._id === _id ? { ...item, count: (item.count || 1) - 1 } : item
      )
      .filter((item) => item.count > 0);

    setCatalog(updatedCatalog);
    console.log("Updated catalog:", updatedCatalog);
    if (updatedCatalog.length === 0) {
      console.log("deleting...");
      await deleteCart();
    }
  };

  const debouncedSave = useDebouncedCallback(async (catalog) => {
    const data = await updateCatalog(catalog);
    const _hasSession = await hasSession();
    if (!user) {
      if (!_hasSession.hasSession) {
        toast.error("Session time out pls login");
      } else {
        setUser(_hasSession.hasSession);
      }
    }
    if (data?.error) {
      setError(data.error);
      return;
    }
    setCatalog((prev) => {
      const prevStr = JSON.stringify(prev);
      const newStr = JSON.stringify(data);
      return prevStr === newStr ? prev : data ?? [];
    });
  }, 1000);

  useEffect(() => {
    const fetchCatalog = async () => {
      const data = await getCatalog();
      if (data?.error) {
        setError(data.error);
        return;
      }
      setCatalog((prev) => {
        const prevStr = JSON.stringify(prev);
        const newStr = JSON.stringify(data);
        return prevStr === newStr ? prev : data ?? [];
      });
    };
    fetchCatalog();
  }, [user]);

  useEffect(() => {
    if (catalog && catalog.length > 0 && user) {
      debouncedSave(catalog);
    }
  }, [catalog]);

  useEffect(() => {
    setItem_count(getCount());
  }, [catalog]);

  return (
    <CatalogContext.Provider
      value={{ catalog, setCatalog, add, subtract, item_count }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export default CatalogItems;
