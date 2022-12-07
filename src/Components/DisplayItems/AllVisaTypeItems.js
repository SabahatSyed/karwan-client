import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../api/visatype.api";

import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";

const AllUsersItems = ({ user, check, setCheck }) => {
  // console.log(user);
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-8 flex place-self-start text-left font-semibold text-primary">
          
          <div>
              <p >{user?.Type}</p>

              <div className="flex" >
             
              <p className="text-sm font-normal opacity-70">
                Pricing Plan : 
              </p>
                <p className="text-sm font-normal opacity-70">
                {" "+user?.pricingplan?.type}
              </p>
              <p className="text-sm font-normal opacity-70">
                {" -"+"$"+user?.pricingplan?.price}
              </p>
              
            </div>

            <div className="flex" >
             
             <p className="text-sm font-normal opacity-70">
               Application Type :
             </p>
               <p className="text-sm font-normal opacity-70">
               {user?.application}
             </p>
             
           </div>
          
            </div>


        </div>
        <div className="col-span lg:col-span">
          <Button
            onClick={() => {
              navigate(`/dashboard/edit-visa/${user._id}`);
            }}
          >
            Edit
          </Button>
        </div>
        
        <div className="col-span lg:col-span">
          <Button
            alt
            onClick={() => {
              setShowModal(true);
              // alert(userName + " with Id " + userId + " deleted");
            }}
          >
            Delete
          </Button>
        </div>
      </div>
      <Backdrop
        title="Delete User!"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Are you sure you want to delete this Information?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={async () => {
              await userService.deleteVisa(user._id);
              setCheck(!check);
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

export default AllUsersItems;
