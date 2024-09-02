"use client";

import { SessionProvider } from "next-auth/react";
import { custom } from 'openid-client';

custom.setHttpOptionsDefaults({
  timeout: 5000,
});

type Props = {
  children?: React.ReactNode;
};

export const Provider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};