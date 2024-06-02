"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
export default function Page() {
  const [user, setuser] = useState(null);
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      const userData = await axios.post("/api/users/masterpassword", {
        masterPassword: true,
      });
      setuser(userData);
      console.log(userData);
    } catch (e) {
      console.log(e);
      toast(e.response?.data?.message || e.message);
    }
  };
  return (
    <div className="w-full h-full">
      <Toaster></Toaster>
      <div className="w-full flex items-center justify-center h-100 p-20">
        <div className="border w-full y-full">
          <div className="text-center">Passwords</div>
          <div className="border-2 m-2"></div>
        </div>
      </div>
    </div>
  );
}
