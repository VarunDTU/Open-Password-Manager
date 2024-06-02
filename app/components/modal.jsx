"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";

export default function MasterPasswordModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
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
                In a password manager, the master password serves as the unique
                key to encrypt and decrypt the user's vault of passwords. When a
                user creates a master password, it is used to generate an
                encryption key. This key is then used to encrypt all the
                passwords stored within the manager. The encryption is typically
                done using robust algorithms to ensure that without the master
                password, the encrypted data remains inaccessible. As for
                recovery, if a user forgets their master password, it cannot be
                recovered due to the nature of the encryption. Password managers
                do not store the master password or the encryption key, ensuring
                that even if unauthorized access to the stored data occurs,
                without the master password, the data remains encrypted and
                secure. This design is a security feature to protect the user's
                data, but it also means that if the master password is lost, the
                encrypted passwords cannot be retrieved. Users are usually
                encouraged to create a strong, memorable master password and to
                keep a backup of it in a secure location.
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Link href={"/profile/masterpassword"}>
                  <Button color="primary" onPress={onClose}>
                    Set a Master Password
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
