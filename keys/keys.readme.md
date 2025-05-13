## JWT Signing Setup

- Generate a RS256 private / public keypair in this folder

```bash
$ openssl genrsa -out privateKey.pem 2048
$ openssl rsa -in privateKey.pem -pubout -out publicKey.pem
```
