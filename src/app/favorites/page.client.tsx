"use client";

import { useFavoritesStore } from "@/providers/favorites-store";
import { AuctionCard } from "@/components/auction-card";

type FavoritesClientPageProps = {
    auctions: any[];
};

export function FavoritesClientPage({ auctions }: FavoritesClientPageProps) {
    const { favorites } = useFavoritesStore((state) => state);
    const favoriteAuctions = auctions.filter((auction) =>
        favorites.includes(auction.address)
    );

    if (!favorites.length) {
        return (
            <div className="w-full flex justify-center text-xl text-muted-foreground">
                No favorites yet!
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favoriteAuctions.map((auction: any) => (
            <AuctionCard
                key={auction.address}
                title={auction.title}
                image={auction.image}
                description={auction.description}
                price={auction.price}
                ends={new Date(auction.ends)}
                address={auction.address}
            />
        ))}
        </div>
    );
}
