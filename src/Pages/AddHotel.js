import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Card from "../Components/UI/Card";
import hotelService from "../api/hotelService.api";
import InputFile from "../Components/UI/InputFilemul";
import Input from "../Components/UI/Input";
import TextArea from "../Components/UI/TextArea";
import Button from "../Components/UI/Button";
import Backdrop from "../Components/UI/BackdropModal";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GoogleMapReact from 'google-map-react';
import { async } from "@firebase/util";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { FaMapMarkerAlt } from "react-icons/fa"
import { MenuItem, Select } from "@mui/material";

import Spinner from "../Components/UI/Spinner";
const AnyReactComponent = ({ text }) =><FaMapMarkerAlt/>;
const AddProduct = () => {
  const navigate = useNavigate();
  const [unit,setunit]=useState('m')
  const [showModal, setShowModal] = useState(false);
  const [productPic, setProductPic] = useState(null);
  const [Rooms,setRooms]=useState([])
  const [flag,setflag]=useState(false)
  const [distances,setdistances]=useState([])
  const [selected,setSelected]=useState([])
  const [room,setroom]=useState({Type:"",Size:"",id:0,Price:0,availability:[]})
  const [distance,setdistance]=useState({place:"",distance:"",Location:{lat:0.0,lon:0.0}})
  const [fileBase64String, setFileBase64String] = useState("");
  const [googleloc,setgoogleloc]=useState({lat:0.0,lon:0.0})
  const defaultProps = {
    center: {
      lat: 21.4362,
      lng: 39.7064
    },
    zoom: 14
  };
  const centers = [{
    kaaba:{
    lat: 33.6844,
    lng: 73.0479
    }},
    {
    Abubakar:{
    lat: 33.6844,
    lng: 73.0479
    }},
    {
    jamarat:{
      lat: 33.6844,
      lng: 73.0479
    }},
    {Jannatulmala:{
      lat: 33.6844,
      lng: 73.0479
    }},
    {Masjidayesha:{
      lat: 33.6844,
      lng: 73.0479
    }},
    {MasjidJin:{
      lat: 33.6844,
      lng: 73.0479
    }},
    {Muzdalifah:{
      lat: 33.6844,
      lng: 73.0479
    }},
    {Mina:{
      lat: 33.6844,
      lng: 73.0479
    }},
  ];
  

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
  const containerStyle = {
    width: '400px',
    height: '400px'
  };
  const formik = useFormik({
    initialValues: {
      Name: "",
      Facilities: "",
      Description: "",
      Location:"",
      images:"",
      Room: [],
      distances:[]
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      if (
        values.Name &&
        values.Description &&
        values.Location 
        ) {
          values.Room=Rooms
          values.distances=distances
          values.Facilities=selected
          console.log("sdaca",values)
          values.images=fileBase64String
        await hotelService.addHotel(values);
        navigate("/dashboard/hotels");
        setRooms([])
        setdistances([])
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
          <h1 className="text-2xl">Add Hotel</h1>
          <section className={`flex flex-col flex-wrap gap-6 `}>
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
              </div>
                :
                <p></p>

              }
            </div>
            <Input
              width="full"
              type="text"
              label="Name:"
              name="Name"
              onChange={formik.handleChange}
              value={formik.values.Name}
            />
            
            <TextArea
              rows={2}
              type="text"
              label="Description:"
              name="Description"
              onChange={formik.handleChange}
              value={formik.values.Description}
            />
          <label className="text-secondary font-semibold">Facilities:</label>

            <Select
            multiple
        value={selected}
        onChange={(e)=>setSelected([...e.target.value])}
             labelledBy="Select"
          >
            <MenuItem value={"AC"}>AC</MenuItem>
            <MenuItem value={"Television"}>Television</MenuItem>
            <MenuItem value={"Prayer Mat"}>Prayer Mat</MenuItem>
            <MenuItem value={"Breakfast/Dinner"}>Breakfast/Dinner</MenuItem>
            <MenuItem value={"MiniFridge"}>MiniFridge</MenuItem>
            <MenuItem value={"RoomService"}>RoomService</MenuItem>


          </Select>
          <Input
              width="full"
              type="text"
              label="Location:"
              name="Location"
              onChange={formik.handleChange}
              value={formik.values.Location}
            />
      <label className="text-secondary font-semibold">Room:</label>
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
              }))}
            }}
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

                <option value={"1 Bed"}>1 Bed</option>
                <option value={"2 Bed"}>2 Bed</option>
                <option value={"3 Bed"}>3 Bed</option>
                
              </select>

          <label className="text-secondary">Size:</label>
            <select
            style={{width:"25%",marginLeft:20,marginRight:20}}
            type="text"
            label="Size:"
            name="room.Size"
            onChange={(e) => {
              var value={Size:e.target.value}
              setroom(shopCart => ({
              ...shopCart,
              ...value
            }))}}
            value={room.Size}
              >
                <option value={""}></option>

                <option value={"250 sqft"}>250 sqft</option>
                <option value={"500 sqft"}>500 sqft</option>
                <option value={"750 sqft"}>750 sqft</option>
                <option value={"1000 sqft"}>1000 sqft</option>
                <option value={"1250 sqft"}>1250 sqft</option>
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
                }))
                }
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
                setroom({Type:"",Size:"",id:0,Price:0,availability:[]})
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
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Size: </label>
            <p style={{marginRight:20}}>{item.Size}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Price: </label>
            <p style={{marginRight:20}}>{item.Price+" riyal"}</p>
            <Button
              type="button" onClick={()=>
              setRooms(Rooms.filter((it,index)=>index!=ind))}>
              <div style={{marginBottom:2}}>delete</div>
            </Button>
            </div>
            ))}
           
          </section>
          
            <label className="text-secondary font-semibold">Distances from Holy Places:</label>

            <div style={{display:'flex',flexDirection:'row'}}>
            <label className="text-secondary">Name:</label>
            <select
                type="text"
                label="Place:"
              name="distance.place"
              onChange={(e) => {
                var value={place:e.target.value}
                 setdistance(shopCart => ({
                ...shopCart,
                ...value
              }))
              if(e.target.value=="Kabba"){
                const val={Location:{lat:21.4225,lon:39.8262}}
                setdistance(shopCart => ({
                  ...shopCart,
                  ...val
                }))
              setgoogleloc({lat:21.4225,lon:39.8262})
              }
              else if(e.target.value=="Jamarat"){
                const val={Location:{lat:21.4216,lon:39.8722}}
                setdistance(shopCart => ({
                  ...shopCart,
                  ...val
                }))
                setgoogleloc({lat:21.4216,lon:39.8722})
              }else if(e.target.value=="Jannatulmala"){
                const val={Location:{lat:21.4356,lon:39.8259}}
                setdistance(shopCart => ({
                  ...shopCart,
                  ...val
                }))
                setgoogleloc({lat:21.4356,lon:39.8259})
              }else if(e.target.value=="Masjidayesha"){
                const val={Location:{lat:21.4672,lon:39.8009}}
                setdistance(shopCart => ({
                  ...shopCart,
                  ...val
                }))
                setgoogleloc({lat:21.4672,lon:39.8009})
              }else if(e.target.value=="MasjidJin"){
                const val={Location:{lat:21.4334,lon:39.8288}}
                setdistance(shopCart => ({
                  ...shopCart,
                  ...val
                }))
                setgoogleloc({lat:21.4334,lon:39.8288})
              }else if(e.target.value=="Muzdalifah"){
                const val={Location:{lat:21.4093,lon:39.9104}}
                setdistance(shopCart => ({
                  ...shopCart,
                  ...val
                }))
                setgoogleloc({lat:21.4093,lon:39.9104})
              }else if(e.target.value=="Mina"){
                const val={Location:{lat:21.4143,lon:39.8897}}
                setdistance(shopCart => ({
                  ...shopCart,
                  ...val
                }))
                setgoogleloc({lat:21.4143,lon:39.8897})
              }
            }}
              value={distance.place}
                style={{width:"10%",marginLeft:20,marginRight:20}}
              >
                <option value={""}></option>
                <option value={"Kabba"}>Kaaba</option>
                <option value={"Jamarat"}>Jamarat</option>
                <option value={"Jannatulmala"}>Jannatulmala</option>
                <option value={"Masjidayesha"}>Masjidayesha</option>
                <option value={"MasjidJin"}>MasjidJin</option>
                <option value={"Muzdalifah"}>Muzdalifah</option>
                <option value={"Mina"}>Mina</option>
              </select>
           
            <label className="text-secondary">Distance:</label>
            <input
              style={{width:"25%",marginLeft:20,marginRight:20}}
              type="text"
              label="Distance:"
              name="distance.distance"
              onChange={(e) => {
                var value={distance:e.target.value}
                setdistance(shopCart => ({
                ...shopCart,
                ...value
              }))}}
              value={distance.distance}
            />
            <select
            style={{width:"8%",marginLeft:20,marginRight:20}}
            type="text"
            label="Unit:"
            name="unit"
            onChange={(e) => {
              setunit(e.target.value)}}
            value={unit}
              >
                <option value={"m"}>m</option>
                <option value={"km"}>km</option>
              </select>
          
            <Button
              type="button" onClick={()=>{
                const d={distance:distance.distance+unit}

                console.log("dd",d)
                var variable=distance
                variable.distance=distance.distance+unit

                  setdistance(shopCart => ({
                    ...shopCart,
                    ...d
                  }))
                if(distances.length>0){
                  
                setdistances([...distances,variable]);
                }
                else{
                setdistances([variable])}
                console.log("saa",distances)
                setdistance({place:"",distance:"",Location:{lat:0.0,lon:0.0}})
              }}>
              <div className="text-base p-1">Add</div>
            </Button>
            </div>
            
            {distances?.map((item,ind)=>(
            <div style={{display:'flex',flexDirection:'row',borderWidth:2,borderColor:'black',borderRadius:2,padding:7,alignSelf:'center'}}>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Place: </label>
            <p style={{marginRight:20}}>{item.place}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Distance: </label>
            <p style={{marginRight:20}}>{item.distance}</p>
            
            <Button
              type="button" onClick={()=>
              setdistances(distances.filter((it,index)=>index!=ind))}>
              <div style={{marginBottom:2}}>delete</div>
            </Button>
            </div>
            ))}

            
           
        {(fileBase64String!="" && formik.values.Description!="" && selected!="" && formik.values.Location!="" && formik.values.Name!="")?
          
          <div className="flex justify-end gap-8 mt-4">
            <Button
              type="button"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <div className="text-base p-1">Add Hotel</div>
            </Button>
          </div>:
          <div className="flex justify-end gap-8 mt-4">
          <Button
            type="button"
            onClick={() => {
              alert("Add Data!!")
            }}
          >
            <div className="text-base p-1">Add Hotel</div>
          </Button>
        </div>}
          <Backdrop
            title="Add"
            show={showModal}
            onClick={() => setShowModal(false)}
          >
            Are you sure you want to add the Hotel?
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
