"use client";

import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 via-blue-300 to-green-300">
      <div className="bg-white p-10 rounded-lg shadow-xl">
        <Button
          variant="contained"
          startIcon={<GoogleIcon sx={{ color: "#BA0F30" }} />}
          onClick={() => signIn("google")}
          sx={{
            backgroundColor: "#4285F4",
            color: "#357ae8",
            "&:hover": {
              backgroundColor: "#357ae8",
              color: "#fff",
            },
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
