import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../api/users.api";

import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";

const AllUsersItems = ({ user, check, setCheck }) => {
  // console.log(user);
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-9 flex place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center mr-4">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt=""
                className="object-cover h-14 w-14 rounded-full"
              />
            ) : (
              <div className="h-14 w-14 bg-slate-300 rounded-full" />
            )}
          </div>
          <p className="flex items-center">{user?.userName}</p>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Button
            onClick={() => {
              navigate(`/dashboard/Accountdetails/${user._id}`);
            }}
          >
            Details
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
