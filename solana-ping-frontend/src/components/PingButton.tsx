import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js"
import { FC } from "react"

const PROGRAM_ID = 'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa'
const DATA_ACCOUNT_PUBKEY = 'Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod'

export const PingButton: FC = () => {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  const onClick = async () => {
    if (!connection || !publicKey) {
      return;
    }

    const programPublicKey = new PublicKey(PROGRAM_ID)
    const accountPublicKey = new PublicKey(DATA_ACCOUNT_PUBKEY)

    const transaction = new Transaction()
    const instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: accountPublicKey,
          isSigner: false,
          isWritable: true
        }
      ],
      programId: programPublicKey
    })

    transaction.add(instruction)
    const signature = await sendTransaction(transaction, connection)
    console.log('signature', signature)
  }

  return (
    <div>
      <button onClick={onClick}>Ping!</button>
    </div>
  )
}
