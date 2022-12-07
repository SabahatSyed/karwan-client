import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Backdrop from "../UI/BackdropModal";

import useFetchDoc from "../../hooks/useFetchDoc";
import InputFile from "../UI/InputFile";
import TextArea from "../UI/TextArea";
import hotelService from "../../api/users.api";

const EditProduct = () => {
  const navigate = useNavigate();
  const  {userId}  = useParams();
  const [showModal, setShowModal] = useState(false);
  const [productPic, setProductPic] = useState();
  
  const [room,setroom]=useState({name:"",contact:"",relation:"",cnic:""})
  const { docData: product, isloading } = useFetchDoc(
    `/get-user/${userId}`
  );
  const [Rooms,setRooms]=useState(product?.family)
  console.log(product);
  console.log(Rooms);
  useEffect(() => {
    setRooms(product?.family)
  }, [product]);
  const [profilePic, setProfilePic] = useState(null);
 
  const formik = useFormik({
    initialValues: {
      userName: product?.userName,
      family:product?.family,
      
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      values.family=Rooms
          console.log("sdaca",values)
      await hotelService.updateFamily(userId, values);
     navigate("/dashboard/family");
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Edit Family</h1>
          <section className={`flex flex-col flex-wrap gap-6 `}>
            
            <Input
              width="full"
              type="text"
              label="Name:"
              name="userName"
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
            
          
      <label className="text-secondary font-semibold">Family:</label>
      <div style={{display:'flex',flexDirection:'row'}}>
            <label className="text-secondary">Name:</label>
            <input
              style={{width:"25%",marginLeft:20,marginRight:20}}
              type="text"
              label="name:"
              name="room.name"
              onChange={(e) => {
                var value={name:e.target.value}
                setroom(shopCart => ({
                ...shopCart,
                ...value
              }))}}
              value={room.name}
            />
            <label className="text-secondary">Contact:</label>
            <input
              style={{width:"25%",marginLeft:20,marginRight:20}}
              type="text"
              label="contact:"
              name="room.contact"
              onChange={(e) => {
                  if(isNaN(e.target.value)){
                    alert("Enter Correct Number")
                  }
                  else{
                    var value={contact:e.target.value}
                    setroom(shopCart => ({
                    ...shopCart,
                    ...value
                  }))
                  }
                
                
                
                }}
              value={room.contact}
            />
            <label className="text-secondary">Relation:</label>
            <select
                type="text"
                label="relation:"
                name="room.relation"
                style={{width:"10%",marginLeft:20,marginRight:20}}
                onChange={(e) => {
                  var value={relation:e.target.value}
                  setroom(shopCart => ({
                  ...shopCart,
                  ...value
                }))}}
                value={room.relation}
              >
                
                <option value={"Wife"}>Wife</option>
                <option value={"Husband"}>Husband</option>
                <option value={"Sister"}>Sister</option>
                <option value={"Brother"}>Brother</option>
                <option value={"Mother"}>Mother</option>
                <option value={"Father"}>Father</option>
                <option value={"Daughter"}>Daughter</option>
                <option value={"Son"}>Son</option>
                <option value={"Grandson"}>Grandson</option>
                <option value={"Granddaughter"}>Granddaughter</option>
                <option value={"Grandfather"}>Grandfather</option>
                <option value={"Grandmother"}>Grandmother</option>


                
              </select>
              <label className="text-secondary">CNIC:</label>

              <input
              style={{width:"25%",marginLeft:20,marginRight:20}}
              type="text"
              label="CNIC:"
              name="room.cnic"
              onChange={(e) => {
                
                    var value={cnic:e.target.value}
                    setroom(shopCart => ({
                    ...shopCart,
                    ...value
                  }))
                  
                
                
                
                }}
              value={room.cnic}
            />
            <Button
              type="button" onClick={()=>{
                if(!room.cnic.match(/^[0-9]{5}-[0-9]{7}-[0-9]$/)){
                  alert("wrong CNIC")
                }else{
                  if(Rooms.length>0){
                    setRooms([...Rooms,room]);
                  }
                  else{setRooms([room])}
                  console.log("saa",Rooms)
                  setroom({name:"",contact:"",relation:"",cnic:""})
                }
                
              }}>
              <div className="text-base p-1">Add</div>
            </Button>
            </div>

            {Rooms?.map((item,ind)=>(
            <div style={{display:'flex',flexDirection:'row',borderWidth:2,borderColor:'black',borderRadius:2,padding:7,alignSelf:'center'}}>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Name: </label>
            <p style={{marginRight:20}}>{item.name}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Contact: </label>
            <p style={{marginRight:20}}>{item.contact}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Relation: </label>
            <p style={{marginRight:20}}>{item.relation}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>CNIC: </label>
            <p style={{marginRight:20}}>{item.cnic}</p>
            <Button
              type="button" onClick={()=>{
              setroom(item)
              setRooms(Rooms?.filter((it,index)=>index!=ind))
            }}
              >
              <div style={{marginBottom:2}}>edit</div>
            </Button>
            <div style={{marginRight:5}}></div>
            
            <Button
              type="button" onClick={()=>
              setRooms(Rooms?.filter((it,index)=>index!=ind))}>
              <div style={{marginBottom:2}}>delete</div>
            </Button>
            </div>
            ))}
           
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
                navigate("/dashboard/family");
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
            Are you sure you want to update Family details?
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

export default EditProduct;
