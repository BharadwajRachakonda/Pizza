"use client";
import Banners from "./components/Banner/banners";
import Cards from "./components/products/cards";
import { getCatalog } from "./lib/methods";
import { useContext } from "react";
import CatalogContext from "./context/catalog/catalogcontext";
import ErrorContext from "./context/error/errorcontext";
import UserContext from "./context/user/usercontext";
import { useEffect } from "react";

export default function Home() {
  const { setCatalog } = useContext(CatalogContext);
  const { setError } = useContext(ErrorContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchCatalog = async () => {
      const data = await getCatalog();
      if (data?.error) {
        setError(data.error);
        return;
      }
      setCatalog((prev: any) => {
        const prevStr = JSON.stringify(prev);
        const newStr = JSON.stringify(data);
        return prevStr === newStr ? prev : data ?? [];
      });
    };
    fetchCatalog();
  }, [user]);

  return (
    <>
      <div>
        <Banners />
        <Cards />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
