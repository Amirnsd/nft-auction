"use client";

import { useEffect, useState } from "react";
import { getTimeLeft } from "@/lib/utils";

type EndsInProps = {
    ends: Date;
};

export function EndsIn({ ends }: EndsInProps) {
    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(ends));
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft(ends));
        }, 1000);

        return () => clearInterval(timer);
    }, [ends]);

    if (!mounted) {
        return null; // Return null on server and first render
    }

    const values = [
        {
            label: "Days",
            value: timeLeft.days,
        },
        {
            label: "Hours",
            value: timeLeft.hours,
        },
        {
            label: "Minutes",
            value: timeLeft.minutes,
        },
        {
            label: "Seconds",
            value: timeLeft.seconds,
        },
    ];

    return (
        <div className="flex w-full justify-between border rounded-lg divide-x py-2">
            {values.map(({ label, value }) => (
                <div className="flex flex-col items-center w-full" key={label}>
                    <p className="font-semibold text-xl">
                        {value < 10 ? `0${value}` : value}
                    </p>
                    <p className="text-muted-foreground">{label}</p>
                </div>
            ))}
        </div>
    );
}
