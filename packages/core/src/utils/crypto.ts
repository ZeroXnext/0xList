import {
  generateKeyPairSync,
  sign,
  verify,
  createPrivateKey,
  createPublicKey,
  createHash,
} from "crypto";
import { Key } from "@types";
import * as fs from "node:fs";

export function generateKeyPair(): [Key, Key] {
  const { publicKey, privateKey } = generateKeyPairSync("ed25519");
  return [
    publicKey.export({ type: "spki", format: "pem" }),
    privateKey.export({ type: "pkcs8", format: "pem" }),
  ];
}

export function signMessage(privateKeyPem: Key, message: string): string {
  const privateKey = createPrivateKey(privateKeyPem);
  return sign(null, Buffer.from(message), privateKey).toString("base64");
}

export function verifyMessage(
  publicKeyPem: Key,
  message: string,
  signatureBase64: string,
): boolean {
  const publicKey = createPublicKey(publicKeyPem);
  return verify(null, Buffer.from(message), publicKey, Buffer.from(signatureBase64, "base64"));
}

export type HashAlgorithm = "sha256" | "sha512" | "md5"; // extend as needed

/**
 * Hashes a string using the specified algorithm.
 */
export function hashString(data: string, algorithm: HashAlgorithm = "sha256"): string {
  const hash = createHash(algorithm);
  hash.update(data);
  return hash.digest("hex");
}

/**
 * Hashes a file at the given path using the specified algorithm.
 */
export function hashFile(filePath: string, algorithm: HashAlgorithm = "sha256"): string {
  const data = fs.readFileSync(filePath);
  const hash = createHash(algorithm);
  hash.update(data);
  return hash.digest("hex");
}
