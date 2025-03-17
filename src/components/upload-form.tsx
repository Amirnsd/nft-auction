"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { isValidNFTImageUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function UploadForm() {
    const router = useRouter();
    const { address } = useAccount();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [urlError, setUrlError] = useState("");

    if (!address) {
        return (
            <div className="max-w-2xl mx-auto text-center space-y-4">
                <h2 className="text-2xl font-semibold">Wallet Not Connected</h2>
                <p className="text-muted-foreground">
                    Please connect your wallet to upload NFTs.
                </p>
            </div>
        );
    }

    function handleImageUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
        const url = e.target.value;
        setImageUrl(url);
        
        if (url) {
            const { isValid, message } = isValidNFTImageUrl(url);
            setUrlError(isValid ? "" : message);
        } else {
            setUrlError("");
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const url = formData.get("image") as string;
        
        // Validate URL before submission
        const { isValid, message } = isValidNFTImageUrl(url);
        if (!isValid) {
            toast.error(message);
            return;
        }

        const nftData = {
            title: formData.get("title"),
            image: url,
            description: formData.get("description"),
            price: parseFloat(formData.get("price") as string),
            ends: formData.get("ends"),
            creator: address,
            address: `0x${Math.random().toString(16).slice(2)}` as `0x${string}`,
            bidders: []
        };

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/auctions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nftData),
            });

            if (!response.ok) {
                throw new Error("Failed to upload NFT");
            }

            toast.success("NFT uploaded successfully!");
            router.push("/");
            router.refresh();
        } catch (error) {
            toast.error("Failed to upload NFT. Please try again.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    name="title"
                    placeholder="Enter NFT title"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                    id="image"
                    name="image"
                    type="url"
                    value={imageUrl}
                    onChange={handleImageUrlChange}
                    placeholder="Enter NFT image URL from OpenSea, Coinbase NFT, or LooksRare"
                    required
                    className={cn(
                        urlError ? "border-destructive focus-visible:ring-destructive/50" : 
                        imageUrl ? "border-green-500 focus-visible:ring-green-500/50" : ""
                    )}
                />
                {imageUrl && (
                    <p className={cn(
                        "text-sm",
                        urlError ? "text-destructive" : "text-green-500"
                    )}>
                        {urlError || isValidNFTImageUrl(imageUrl).message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter NFT description"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="price">Starting Price (ETH)</Label>
                <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Enter starting price"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="ends">End Date</Label>
                <Input
                    id="ends"
                    name="ends"
                    type="datetime-local"
                    min={new Date().toISOString().slice(0, 16)}
                    required
                />
            </div>

            <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || !!urlError}
            >
                {isSubmitting ? "Uploading..." : "Upload NFT"}
            </Button>
        </form>
    );
} 