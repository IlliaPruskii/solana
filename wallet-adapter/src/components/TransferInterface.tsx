import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
import { useEffect, useState } from "react"

export const TransferInterface = () => {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [sendAmount, setSendAmount] = useState(0)
  const [receiver, setReceiver] = useState('')

  const [balance, setBalance] = useState(0)

  const onSubmit = async () => {
    if (!publicKey || !connection) {
      return
    }

    const toPubkey = new PublicKey(receiver)

    const transaction = new Transaction()
    const instruction = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: toPubkey,
      lamports: sendAmount * LAMPORTS_PER_SOL
    })

    transaction.add(instruction)

    const signature = await sendTransaction(transaction,  connection)
    console.log('signature', signature)
  }

  useEffect(() => {
    if (!connection || !publicKey) { return }

    // Ensure the balance updates after the transaction completes
    const accountChangeId = connection.onAccountChange(
        publicKey, 
        (updatedAccountInfo) => {
            setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL)
        }, 
        'confirmed'
    )

    connection.getAccountInfo(publicKey).then(info => {
      if (info?.lamports) {
        setBalance(info.lamports / LAMPORTS_PER_SOL)
      }
    })

    return () => {
      connection.removeAccountChangeListener(accountChangeId)
    }
}, [connection, publicKey])

  if (!connection || !publicKey) {
    return null
  }

  return (
    <main>
      <h1>Transfer Interface</h1>
      <h2>Balance in SOL: {balance}</h2>
      <div>
        <input 
          style={{ width: 400 }} 
          onChange={(e) => setSendAmount(Number(e.target.value))}
          placeholder="amount" 
          type="number" 
        />
      </div>
      <div>
        <input 
          style={{ width: 400 }}
          onChange={(e) => setReceiver(e.target.value)} 
          placeholder="receiver" 
          type="text" 
        />
      </div>
      <button onClick={onSubmit}>send</button>
    </main>
  )
}