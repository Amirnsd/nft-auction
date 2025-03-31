"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createFavoritesStore } from "@/stores/favorites";
import type { ReactNode } from "react";
import type { FavoritesStore } from "@/stores/favorites";

export type FavoritesStoreApi = ReturnType<typeof createFavoritesStore>;

export const FavoritesStoreContext = createContext<
    FavoritesStoreApi | undefined
>(undefined);

export type FavoritesStoreProviderProps = {
    children: ReactNode;
};

export function FavoritesStoreProvider({
    children,
}: FavoritesStoreProviderProps) {
    const storeRef = useRef<FavoritesStoreApi>(null);
    if (!storeRef.current) {
        storeRef.current = createFavoritesStore();
    }

    return (
        <FavoritesStoreContext.Provider value={storeRef.current}>
            {children}
        </FavoritesStoreContext.Provider>
    );
}

export function useFavoritesStore<T>(
    selector: (store: FavoritesStore) => T
): T {
    const favoritesStoreContext = useContext(FavoritesStoreContext);
    if (!favoritesStoreContext) {
        throw new Error(
            "useFavoritesStore must be used within a FavoritesStoreProvider"
        );
    }

    return useStore(favoritesStoreContext, selector);
}
