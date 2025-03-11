"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function ActivateAccount() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [uuid64, setUuid64] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (params) {
      setUuid64(params.uuid64);
      setToken(params.token);
    }
  }, [params]);

  useEffect(() => {
    if (uuid64 && token) {
      activateAccount();
    }
  }, [uuid64, token]);

  const activateAccount = async () => {
    try {
      const response = await fetch(
        `https://michaelmwanza.site/api/activate/${uuid64}/${token}`
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Account activated successfully!");
        setTimeout(() => router.push("/auth/login"), 3000);
      } else {
        toast.error(data.error || "Activation failed!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer />
      {loading ? <p>Activating your account...</p> : <p>Redirecting...</p>}
    </div>
  );
}
