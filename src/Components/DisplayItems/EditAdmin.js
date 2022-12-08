import React, { useState } from "react";
import Input from "../UI/Input";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Backdrop from "../UI/BackdropModal";
import Select from "../UI/Select";
import useFetchDoc from "../../hooks/useFetchDoc";
import useUser from "../../hooks/useUser";
import userService from "../../api/admin.api";
import * as yup from "yup";

const EditUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const { docData: selectedUser, isloading } = useFetchDoc(
    `/get-admin/${userId}`
  );

  console.log(selectedUser);

  const { updateUser, uploadUserImage, imagePath } = useUser();
  const [profilePic, setProfilePic] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const validationSchema = yup.object({
    email: yup.string("Enter your email")
       .email("Enter a valid email")
      .required("Email is required"),
    contact:yup.number("Enter Valid Number")
    .required("A phone number is required"),
    cnic:yup.string("Enter CNIC").required("A phone number is required").matches(/^[0-9]{5}-[0-9]{7}-[0-9]$/, "Wrong CNIC")
  });

  const formik = useFormik({
    initialValues: {
      userName: selectedUser?.userName,
      email: selectedUser?.email,
      contact: selectedUser?.contact,
      address: selectedUser?.address,
      cnic:selectedUser?.cnic,
      Designation:selectedUser?.Designation
    },
    enableReinitialize: true,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      console.log(values);
      await userService.updateUser(userId, values);
      navigate("/dashboard/Staff");
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
          <h1 className="text-2xl">Edit User</h1>
          <section
            className={`flex flex-col flex-wrap gap-6 transition-opacity duration-500 ease-out
          ${isloading ? "opacity-50" : "opacity-100"}`}
          >
           
            <Input
              disabled
              width="full"
              type="text"
              name="userId"
              label="User Id:"
              value={userId}
            />
            <Input
              width="full"
              type="text"
              name="userName"
              label="Name:"
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
            <Input
              width="full"
              type="text"
              label="E-mail:"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <Input
              width="full"
              type="text"
              label="Contact:"
              name="contact"
              onChange={formik.handleChange}
              value={formik.values.contact}
            />
            <Input
              width="full"
              type="text"
              label="Address"
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            <Input
                width="full"
                type="text"
                label="CNIC - Without Dashes"
              name="cnic"
              onChange={formik.handleChange}
              value={formik.values.cnic}
              error={formik.touched.cnic && Boolean(formik.errors.cnic)}
              helperText={formik.touched.cnic && formik.errors.cnic}
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
            {/* <TextArea
            rows={1}
            type="text"
            label="Address:"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
          /> */}
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
                navigate("/dashboard/Staff");
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
            Are you sure you want to update user details?
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
