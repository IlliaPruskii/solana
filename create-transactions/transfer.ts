import dotenv from 'dotenv';
import { getKeypairFromEnvironment } from '@solana-developers/helpers'
import { Connection, Transaction, SystemProgram, sendAndConfirmTransaction, LAMPORTS_PER_SOL } from '@solana/web3.js';

dotenv.config();

const senderKeypair = getKeypairFromEnvironment('SECRET_KEY')
const receiverKeypair = getKeypairFromEnvironment('SECRET_KEY_2')

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

console.log(
  `✅ Loaded our own keypair, the destination public key, and connected to Solana`
);


const transaction = new Transaction()
const LAMPORTS_TO_SEND = 5000

const instruction = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey: receiverKeypair.publicKey,
  lamports: LAMPORTS_TO_SEND
})

transaction.add(instruction)

const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair])

console.log(
  `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${receiverKeypair.publicKey}. `
);
console.log(`Transaction signature is ${signature}!`);