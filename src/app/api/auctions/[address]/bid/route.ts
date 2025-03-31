import { promises as fs } from "fs";
import { join } from "path";
import auctions from "@/data/auctions.json";

export async function POST(
    request: Request,
    {
        params,
    }: {
        params: Promise<{ address: string }>;
    }
) {
    try {
        const address = (await params).address;
        const { bidAmount, bidderAddress } = await request.json();

        // Validate required fields
        if (!bidAmount || !bidderAddress) {
            return new Response("Missing required fields", { status: 400 });
        }

        // Read current auctions
        const filePath = join(process.cwd(), "src/data/auctions.json");
        const fileContent = await fs.readFile(filePath, "utf-8");
        const currentAuctions = JSON.parse(fileContent);

        // Find the auction
        const auctionIndex = currentAuctions.findIndex((a: any) => a.address === address);
        if (auctionIndex === -1) {
            return new Response("Auction not found", { status: 404 });
        }

        const auction = currentAuctions[auctionIndex];

        // Validate bid amount
        if (bidAmount <= auction.price) {
            return new Response("Bid amount must be higher than current price", { status: 400 });
        }

        // Validate auction end time
        if (new Date(auction.ends) < new Date()) {
            return new Response("Auction has ended", { status: 400 });
        }

        // Add the bid
        auction.bidders.push({
            address: bidderAddress,
            time: new Date().toISOString()
        });
        auction.price = bidAmount;

        // Update the auction
        currentAuctions[auctionIndex] = auction;

        // Write back to file
        await fs.writeFile(filePath, JSON.stringify(currentAuctions, null, 4));

        return new Response(JSON.stringify(auction), { status: 200 });
    } catch (error) {
        console.error("Error handling bid:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
} 