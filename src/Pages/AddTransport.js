import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Card from "../Components/UI/Card";
import transportService from "../api/transportService.api";
import InputFile from "../Components/UI/InputFilemul";
import Input from "../Components/UI/Input";
import TextArea from "../Components/UI/TextArea";
import Button from "../Components/UI/Button";
import Backdrop from "../Components/UI/BackdropModal";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GoogleMapReact from 'google-map-react';
import { async } from "@firebase/util";
import Spinner from "../Components/UI/Spinner";
import { MenuItem, Select } from "@mui/material";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const AddProduct = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [productPic, setProductPic] = useState(null);
  const [Rooms,setRooms]=useState([])
  const [room,setroom]=useState({Type:"",id:0,Price:0,availability:[]})
  const [fileBase64String, setFileBase64String] = useState("");
  const [flag,setflag]=useState(false)
  const [selected,setSelected]=useState([])
  const defaultProps = {
    center: {
      lat: 33.6844,
      lng: 73.0479
    },
    zoom: 16
  };
  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    setflag(true)
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;
        console.log(Base64);
        setFileBase64String(Base64);
      };
      reader.onerror = (error) => {
        console.log("error: ", error);
      };
    }
  };

  const formik = useFormik({
    initialValues: {
      Name: "",
      Facilities: "",
     images:"",
      Vehicle: [],
     
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      if (
        values.Name
                ) {
          console.log("sda",fileBase64String)
          
          values.Vehicle=Rooms
          values.images=fileBase64String
          values.Facilities=selected
          console.log("sdaca",values)

        await transportService.addHotel(values);
        navigate("/dashboard/transports");
        setRooms([])
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
          <h1 className="text-2xl">Add Transport</h1>
          <section className={`flex flex-col flex-wrap gap-6 `}>
            
            <Input
              width="full"
              type="text"
              label="Name:"
              name="Name"
              onChange={formik.handleChange}
              value={formik.values.Name}
            />
           <label className="text-secondary font-semibold">Facilities:</label>

            <Select
            multiple
        value={selected}
        onChange={(e)=>setSelected([...e.target.value])}
             labelledBy="Select"
          >
            <MenuItem value={"AC"}>AC</MenuItem>
            <MenuItem value={"Heater"}>Heater</MenuItem>
            <MenuItem value={"Prayer Mat"}>Prayer Mat</MenuItem>
            <MenuItem value={"Pickup from Hotel"}>Pickup from Hotel</MenuItem>
            <MenuItem value={"Dropoff to holyplaces"}>Dropoff to holyplaces</MenuItem>
            <MenuItem value={"Pickup from Airport"}>Pickup from Airport</MenuItem>
            <MenuItem value={"Dropoff to Hotel"}>Dropoff to Hotel</MenuItem>


          </Select>
          
      <label className="text-secondary font-semibold">Vehicle:</label>
      <div style={{display:'flex',flexDirection:'row'}}>
      <label className="text-secondary">Id:</label>
            <input
              style={{width:"25%",marginLeft:20,marginRight:20}}
              type="text"
              label="Price:"
              name="room.id"
              onChange={(e) => {
                var value={id:e.target.value}
                if(Rooms.find((item)=>item.id==e.target.value)){
                  alert("already exists")
                  
                }
                else{
                setroom(shopCart => ({
                ...shopCart,
                ...value
              }))}}}
              value={room.id}
            />

<label className="text-secondary">Type:</label>
            <select
            style={{width:"25%",marginLeft:20,marginRight:20}}
            type="text"
            label="Type:"
            name="room.Type"
            onChange={(e) => {
              var value={Type:e.target.value}
              setroom(shopCart => ({
              ...shopCart,
              ...value
            }))}}
            value={room.Type}
              >
                <option value={""}></option>

                <option value={"Van"}>Van</option>
                <option value={"Car"}>Car</option>
                <option value={"Hiace"}>HIACE</option>
                <option value={"Bus"}>Bus</option>

                
              </select>
            
            
            <label className="text-secondary">Price:</label>
            <input
              style={{width:"25%",marginLeft:20,marginRight:20}}
              type="text"
              label="Price:"
              name="room.Price"
              onChange={(e) => {
                if(!isNaN(e.target.value)){
                var value={Price:e.target.value}
                setroom(shopCart => ({
                ...shopCart,
                ...value
              }))}
              else{
                alert("Enter Number")
              }
            
            }}
              value={room.Price}
            />
            
            <Button
              type="button" onClick={()=>{
                if(Rooms.length>0){
                  setRooms([...Rooms,room]);
                }
                else{setRooms([room])}
                console.log("saa",Rooms)
                setroom({Type:"",Price:0,availability:[],images:""})
              }}>
                
              <div className="text-base p-1">Add</div>
            </Button>
            </div>
           

            {Rooms?.map((item,ind)=>(
            <div style={{display:'flex',flexDirection:'row',borderWidth:2,borderColor:'black',borderRadius:2,padding:7,alignSelf:'center'}}>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Id: </label>
            <p style={{marginRight:20}}>{item.id}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Type: </label>
            <p style={{marginRight:20}}>{item.Type}</p>
            
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Price: </label>
            <p style={{marginRight:20}}>{item.Price+" riyal"}</p>
            <Button
              type="button" onClick={()=>
              setRooms(Rooms.filter((it,index)=>index!=ind))}>
              <div style={{marginBottom:2}}>delete</div>
            </Button>
            </div>
            ))}
             <div className="flex items-center gap-6 mr-4">
            <p className="text-l" style={{fontweight:'bold'}}>Images</p>



            <label
        className="block  py-1 px-2 cursor-pointer rounded text-center min-w-[8rem] max-w-[10rem]
        border-2 border-dashed border-primary 
        hover:border-3 hover:border-dashed hover:border-primary 
        transition ease-out duration-1000"
      >
        <span className="text-sm">
          {productPic?.name ? productPic?.name : "Choose image"}
        </span>
        <input className="hidden" type="file" name={productPic?.name}  onChange={(e) => {
                  setProductPic(e.target.files[0])
                  encodeFileBase64(e.target.files[0]);
                }} />
      </label>
      <Button
          type="button"
          onClick={() => {
            }}
          
        >
          Upload
        </Button>
        {
                fileBase64String?
                <p>Uploaded</p>:
                flag?
                <div className="z-30 m-auto mt-20">
                <Spinner />
              </div>:
                <p></p>

              }
            </div>
           
          </section>
          
            
            
           {/* <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBSp32hxkn2p8D6bF_HrkgsJKvq_x6tjV0" }}
        defaultCenter={formik.values.Location}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={formik.values.Location.lat}
          lng={formik.values.Location.lng}
          text="My Marker"
        />
      </GoogleMapReact>
              </div>*/}
                      {(fileBase64String!="" && selected!=[]  && formik.values.Name!="")?

          <div className="flex justify-end gap-8 mt-4">
            <Button
              type="button"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <div className="text-base p-1">Add Transport</div>
            </Button>
          </div>
          :
          <div className="flex justify-end gap-8 mt-4">
            <Button
              type="button"
              onClick={() => {
                alert("Add Data")
              }}
            >
              <div className="text-base p-1">Add Transport</div>
            </Button>
          </div>
          
          }
          <Backdrop
            title="Add"
            show={showModal}
            onClick={() => setShowModal(false)}
          >
            Are you sure you want to add the Transport?
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

export default AddProduct;
