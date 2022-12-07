import React, { useState } from "react";
import profile from "../../Assets/Images/profile.png";
import close from "../../Assets/Images/close-outline.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Backdrop from "./Backdrop";
import { useSelector } from "react-redux";
import { auth } from "../../api/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import logo from "../../Assets/Images/logo.png";
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import { SvgIcon } from '@mui/material';
import { FaUsers,FaUserPlus,FaPassport,FaUsersCog,FaSign,FaVideo,FaYoutube,FaPrayingHands,FaQuran
,FaClipboardList,FaHotel,FaCaravan,FaCarAlt,FaShoppingCart,FaStoreAlt,FaTaxi,FaBook,FaBookReader,
FaFolderPlus,FaHouseUser,FaRegStar,FaSignOutAlt,FaKaaba,FaMoneyCheckAlt,FaSearchLocation } from "react-icons/fa";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({});
  const [isloading, setIsLoading] = useState(true);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const logout = async () => {
    localStorage.removeItem("isLoggedIn");
    await signOut(auth);
  };

  const sidebarList = [
    { key: "0", name: "Dashboard", route: "/dashboard/Stats",icon:<FaHouseUser/> },
    { key: "1", name: "Users", route: "/dashboard/users",icon:<FaUsers/> },
    { key: "2", name: "User Location", route: "/dashboard/UserLocations",icon:<FaSearchLocation/> },
    { key: "3", name: "Family", route: "/dashboard/family",icon:<FaUsers/> },
    { key: "4", name: "Add User", route: "/dashboard/add-user",icon:<FaUserPlus/> },
    { key: "5", name: "Add Visa", route: "/dashboard/add-visatype",icon:<FaPassport/> },
    { key: "6", name: "All Visas", route: "/dashboard/visaTypes",icon:<FaPassport/> },
    { key: "7", name: "Visa Requests", route: "/dashboard/visa-requests",icon:<FaPassport/> },
    { key: "8", name: "Groups", route: "/dashboard/groups" ,icon:<FaUsers/> },
    { key: "9", name: "Add Group", route: "/dashboard/add-group",icon:<FaUsersCog/> },
    { key: "10", name: "Banners", route: "/dashboard/banners",icon:<FaSign/> },
    { key: "11", name: "Add Banner", route: "/dashboard/add-banner",icon:<FaSign/> },
    { key: "12", name: "Videos", route: "/dashboard/videos",icon:<FaVideo/> },
    { key: "13", name: "Add Video", route: "/dashboard/add-video",icon:<FaYoutube/> },
    { key: "14", name: "Duas", route: "/dashboard/duas",icon:<FaPrayingHands/> },
    { key: "15", name: "Add Dua", route: "/dashboard/add-dua",icon:<FaPrayingHands/> },
    { key: "16", name: "Products", route: "/dashboard/products",icon:<FaQuran/> },
    { key: "17", name: "Add Product", route: "/dashboard/add-product",icon:<FaClipboardList/> },
    { key: "18", name: "Hotels", route: "/dashboard/hotels",icon:<FaHotel/> },
    { key: "19", name: "Add Hotel", route: "/dashboard/add-hotel",icon:<FaHotel/> },
    { key: "20", name: "Transports", route: "/dashboard/transports",icon:<FaCaravan/> },
    { key: "21", name: "Add Transport", route: "/dashboard/add-transport",icon:<FaCarAlt/> },
    { key: "22", name: "Orders", route: "/dashboard/productCarts",icon:<FaShoppingCart/> },
    { key: "23", name: "Hotel Bookings", route: "/dashboard/hotelbookings",icon:<FaStoreAlt/> },
    { key: "24", name: "Transport Bookings", route: "/dashboard/transportbookings",icon:<FaTaxi/> },
    { key: "25", name: "Add Book", route: "/dashboard/add-book",icon:<FaBook/> },
    { key: "26", name: "Books", route: "/dashboard/books",icon:<FaBookReader/> },
    { key: "27", name: "Book Requests", route: "/dashboard/book-requests",icon:<FaFolderPlus/> },
    { key: "28", name: "Add HolyPlaces", route: "/dashboard/holyplaces",icon:<FaKaaba/> },
    { key: "29", name: "Transanctions", route: "/dashboard/Transactions",icon:<FaMoneyCheckAlt/> },
    { key: "30", name: "Manage Accounts", route: "/dashboard/Accounts",icon:<FaHouseUser/> },
    { key: "31", name: "Wishlist", route: "/dashboard/wishlists",icon:<FaRegStar/> },
    { key: "32", name: "Book Hotel", route: "/dashboard/BookHotel",icon:<FaHotel/>  },
    { key: "33", name: "Book Transport", route: "/dashboard/BookTransport",icon:<FaCaravan/> },
    { key: "34", name: "Logout", route: "/", logout: true,icon:<FaSignOutAlt/> },
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed flex flex-col gap-6 p-4 z-50 w-full max-w-[300px] min-h-screen bg-primary
        overflow-y-auto 
        ${
          props.open === true
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-20"
        } transition ease-out duration-300`}
      >
        <div className="flex flex-col gap-2">
          <img
            onClick={() => {
              props.setOpen(!props.open);
              props.setShowBackdrop(false);
            }}
            src={close}
            alt="close"
            className="md:hidden object-contain h-8 cursor-pointer ml-auto "
          />
          <div className="flex flex-col gap-4">
            <img
              src={logo}
              alt="pic"
              className="object-contain h-20 self-start rounded-xl"
            />
            <h2 className="text-3xl text-white break-all">
              Karwan-e-Hasnath Team
            </h2>

          </div>
          {/* <p className="text-base break-all text-slate-200">
            {user?.email || "admin@gmail.com"}
          </p> */}
        </div>
        <FaUsers/>

        <ul className="flex flex-col gap">
          {sidebarList.map((item, index) => (
              <div key={item.key} className="max-w">
                <Link
                  key={item.key}
                  to={item.route}
                  className="text-xl text-white cursor-pointer"
                  onClick={() => {
                    props.setOpen(!props.open);
                    props.setShowBackdrop(false);
                  }}
                >
                  {item.name}
                </Link>
                <hr className="md:hidden mt-2" />
              </div>
            )
          )}
        </ul>
      </div>
      <Backdrop
        showBackdrop={props.showBackdrop}
        onClick={() => {
          props.setOpen(!props.open);
          props.setShowBackdrop(false);
        }}
      />
      {/* Mobile Sidebar */}

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-[90%] max-w-[200px] lg:max-w-[280px]  mx-auto">
        <div className="hidden sm:flex sm:flex-col sm:gap-14 sm:text-3xl sm:min-h-full sm:max-w-72 sm:p-4 lg:p-10">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-4">
              <img
                src={logo}
                alt="pic"
                className="object-contain h-24 self-start rounded-xl"
              />
              <h2 className="text-base text-white break-all">
                Karwan-e-Hasnath
              </h2>
            </div>
          </div>
          <ul
            className="w-full max-w-[180px] md:max-h-[60vh] xl:max-h-[60vh]
            md:overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary"
          >
            {sidebarList.map((item) => {
              return (
                <div
                  key={item.key}
                  className={`mb-4 rounded ease-in-out transition-all duration-150
                  hover:bg-slate-100 hover:bg-opacity-20 hover:pl-4
                  
                  ${
                    location.pathname === item.route &&
                    "bg-slate-100 bg-opacity-20 pl-4"
                  }`}
                >
                  <Link
                    key={item.key}
                    to={item.route}
                    className="block text-xl text-white px-2 py-2"
                    onClick={() => {
                      item.logout && logout();
                    }}
                  >
                    <div style={{display:"flex"}}>
                      <p style={{marginRight:10,marginTop:3}}>
                      {item.icon}
                      </p>
                    {item.name}
                    </div>
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
