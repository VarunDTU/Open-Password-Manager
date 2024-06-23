"use client";
import { Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { encrypt } from "./encodeDecode";
export default function Page() {
  return (
    <div className="w-full h-full">
      {true ? (
        <div className="border rounded-md w-full y-full">
          <PasswordFields />

          <div className="text-center">Passwords</div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center h-100 p-20"></div>
      )}
    </div>
  );
}
function PasswordFields() {
  const [newPassword, setNewPassword] = useState({
    url: "",
    username: "",
    password: "",
  });
  const addPassword = async () => {
    try {
      const unencryptedpassword = JSON.stringify(newPassword);
      const encyptedpassword = await encrypt(unencryptedpassword);
      const submitPassword = await axios.post("/api/users/passwords", {
        password: encyptedpassword,
      });
      toast.success("Password added successfully");
      console.log(submitPassword);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col gap-4 m-2">
      <Toaster />
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          label="Site URL"
          type="url"
          placeholder="www.google.com"
          labelPlacement="outside"
          value={newPassword.url}
          onChange={(e) =>
            setNewPassword({ ...newPassword, url: e.target.value })
          }
        />
        <Input
          type="text"
          label="Username"
          placeholder="Superman"
          labelPlacement="outside"
          value={newPassword.username}
          onChange={(e) =>
            setNewPassword({ ...newPassword, username: e.target.value })
          }
        />
        <Input
          type="password"
          label="Password"
          placeholder="0.00"
          labelPlacement="outside"
          value={newPassword.password}
          onChange={(e) =>
            setNewPassword({ ...newPassword, password: e.target.value })
          }
        />
      </div>
      <div className="w-full flex justify-end items-end ">
        <div
          className="border-2 m-2 text-center font-semibold hover:text-black hover:bg-white cursor-pointer w-40"
          onClick={() => addPassword()}
        >
          Add password
        </div>
      </div>
    </div>
  );
}
