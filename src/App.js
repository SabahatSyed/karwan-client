import { Route, Routes } from "react-router-dom";
import Users from "./Pages/Users";
import MainPage from "./Pages/MainPage";
import EditUser from "./Components/DisplayItems/EditUser";
import Login from "./Pages/Login";
import AddVideo from "./Pages/AddVideo";
import AllVideos from "./Pages/AllVideos";
import AllVisaRequests from "./Pages/AllVisaRequests";
import AllBooks from "./Pages/AllBooks";
import AllGroups from "./Pages/AllGroups";
import AddGroup from "./Pages/AddGroup";
import AllBooksRequests from "./Pages/AllBooksRequests";
import EditVisaRequest from "./Components/DisplayItems/EditVisaRequest";
import EditGroup from "./Components/DisplayItems/EditGroup";
import EditBook from "./Components/DisplayItems/EditBook";
import EditBookRequest from "./Components/DisplayItems/EditBookRequest";
import EditVideo from "./Components/DisplayItems/EditVideo";
import EditHotel from "./Components/DisplayItems/EditHotel"
import EditTransport from "./Components/DisplayItems/EditTransport"
import AllHotelBookings from "./Pages/AllHotelBookings"
import AllTransportBookings from "./Pages/AllTransportBookings"
import AllProductCarts from "./Pages/AllProductCarts";
import EditProductCart from "./Components/DisplayItems/EditProductCart";
import EditHotelBooking from "./Components/DisplayItems/Edithotelbooking";
import EditTransportBooking from "./Components/DisplayItems/Edittransportbooking";
import AllSupplications from "./Pages/AllSupplications";
import EditSupplication from "./Components/DisplayItems/EditSupplication";
import AddUser from "./Pages/AddUser";
import AllProducts from "./Pages/AllProducts";
import AllHotels from "./Pages/AllHotels";
import AllTransports from "./Pages/AllTransport";
import AllFamily from "./Pages/Family"
import EditProduct from "./Components/DisplayItems/EditProduct";
import AddProduct from "./Pages/AddProduct";
import AddSupplication from "./Pages/AddSupplication";
import AllBanners from "./Pages/AllBanners";
import AddBanner from "./Pages/AddBanner";
import AddHotel from "./Pages/AddHotel";
import AddTransport from "./Pages/AddTransport";
import AllHotelBookingsHistory from "./Pages/AllHotelBookingsHistory"
import AllTransportBookingsHistory from "./Pages/AllTransportBookingsHistory"
import EditFamily from "./Components/DisplayItems/EditFamily"
import Accountdetails from "./Components/DisplayItems/Accountdetails"
import AccountManagement from "./Pages/AccountManagament"
import Reviews from "./Pages/Reviews"
import Wishlist from "./Pages/AllWishlists"
import HotelBookings from "./Pages/BookingHotel"
import TransportBookings from "./Pages/BookingTransport"
import Bookvehicle from "./Pages/BookVehicle"
import Bookroom from "./Pages/BookRoom"
import Bookdetails from "./Pages/BookingHotelDetails"
import Vehicledetails from "./Pages/BookingVehicleDetails"
import Dashboard from "./Pages/Dashboard"
import AddBook from "./Pages/AddBook"
import UserLocation from "./Pages/UserLocation"
import HolyPlaces from "./Pages/AddHolyPlaces"
import Transaction from "./Pages/Transaction";
import Transactiondetails from "./Components/DisplayItems/Transactiondetails"
import Location from "./Pages/AllUsersLocation"
import AddVisatype from "./Pages/AddVisatype"
import AllVisatypes from "./Pages/AllVisatypes"
import EditVisaType from "./Components/DisplayItems/EditVisaType"
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        {true && (
          <Route path="/dashboard" element={<MainPage />}>
            <Route index element={<AllVideos />} />
            <Route path="/dashboard/videos" element={<AllVideos />} />
            <Route path="/dashboard/duas" element={<AllSupplications />} />
            <Route path="/dashboard/books" element={<AllBooks />} />
            <Route path="/dashboard/products" element={<AllProducts />} />
            <Route path="/dashboard/hotels" element={<AllHotels/>} />
            <Route path="/dashboard/transports" element={<AllTransports/>} />
            <Route path="/dashboard/hotelbookings" element={<AllHotelBookings/>} />
            <Route path="/dashboard/transportbookings" element={<AllTransportBookings/>} />
            <Route path="/dashboard/hotelbookingshistory/:productId" element={<AllHotelBookingsHistory/>} />
            <Route path="/dashboard/transportbookingshistory/:productId" element={<AllTransportBookingsHistory/>} />
            <Route path="/dashboard/family" element={<AllFamily />} />
            <Route path="/dashboard/Accounts" element={<AccountManagement />} />
            <Route path="/dashboard/Accountdetails/:productId" element={<Accountdetails />} />
            <Route path="/dashboard/Reviews/:productId" element={<Reviews />} />
            <Route path="/dashboard/wishlists" element={<Wishlist />} />
            <Route path="/dashboard/BookHotel" element={<HotelBookings />} />
            <Route path="/dashboard/BookTransport" element={<TransportBookings />} />
            <Route path="/dashboard/Stats" element={<Dashboard/>} />
            <Route path="/dashboard/user-location/:productId" element={<UserLocation />} />
            <Route path="/dashboard/holyplaces" element={<HolyPlaces />} />
            <Route path="/dashboard/Transactions" element={<Transaction />} />
            <Route path="/dashboard/show-transanction/:productId" element={<Transactiondetails />} />
            <Route path="/dashboard/UserLocations" element={<Location />} />
            <Route path="/dashboard/book-room/:productId" element={<Bookroom />} />
            <Route path="/dashboard/book-vehicle/:productId" element={<Bookvehicle />} />
            <Route path="/dashboard/Confirm-Room/:productId" element={<Bookdetails />} />
            <Route path="/dashboard/Confirm-Vehicle/:productId" element={<Vehicledetails />} />
            <Route path="/dashboard/banners" element={<AllBanners />} />
            <Route path="/dashboard/visaTypes" element={<AllVisatypes />} />

            <Route
              path="/dashboard/productCarts"
              element={<AllProductCarts />}
            />
            <Route path="/dashboard/groups" element={<AllGroups />} />
            <Route path="/dashboard/users" element={<Users />} />
            <Route
              path="/dashboard/book-requests"
              element={<AllBooksRequests />}
            />
            <Route
              path="/dashboard/visa-requests"
              element={<AllVisaRequests />}
            />
            <Route path="/dashboard/add-visatype" element={<AddVisatype />} />
            <Route path="/dashboard/add-video" element={<AddVideo />} />
            <Route path="/dashboard/add-user" element={<AddUser />} />
            <Route path="/dashboard/add-banner" element={<AddBanner />} />
            <Route path="/dashboard/add-product" element={<AddProduct />} />
            <Route path="/dashboard/add-hotel" element={<AddHotel />} />
            <Route path="/dashboard/add-transport" element={<AddTransport />} />
            <Route path="/dashboard/add-book" element={<AddBook />} />
            <Route path="/dashboard/add-dua" element={<AddSupplication />} />
            <Route path="/dashboard/add-group" element={<AddGroup />} />
            <Route path="/dashboard/edit-family/:userId" element={<EditFamily />} />
            <Route path="/dashboard/edit-user/:userId" element={<EditUser />} />
            <Route path="/dashboard/edit-visa/:userId" element={<EditVisaType />} />

            <Route path="/dashboard/edit-book/:bookId" element={<EditBook />} />
            <Route
              path="/dashboard/edit-product/:productId"
              element={<EditProduct />}
            />
            <Route
              path="/dashboard/edit-hotel/:productId"
              element={<EditHotel />}
            />
            <Route
              path="/dashboard/edit-transport/:productId"
              element={<EditTransport />}
            />
            <Route
              path="/dashboard/edit-productCart/:productCartId"
              element={<EditProductCart />}
            />
            <Route
              path="/dashboard/edit-hotelbooking/:productCartId"
              element={<EditHotelBooking />}
            />
            <Route
              path="/dashboard/edit-transportbooking/:productCartId"
              element={<EditTransportBooking />}
            />
            <Route
              path="/dashboard/edit-video/:videoId"
              element={<EditVideo />}
            />
            <Route
              path="/dashboard/edit-dua/:supplicationId"
              element={<EditSupplication />}
            />
            <Route
              path="/dashboard/edit-group/:groupId"
              element={<EditGroup />}
            />
            <Route
              path="/dashboard/edit-visaRequest/:visaRequestId"
              element={<EditVisaRequest />}
            />
            <Route
              path="/dashboard/edit-bookRequest/:bookRequestId"
              element={<EditBookRequest />}
            />
          </Route>
        )}
        {/* <Route exact path="/*" element={<> Error 404 | Page Not founddd </>} /> */}
      </Routes>
    </>
  );
}

export default App;
