import { Program, Provider } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import type { Ido } from "../../generated/types/ido";
import { IDL } from "../../generated/types/ido";
import { Pool, Book } from "../accounts";
import type { PoolData, BookData } from "../accounts";

export const DEFAULT_IDO_PROGRAM_ID = new PublicKey("E4o2qTynRWtD9BkQd8AMSCNvjni6RWfhXqz159AhfyvJ");
export type IdoProgram = Program<Ido>;

export class IdoSDK {
  readonly program: IdoProgram;

  constructor(readonly provider: Provider, programId: PublicKey = DEFAULT_IDO_PROGRAM_ID) {
    this.program = new Program(IDL, programId, provider);
  }

  async loadPool(mint: PublicKey): Promise<Pool> {
    const pool = new Pool(this.program, mint);
    const data = await this.program.account.pool.fetch(pool.address);
    pool.data = data;
    return pool;
  }

  async loadBook(pool: Pool, user: PublicKey): Promise<Book> {
    const book = new Book(pool, user);
    const data = await this.program.account.book.fetchNullable(book.address);
    book.data = data;
    return book;
  }
}
