import Link from "next/link";
import schoolVideos from "@/data/school.json";

export default function SchoolPage() {
    return (
        <div className="flex flex-col space-y-8">
            <div>
                <Link href="/school" className="text-4xl font-bold">School</Link>
                <p className="text-lg">
                    At ArtBlock School you can learn more about NFTs and Web3
                    before getting started.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {schoolVideos.map((video) => (
                    <Link
                        key={video.id}
                        href={`/school/videos/${video.id}`}
                        className="flex flex-col items-center p-4 border rounded-lg space-y-2 group"
                    >
                        <div className="w-full h-[188px] relative overflow-hidden rounded-sm">
                            <picture>
                                <img
                                    src={video.thumbnail}
                                    alt=""
                                    className="w-full h-full object-cover object-center group-hover:scale-105 ease-in-out duration-300"
                                />
                            </picture>
                        </div>

                        <div>
                            <h2 className="font-semibold text-lg">
                                {video.title}
                            </h2>
                            <p className="text-muted-foreground">
                                {video.length}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
