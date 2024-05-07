import { Movie } from "@/insturctions/Movie"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PublicKey, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js"
import { useState } from "react"

const MOVIE_REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'

export const Form = () => {
  const [title, setTitle] = useState('')
  const [rating, setRating] = useState(0)
  const [description, setDescription] = useState('')

  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  const handleTransactionSubmit = async (movie: Movie) => {
    if (!publicKey) {
      alert('Please connect your wallet!')
      return
    }

    const buffer = movie.serialize()
    const transaction = new Transaction()

    const [pda] = await PublicKey.findProgramAddressSync(
      [publicKey.toBuffer(), Buffer.from(movie.title)],
      new PublicKey(MOVIE_REVIEW_PROGRAM_ID)
    )

    const instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: false
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: SystemProgram.programId,
          isSigner: false,
          isWritable: true,
        }
      ],
      data: buffer,
      programId: new PublicKey(MOVIE_REVIEW_PROGRAM_ID)
    })

    transaction.add(instruction)

    try {
      let txid = await sendTransaction(transaction, connection)
      console.log(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)
    } catch (err) {
      alert(JSON.stringify(err))
    }
  }

  const handleSubmit = () => {
    const movie = new Movie(title, rating, description)
    handleTransactionSubmit(movie)

  }

  return (
    <button onClick={() => handleSubmit()}>Submit button</button>
  )
}