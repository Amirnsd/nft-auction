import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getTimeLeft(date: Date) {
    const now = new Date();
    const diff = date.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
        days,
        hours,
        minutes,
        seconds,
    };
}

export function truncateAddress(address: `0x${string}`) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// List of allowed NFT marketplace domains and their display names
const ALLOWED_NFT_DOMAINS = [
    {
        domain: 'opensea.io',
        name: 'OpenSea'
    },
    {
        domain: 'seadn.io',
        name: 'OpenSea'
    },
    {
        domain: 'i.seadn.io',
        name: 'OpenSea'
    },
    {
        domain: 'nft.coinbase.com',
        name: 'Coinbase NFT'
    },
    {
        domain: 'looksrare.org',
        name: 'LooksRare'
    }
];

export function isValidNFTImageUrl(url: string): { isValid: boolean; message: string } {
    try {
        const parsedUrl = new URL(url);
        
        // Check if the domain is in our allowed list
        const domain = parsedUrl.hostname.toLowerCase();
        const matchedDomain = ALLOWED_NFT_DOMAINS.find(({ domain: allowedDomain }) => 
            domain === allowedDomain || domain.endsWith(`.${allowedDomain}`)
        );

        if (!matchedDomain) {
            return {
                isValid: false,
                message: `Invalid NFT URL. Please use a URL from one of these marketplaces: ${ALLOWED_NFT_DOMAINS.map(d => d.name).filter((name, index, self) => self.indexOf(name) === index).join(', ')}`
            };
        }

        // Check if the URL points to an image
        const extension = parsedUrl.pathname.toLowerCase().split('.').pop();
        const validImageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
        
        if (!extension || !validImageExtensions.includes(extension)) {
            return {
                isValid: false,
                message: `Invalid image format. The URL from ${matchedDomain.name} must end with: ${validImageExtensions.join(', ')}`
            };
        }

        // Additional validation for specific marketplaces
        if (matchedDomain.name === 'OpenSea' && !parsedUrl.pathname.includes('/files/')) {
            return {
                isValid: false,
                message: "Invalid OpenSea URL format. Please use the direct image URL from the NFT"
            };
        }

        return {
            isValid: true,
            message: `Valid NFT image URL from ${matchedDomain.name}`
        };
    } catch (error) {
        return {
            isValid: false,
            message: "Invalid URL format. Please enter a complete URL starting with https://"
        };
    }
}