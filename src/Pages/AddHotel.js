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

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const AddProduct = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [productPic, setProductPic] = useState();
  const [Rooms,setRooms]=useState([])
  const [distances,setdistances]=useState([])
  const [room,setroom]=useState({Type:"",Size:"",Price:0,availability:[]})
  const [distance,setdistance]=useState({place:"",distance:""})
  const [fileBase64String, setFileBase64String] = useState("");
  const defaultProps = {
    center: {
      lat: 33.6844,
      lng: 73.0479
    },
    zoom: 16
  };
  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    var array=[]
    var arr=file
    console.log("gfdo",file)
    
      console.log("dbasj")
      if (file) {
         reader.readAsDataURL(file);
       reader.onload =() => {
          var Base64 = reader.result;

          setFileBase64String(Base64);
        };
        reader.onerror = (error) => {
          console.log("error: ", error);
        };
      }
    
    console.log("arrya",fileBase64String)
    
  };

  const formik = useFormik({
    initialValues: {
      Name: "",
      Facilities: "",
      Description: "",
      Location:"",
      images:fileBase64String,
      Room: [],
      distances:[]
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      if (
        values.Name &&
        values.Description &&
        values.Facilities &&
        values.Location 
        ) {
          values.Room=Rooms
          values.distances=distances
          console.log("sdaca",values)
          
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
            <TextArea
            rows={3}
            type="text"
            label="Facilities:"
            name="Facilities"
            onChange={formik.handleChange}
            value={formik.values.Facilities}
          />
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
            <label className="text-secondary">Type:</label>
            <input
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
            />
            <label className="text-secondary">Size:</label>
            <input
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
            />
            <label className="text-secondary">Price:</label>
            <input
              style={{width:"25%",marginLeft:20,marginRight:20}}
              type="text"
              label="Price:"
              name="room.Price"
              onChange={(e) => {
                var value={Price:e.target.value}
                setroom(shopCart => ({
                ...shopCart,
                ...value
              }))}}
              value={room.Price}
            />
            <Button
              type="button" onClick={()=>{
                if(Rooms.length>0){
                  setRooms([...Rooms,room]);
                }
                else{setRooms([room])}
                console.log("saa",Rooms)
                setroom({Type:"",Size:"",Price:0,availability:[]})
              }}>
              <div className="text-base p-1">Add</div>
            </Button>
            </div>

            {Rooms?.map((item,ind)=>(
            <div style={{display:'flex',flexDirection:'row',borderWidth:2,borderColor:'black',borderRadius:2,padding:7,alignSelf:'center'}}>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Type: </label>
            <p style={{marginRight:20}}>{item.Type}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Size: </label>
            <p style={{marginRight:20}}>{item.Size}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Price: </label>
            <p style={{marginRight:20}}>{item.Price}</p>
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
            <input
              style={{width:"25%",marginLeft:20,marginRight:20}}
              type="text"
              label="Place:"
              name="distance.place"
              onChange={(e) => {
                var value={place:e.target.value}
                setdistance(shopCart => ({
                ...shopCart,
                ...value
              }))}}
              value={distance.place}
            />
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
            <Button
              type="button" onClick={()=>{
                if(distances.length>0){
                  setdistances([...distances,distance]);
                }
                else{setdistances([distance])}
                console.log("saa",distances)
                setdistance({place:"",distance:""})
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

            <div className="flex items-center gap-6 mr-4">
            <p className="text-l" style={{fontweight:'bold'}}>Images</p>



         
            <InputFile
                name="imagePath"
                imageName={productPic?.name}
                onChange={(e) => {
                  setProductPic(e.target.files[0]);
                }}
                onUpload={() => {
                  encodeFileBase64(productPic);
                }}
              >
                Upload
              </InputFile>
            </div>
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
          <div className="flex justify-end gap-8 mt-4">
            <Button
              type="button"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <div className="text-base p-1">Add Hotel</div>
            </Button>
          </div>
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
