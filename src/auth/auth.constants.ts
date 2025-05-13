import * as fs from 'fs';

const {
  JWT_PRIVATE_KEYPATH,
  JWT_PUBLIC_KEYPATH,
  JWT_EXPIRY,
  JWT_ISSUER,
  JWT_ALGORITHM,
} = process.env;

if (!JWT_PRIVATE_KEYPATH || !JWT_PUBLIC_KEYPATH) {
  throw new Error(
    'JWT_PRIVATE_KEYPATH and JWT_PUBLIC_KEYPATH env variables must be set',
  );
}

if (!JWT_EXPIRY || !JWT_ISSUER || !JWT_ALGORITHM) {
  throw new Error(
    'JWT_EXPIRY, JWT_ISSUER, and JWT_ALGORITHM env variables must be set',
  );
}

export const jwtConstants = {
  privateKey: fs.readFileSync(JWT_PRIVATE_KEYPATH, 'utf8'),
  publicKey: fs.readFileSync(JWT_PUBLIC_KEYPATH, 'utf8'),
  expiresIn: JWT_EXPIRY,
  issuer: JWT_ISSUER,
  algorithm: JWT_ALGORITHM,
};
