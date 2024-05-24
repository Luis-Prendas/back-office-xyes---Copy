import { getEnviroment } from "@/services/getEnviroment";
import { RootResponseOthersGames } from "@/types/others-games-types";
import { useQuery } from "@tanstack/react-query";

export const useGetOthersGames = (filters: string | null) => {
    const baseUrl = getEnviroment();
    const fetchURL = new URL(`/container/games/api/v1/get-all-games?page=1&limit=20&search=${filters}`, baseUrl);

    const fetchGameRecord = async () => {
        const response = await fetch(fetchURL.href);
        if (!response.ok) {
            throw new Error(`Error fetching game record: ${response.status} ${response.statusText}`);
        }
        return response.json();
    };

    return useQuery<RootResponseOthersGames>({
        queryKey: ['gameRecord', fetchURL.href],
        queryFn: fetchGameRecord,
        staleTime: 30_000,
        refetchOnWindowFocus: true,
        retry: 3,
        retryDelay: (attempt) => Math.min(1000 * Math.pow(2, attempt), 30_000)
    });
};