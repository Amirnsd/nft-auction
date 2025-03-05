"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConnectKitButton } from "connectkit";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Navbar() {
    const router = useRouter();

    return (
        <header className="sticky left-0 top-0 z-[100] flex w-full flex-col border-b border-border bg-background">
          <nav className="flex h-[48px] bg-background justify-center px-4">
    <div className="container flex items-center justify-between w-full max-w-7xl">
        <Link href="/" className="font-bold text-xl md:text-3xl">
            ArtBlock
        </Link>

        <Input
            type="text"
            placeholder="Search"
            className="w-full max-w-[300px] mx-4"
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    router.push(`/?q=${e.currentTarget.value}`);
                }
            }}
        />

        <div className="space-x-2 flex items-center">
            <Button variant="default" className="hidden md:inline-flex" asChild>
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
                        variant={isConnected ? "secondary" : "default"}
                    >
                        {isConnected
                            ? truncatedAddress
                            : isConnecting
                            ? "Connecting..."
                            : "Connect Wallet"}
                    </Button>
                )}
            </ConnectKitButton.Custom>
        </div>
    </div>
</nav>
        </header>
    );
}
