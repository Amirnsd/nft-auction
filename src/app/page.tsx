import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, GraduationCap } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
            {/* Decorative elements */}
            <div className="absolute inset-0 w-full h-full bg-grid-white/[0.02] bg-grid" />
            <div className="absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            
            <div className="container relative">
                <div className="flex flex-col items-center justify-center min-h-screen max-w-4xl mx-auto text-center gap-8 py-10">
                    <div className="space-y-2">
                        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 border rounded-full gap-2 text-sm text-muted-foreground">
                            <Sparkles className="w-4 h-4" />
                            <span>Welcome to the future of digital art</span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                            Welcome to ArtBlock
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mt-4">
                            Discover, bid, and collect unique NFTs in our decentralized auction platform
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
                        <Button asChild size="lg" className="text-lg h-12">
                            <Link href="/feed">
                                Explore Auctions
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg h-12">
                            <Link href="/upload">
                                Upload NFT
                                <Sparkles className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg h-12">
                            <Link href="/school">
                                School
                                <GraduationCap className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
                        <div className="space-y-2">
                            <h2 className="text-4xl font-bold">100+</h2>
                            <p className="text-muted-foreground">Active Auctions</p>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-4xl font-bold">50K+</h2>
                            <p className="text-muted-foreground">NFTs Traded</p>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-4xl font-bold">10K+</h2>
                            <p className="text-muted-foreground">Community Members</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 