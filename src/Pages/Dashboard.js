import React, { useEffect, useState } from "react";
import Card from "../Components/UI/Card2";
import Chart from "../Components/UI/Chart";
import useFetch from "../hooks/useFetch";
import Spinner from "../Components/UI/Spinner";
import { FaUsers,FaUserPlus,FaPassport,FaUsersCog,FaSign,FaVideo,FaYoutube,FaPrayingHands,FaQuran
  ,FaClipboardList,FaHotel,FaCaravan,FaCarAlt,FaShoppingCart,FaStoreAlt,FaTaxi,FaBook,FaBookReader,
  FaFolderPlus,FaHouseUser,FaRegStar,FaSignOutAlt,FaKaaba,FaMoneyCheckAlt,FaSearchLocation } from "react-icons/fa";
  


const Dashboard = () => {
  const [check, setCheck] = useState(false);
  const [currentDate,setcurrentDate]=useState()
  const [hajj,sethajj]=useState()
  const [umrah,setumrah]=useState()
  const [osales,setosales]=useState()
  const [hsales,sethsales]=useState()
  const [tsales,settsales]=useState()

  const { data: users, isloading } = useFetch(
    "/get-users",
    check
  );
  const { data: visas, isloading1 } = useFetch(
    "/get-visa",
    check
  );
  const { data: books, isloading2 } = useFetch(
    "/get-books",
    check
  );
  const { data: videos, isloading3 } = useFetch(
    "/get-videos",
    check
  );
  const { data: products, isloading4 } = useFetch(
    "/get-products",
    check
  );
  const { data: orders, isloading5 } = useFetch(
    "/get-productCarts",
    check
  );
  const { data: transportbookings, isloading6 } = useFetch(
    "/get-transportbookings",
    check
  );
  const { data: transports, isloading7 } = useFetch(
    "/get-transports",
    check
  );
  const { data: hotelbookings, isloading8 } = useFetch(
    "/get-hotelbookings",
    check
  );
  const { data: hotels, isloading9 } = useFetch(
    "/get-hotels",
    check
  );
 
  const { data: banners, isloading10 } = useFetch(
    "/get-banners",
    check
  );

  const { data: groups, isloading13 } = useFetch(
    "/get-groups",
    check
  );
 
 
  const { data: bookRequests, isloading12 } = useFetch(
    "/get-bookRequests",
    check
  );
 
 
  console.log("users",users)
  console.log("visas",visas)
  console.log("books",books)
  console.log("videos",videos)
  console.log("products",products)
  console.log("transports",transports)
  console.log("hotels",hotels)
  console.log("transportbookings",transportbookings)
  console.log("hotelbookings",hotelbookings)
    

useEffect(()=>{
  const date = new Date();
  setcurrentDate ( `${date.getDate()} / ${date.getMonth()+1} / ${date.getFullYear()}`);
  sethajj(visas?.filter((item)=>item.visaType=="hajj"))
  setumrah(visas?.filter((item)=>item.visaType=="umrah"))
  var a=0,b=0,c=0;
  orders?.map((item)=>{
    if((item?.Total)){
      a=a+item?.Total
    }
  })
  setosales(a)
  console.log("b",a)

  hotelbookings?.map((item)=>{
    if((item?.Total)){
      b=b+item?.Total
    }
   })
   console.log("b",b)
   sethsales(b)
   transportbookings?.map((item)=>{
    if((item?.Total)){
      c=c+item?.Total
    }   })
   settsales(c)
   console.log("b",c)

},[bookRequests])
 
  return (
    <Card >
      <div className="w-[90%] max-w-5xl h-full mx-auto" >
        <header className="flex flex-col gap-2 justify-start md:min-h-max ">
          <h1 className="text-4xl text-white">Overview</h1>
          <p className="text-gray-400">{currentDate}</p>
        </header>
        <main className="mt-8 flex flex-col gap-4">
          <section>
            <div className="grid grid-cols-3 gap-4">
              
                <div
                  className="flex flex-col gap-6 items-center py-10 lg:py-6 col-span-4 sm:col-span-2 lg:col-span-1 rounded-xl border-2 border-gray-500 text-center
                  hover:border-primary hover:ring-1 hover:ring-primary 
                  transition ease-out duration-300 bg-boxes1"
                >
                  <div className="flex">
                  <FaUsers style={{color:"white",marginTop:10,marginRight:5}}/>
                  <p className="text-2xl text-gray-400 ">Total Users</p>
                  </div>
                  
                  {isloading ? (
            <div className="z-30 m-auto mt-20">
              <Spinner />
            </div>
          ) : <>
                  <p className="text-2xl text-gray-400">{users?.length}</p>
                  <div style={{display:'flex',flexDirection:'row',marginTop:20,color:'darkgreen'}}>
                  <p className="text-xl text-gray-400">Total Groups: </p>
                  <p className="text-xl text-gray-400">{groups?.length}</p>
                  </div>
                  </>
                  }
                </div>
                <div
                  className="flex flex-col gap-6 items-center py-10 lg:py-6 col-span-4 sm:col-span-2 lg:col-span-1 rounded-xl border-2 border-gray-500 text-center
                  hover:border-primary hover:ring-1 hover:ring-primary 
                  transition ease-out duration-300 bg-boxes2"
                >
                  <div className="flex">
                  <FaPassport style={{color:"black",marginTop:10,marginRight:5}}/>
                  <p className="text-2xl  ">Total Visas</p>
                  </div>
                  {isloading ? (
            <div className="z-30 m-auto mt-20">
              <Spinner />
            </div>
          ) : 
          <div>
            
                  <p className="text-2xl ">{visas?.length}</p>
                  <div style={{display:'flex',flexDirection:'row',marginTop:20,}}>
                  <p className="text-xl ">Hajj Applicants: </p>
                  <p className="text-xl ">{hajj?.length}</p>
                  </div>
                  <div style={{display:'flex',flexDirection:'row'}}>
                  <p className="text-xl">Umrah Applicants: </p>
                  <p className="text-xl ">{" "+umrah?.length}</p>
                  </div>
                  </div>
                  }
            </div>
            <div
                  className="flex flex-col gap-6 items-center py-10 lg:py-6 col-span-4 sm:col-span-2 lg:col-span-1 rounded-xl border-2 border-gray-500 text-center
                  hover:border-primary hover:ring-1 hover:ring-primary 
                  transition ease-out duration-300 bg-boxes1  "
                >
                  <div className="flex">
                  <FaKaaba style={{color:"white",marginTop:10,marginRight:5}}/>
                  <p className="text-2xl text-gray-400 ">Total items</p>
                  </div>
                  {isloading ? (
            <div className="z-30 m-auto mt-20">
              <Spinner />
            </div>
          ) : 
          <div>
            
                  <div style={{display:'flex',flexDirection:'row'}}>
                  <p className="text-xl text-gray-400">Books: </p>
                  <p className="text-xl text-gray-400">{books?.length}</p>
                  </div>
                  <div style={{display:'flex',flexDirection:'row'}}>
                  <p className="text-xl text-gray-400">Videos: </p>
                  <p className="text-xl text-gray-400">{" "+videos?.length}</p>
                  </div>
                  <div style={{display:'flex',flexDirection:'row'}}>
                  <p className="text-xl text-gray-400">Banners: </p>
                  <p className="text-xl text-gray-400">{" "+banners?.length}</p>
                  </div>
                  <div style={{display:'flex',flexDirection:'row'}}>
                  <p className="text-xl text-gray-400">BookRequests: </p>
                  <p className="text-xl text-gray-400">{" "+bookRequests?.length}</p>
                  </div>
                  </div>
                  }
            </div>
            <div
                  className="flex flex-col gap-6 items-center py-10 lg:py-6 col-span-4 sm:col-span-2 lg:col-span-1 rounded-xl border-2 border-gray-500 text-center
                  hover:border-primary hover:ring-1 hover:ring-primary 
                  transition ease-out duration-300 bg-boxes2"
                >
                  <div className="flex">
                  <FaShoppingCart style={{color:"black",marginTop:10,marginRight:5}}/>
                  <p className="text-2xl ">Total Products</p>
                  </div>
                  {isloading ? (
            <div className="z-30 m-auto mt-20">
              <Spinner />
            </div>
          ) : 
          <div>
            
                  <p className="text-2xl">{products?.length}</p>
                  <div style={{display:'flex',flexDirection:'row',marginTop:20,color:'black',marginTop:20}}>
                  <p className="text-xl ">Orders: </p>
                  <p className="text-xl ">{" "+orders?.length}</p>
                  </div>
                  <div style={{display:'flex',flexDirection:'row',marginTop:20,color:'black',marginTop:20}}>
                  <p className="text-xl ">Order Sales: </p>
                  <p className="text-xl">{" "+osales}</p>
                  </div>
                  </div>
                  }
            </div>
            <div
                  className="flex flex-col gap-6 items-center py-10 lg:py-6 col-span-4 sm:col-span-2 lg:col-span-1 rounded-xl border-2 border-gray-500 text-center
                  hover:border-primary hover:ring-1 hover:ring-primary 
                  transition ease-out duration-300 bg-boxes1"
                >
                  <div className="flex">
                  <FaHotel style={{color:"white",marginTop:10,marginRight:5}}/>
                  <p className="text-2xl text-gray-400 ">Total Hotel</p>
                  </div>
                  {isloading ? (
            <div className="z-30 m-auto mt-20">
              <Spinner />
            </div>
          ) : 
          <div>
            
                  <p className="text-2xl text-gray-400">{hotels?.length}</p>
                  <div style={{display:'flex',flexDirection:'row',marginTop:20}}>
                  <p className="text-xl text-gray-400">Hotel Bookings: </p>
                  <p className="text-xl text-gray-400">{" "+hotelbookings?.length}</p>
                  </div>
                  <div style={{display:'flex',flexDirection:'row',marginTop:20,marginTop:20}}>
                  <p className="text-xl text-gray-400">Sales: </p>
                  <p className="text-xl text-gray-400">{" "+hsales}</p>
                  </div>
                  </div>
                  }
            </div>
            <div
                  className="flex flex-col gap-6 items-center py-10 lg:py-6 col-span-4 sm:col-span-2 lg:col-span-1 rounded-xl border-2 border-gray-500 text-center
                  hover:border-primary hover:ring-1 hover:ring-primary 
                  transition ease-out duration-300 bg-boxes2"
                >
                  <div className="flex">
                  <FaCaravan style={{color:"black",marginTop:10,marginRight:5}}/>
                  <p className="text-2xl ">Total Transport</p>
                  </div>
                  {isloading ? (
            <div className="z-30 m-auto mt-20">
              <Spinner />
            </div>
          ) : 
          <div>
            
                  <p className="text-2xl ">{transports?.length}</p>
                  <div style={{display:'flex',flexDirection:'row',marginTop:20,color:'black'}}>
                  <p className="text-xl">Transport Bookings: </p>
                  <p className="text-xl">{" "+transportbookings?.length}</p>
                  </div>
                  <div style={{display:'flex',flexDirection:'row',marginTop:20,color:'black',marginTop:20}}>
                  <p className="text-xl">Sales: </p>
                  <p className="text-xl">{"Rs. "+tsales}</p>
                  </div>
                  </div>
                  }
            </div>


            </div>
          </section>
          {/*<section>
            <div
              className="grid grid-cols-8 rounded-xl border-2 border-gray-500 hover:border-primary hover:ring-1 hover:ring-primary
                  transition ease-out duration-300"
            >
              <div className="p-6 lg:p-10 col-span-8 sm:col-span-8 md:col-span-6 lg:col-span-5">
                <p>Todays Trends</p>
                <p>60</p>
                <div className="h-60">
                  <Chart />
                </div>
              </div>
              <div
                className="p-6 lg:p-10 col-span-8 sm:col-span-8 md:col-span-2 lg:col-span-3 border-l-2 sm:border-t-2 sm:border-t-gray-500 md:border-l-gray-500 md:border-t-0 
              hover:border-l-primary hover:ring-1 hover:ring-primary
              transition ease-out duration-300 "
              >
                <p>Unresolved</p>
                <p>60</p>
              </div>
            </div>
              </section>*/}
        </main>
      </div>
    </Card>
  );
};

export default Dashboard;
