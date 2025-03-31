"use client";

import { useSearchParams } from "next/navigation";
import { EndedAuctionCard } from "@/components/ended-auction-card";

type HomeCientPageProps = {
    auctions: any[];
};

export function EndedCientPage({ auctions }: HomeCientPageProps) {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    if (query) {
        auctions = auctions.filter((auction) =>
            auction.title.toLowerCase().includes(query.toLowerCase())
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {auctions.map((auction: any) => (
                <EndedAuctionCard
                    key={auction.address}
                    title={auction.title}
                    image={auction.image}
                    description={auction.description}
                    price={auction.price}
                />
            ))}
        </div>
    );
}
