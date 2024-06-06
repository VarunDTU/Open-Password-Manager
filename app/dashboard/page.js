"use client";
import { useState } from "react";
export default function Page() {
  const [MasterPassword, setMasterPassword] = useState(null);
  return (
    <div className="w-full h-full">
      {MasterPassword ? (
        <div className="border w-full y-full">
          <div className="text-center">Passwords</div>
          <div className="border-2 m-2"></div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center h-100 p-20"></div>
      )}
    </div>
  );
}
