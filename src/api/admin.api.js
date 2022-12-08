import API from "./baseURL";

const addUser = async (formData) => {
  try {
    const { data } = await API.post("/add-admin", formData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};



const updateUser = async (id, formData) => {
  try {
    const res = await API.patch(`/update-admin/${id}`, formData);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    const res = await API.delete(`/delete-admin/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};



const userService = {
  addUser,
  updateUser,
  deleteUser
};

export default userService;
