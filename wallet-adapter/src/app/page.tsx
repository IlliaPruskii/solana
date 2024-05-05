'use client'

import { TransferInterface } from "@/components/TransferInterface";
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
    <main>
      <WalletMultiButton />
      <TransferInterface />
    </main>
  );
}
