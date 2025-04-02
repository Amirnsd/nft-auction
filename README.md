# NFT Auction Platform

A modern, decentralized NFT auction platform built with Next.js and Web3 technologies. This platform allows users to create, list, and participate in NFT auctions in a secure and user-friendly environment.

## Tech Stack

### Frontend
- **Next.js 15.2.0** - React framework for server-rendered applications
- **React 19** - JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS 4** - Utility-first CSS framework
- **Zustand** - State management solution
- **React Query** - Data fetching and caching
- **ConnectKit** - Web3 wallet connection UI
- **Radix UI** - Unstyled, accessible components
- **Next Themes** - Dark mode support

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **TailwindCSS** - Styling
- **PostCSS** - CSS processing

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn package manager
- A Web3 wallet (MetaMask, WalletConnect, etc.)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/nft-auction.git
cd nft-auction
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
```

## Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Building for Production

```bash
npm run build
# or
yarn build
```

## Starting Production Server

```bash
npm run start
# or
yarn start
```

## Project Structure

```
nft-auction/
├── app/                    # Next.js app directory
│   ├── components/        # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and configurations
│   ├── pages/            # Application pages
│   └── styles/           # Global styles
├── public/               # Static assets
├── types/               # TypeScript type definitions
└── package.json         # Project dependencies and scripts
```

## Features

- Create and list NFTs for auction
- Place bids on active auctions
- View auction history and status
- Connect Web3 wallet
- Dark/Light mode support
- Responsive design
- Real-time updates

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Acknowledgments

- Next.js team for the amazing framework
- The Web3 community for their contributions
- All contributors to the open-source libraries used in this project
