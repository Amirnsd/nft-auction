import { ThemeProvider } from "./theme";
import { ReactQueryProvider } from "./react-query";
import { Web3Provider } from "./web3";
import { FavoritesStoreProvider } from "./favorites-store";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
                <Web3Provider>
                    <FavoritesStoreProvider>{children}</FavoritesStoreProvider>
                </Web3Provider>
            </ThemeProvider>
        </ReactQueryProvider>
    );
}
