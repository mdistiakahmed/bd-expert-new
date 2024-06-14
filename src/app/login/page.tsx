"use client";

import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading ...</div>;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="flex items-center justify-center h-[55vh]">
      <div className="p-10 rounded-lg">
        <Button variant="outline" onClick={() => signIn("google")}>
          <GoogleIcon sx={{ color: "#BA0F30" }} />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
