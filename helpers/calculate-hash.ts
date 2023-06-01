import { createHash } from "crypto";

export function generateHash(data: Buffer) {
  const hash = createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}
