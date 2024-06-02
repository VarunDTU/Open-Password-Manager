"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function Page() {
  const [user, setuser] = useState(null);
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      const userData = await axios.get("/api/users/about");
      setuser(userData.data.data);
      console.log(user);
    } catch (e) {
      console.log(e);
      toast(e.response?.data?.message || e.message);
    }
  };
  console.log(user);
  return (
    <div className="w-full p-10 h-full">
      {!user ? (
        <div>Error fetching data</div>
      ) : (
        <div className="w-full h-full p-10 flex justify-center border rounded-md flex-col">
          <div className="grid justify-around text-center border-y m-1 grid-cols-2">
            <div className="m-1 rounded w-100 h-full text-center ">
              Username
            </div>
            <div className="m-1 rounded w-100 h-full text-center ">
              {user?.userName}
            </div>
          </div>
          <div className="grid justify-around text-center border-y m-1 grid-cols-2">
            <div className="m-1 rounded w-100 h-full text-center ">Email</div>
            <div className="m-1 rounded w-100 h-full text-center ">
              {user?.email}
            </div>
          </div>
          <div className="grid justify-around text-center border-y m-1 p-2 items-center grid-cols-2">
            <div className="m-1 rounded w-100 h-full text-center  ">
              Account Password
            </div>
            <div className="m-1 p-1 rounded h-full text-center cursor-pointer bg-slate-950">
              Reset the Account password
            </div>
          </div>
          <div className="grid justify-around text-center border-y m-1 p-2 items-center grid-cols-2">
            <div className="m-1 rounded w-100 h-full text-center  ">
              Master Password
            </div>
            <div className="m-1 p-1 rounded h-full text-center cursor-pointer bg-slate-950">
              Reset the master password
            </div>
          </div>
          <div className="grid justify-around text-center border-y m-1 p-2 items-center grid-cols-2">
            <div className="m-1 rounded w-100 h-full text-center  ">
              Download Unencrypted password json
            </div>
            <div className="m-1 p-1 rounded h-full text-center cursor-pointer bg-slate-950">
              Download
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
