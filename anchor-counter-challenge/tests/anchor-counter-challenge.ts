import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorCounterChallenge } from "../target/types/anchor_counter_challenge";
import { expect } from "chai";

describe("anchor-counter-challenge", () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.AnchorCounterChallenge as Program<AnchorCounterChallenge>
  const counter = anchor.web3.Keypair.generate();


  it("Is initialized!", async () => {
    await program.methods
      .initialize()
      .accounts({ counter: counter.publicKey })
      .signers([counter])
      .rpc()

    const account = await program.account.counter.fetch(counter.publicKey);
    expect(account.count.toNumber()).to.equal(0);
  });

  it("Incremented the count", async () => {
    await program.methods
      .increment()
      .accounts({ counter: counter.publicKey })
      .rpc()

    const account = await program.account.counter.fetch(counter.publicKey);
    expect(account.count.toNumber()).to.equal(1);
  });

  it("Decrement the count", async () => {
    await program.methods
      .decrement()
      .accounts({ counter: counter.publicKey })
      .rpc()

    const account = await program.account.counter.fetch(counter.publicKey);
    expect(account.count.toNumber()).to.equal(0);
  });
});
