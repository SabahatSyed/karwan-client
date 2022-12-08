import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../api/admin.api";

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
              <p >{user?.userName}</p>

              <div className="flex" >
             
              <p className="text-sm font-normal opacity-70">
                Number:
              </p>
                <p className="text-sm font-normal opacity-70">
                {user?.contact}
              </p>
              
            </div>
            
           <div className="flex" >
             
             <p className="text-sm font-normal opacity-70">
               Email:
             </p>
               <p className="text-sm font-normal opacity-70">
               {user?.email}
             </p>
             
           </div>
           <div className="flex" >
             
             <p className="text-sm font-normal opacity-70">
               Designation:
             </p>
               <p className="text-sm font-normal opacity-70">
               {user?.Designation}
             </p>
             
           </div>
            </div>


        </div>
        <div className="col-span-2 lg:col-span-1">
          <Button
            onClick={() => {
              navigate(`/dashboard/edit-admin/${user._id}`);
            }}
          >
            Edit
          </Button>
        </div>
        
        <div className="col-span-3 lg:col-span-1">
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
        Are you sure you want to delete the user?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={async () => {
              await userService.deleteUser(user._id);
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
