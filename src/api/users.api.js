import API from "./baseURL";

const addUser = async (formData) => {
  try {
    const { data } = await API.post("/add-user", formData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};



const updateUser = async (id, formData) => {
  try {
    const res = await API.patch(`/update-user/${id}`, formData);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    const res = await API.delete(`/delete-user/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateFamily = async (id, formData) => {
  try {
    const res = await API.patch(`/update-family/${id}`, formData);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteFamily = async (id,formData) => {
  try {
    const res = await API.delete(`/delete-family/${id}`,formData);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  addUser,
  updateUser,
  deleteUser,
  updateFamily,
  deleteFamily
};

export default userService;
