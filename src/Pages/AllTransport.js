import React, { useEffect, useState } from "react";
import Card from "../Components/UI/Card";
import Spinner from "../Components/UI/Spinner";
import useFetch from "../hooks/useFetch";
import currentDate from "../utility/currentDate";
import BooksItems from "../Components/DisplayItems/BooksItems";
import ProductItems from "../Components/DisplayItems/AllTransportItems";
import { data } from "autoprefixer";

const AllHotels = () => {
  const [check, setCheck] = useState(false);

  const { data: products, isloading } = useFetch("/get-transports", check);
  
  const date = currentDate();
  console.log("dhsj",data)
  return (
    <Card>
      <div className="w-[90%] max-w-5xl h-full mx-auto">
        <header className="flex flex-col gap-2 justify-start mb-14 ">
          <h1 className="text-4xl">All Transport</h1>
          <p className="text-gray-400">{date}</p>
        </header>
        {/* Table */}
        {/* Header */}
        <div className="flex flex-col px-0">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-secondary">Transport</p>
            <svg
              className="fill-gray-400 object-contain h-10 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />
            </svg>
          </div>
          <hr className="max-w-full" />
          {/* Body */}

          {isloading ? (
            <div className="z-30 m-auto mt-20">
              <Spinner />
            </div>
          ) : (
            <div
              className="flex flex-col gap-5 mt-4 md:max-h-[55vh] xl:max-h-[55vh]
            md:overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-300"
            >
              <div className="flex flex-col gap-y-7 ">
                {products.map((item) => {
                  return (
                    <ProductItems
                      key={item._id}
                      product={item}
                      check={check}
                      setCheck={setCheck}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AllHotels;
