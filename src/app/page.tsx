import { HomeCientPage } from "./page.client";

export default async function HomePage() {
    const auctions = await fetch("http://localhost:3000/api/auctions").then(
        (res) => res.json()
    );

    return <HomeCientPage auctions={auctions} />;
}
