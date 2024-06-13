"use client";

import { SessionProvider as Provider } from "next-auth/react";

const SessionProvider = ({ children }: any) => {
  return <Provider>{children}</Provider>;
};

export default SessionProvider;
