import auctions from "@/data/auctions.json";

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: Promise<{ address: string }>;
    }
) {
    const address = (await params).address;

    const auction = auctions.find((a) => a.address === address);

    console.log("auction: ", auction);

    if (!auction) {
        return new Response("Not Found", { status: 404 });
    }

    return Response.json(auction);
}
