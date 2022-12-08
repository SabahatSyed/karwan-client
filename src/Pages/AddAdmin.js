import React, { useState } from "react";
import { useFormik, yupToFormErrors } from "formik";
import { useNavigate } from "react-router-dom";
import Input from "../Components/UI/Input";
import Card from "../Components/UI/Card";
import Button from "../Components/UI/Button";
import Backdrop from "../Components/UI/BackdropModal";
import InputFile from "../Components/UI/InputFile";
import userService from "../api/admin.api";
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
  
  const validationSchema = yup.object({
    userName:yup.string("Enter Your Name").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),

    email: yup.string("Enter your email")
       .email("Enter a valid email")
      .required("Email is required"),
    contact:yup.number("Enter Valid Number")
    .required("A phone number is required"),
    cnic:yup.string("Enter CNIC").required("A phone number is required").matches(/^[0-9]{5}-[0-9]{7}-[0-9]$/, "Wrong CNIC")
  });

 

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      contact: "",
      address: "",
      password: "",
      cnic:"",
      Designation:""
    },
    enableReinitialize: true,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      console.log(values);
      if (
        values.userName &&
        values.email &&
        values.contact &&
        values.address &&
        values.password &&
        values.cnic && 
        values.Designation
      ) {
        await userService.addUser(values);
        navigate("/dashboard/Staff");
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
          <h1 className="text-2xl">Add User</h1>
          <section className={`flex flex-col flex-wrap gap-6`}>
           
            <TextField
                margin="normal"
                fullWidth
                id="userName"
                name="userName"
              label="Name:"
              onChange={formik.handleChange}
              value={formik.values.userName}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
                helperText={formik.touched.userName && formik.errors.userName}
              />
            <TextField
                margin="normal"
                fullWidth
                id="email"
                name="email"
                label="Enter your email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                margin="normal"
                fullWidth
                id="contact"
                label="Contact:"
                name="contact"
                onChange={formik.handleChange}
                value={formik.values.contact}
                error={formik.touched.contact && Boolean(formik.errors.contact)}
                helperText={formik.touched.contact && formik.errors.contact}
              />
            
            <TextField
                margin="normal"
                fullWidth
                id="Address"
                label="Address"
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
              />
              <TextField
                margin="normal"
                fullWidth
                id="cnic"
                label="CNIC - With Dashes"
              name="cnic"
              onChange={formik.handleChange}
              value={formik.values.cnic}
              error={formik.touched.cnic && Boolean(formik.errors.cnic)}
                helperText={formik.touched.cnic && formik.errors.cnic}
              />
            <TextField
                margin="normal"
                fullWidth
                id="Password"
                label="Password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              />
             <Select
                type="text"
                label="Designation:"
                name="Designation"
                onChange={formik.handleChange}
                value={formik.values.Designation}
              >
                <option value={""}></option>
                <option value={"Staff"}>Admin</option>
                <option value={"Staff"}>Staff</option>
          </Select>
           
          </section>
{( formik.values.userName!="" && formik.values.address!="" && formik.values.contact!="" && formik.values.password!="" && formik.values.email!="" && formik.values.Designation!="")?
          <div className="flex justify-end gap-8 mt-4">
            <Button
              type="button"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <div className="text-base p-1">Add User</div>
            </Button>
          </div>
:
<div  className="flex justify-end gap-8 mt-4">
            <Button
            
              type="button"
              onClick={() => {
                alert("Add Data!!")
              }}
            >
              <div  className="text-base p-1">Add User</div>
            </Button>
          </div>}
          <Backdrop
            title="Add"
            show={showModal}
            onClick={() => setShowModal(false)}
          >
            Are you sure you want to add this user?
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
