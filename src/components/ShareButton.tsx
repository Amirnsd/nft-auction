"use client";

import { Share2, Twitter, Facebook, Linkedin, Link } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";

interface ShareButtonProps {
  auctionTitle: string;
  auctionUrl: string;
}

export function ShareButton({ auctionTitle, auctionUrl }: ShareButtonProps) {
  const shareOptions = [
    {
      name: "Twitter",
      icon: <Twitter className="h-4 w-4" />,
      action: () => {
        const text = encodeURIComponent(`Check out this NFT auction: ${auctionTitle}`);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${auctionUrl}`, '_blank');
      },
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-4 w-4" />,
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${auctionUrl}`, '_blank');
      },
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-4 w-4" />,
      action: () => {
        const text = encodeURIComponent(`Check out this NFT auction: ${auctionTitle}`);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${auctionUrl}`, '_blank');
      },
    },
    {
      name: "Copy Link",
      icon: <Link className="h-4 w-4" />,
      action: async () => {
        try {
          await navigator.clipboard.writeText(auctionUrl);
          toast.success("Link copied to clipboard!");
        } catch (err) {
          toast.error("Failed to copy link");
        }
      },
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {shareOptions.map((option) => (
          <DropdownMenuItem key={option.name} onClick={option.action}>
            {option.icon}
            <span className="ml-2">{option.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 