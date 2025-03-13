"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function ActivateAccount() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [uuid64, setUuid64] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (params?.uuid64 && params?.token) {
      setUuid64(params.uuid64 as string);
      setToken(params.token as string);
    }
  }, [params]);

  useEffect(() => {
    if (uuid64 && token) {
      activateAccount();
    }
  }, [uuid64, token]);

  const activateAccount = async () => {
    if (!uuid64 || !token) return;

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
