import { createStore } from "zustand/vanilla";

export type FavoritesState = {
    favorites: `0x${string}`[];
};

export type FavoritesStateSelectors = {
    isFavorite: (address: `0x${string}`) => boolean;
};

export type FavoritesActions = {
    addFavorite: (address: `0x${string}`) => void;
    removeFavorite: (address: `0x${string}`) => void;
};

export type FavoritesStore = FavoritesState &
    FavoritesStateSelectors &
    FavoritesActions;

export const defaultInitState: FavoritesState = {
    favorites: [],
};

export const createFavoritesStore = (
    initState: FavoritesState = defaultInitState
) => {
    return createStore<FavoritesStore>()((set, get) => ({
        ...initState,

        isFavorite: (address) => get().favorites.includes(address),

        addFavorite: (address) =>
            set((state) => ({
                favorites: [...state.favorites, address],
            })),

        removeFavorite: (address) =>
            set((state) => ({
                favorites: state.favorites.filter((fav) => fav !== address),
            })),
    }));
};
