import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Backdrop from "../UI/BackdropModal";

import useFetchDoc from "../../hooks/useFetchDoc";
import useUser from "../../hooks/useUser";
import userService from "../../api/visatype.api";
import { TextField } from "@mui/material";
import Select from "../UI/Select";
const EditUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [type,settype]=useState()
  const [price,setprice]=useState()
  const { docData: selectedUser, isloading } = useFetchDoc(
    `/get-visatype/${userId}`
  );

  console.log(selectedUser);

 
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    settype(selectedUser?.pricingplan?.type)
    setprice(selectedUser?.pricingplan?.price)

  }, [selectedUser]);
  const formik = useFormik({
    initialValues: {
      Type: selectedUser?.Type,
      application: selectedUser?.application,
      pricingplan: {},
    },
    enableReinitialize: true,

    onSubmit: async (values) => {
      console.log(values);
      values.pricingplan={price:price,type:type,currency:"USD"}
      await userService.updateVisa(userId, values);
      navigate("/dashboard/visaTypes");
      // updateUser(values, userId, imagePath);
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Edit Visa</h1>
          <section
            className={`flex flex-col flex-wrap gap-6 transition-opacity duration-500 ease-out
          ${isloading ? "opacity-50" : "opacity-100"}`}
          >
            
            <Select
                type="text"
                label="Application Type:"
                name="application"
                onChange={formik.handleChange}
                value={formik.values.application}
              >
                <option value={"Hajj"}>Hajj</option>
                <option value={"Umrah"}>Umrah</option>
          </Select>
          <Select
                type="text"
                label="Visa Type:"
                name="Type"
                onChange={formik.handleChange}
                value={formik.values.Type}
              >
                <option value={""}></option>

                <option value={"E-Visa"}>E-Visa</option>
                <option value={"Haya Card Visa"}>Haya Card Visa</option>
              </Select>

              <Select
                type="text"
                label="Visa Application Process:"
                name="type"
                onChange={(e)=>{
                  settype(e.target.value)
                  if(e.target.value=="Standard"){
                    setprice(183.49)
                  }
                  else if(e.target.value=="Rush"){
                    setprice(212.99)
                  }
                  else if(e.target.value=="SuperRush"){
                    setprice(244.99)
                  }
                  console.log("Hello",price)
                }}
                value={type}
              >
                <option value={""}></option>

                <option value={"Standard"}>Standard</option>
                <option value={"Rush"}>Rush</option>
                <option value={"SuperRush"}>SuperRush</option>

              </Select>

            <TextField
              disabled
                margin="normal"
                fullWidth
                id="price"
                name="price"
              label="Price:"
              value={"$"+price}
              />
          </section>

          <div className="flex justify-end gap-8 mt-4">
            <Button
              type="button"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <div className="text-base p-1">Update</div>
            </Button>
            <Button
              type="button"
              onClick={() => {
                navigate("/dashboard/visaTypes");
              }}
            >
              <div className="text-base p-1">Cancel</div>
            </Button>
          </div>
          <Backdrop
            title="Update"
            show={showModal}
            onClick={() => setShowModal(false)}
          >
            Are you sure you want to update Visa details?
            <div className="self-end">
              <Button type={"submit"} onClick={() => setShowModal(false)}>
                OK
              </Button>
            </div>
          </Backdrop>
        </form>
      </Card>
    </>
  );
};

export default EditUser;
