import * as fs from 'fs';

const privateKeyPath = process.env.JWT_PRIVATE_KEYPATH;
const publicKeyPath = process.env.JWT_PUBLIC_KEYPATH;

if (!privateKeyPath || !publicKeyPath) {
  throw new Error(
    'JWT_PRIVATE_KEYPATH and JWT_PUBLIC_KEYPATH env variables must be set',
  );
}

export const jwtConstants = {
  privateKey: fs.readFileSync(privateKeyPath, 'utf8'),
  publicKey: fs.readFileSync(publicKeyPath, 'utf8'),
};
