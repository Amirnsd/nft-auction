"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

type BidProps = {
    minBid: number;
    auctionAddress: string;
};

export function Bid({ minBid, auctionAddress }: BidProps) {
    const router = useRouter();
    const { address, isConnected } = useAccount();
    const [bidAmount, setBidAmount] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleBidChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        // Only allow numbers and decimals
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            setBidAmount(value);
        }
    }

    async function handlePlaceBid() {
        if (!isConnected) {
            toast.error("Please connect your wallet first");
            return;
        }

        const numericBidAmount = parseFloat(bidAmount);
        if (isNaN(numericBidAmount) || numericBidAmount <= minBid) {
            toast.error("Bid amount must be higher than current price");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/auctions/${auctionAddress}/bid`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bidAmount: numericBidAmount,
                    bidderAddress: address,
                }),
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }

            toast.success("Bid placed successfully!");
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to place bid");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="sticky bottom-0 flex flex-col items-center w-full bg-background/80 backdrop-blur-sm p-4 md:p-0">
            <div className="border w-fit border-b-0 p-2 rounded-t-lg bg-background">
                <span className="text-muted-foreground">Min Bid:</span>{" "}
                <span className="font-semibold">${minBid}</span>
            </div>

            <div className="border-t-1 w-full pt-4 space-y-4">
                <Input
                    type="text"
                    value={bidAmount}
                    onChange={handleBidChange}
                    placeholder={`Enter amount higher than ${minBid}`}
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                <Button
                    variant="default"
                    onClick={handlePlaceBid}
                    disabled={!bidAmount || parseFloat(bidAmount) <= minBid || isSubmitting || !isConnected}
                    className="w-full hover:cursor-pointer"
                >
                    {isSubmitting ? "Placing Bid..." : "Place Bid"}
                </Button>
            </div>
        </div>
    );
}
