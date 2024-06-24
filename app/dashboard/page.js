"use client";
import {
  CircularProgress,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import validator from "validator";
import { encrypt, getpasswords } from "./encodeDecode";

export default function Page() {
  const [passwordList, setpasswordList] = useState([]);
  useEffect(() => {
    const passwordListData = async () => {
      try {
        const List = await getpasswords();
        // console.log(List);
        setpasswordList(List);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };
    passwordListData();
  }, []);
  return (
    <div className="w-full h-full">
      {true ? (
        <div className="border rounded-md w-full y-full">
          <PasswordFields />
          <div className="text-center">Passwords</div>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>SITE</TableColumn>
              <TableColumn>USERNAME</TableColumn>
              <TableColumn>PASSWORD</TableColumn>
            </TableHeader>
            <TableBody>
              {passwordList ? (
                passwordList.map((password, index) => {
                  let passwords = {};
                  try {
                    passwords = JSON.parse(password);
                  } catch (error) {
                    toast.error("wrong master password");
                  }
                  return (
                    <TableRow key={index}>
                      <TableCell>{passwords.url}</TableCell>
                      <TableCell>{passwords.username}</TableCell>
                      <TableCell>{passwords.password}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <div>Add passwords to view</div>
              )}
            </TableBody>
          </Table>
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
  const [loading, setLoading] = useState(false);
  const addPassword = async () => {
    if (loading) return;
    try {
      setLoading(true);
      if (
        !validator.isURL(newPassword.url) ||
        !validator.isAlphanumeric(newPassword.username) ||
        !validator.isAlphanumeric(newPassword.password)
      ) {
        setLoading(false);
        return toast.error("Invalid input");
      }
      const unencryptedpassword = JSON.stringify(newPassword);
      const encyptedpassword = await encrypt(unencryptedpassword);
      const submitPassword = await axios.post(
        "/api/users/passwords",
        encyptedpassword
      );
      setLoading(false);
      toast.success("Password added successfully");
    } catch (error) {
      setLoading(false);
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
          placeholder="superman123"
          labelPlacement="outside"
          value={newPassword.password}
          onChange={(e) =>
            setNewPassword({ ...newPassword, password: e.target.value })
          }
        />
      </div>
      <div className="w-full flex justify-end items-end ">
        <button
          className="border-2 m-2 text-center font-semibold hover:text-black hover:bg-white cursor-pointer w-40"
          onClick={() => addPassword()}
        >
          {loading ? <CircularProgress size={24} /> : "Add password"}
        </button>
      </div>
    </div>
  );
}

function PasswordListFields(passwordList) {
  console.log(passwordList);

  return <div></div>;
}