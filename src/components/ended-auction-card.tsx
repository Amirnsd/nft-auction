"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getTimeLeft } from "@/lib/utils";

type EndedAuctionCardProps = {
    title: string;
    image: string;
    description: string;
    price: number;
};

export function EndedAuctionCard({
    title,
    image,
    description,
    price,
}: EndedAuctionCardProps) {
    return (
        <div className="border max-w-[250px] flex flex-col overflow-hidden rounded-lg space-y-4 group">
            <div className="overflow-hidden">
                <picture>
                    <img
                        src={image}
                        alt={`${title}'s image`}
                        className="group-hover:scale-105 ease-in-out duration-300 "
                    />
                </picture>
            </div>

            <div className="px-2 space-y-1">
                <p className="font-bold text-xl">{title}</p>
                <p className="font-semibold">${price}</p>
                <p className="text-muted-foreground line-clamp-2">
                    {description}
                </p>
            </div>

            <div className="border-t-1 flex justify-center flex-col items-center p-1">
                <p className="text-muted-foreground">Ends In</p>
                <div className="flex space-x-1 text-xl font-semibold">
                    <p>Auction Ended</p>
                </div>
            </div>
        </div>
    );
}
