import { ThirdwebStorage, StorageUploader } from "@thirdweb-dev/storage";

const options = {
  // Upload objects with resolvable URLs
  uploadWithGatewayUrl: true,
};

const gatewayUrls = [
  "https://gateway.ipfscdn.io/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/",
  "https://ipfs.io/ipfs/",
];

const uploader = new StorageUploader(options);
const storage = new ThirdwebStorage({
  secretKey: "3c968bc5b0383772894575a2d3557607",
  gatewayUrls,
  uploader,
});
