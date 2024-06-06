"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
export default function Page() {
  const [password, setpassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const setMasterpassword = async () => {
    try {
      if (!password.password || !password.confirmPassword)
        return toast("Please fill all the fields");
      if (password.password !== password.confirmPassword)
        return toast("Passwords do not match");
      const userData = await axios.post("/api/users/masterpassword", {
        masterPassword: password.password,
      });
      console.log(userData);
    } catch (e) {
      console.log(e);
      toast(e.response?.data?.message || e.message);
    }
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="w-full h-full">
      <Toaster></Toaster>
      <div className="w-full flex items-center justify-center h-100 p-20">
        <div className="w-full y-full">
          <div className="text-center text-5xl font-bold">Master Password</div>
          <div className="flex flex-col items-center justify-center border m-4 p-4">
            <Input
              label="Set Master Password"
              variant="bordered"
              placeholder="Enter your password"
              type="password"
              className="max-w-xs m-4"
              value={password.password}
              onChange={(e) => {
                setpassword({ ...password, password: e.target.value });
              }}
            />

            <Input
              label="Confirm Master Password"
              variant="bordered"
              placeholder="Enter your password"
              type="password"
              className="max-w-xs m-4"
              value={password.confirmPassword}
              onChange={(e) => {
                setpassword({ ...password, confirmPassword: e.target.value });
              }}
            />
            <>
              <Button onPress={onOpen}>Open Modal</Button>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Set up Master Password
                      </ModalHeader>
                      <ModalBody>
                        In a password manager, the master password serves as the
                        unique key to encrypt and decrypt the user's vault of
                        passwords. When a user creates a master password, it is
                        used to generate an encryption key. This key is then
                        used to encrypt all the passwords stored within the
                        manager. The encryption is typically done using robust
                        algorithms to ensure that without the master password,
                        the encrypted data remains inaccessible. As for
                        recovery, if a user forgets their master password, it
                        cannot be recovered due to the nature of the encryption.
                        Password managers do not store the master password or
                        the encryption key, ensuring that even if unauthorized
                        access to the stored data occurs, without the master
                        password, the data remains encrypted and secure. This
                        design is a security feature to protect the user's data,
                        but it also means that if the master password is lost,
                        the encrypted passwords cannot be retrieved. Users are
                        usually encouraged to create a strong, memorable master
                        password and to keep a backup of it in a secure
                        location.
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                        <Button
                          color="primary"
                          onPress={onClose}
                          onClick={() => setMasterpassword()}
                        >
                          Set a Master Password
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
