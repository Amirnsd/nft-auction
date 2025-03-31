import Link from "next/link";
import schoolVideos from "@/data/school.json";

export default async function VideoPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div className="flex flex-col space-y-8">
            <Link href="/school" className="text-4xl font-bold">
                School
            </Link>

            <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${id}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                className="rounded-lg w-full h-[480px] mb-4"
            />

            <div>
                <h2 className="font-semibold text-xl">
                    {schoolVideos.find((video) => video.id === id)?.title}
                </h2>

                <p className="text-muted-foreground">
                    {schoolVideos.find((video) => video.id === id)?.length}
                </p>
            </div>
        </div>
    );
}
