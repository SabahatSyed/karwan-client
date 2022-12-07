import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Input from "../Components/UI/Input";
import Card from "../Components/UI/Card";
import Button from "../Components/UI/Button";
import Backdrop from "../Components/UI/BackdropModal";
import InputFile from "../Components/UI/InputFile";
import visatypeService from "../api/visatype.api";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Spinner from "../Components/UI/Spinner";
import Select from "../Components/UI/Select";
const AddUser = () => {
  const navigate = useNavigate();
  const [error,seterror]=useState()
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [flag,setflag]=useState(false)
  const [price,setprice]=useState(0)
  const [type,settype]=useState("")
  const formik = useFormik({
    initialValues: {
      Type: "",
      application:"",
      pricingplan:{}
      
    },
    enableReinitialize: true,

    onSubmit: async (values) => {
      console.log(values);
      if (
        values.Type &&
        values.application
      ) {
        const obj={type:type,price:price,currency:"USD"}
        values.pricingplan=obj
        console.log("visaa",values)
        await visatypeService.addVisa(values);
       // navigate("/dashboard/users");
      }
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Add VisaType</h1>
          <section className={`flex flex-col flex-wrap gap-6`}>
          <Select
                type="text"
                label="Application Type:"
                name="application"
                onChange={formik.handleChange}
                value={formik.values.application}
              >
                <option value={""}></option>
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
{( formik.values.Type!="" && formik.values.pricingplan && formik.values.application!="")?
          <div className="flex justify-end gap-8 mt-4">
            <Button
              type="button"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <div className="text-base p-1">Add VisaType</div>
            </Button>
          </div>
:
<div  className="flex justify-end gap-8 mt-4">
            <Button
            
              type="button"
              onClick={() => {
                alert("Add Visa!!")
              }}
            >
              <div  className="text-base p-1">Add Visa</div>
            </Button>
          </div>}
          <Backdrop
            title="Add"
            show={showModal}
            onClick={() => setShowModal(false)}
          >
            Are you sure you want to add this Information?
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

export default AddUser;
