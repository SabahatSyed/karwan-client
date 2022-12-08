import API from "./baseURL";

const Forgot = async (formData) => {
  try {
    const  data  = await API.post("/aforgotpassword", formData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};



const reset = async (id, formData) => {
  try {
    const res = await API.post(`/areset/${id}`, formData);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};





const userService = {
  Forgot,reset
};

export default userService;
