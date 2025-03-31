import { EndedCientPage } from "./page.client";

export default async function EndedPage() {
    let auctions = await fetch("http://localhost:3000/api/auctions").then(
        (res) => res.json()
    );

    auctions = auctions.filter((auction: any) => {
        const ends = new Date(auction.ends);
        return ends <= new Date();
    });

    return <EndedCientPage auctions={auctions} />;
}
