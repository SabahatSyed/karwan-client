import React, { useState } from "react";
import Input from "../UI/Input";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Backdrop from "../UI/BackdropModal";
import InputFile from "../UI/InputFile";
import useFetchDoc from "../../hooks/useFetchDoc";
import bookService from "../../api/books.api";
import supplicationService from "../../api/guides";

const EditSupplication = () => {
  const navigate = useNavigate();
  const { supplicationId } = useParams();

  const { docData: supplication, isloading } = useFetchDoc(
    `/get-guide/${supplicationId}`
  );

  console.log(supplication);

  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      guideTitle: supplication?.guideTitle,
      guide: supplication?.guide,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      await supplicationService.updateSupplication(supplicationId, values);
      navigate("/dashboard/guides");
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Edit Guide</h1>
          <section
            className={`flex flex-col flex-wrap gap-6 transition-opacity duration-500 ease-out
          ${isloading ? "opacity-50" : "opacity-100"}`}
          >
            <Input
              width="full"
              type="text"
              name="guideTitle"
              label="Title:"
              value={formik.values.guideTitle}
              onChange={formik.handleChange}
            />
            <Input
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
              <div className="text-base p-1">Update</div>
            </Button>
            <Button
              type="button"
              onClick={() => {
                navigate("/dashboard/guides");
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
            Are you sure you want to update Guide?
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

export default EditSupplication;
