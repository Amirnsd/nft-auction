import { AuctionClientPage } from "./page.client";

export default async function AuctionPage({
    params,
}: {
    params: Promise<{ address: string }>;
}) {
    const { address } = await params;
    const auction = await fetch(
        `http://localhost:3000/api/auctions/${address}`
    ).then((res) => res.json());

    return <AuctionClientPage auction={auction} />;
}
