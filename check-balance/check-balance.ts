import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'

const validatePublicKey = (publicKey: PublicKey) => PublicKey.isOnCurve(publicKey.toBytes())

const init = async () => {
  const somePublicKey = process.argv[2]
  if (!somePublicKey) {
    throw new Error('Provided public key to check the balance of!')
  }

  const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed")

  const publicKey = new PublicKey(somePublicKey)
  const isValidPublicKey = validatePublicKey(publicKey)

  if (!isValidPublicKey) {
    throw new Error('Public key not on the ed25519 curve')
  }

  const balanceInLamports = await connection.getBalance(publicKey)
  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL

  console.log(
    `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
  );
}

init()