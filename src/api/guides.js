import API from "./baseURL";

const addSupplication = async (formData) => {
  try {
    const { data } = await API.post("/add-guide", formData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateSupplication = async (id, formData) => {
  try {
    const res = await API.patch(`/update-guide/${id}`, formData);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteSupplication = async (id) => {
  try {
    const res = await API.delete(`/delete-guide/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const supplicationService = {
  addSupplication,
  updateSupplication,
  deleteSupplication,
};

export default supplicationService;
