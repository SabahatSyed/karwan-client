import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bannerService from "../../api/banners.api";
import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";
import Backdrop2 from "../UI/BackdropModal2";
import InputFile from "../../Components/UI/InputFile";
import Spinner from "../../Components/UI/Spinner";
const BannerItems = ({ banner, check, setCheck }) => {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showimgModal, setimgShowModal] = useState(false);
  const [showModalImage, setShowModalImage] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [fileBase64String, setFileBase64String] = useState("");
  const [flag,setflag]=useState(false)

  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    if (file) {
      setflag(true)
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;
        console.log(Base64);
        setFileBase64String(Base64);
        bannerService.updateBanner(banner._id,{title:banner.title,bannerImage:Base64})
      };
      reader.onerror = (error) => {
        console.log("error: ", error);
      };
    }
  };
  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-9 flex place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center mr-4">
            {banner?.bannerImage ? (
              <img
                src={banner?.bannerImage}
                alt=""
                onClick={()=>setimgShowModal(true)}
                className="object-cover h-20 w-24 rounded"
              />
            ) : (
              <div className="h-20 w-24 bg-slate-300 rounded" />
            )}
          </div>
          <p className="flex items-center">{banner?.title}</p>
        </div>
        {/* <div className="col-span-2 lg:col-span-1">
          <Button
            onClick={() => {
              navigate(`/dashboard/edit-banner/${banner._id}`);
            }}
          >
            Edit
          </Button>
        </div> */}
        <div className="col-span-5 lg:col-span-3">
          <Button
            alt
            onClick={() => {
              setShowModal(true);
            }}
          >
            Delete
          </Button>
          <Button
            alt
            onClick={() => {
              setShowModalImage(true);
            }}
          >
            Change Banner
          </Button>
        </div>
      </div>
      <Backdrop2
        
        show={showimgModal}
        onClick={() => setimgShowModal(false)}
      >
        <div className="self-end" >
            {banner?.bannerImage ? (
              <img
                src={banner?.bannerImage}
                alt=""
                className="object-cover h-70 w-74 rounded"
              />
            ) : (
              <div className="h-20 w-24 bg-slate-300 rounded" />
            )}
          </div>
       
      </Backdrop2>
      <Backdrop
        title="Delete!"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Are you sure you want to delete the banner?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={async () => {
              await bannerService.deleteBanner(banner._id);
              setCheck(!check);
              setShowModal(false);
            }}
          >
            Yes
          </Button>
        </div>
      </Backdrop>
      <Backdrop
        show={showModalImage}
        onClick={() => setShowModal(false)}
      >
        <div className="flex items-center gap-6 mr-4">
              {fileBase64String ? (
                <img
                  src={fileBase64String}
                  alt=""
                  className="object-cover h-40 w-64 rounded"
                />
              ) : (
                <div className="h-40 w-64 bg-slate-300 rounded" />
              )}
              <InputFile
                name="imagePath"
                imageName={profilePic?.name}
                onChange={(e) => {
                  setProfilePic(e.target.files[0]);
                }}
                onUpload={() => {
                  encodeFileBase64(profilePic);
                  setShowModalImage(false)
                }}
              >
                Upload
              </InputFile>
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
      </Backdrop>
    </>
  );
};

export default BannerItems;
