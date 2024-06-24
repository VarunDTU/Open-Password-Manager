"use client";

import { Input } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
export default function Page() {
  const router = useRouter();
  const [Users, setUsers] = useState({
    email: "",
    password: "",
  });
  const [button, setButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const SignInUser = async () => {
    try {
      setButton(false);
      setLoading(true);
      const response = await axios.post("/api/users/login", Users);
      console.log(response);
      router.push("/dashboard");
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
      setButton(true);
      setLoading(false);
    } finally {
      setButton(true);
    }
  };
  const verifyData = () => {
    if (Users.password.length > 0 && Users.email.length > 0) {
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
        <div>Signing you in.....</div>
      ) : (
        <div className="w-96 flex flex-col gap-4">
          <div
            key="flat"
            className="flex w-full flex-col md:flex-nowrap mb-6 md:mb-0 gap-4"
          >
            <Input
              type="email"
              value={Users.email}
              onChange={(e) => {
                setUsers({ ...Users, email: e.target.value });
              }}
              variant="flat"
              label="Email"
            />
            <Input
              type="password"
              variant="flat"
              label="Password"
              placeholder="Enter your Password"
              value={Users.password}
              onChange={(e) => {
                setUsers({ ...Users, password: e.target.value });
              }}
            />
          </div>
          <button
            className="rounded-lg border p-2"
            onClick={() =>
              !button ? toast("fill all the fields") : SignInUser()
            }
          >
            Sign in
          </button>
          <Link href={"/signup"} className="text-blue-500" key="flat">
            SignUp
          </Link>
        </div>
      )}
    </div>
  );
}
