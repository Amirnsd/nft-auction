import { FavoritesClientPage } from "./page.client";

export default async function FavoritesPage() {
    const auctions = await fetch("http://localhost:3000/api/auctions").then(
        (res) => res.json()
    );

    return <FavoritesClientPage auctions={auctions} />;
}
