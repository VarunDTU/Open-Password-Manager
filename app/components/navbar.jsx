"use client";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
export default function NewNavbar() {
  const router = useRouter();
  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <Navbar>
      <Toaster></Toaster>
      <NavbarBrand>
        {/* // <AcmeLogo /> */}
        <p className="font-bold text-inherit">OPN</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/dashboard">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            href="/profile/setmasterpassword"
            aria-current="page"
            color="secondary"
          >
            Set MasterPassword
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="settings">
              <Link href="/profile">Settings</Link>
            </DropdownItem>
            <DropdownItem key="team_settings" href="/profile/setmasterpassword">
              Set MasterPassword
            </DropdownItem>

            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={logout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
