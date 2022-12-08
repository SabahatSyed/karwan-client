import React, { useEffect, useState } from "react";
import Card from "../Components/UI/Card";
import AllUsersItems from "../Components/DisplayItems/AllManageAccountItems";
import Spinner from "../Components/UI/Spinner";
import useFetch from "../hooks/useFetch";
import currentDate from "../utility/currentDate";
import userService from "../api/videos.api";
import Box from "@mui/material/Box";
import visaService from "../api/visa.api"
import { useNavigate } from "react-router-dom";
import Button from "../Components/UI/Button"
import ReactToPrint from 'react-to-print';
import { useRef } from "react";
import FormControl from "@mui/material/FormControl";

import { useReactToPrint } from "react-to-print";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

const Users = React.forwardRef(() => {
  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  let navigate = useNavigate();
  const [print,setprint]=useState(false)
  const [check3, setCheck3] = useState(false);
  const [flag,setflag]=useState(false)
  const { data: visa, isloading4 } = useFetch(
    "/get-visa",
    check
  );
  const { data: order, isloading1 } = useFetch(
    "/get-productCarts",
    check
  );
  const { data: hotelbookings, isloading2 } = useFetch(
    "/get-hotelbookings",
    check
  );
  const { data: transport, isloading3 } = useFetch(
    "/get-transportbookings",
    check
  );
  let componentRef = useRef(null);
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
  
  const { data: allUsers, isloading } = useFetch("/get-users", check);
  const [autocompleteValue1, setAutocompleteValue1] = useState(null);
  const [autocompleteValue2, setAutocompleteValue2] = useState(null);
  const [autocompleteValue3, setAutocompleteValue3] = useState(null);
  const [autocompleteValue4, setAutocompleteValue4] = useState(null);
  const [autocompleteValue5, setAutocompleteValue5] = useState(null);
  const [autocompleteValue6, setAutocompleteValue6] = useState(null);
  const [autocompleteValue7, setAutocompleteValue7] = useState(null);
  const [fil,setfil]=useState('');
  const [filt,setfilt]=useState('Name');
  const [FilteredReports,setFilteredReports]=useState([])
  const [FilteredReport,setFilteredReport]=useState([])

  const [filteredUsers,setFilteredUsers]=useState([])
  const [selectedUser,setSelectedUser]=useState([])
  const [filtersarr,setfarr]=useState([])
  const [Rows, setRows] = useState([]);
  const [currentDate,setcurrentDate]=useState()

  
  useEffect(() => {
    const date = new Date();
    setcurrentDate ( `${date.getDate()} / ${date.getMonth()+1} / ${date.getFullYear()}`);
 
  },[print]);  
  useEffect(() => {
    
  },[allUsers]);
  useEffect(() => {
    let selectedUsers = [];
    allUsers?.forEach((student) => {

        let filteredvisas =visa?.filter(
          (synopsis) => synopsis?.fullName === student?.userName
        );
        let filteredorder = order?.filter(
          (thesis) => thesis?.user_id?._id === student?._id
        );
        let filteredhotels = hotelbookings?.filter(
          (thesis) => thesis?.user_id?._id === student?._id
        );
        let filteredtransports = transport?.filter(
          (thesis) => thesis?.user_id?._id === student?._id
        );


        selectedUsers.push({
          user_id: student,
          ...(filteredvisas?.length > 0 && {
            visaType: filteredvisas[0].visaType,
            visastatus:filteredvisas[0].visaStatus
          }),
          ...(filteredorder?.length > 0 && {
            orderstatus: filteredorder[0].status,
            orderpaymentstatus:filteredorder[0].paymentstatus
          }),
          
          ...(filteredhotels?.length > 0 && {
            hotelstatus: filteredhotels[0].status,
          }),
          
          ...(filteredtransports?.length > 0 && {
            transportstatus: filteredtransports[0].status
          }),
        });
      
    });
    setSelectedUser(selectedUsers);
    setFilteredUsers(selectedUsers);
    setFilteredReport(selectedUsers);

    
  },[allUsers]);
  
  const handleVerified = (selectedStudent) => {
    var a;
    if(selectedStudent) {
      pusharray(selectedUser,selectedStudent,"Order")
    } else {
      setfil("")

      filterarray(selectedUser,'Order')
    }
  };
  const handleType= (selectedStudent) => {
    var a;
    if(selectedStudent) {
      pusharray(selectedUser,selectedStudent,"Type")
    } else {
      setfil("")

      filterarray(selectedUser,'Type')
    }
  };

  const handlehotel= (selectedStudent) => {
    var a;
    if(selectedStudent) {
      pusharray(selectedUser,selectedStudent,"Hotel")
    } else {
      setfil("")

      filterarray(selectedUser,'Hotel')
    }
  };
  const handlepayment= (selectedStudent) => {
    var a;
    if(selectedStudent) {
      pusharray(selectedUser,selectedStudent,"Payment")
    } else {
      setfil("")
      filterarray(selectedUser,'Payment')
    }
  };
  const handletransport= (selectedStudent) => {
    var a;
    if(selectedStudent) {
      pusharray(selectedUser,selectedStudent,"Transport")
    } else {
      setfil("")
      filterarray(selectedUser,'Transport')
    }
  };
  const handleregisteration= (selectedStudent) => {
    var a;
    if(selectedStudent) {
      pusharray(selectedUser,selectedStudent,"Registeration")
    } else {
      setfil("")
      filterarray(selectedUser,'Registeration')
    }
  };
  const handlevisastatus= (selectedStudent) => {
    var a;
    if(selectedStudent) {
      pusharray(selectedUser,selectedStudent,"visastatus")
    } else {
      setfil("")
      filterarray(selectedUser,'visastatus')
    }
  };
  const filterarray=(arr,type)=>{
    var array=filtersarr
    array=filtersarr.filter((item)=>item.type!=type)
    setfarr(array)

    showdata(arr,array)

  }

  const pusharray=(arr,item,type)=>{
    
    var array=filtersarr
    array=filtersarr?.filter((item)=>item.type!=type)
    if(array.length==0){
      let b={type:type,filter:item}
      array.push(b)
      setfarr(array)
      showdata(arr,array);
    }
    else{
      let b={type:type,filter:item}
      setfarr([...array,{type:type,filter:item}])
      array.push(b)
      showdata(arr,array)
    }
  }
  const showdata=(arr,b)=>{
    var a=arr
    b.map((item)=>{
      if(item.type=="Order"){
        	a=a.filter((report) => report?.orderstatus==item.filter)
      }
      else if(item.type=="Type"){
        a=a.filter((report) => report?.visaType==item.filter)
      }
      else if(item.type=="Hotel"){
        a=a.filter((report) =>report?.hotelstatus==item.filter)
      }
      else if(item.type=="Payment"){
        a=a.filter((report) =>report?.orderpaymentstatus==item.filter)
      }
      else if(item.type=="Transport"){
        a=a.filter((report) =>report?.transportstatus==item.filter)
      }
      else if(item.type=="Registeration"){
        a=a.filter((report) =>report?.user_id?.RegisterationDate==item.filter)
      }
      else if(item.type=="visastatus"){
        a=a.filter((report) =>report?.visastatus==item.filter)
      }
    })
    
              setFilteredUsers(a)
              setFilteredReports(a)


  }
  const defaultverification={
      
    options:["Pending","Awaiting Payment","Completed","Canceled"]

 // getOptionLabel:,
  }
  const defaultType={
      
    options:["umrah","hajj"]

 // getOptionLabel:,
  }
  const defaultPayment={
      
    options:["Cheque","Advance"]

 // getOptionLabel:,
  }
  const defaultSearches={
      
    options:["Name","UserId","Email","PhoneNo"]

 // getOptionLabel:,
  }
  const defaultRegisteration={
      
    options:["2022","2023","2024","2025","2026","2027","2028","2029","2030"]

 // getOptionLabel:,
  }
  const defaultvisaStatus={
      
    options:["Approved","Pending","Extended"]

 // getOptionLabel:,
  }
  const searchtext = (event) =>{
    setfil(event.target.value);
}
  
useEffect(() => {
  setFilteredReport(filterbySearch(selectedUser, fil,filt));
  
},[fil
]);
const filterbySearch=(data,fil,filt)=>{
  console.log("Data",data)
  console.log("fil",fil)
  console.log("filt",filt)
  if(filt=="Name"){
    if(fil==""){
      var row=[]
      setFilteredUsers(data);
      return data
    }
    var a = data.filter(item =>
           item.user_id.userName.toString().toLowerCase().startsWith(fil.toString().toLowerCase())     
          )
                 setFilteredUsers(a);
                 return a;

  }
  if(filt=="UserId"){
    if(fil==""){
      var row=[]
      setFilteredUsers(data);
      return data
    }
    var a = data.filter(item =>
           item.user_id._id.toString().startsWith(fil.toString())     
          )
          var row=[]
                 setFilteredUsers(a);
                 return a;

  }
  if(filt=="Email"){
    if(fil==""){
      var row=[]
      setFilteredUsers(data);
      return data
    }
    var a = data.filter(item =>
           item.user_id.email.toString().toLowerCase().startsWith(fil.toString().toLowerCase())     
          )
          var row=[]
                 setFilteredUsers(a);
                 return a;

  }
  if(filt=="PhoneNo"){
    if(fil==""){
      var row=[]
      setFilteredUsers(data);
      return data
    }
    var a = data.filter(item =>
           item.user_id.contact.toString().startsWith(fil.toString())     
          )
          var row=[]
                 setFilteredUsers(a);
                 return a;

  }
  
 }

  return (
    <Card>
      <div className="w-[90%] max-w-5xl h-full mx-auto">
        <header className="flex flex-col gap-2 justify-start mb-14 ">
          <h1 className="text-4xl">All Users</h1>
          <p className="text-gray-400">{currentDate}</p>
        </header>
        {/* Table */}
        {/* Header */}
        <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
        <FormControl fullWidth color="secondary" >
          <input id="demo-simple-select-label"  placeholder="Search"  value={fil}
              onChange={searchtext.bind(this)}   style={{borderRadius:3,marginRight:8,borderColor:"black",borderWidth:2,marginBottom:10,padding:13.5,color:'grey',fontFamily:'calibri',fontSize:16}}></input>
          
</FormControl>

<Box sx={{ minWidth: 200, marginBottom: "15px" }}>
        <Box sx={{ mb: 4 }}>
          <Autocomplete
            {...defaultSearches}
            id="controlled-demo"
            value={filt}
            onChange={(value, newValue) => {
              let verified = newValue;
              setfilt(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search By"
                variant="outlined"
                color="secondary"
              />
            )}
          />
        </Box>
      </Box> 
        </div>
        
      
        <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
       
        <Box sx={{ minWidth: 150, marginBottom: "15px" }}>
        <Box sx={{ mb: 4 }}>
          <Autocomplete
            {...defaultType}
            id="controlled-demo"
            value={autocompleteValue2}
            onChange={(value, newValue) => {
              let verified = newValue;
              setAutocompleteValue2(newValue);
              handleType(verified);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Visa Type"
                variant="outlined"
                color="secondary"
              />
            )}
          />
        </Box>
      </Box> 

      <Box sx={{ minWidth: 150, marginBottom: "15px" }}>
        <Box sx={{ mb: 4 }}>
          <Autocomplete
            {...defaultverification}
            id="controlled-demo"
            value={autocompleteValue1}
            onChange={(value, newValue) => {
              let verified = newValue;
              setAutocompleteValue1(newValue);
              handleVerified(verified);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Order Status"
                variant="outlined"
                color="secondary"
              />
            )}
          />
        </Box>
      </Box> 
      <Box sx={{ minWidth: 150, marginBottom: "15px" }}>
        <Box sx={{ mb: 4 }}>
          <Autocomplete
            {...defaultverification}
            id="controlled-demo"
            value={autocompleteValue3}
            onChange={(value, newValue) => {
              let verified = newValue;
              setAutocompleteValue3(newValue);
              handlehotel(verified);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Hotel Booking Status"
                variant="outlined"
                color="secondary"
              />
            )}
          />
        </Box>
      </Box> 
      <Box sx={{ minWidth: 150, marginBottom: "15px" }}>
        <Box sx={{ mb: 4 }}>
          <Autocomplete
            {...defaultverification}
            id="controlled-demo"
            value={autocompleteValue4}
            onChange={(value, newValue) => {
              let verified = newValue;
              setAutocompleteValue4(newValue);
              handletransport(verified);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Transport Booking Status"
                variant="outlined"
                color="secondary"
              />
            )}
          />
        </Box>
      </Box> 
      <Box sx={{ minWidth: 150, marginBottom: "15px" }}>
        <Box sx={{ mb: 4 }}>
          <Autocomplete
            {...defaultPayment}
            id="controlled-demo"
            value={autocompleteValue4}
            onChange={(value, newValue) => {
              let verified = newValue;
              setAutocompleteValue5(newValue);
              handlepayment(verified);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Order Payment Status"
                variant="outlined"
                color="secondary"
              />
            )}
          />
        </Box>
      </Box> 
      <Box sx={{ minWidth: 150, marginBottom: "15px" }}>
        <Box sx={{ mb: 4 }}>
          <Autocomplete
            {...defaultRegisteration}
            id="controlled-demo"
            value={autocompleteValue6}
            onChange={(value, newValue) => {
              let verified = newValue;
              setAutocompleteValue6(newValue);
              handleregisteration(verified);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Registeration Year"
                variant="outlined"
                color="secondary"
              />
            )}
          />
        </Box>
      </Box> 
      <Box sx={{ minWidth: 150, marginBottom: "15px" }}>
        <Box sx={{ mb: 4 }}>
          <Autocomplete
            {...defaultvisaStatus}
            id="controlled-demo"
            value={autocompleteValue7}
            onChange={(value, newValue) => {
              let verified = newValue;
              setAutocompleteValue7(newValue);
              handlevisastatus(verified);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Visa Status"
                variant="outlined"
                color="secondary"
              />
            )}
          />
        </Box>
      </Box> 
      </div>
      
        <div className="flex flex-col px-2" ref={el => (componentRef = el)}>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-secondary">Users</p>
            <svg
              className="fill-gray-400 object-contain h-10 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />
            </svg>
          </div>
          <hr className="max-w-full" />
          {/* Body */}

          {isloading ? (
            <div className="z-30 m-auto mt-20">
              <Spinner />
            </div>
          ) : (
            <div
              className="flex flex-col gap-5 mt-4 md:max-h-[55vh] xl:max-h-[55vh]
            md:overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-300" 
            >
              <div className="flex flex-col gap-y-7 " >
                {filteredUsers?.map((item) => {
                  return (
                    <div         
                    className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-9 flex place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center mr-4">
            {item?.user_id?.profilePic ? (
              <img
                src={item?.user_id?.profilePic}
                alt=""
                className="object-cover h-14 w-14 rounded-full"
              />
            ) : (
              <div className="h-14 w-14 bg-slate-300 rounded-full" />
            )}
          </div>
          <div>
          <p className="flex items-center">{item?.user_id?.userName}</p>
          <div className="flex" >
             
              <p className="text-sm font-normal opacity-70">
                Number:
              </p>
                <p className="text-sm font-normal opacity-70">
                {item.user_id?.contact}
              </p>
              
            </div>
            <div className="flex" >
             
              <p className="text-sm font-normal opacity-70">
                User Id:
              </p>
                <p className="text-sm font-normal opacity-70">
                {item.user_id?._id}
              </p>
              
            </div>
            </div>
        </div>
       
        <div className="col-span-2 lg:col-span-1 no-print print:invisible">
          <Button
            onClick={() => {
              navigate(`/dashboard/Accountdetails/${item?.user_id?._id}`);
            }}
          >
            Details
          </Button>
        </div>
        
      </div>
      
                  );
                })}
              </div>
            </div>
          )}
          
    
        </div>
       
      </div>
    </Card>
  );
})

export default Users;
