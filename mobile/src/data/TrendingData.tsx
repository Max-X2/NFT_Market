export interface NFTData {
  id:number;
  title: string;
  description: string;
  walletAddress: string;
  network: string;
  price: string;
  voteCount: number;
  img:any;
}



export const dummyData: NFTData[] = [
  {
    id:1,
    title: 'Hackathon 2022',
    description: 'Join the largest hackathon of the year! Compete with developers from around the world to build innovative solutions.',
    walletAddress: '0xHackathon2022',
    network: 'Ethereum [Goerli]',
    price: 'Free',
    voteCount: 1500,
    img:require('../../assets/nft_images/01_nft.png'),
  },
  {
    id:2,
    title: 'Developers Conference',
    description: 'Explore the latest trends in software development at the annual Developers Conference. Learn from industry experts and connect with fellow developers.',
    walletAddress: '0xDevCon2022',
    network: 'Polygon [Mumbai]',
    price: '0.05 ETH',
    voteCount: 1200,
    img:require('../../assets/nft_images/02_nft.png'),
  },
  {
    id:3,
    title: 'AI Symposium',
    description: 'Discover the future of artificial intelligence at the AI Symposium. Hear from leading researchers and practitioners in the field.',
    walletAddress: '0xAISymposium',
    network: 'Ethereum [Sepolia]',
    price: '0.03 BNB',
    voteCount: 800,
    img:require('../../assets/nft_images/03_nft.png'),
  },
  {
    id:4,
    title: 'Blockchain Summit',
    description: 'Attend the Blockchain Summit to learn about the latest developments in blockchain technology. Network with industry leaders and explore new opportunities.',
    walletAddress: '0xBlockchainSummit',
    network: 'Solana',
    price: '0.1 SOL',
    voteCount: 1100,
    img:require('../../assets/nft_images/04_nft.png'),
  },
  {
    id:5,
    title: 'Political Debate',
    description: 'Join the political debate and discuss important issues facing our society. Hear from politicians and experts on topics such as healthcare, economy, and education.',
    walletAddress: '0xPoliticalDebate',
    network: 'Ethereum Mainnet',
    price: 'Free',
    voteCount: 900,
    img:require('../../assets/nft_images/05_nft.png'),
  },
];



export type COLLECTIONData = {
  id: string;
  title: string;
  imageUri: string;
  price: string;
};

export const collectionData: COLLECTIONData[] = [
  {
    id: '1',
    title: 'NFT #1',
    imageUri: "https://img.freepik.com/free-vector/realistic-fantasy-illustration-dwarf-illustration_52683-95388.jpg?w=1060&t=st=1710778744~exp=1710779344~hmac=7ce8d9b10198cc5fbc8dafaf898eca6a78a1b5d1dd690a5e9626f6ef8dfd36b0",
    price: '0.1 ETH',
  },
  {
    id: '2',
    title: 'NFT #2',
    imageUri: "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg?w=1060&t=st=1710778797~exp=1710779397~hmac=88a6d53103cd83b0c8c8ae8358e6fe862401d2ece24dc260bd428e5fea230d96",
    price: '0.2 ETH',
  },
  {
    id: '3',
    title: 'NFT #3',
    imageUri: "https://img.freepik.com/free-photo/cartoon-character-with-yellow-jacket-sunglasses_71767-101.jpg?w=1060&t=st=1710778814~exp=1710779414~hmac=064879de49642886c127f493ae943c8139254691b5930db7581ac747f41c60f0",
    price: '0.3 ETH',
  },
  {
    id: '4',
    title: 'NFT #4',
    imageUri: "https://img.freepik.com/free-photo/cartoon-character-with-handbag-sunglasses_71767-99.jpg?w=1060&t=st=1710778832~exp=1710779432~hmac=b2a74103ea4fd925ac95fdd5f8f5a9d9943770580f4ba5cce0be2ec162c1b4a1",
    price: '0.4 ETH',
  },
  {
    id: '5',
    title: 'NFT #5',
    imageUri:  "https://img.freepik.com/free-photo/viking-warriors-with-burning-eyes-generative-ai_8829-2913.jpg?w=740&t=st=1710778857~exp=1710779457~hmac=578a3abfab0aedbbb8bc3b55aa369619896f2fd8e804f6a979ac688692e13674",
    price: '0.5 ETH',
  },
  {
    id: '6',
    title: 'NFT #6',
    imageUri:  "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622024.jpg?w=1060&t=st=1710778921~exp=1710779521~hmac=a4b383540694c4fa55716be39a8663427147a27e2d8ceb8e471e935cbcbc9c09",
    price: '0.6 ETH',
  },
];

export type CollectionData = {
  id: string;
  name: string;
  platform: string;
  imageUri:string;
};

export const CollectinsData: CollectionData[] = [
  {
    id: '1',
    name: 'Fantastic Creations',
    platform: 'PolyGon Mumbai',
    imageUri:  "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622024.jpg?w=1060&t=st=1710778921~exp=1710779521~hmac=a4b383540694c4fa55716be39a8663427147a27e2d8ceb8e471e935cbcbc9c09",
  },
  {
    id: '2',
    name: 'Enigmatic Artistry',
    platform: 'Eth Goerli',
    imageUri: "https://img.freepik.com/free-photo/cartoon-character-with-handbag-sunglasses_71767-99.jpg?w=1060&t=st=1710778832~exp=1710779432~hmac=b2a74103ea4fd925ac95fdd5f8f5a9d9943770580f4ba5cce0be2ec162c1b4a1",
  },
  {
    id: '3',
    name: 'Dreamy Realms',
    platform: 'Eth Sepolia',
    imageUri:  "https://img.freepik.com/free-photo/viking-warriors-with-burning-eyes-generative-ai_8829-2913.jpg?w=740&t=st=1710778857~exp=1710779457~hmac=578a3abfab0aedbbb8bc3b55aa369619896f2fd8e804f6a979ac688692e13674",
  },
  {
    id: '4',
    name: 'Whimsical Wonders',
    platform: 'PolyGon Mumbai',
    imageUri: "https://img.freepik.com/free-photo/cartoon-character-with-yellow-jacket-sunglasses_71767-101.jpg?w=1060&t=st=1710778814~exp=1710779414~hmac=064879de49642886c127f493ae943c8139254691b5930db7581ac747f41c60f0",
  },
  {
    id: '5',
    name: 'Mystical Marvels',
    platform: 'Eth Goerli',
    imageUri: "https://img.freepik.com/free-vector/realistic-fantasy-illustration-dwarf-illustration_52683-95388.jpg?w=1060&t=st=1710778744~exp=1710779344~hmac=7ce8d9b10198cc5fbc8dafaf898eca6a78a1b5d1dd690a5e9626f6ef8dfd36b0",
  },
];



export interface IndiData {
  id: string;
  title: string;
  owner: string;
  description: string;
  total_volume: string;
  image: string;
}

const individualData: IndiData[] = [
  {
    id: '1',
    title: 'Enchanted Forest',
    owner: 'John Doe',
    description: 'Explore the mystical wonders of an enchanted forest.',
    total_volume: '150.2 MATIC',
    image: "https://img.freepik.com/free-vector/realistic-fantasy-illustration-dwarf-illustration_52683-95388.jpg?w=1060&t=st=1710778744~exp=1710779344~hmac=7ce8d9b10198cc5fbc8dafaf898eca6a78a1b5d1dd690a5e9626f6ef8dfd36b0",
  },
  {
    id: '2',
    title: 'Space Odyssey',
    owner: 'Jane Smith',
    description: 'Embark on a thrilling journey through the vast expanse of outer space.',
    total_volume: '280.5 MATIC',
    image: "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg?w=1060&t=st=1710778797~exp=1710779397~hmac=88a6d53103cd83b0c8c8ae8358e6fe862401d2ece24dc260bd428e5fea230d96",
  },
  {
    id: '3',
    title: 'Underwater Paradise',
    owner: 'Alice Johnson',
    description: 'Dive deep into the secrets of a vibrant underwater paradise.',
    total_volume: '195.7 MATIC',
    image: "https://img.freepik.com/free-photo/cartoon-character-with-yellow-jacket-sunglasses_71767-101.jpg?w=1060&t=st=1710778814~exp=1710779414~hmac=064879de49642886c127f493ae943c8139254691b5930db7581ac747f41c60f0",
  },
  {
    id: '4',
    title: 'Ancient Civilization',
    owner: 'Michael Brown',
    description: 'Uncover the mysteries of an ancient civilization lost to time.',
    total_volume: '312.3 MATIC',
    image: "https://img.freepik.com/free-photo/cartoon-character-with-handbag-sunglasses_71767-99.jpg?w=1060&t=st=1710778832~exp=1710779432~hmac=b2a74103ea4fd925ac95fdd5f8f5a9d9943770580f4ba5cce0be2ec162c1b4a1",
  },
  {
    id: '5',
    title: 'Fantasy Kingdom',
    owner: 'Emily Williams',
    description: 'Step into a realm of magic and wonder in the fantasy kingdom.',
    total_volume: '178.9 MATIC',
    image:  "https://img.freepik.com/free-photo/viking-warriors-with-burning-eyes-generative-ai_8829-2913.jpg?w=740&t=st=1710778857~exp=1710779457~hmac=578a3abfab0aedbbb8bc3b55aa369619896f2fd8e804f6a979ac688692e13674",
  },
  {
    id: '6',
    title: 'Future Technology',
    owner: 'David Wilson',
    description: 'Witness the marvels of future technology and innovation.',
    total_volume: '240.6 MATIC',
    image:  "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622024.jpg?w=1060&t=st=1710778921~exp=1710779521~hmac=a4b383540694c4fa55716be39a8663427147a27e2d8ceb8e471e935cbcbc9c09",
  },
];

export const getIndiData = (id: string): IndiData | undefined => {
  return individualData.find(data => data.id === id);
};
