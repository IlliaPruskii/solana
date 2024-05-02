import { getKeypairFromEnvironment } from '@solana-developers/helpers'
import dotenv from 'dotenv';

dotenv.config();

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`✅ Keypair!`, keypair)