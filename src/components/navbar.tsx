"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Navbar() {
    const router = useRouter();
    const { isConnected } = useAccount();

    return (
        <header className="sticky left-0 top-0 z-[100] flex w-full flex-col border-b border-border bg-background">
            <nav className="flex min-h-[48px] bg-background justify-center px-4 py-2">
                <div className="container flex flex-col sm:flex-row items-center gap-4 sm:gap-0 justify-between w-full max-w-7xl">
                    <Link href="/" className="font-bold text-xl md:text-3xl">
                        ArtBlock
                    </Link>

                    <Input
                        type="text"
                        placeholder="Search"
                        className="w-full max-w-[300px] mx-0 sm:mx-4"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                router.push(`/feed?q=${e.currentTarget.value}`);
                            }
                        }}
                    />

                    <div className="flex items-center gap-2">
                        {isConnected ? (
                            <Button
                                variant="default"
                                className="hidden sm:inline-flex"
                                asChild
                            >
                                <Link href="/upload">Upload NFT</Link>
                            </Button>
                        ) : (
                            <Button
                                variant="default"
                                className="hidden sm:inline-flex"
                                disabled
                            >
                                Upload NFT
                            </Button>
                        )}
                        <Button
                            variant="default"
                            className="hidden sm:inline-flex"
                            asChild
                        >
                            <Link href="/favorites">Favorites</Link>
                        </Button>

                        <ConnectKitButton.Custom>
                            {({
                                isConnected,
                                isConnecting,
                                show,
                                truncatedAddress,
                            }) => (
                                <Button
                                    onClick={show}
                                    className="hover:cursor-pointer"
                                    disabled={isConnecting}
                                    variant={
                                        isConnected ? "secondary" : "default"
                                    }
                                >
                                    {isConnected
                                        ? truncatedAddress
                                        : isConnecting
                                        ? "Connecting..."
                                        : "Connect"}
                                </Button>
                            )}
                        </ConnectKitButton.Custom>
                    </div>
                </div>
            </nav>

            <div className="sm:hidden flex justify-center gap-2 p-2 border-t border-border">
                {isConnected ? (
                    <Button variant="default" className="flex-1" asChild>
                        <Link href="/upload">Upload NFT</Link>
                    </Button>
                ) : (
                    <Button variant="default" className="flex-1" disabled>
                        Upload NFT
                    </Button>
                )}
                <Button variant="default" className="flex-1" asChild>
                    <Link href="/favorites">Favorites</Link>
                </Button>
            </div>
        </header>
    );
}
