import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supplicationService from "../../api/guides";
import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";

const SupplicationItems = ({ supplication, check, setCheck }) => {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-9 flex place-self-start text-left font-semibold text-primary">
          <div className="flex flex-col gap-2">
            <p>{supplication?.guideTitle}</p>
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Button
            onClick={() => {
              navigate(`/dashboard/edit-guide/${supplication._id}`);
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
        Are you sure you want to delete the guide?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={async () => {
              await supplicationService.deleteSupplication(supplication._id);
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

export default SupplicationItems;
