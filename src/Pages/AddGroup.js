import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../Components/UI/Input";
import Card from "../Components/UI/Card";

import Button from "../Components/UI/Button";
import Backdrop from "../Components/UI/BackdropModal";

import { useFormik } from "formik";

import useFetch from "../hooks/useFetch";
import groupService from "../api/groups.api";
import AllMembersItems from "../Components/DisplayItems/AllMembersItems";

const AddGroup = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [group, setGroup] = useState([]);
  const [isMember, setIsMember] = useState(false);

  const { data: users } = useFetch(`/get-users`, true);
  // console.log(users);

  console.log(group);
  const formik = useFormik({
    initialValues: {
      groupName: "",
      groupMembers: group,
      memberEmail: "",
    },
    // enableReinitialize: true,
    onSubmit: async (values) => {
      await groupService.addGroup({
        groupName: values.groupName,
        groupMembers: group,
      });
      navigate("/dashboard/groups");
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-4 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Add Group</h1>

          <div className="flex flex-col gap-6">
            <Input
              type="text"
              name="groupName"
              label="Group:"
              onChange={formik.handleChange}
              value={formik.values.groupName}
            />
            <Input
              type="text"
              name="memberEmail"
              label="Group Member (e-mail)"
              onChange={formik.handleChange}
              value={formik.values.memberEmail}
            />
            <div className="shadow-sm ">
              <h2 className="flex items-center justify-between mb-3">
                <p className="text-secondary text-xl font-semibold">
                  All Group Members
                </p>
                <Button
                  type={"button"}
                  onClick={() => {
                    if(!formik.values.memberEmail.includes("@") || !formik.values.memberEmail.includes(".com")){
                      alert("Enter Valid Email")
                    }
                    else{
                      setIsMember(false);

                      let preMember = group?.filter(
                        (member) => member?.email !== formik.values.memberEmail
                      );
                      console.log("memberEmail", group);

                        let filteredUser = users?.find(
                          (user) => user?.email == formik.values.memberEmail+""
                        );
                        console.log("filtered user",filteredUser)
                        if(filteredUser){
                          
                        setGroup([...group, filteredUser])}
                        else{
                          alert("Member does not exist")
                        }
                        console.log(group);
                     
                    }
                    
                  }}
                >
                  <div className="text-base p-1">Add User</div>
                </Button>
              </h2>

              <div
                className="flex flex-col gap-3 h-[45vh] pl-2 py-2 rounded border border-gray-500
                lg:pl-4 lg:py-4
                md:overflow-y-auto md:min-w-max scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-300 "
              >
                {group &&
                  group?.map((member) => (
                    <AllMembersItems
                      key={member?._id}
                      groupMember={member}
                      group={group}
                      setGroup={setGroup}
                    />
                  ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-8 mt-4">
            <Button
              type="button"
              onClick={() => {
                console.log(group.members);
                setShowModal(true);
              }}
            >
              <div className="text-base p-1">Add Group</div>
            </Button>
          </div>

          <Backdrop
            title="Duplicate"
            show={isMember}
            onClick={() => setIsMember(false)}
          >
            Cannot add the same member twice !
            <div className="self-end">
              <Button type={"button"} onClick={() => setIsMember(false)}>
                OK
              </Button>
            </div>
          </Backdrop>

          <Backdrop
            title="Update"
            show={showModal}
            onClick={() => setShowModal(false)}
          >
            Are you sure you want to update group details?
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

export default AddGroup;
