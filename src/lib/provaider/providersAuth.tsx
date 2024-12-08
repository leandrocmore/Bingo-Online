"use client"
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { Session } from "next-auth";

export default function ProvidersWrapper({ 
  session, 
  children 
}: { 
  session?: Session | null; 
  children: React.ReactNode 
}) {
  useEffect(() => {
    // Empty effect can be removed if not needed
  }, []);

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}