"use client";

import { Text, Gavel, Timer, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EndsIn } from "@/components/ends-in";
import { Bid } from "@/components/bid";
import { useFavoritesStore } from "@/providers/favorites-store";
import { truncateAddress, cn } from "@/lib/utils";

type AuctionClientPageProps = {
    auction: any;
};

export function AuctionClientPage({ auction }: AuctionClientPageProps) {
    const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore(
        (state) => state
    );

    function handleFavorite() {
        if (isFavorite(auction.address)) {
            removeFavorite(auction.address);
        } else {
            addFavorite(auction.address);
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 h-full">
            <div className="relative rounded-lg overflow-hidden">
                <picture>
                    <img
                        src={auction.image}
                        alt=""
                        className="object-cover w-full h-auto md:h-full"
                    />
                </picture>

                <Button
                    variant="secondary"
                    onClick={() => handleFavorite()}
                    className="absolute top-2 right-2 hover:cursor-pointer"
                >
                    <Heart
                        className={
                            isFavorite(auction.address)
                                ? "fill-red-500 text-red-500"
                                : ""
                        }
                    />
                </Button>
            </div>

            <div className="flex flex-col h-full space-y-4">
                <div className="flex-grow overflow-y-auto">
                    <div className="space-y-4 h-full">
                        <div>
                            <h1 className="font-bold text-5xl">
                                {auction.title}
                            </h1>
                            <p className="text-muted-foreground">
                                Creator:{" "}
                                {truncateAddress(
                                    auction.creator as `0x${string}`
                                )}
                            </p>
                        </div>

                        <div className="space-y-1 flex flex-col">
                            <div className="flex space-x-1">
                                <Text />
                                <span className="font-semibold text-md">
                                    Description
                                </span>
                            </div>

                            <p className="text-muted-foreground">
                                {auction.description}
                            </p>
                        </div>

                        <div className="space-y-1 flex flex-col">
                            <div className="flex space-x-1">
                                <Timer />
                                <span className="font-semibold text-md">
                                    Ends In
                                </span>
                            </div>

                            <EndsIn ends={new Date(auction.ends)} />
                        </div>

                        <div className="space-y-1 flex flex-col">
                            <div className="flex space-x-1">
                                <Gavel />
                                <span className="font-semibold text-md">
                                    Bidders
                                </span>
                            </div>

                            <div className="border rounded-lg divide-y px-2">
                                {auction.bidders.map((bidder: any) => (
                                    <div
                                        key={bidder.address}
                                        className="flex items-center justify-between p-2"
                                    >
                                        <p>
                                            {truncateAddress(
                                                bidder.address as `0x${string}`
                                            )}
                                        </p>
                                        <p>
                                            {new Date(
                                                bidder.time
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Bid minBid={auction.price} />
                </div>
            </div>
        </div>
    );
}
