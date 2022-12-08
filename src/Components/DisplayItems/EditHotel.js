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
import hotelService from "../../api/hotelService.api";
import { Select,MenuItem } from "@mui/material";
const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [flag,setflag]=useState(false)
  const [showModal, setShowModal] = useState(false);
  const [productPic, setProductPic] = useState();
  
  const [room,setroom]=useState({Type:"",Size:"",Price:0,availability:[]})
  const [distance,setdistance]=useState({place:"",distance:""})
  const [fileBase64String, setFileBase64String] = useState("");
  const { docData: product, isloading } = useFetchDoc(
    `/get-hotel/${productId}`
  );
  const [Rooms,setRooms]=useState(product?.Room)
  const [distances,setdistances]=useState(product?.distances)
    const [selected,setSelected]=useState([])
  console.log(product);
  console.log(Rooms);
  useEffect(() => {
    setRooms(product?.Room)
    setdistances(product?.distances)
    console.log("prods",product?.Facilities)
    var a=[]
    product?.Facilities?.map((item)=>{
      a.push(item)
    })
   setSelected(a)
  }, [product]);
  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    var array=[]
    var arr=file
  
    setflag(true)
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
      Name: product?.Name,
      Facilities: product?.Facilities,
      Description: product?.Description,
      Location:product?.Location,
      images:"",
      Room: product?.Room,
      distances:product?.distances
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
          if(!fileBase64String){
            values.images=product?.images
          }
          else{
            values.images=fileBase64String
          }
          values.Room=Rooms
          values.distances=distances
          values.Facilities=selected
          console.log("sdaca",values)
      await hotelService.updateHotel(productId, values);
     navigate("/dashboard/hotels");
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Edit Hotel</h1>
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
            {console.log("red",Rooms)}
      <label className="text-secondary font-semibold">Room:</label>
      <div style={{display:'flex',flexDirection:'row'}}>
      <label className="text-secondary">Id:</label>
            <input
              style={{width:"25%",marginLeft:20,marginRight:20}}
              type="text"
              label="Id:"
              name="room.id"
              onChange={(e) => {
                var value={id:e.target.value}
                setroom(shopCart => ({
                ...shopCart,
                ...value
              }))}}
              value={room.id}
            />
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
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Id: </label>
            <p style={{marginRight:20}}>{item.id}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Type: </label>
            <p style={{marginRight:20}}>{item.Type}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Size: </label>
            <p style={{marginRight:20}}>{item.Size}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Price: </label>
            <p style={{marginRight:20}}>{item.Price}</p>
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
              type="button" onClick={()=>{
              setdistance(item)
              setdistances(product?.distances.filter((it,index)=>index!=ind))
            }}
              >
              <div style={{marginBottom:2}}>edit</div>
            </Button>
            <div style={{marginRight:5}}></div>
            <Button
              type="button" onClick={()=>{
              setdistances(distances.filter((it,index)=>index!=ind))
            }}
              >
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
              {
                fileBase64String?
                <p>Uploaded</p>:
                flag?
                <p>Uploading</p>
                :
                <p></p>

              }
            </div>

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
                navigate("/dashboard/hotels");
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
            Are you sure you want to update product details?
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
