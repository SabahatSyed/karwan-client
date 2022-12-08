import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";
import Select from "../UI/Select";
import hotelService from '../../api/transportService.api'
const AllProductsItems = ({ product, productCart, setProductCart }) => {
  let navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showModal, setShowModal] = useState(false);
  console.log(product && product);
  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-9 flex place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center mr-4">
            {product?.images ? (
              <img
                src={product?.images}
                alt=""
                className="object-cover h-20 w-20 rounded-md"
              />
            ) : (
              <div className="h-20 w-20 bg-slate-300 rounded-md" />
            )}
            </div>
          <div className="flex flex-col gap-2">
            <p>{product?.Name}</p>
            {/*<div className="flex items-center gap-2">
              <p className=" text-[#404852]">Reviews</p>
              <p className=" text-[#404852] self-end">:</p>
              <p className="text-primary font-semibold opacity-70">
                {product?.reviews}
              </p>
            </div>*/}
            <div className="flex items-center gap-2">
              <p className=" text-[#404852]">Vehicles</p>
              <p className=" text-[#404852] self-end">:</p>
              {product?.Vehicle.map((it)=>(
                <p className="text-primary font-semibold opacity-70">
                {it.Type+" Rs."+it.Price}
              </p>
              ))}
              
            </div>
            
            
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <Button
            onClick={() => {
              navigate(`/dashboard/edit-transport/${product?._id}`);
            }}
          >
            Edit
          </Button>
        </div>
        <div className="col-span-3 lg:col-span-2">
          <Button
            alt
            onClick={() => {
              setShowModal(true);
              // alert(categoryName + " with Id " + categoryId + " deleted");
            }}
          >
            Delete
          </Button>
        </div>
        
      </div>

      <Backdrop
        title="Remove Hotel!"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Are you sure you want to remove the product?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={async() => {
              
              await hotelService.deleteProduct(product._id);
              // setCheck(!check);
              setShowModal(false);
            }}
          >
            Yes
          </Button>
        </div>
      </Backdrop>
    </>
  );
};

export default AllProductsItems;
