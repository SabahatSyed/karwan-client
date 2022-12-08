import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import supplicationService from "../api/guides";
import Card from "../Components/UI/Card";
import Input from "../Components/UI/Input";
import Button from "../Components/UI/Button";
import Backdrop from "../Components/UI/BackdropModal";
import TextArea from "../Components/UI/TextArea";

const AddSupplication = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      guideTitle: "",
      guide: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      if (values.guide && values.guideTitle) {
        const res=await supplicationService.addSupplication(values);
        console.log("sfdfs",res)
        if(!res){
          alert("already exists")
        }
        navigate("/dashboard/guides");
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
          <h1 className="text-2xl">Add Guide</h1>
          <section className={`flex flex-col flex-wrap gap-6`}>
            <Input
              width="full"
              type="text"
              name="guideTitle"
              label="Title:"
              value={formik.values.guideTitle}
              onChange={formik.handleChange}
            />
            <TextArea
              width="full"
              type="text"
              name="guide"
              label="Guide"
              onChange={formik.handleChange}
              value={formik.values.guide}
            />
          </section>
          <div className="flex justify-end gap-8 mt-4">
            <Button
              type="button"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <div className="text-base p-1">Add Guide</div>
            </Button>
          </div>
          <Backdrop
            title="Add"
            show={showModal}
            onClick={() => setShowModal(false)}
          >
            Are you sure you want to Add Guide?
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

export default AddSupplication;
