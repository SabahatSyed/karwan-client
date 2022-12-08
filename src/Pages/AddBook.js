import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Card from "../Components/UI/Card";
import productService from "../api/books.api";
import InputFile from "../Components/UI/InputFile";
import Input from "../Components/UI/Input";
import TextArea from "../Components/UI/TextArea";
import Button from "../Components/UI/Button";
import Backdrop from "../Components/UI/BackdropModal";
import Spinner from "../Components/UI/Spinner";

const AddProduct = () => {
  const navigate = useNavigate();
  const [flag,setflag]=useState(false)

  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [fileBase64String, setFileBase64String] = useState("");

  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
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
      bookTitle: "",
      book: "",
    },
    enableReinitialize: true,
    
    onSubmit: async (values) => {
      if (
        values.bookTitle 
      ) {
        values.book=fileBase64String
        const res=await productService.addBook(values);
        console.log("ress",res)
        if(!res){
          alert("Book Already Exists")
        }
        navigate("/dashboard/books");

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
          <h1 className="text-2xl">Add Book</h1>
          <section className={`flex flex-col flex-wrap gap-6 `}>
            
            <Input
              width="full"
              type="text"
              label="Title:"
              name="bookTitle"
              onChange={formik.handleChange}
              value={formik.values.bookTitle}
            />
           <div className="flex items-center gap-6 mr-4">
              
              <p className="text-l" style={{fontweight:'bold'}}>Images</p>
              <label
          className="block  py-1 px-2 cursor-pointer rounded text-center min-w-[8rem] max-w-[10rem]
          border-2 border-dashed border-primary 
          hover:border-3 hover:border-dashed hover:border-primary 
          transition ease-out duration-1000"
        >
          <span className="text-sm">
            {product?.name ? product?.name : "Choose file"}
          </span>
          <input className="hidden" type="file" name={product?.name}  onChange={(e) => {
                    setProduct(e.target.files[0])
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

          </section>

          <div className="flex justify-end gap-8 mt-4">
            <Button
              type="button"
              onClick={() => {
                  setShowModal(true);
                
                
              }}
            >
              <div className="text-base p-1">Add Book</div>
            </Button>
          </div>
          <Backdrop
            title="Add"
            show={showModal}
            onClick={() => setShowModal(false)}
          >
            Are you sure you want to add this Book?
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
