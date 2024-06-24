"use client";

import { Input } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
export default function Page() {
  const router = useRouter();
  const [Users, setUsers] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [button, setButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const SignUpUsers = async () => {
    try {
      setButton(false);
      setLoading(true);
      const response = await axios.post("/api/users/signup", Users);
      console.log(response);
      router.push("/login");
    } catch (e) {
      console.log(e.response.data.message);
      toast.error(e.response?.data?.message || e.message);
      setButton(true);
      setLoading(false);
    } finally {
      setButton(true);
    }
  };
  const verifyData = () => {
    if (
      Users.password.length > 0 &&
      Users.email.length > 0 &&
      Users.username.length > 0
    ) {
      return setButton(true);
    } else {
      setButton(false);
    }
  };
  useEffect(() => {
    verifyData();
  }, [Users]);
  return (
    <div className="w-full flex p-5 justify-center min-h-screen border-1">
      <Toaster />
      {loading ? (
        <div>Creating a user....</div>
      ) : (
        <div>
          <div className="w-96 flex flex-col gap-4">
            <div
              key="flat"
              className="flex w-full flex-col md:flex-nowrap mb-6 md:mb-0 gap-4 "
            >
              <Input
                type="username"
                variant="flat"
                label="Display Name"
                onChange={(e) =>
                  setUsers({ ...Users, username: e.target.value })
                }
                value={Users.username}
              />
              <Input
                type="email"
                variant="flat"
                label="Email"
                onChange={(e) => setUsers({ ...Users, email: e.target.value })}
                value={Users.email}
              />
              <Input
                type="password"
                variant="flat"
                label="Password"
                placeholder="Set your Password"
                onChange={(e) =>
                  setUsers({ ...Users, password: e.target.value })
                }
                value={Users.password}
              />
              <Input
                type="password"
                variant="flat"
                label="Confirm password"
                placeholder="Confirm your Password"
              />
            </div>
            <button
              className="border rounded-lg p-2"
              onClick={() => {
                button
                  ? SignUpUsers()
                  : toast.error("Please fill all the fields");
              }}
            >
              SignUp
            </button>
            <Link href={"/login"} className="text-blue-500" key="flat">
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
