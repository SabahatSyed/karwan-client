import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../api/firebase-config";
import Input from "../Components/UI/Input";
import Button from "../Components/UI/Button";
import { setUser } from "../redux/userSlice";
import logo from "../Assets/Images/logo.png";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import useFetchDoc from "../hooks/useFetchDoc";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  
  onAuthStateChanged(auth, (currentUser) => {
    dispatch(setUser(currentUser));
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      login(values.email, values.password);
    },
  });
  const triggerResetEmail = async () => {
    await sendPasswordResetEmail(auth, formik.values.email);
    console.log("Password reset email sent")
  }
  const { docData: users } = useFetchDoc(
    `/get-users`
  );

  const login = async (email, password) => {
    try {

      //const user = await signInWithEmailAndPassword(auth, email, password);
      var user=users?.find((item)=>item.email==email && item.password==password)
     console.log(user);
     if(user){
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("user", user._id);
      navigate("/dashboard/Stats");
     }else{
      alert("Account Doesnot Exist")
     }
      console.log("ssa",users)
      
    } catch (error) {
      console.log(error.message);
      alert("invalid");
    }
  };

  return (
    <div className="bg-primaryL w-[100vw] h-[100vh] pt-[10vh]">
      <div className="flex flex-col items-center justify-center gap-2 p-4 w-[80%] max-w-md mx-auto ">
        <img src={logo} alt="pic" className="object-contain h-28 rounded-xl" />
        <h2 className="text-white text-lg">Karwan-e-Hasnath</h2>
      </div>
      <div
        className=" p-8 w-[80%] max-w-md mx-auto  
        border rounded-md  bg-white
        shadow-lg drop-shadow-xl "
      >
        <form onSubmit={formik.handleSubmit} className="flex flex-col">
          <h1 className="text-secondary text-2xl font-bold mx-auto mb-4">
            Login
          </h1>
          <div className="flex flex-col gap-4 mb-8">
            <div>
              <Input
                type="text"
                name="email"
                label="E-mail:"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div>
              <Input
                type="password"
                name="password"
                label="Password:"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
          </div>
         {/*} <div onClick={triggerResetEmail}>
          <p className="text-sm">Forgot Password?</p>
              </div>*/}
          <Button type={"submit"}>
            <p className="text-lg">Login</p>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
