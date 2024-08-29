import { create } from "zustand";

export const userStore = create((set,get) => ({
  authToken:'',
  user:{},
  users:[],
  createuser: async (newuser) => {
    try {
      const res = await fetch("/api/User/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newuser),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        // Ensure the response structure is as expected
        return {
          success: false,
          message: data.message || "An error occurred during sign-up.",
        };
      }
  
      return {
        success: data.success !== undefined ? data.success : true,
        message: data.message || "Sign-up successful!",
      };
  
    } catch (error) {
      console.error("Error during sign-up:", error);
      return {
        success: false,
        message: "An error occurred. Please try again later.",
      };
    }
  },
  login: async (payload)=>{
    const res = await fetch("/api/User/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    //console.log(payload);
    if (!res.ok) {
      const data = await res.json();
      return { success: false, message: data.error };
    }
    const data = await res.json();
    set({ authToken: data.token });
    set({ user: data.user });
    return { success: true, message: "Logged In Successfully" };
  },
  
  fetchUsers: async () => {
    const { user } = get();
    if(user.role!="user"){
    const res = await fetch("/api/User");
    const data = await res.json();
    //console.log(data);
    // const filteredProduct = data.data.filter(
    //   (product) => product.user === user
    // );
    //console.log(filteredProduct);
    set({ users: data.data });
    }
  },

  logout: ()=>{
    set({authToken:''});
    set({user:{}});
    set({users:[]})
  }
}));
