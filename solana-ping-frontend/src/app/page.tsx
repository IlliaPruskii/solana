"use client"

import { PingButton } from "@/components/PingButton";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div>
      <h1>Wallet-Adapter Example</h1>
      <WalletMultiButton />
      <PingButton />
    </div>
  );
}
