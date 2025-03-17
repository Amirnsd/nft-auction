import { promises as fs } from "fs";
import { join } from "path";
import auctions from "@/data/auctions.json";

export function GET() {
    const data = auctions.map((a) => ({
        title: a.title,
        image: a.image,
        description: a.description,
        price: a.price,
        ends: a.ends,
        address: a.address,
    }));

    return Response.json(data);
}

export async function POST(request: Request) {
    try {
        const nft = await request.json();
        
        // Validate required fields
        const requiredFields = ["title", "image", "description", "price", "ends", "creator", "address"];
        for (const field of requiredFields) {
            if (!nft[field]) {
                return new Response(`Missing required field: ${field}`, { status: 400 });
            }
        }

        // Read the current auctions
        const filePath = join(process.cwd(), "src/data/auctions.json");
        const fileContent = await fs.readFile(filePath, "utf-8");
        const currentAuctions = JSON.parse(fileContent);

        // Add the new NFT
        currentAuctions.push(nft);

        // Write back to the file
        await fs.writeFile(filePath, JSON.stringify(currentAuctions, null, 4));

        return new Response(JSON.stringify(nft), { status: 201 });
    } catch (error) {
        console.error("Error handling NFT upload:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
