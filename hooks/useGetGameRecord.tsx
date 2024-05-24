import { useQuery } from '@tanstack/react-query';
import { getEnviroment } from '@/services/getEnviroment';
import { GameRecordRootResponse } from '@/types/game-record-type';

export const useGetGameRecord = (filters: string | null) => {
    const baseUrl = getEnviroment();
    const fetchURL = new URL(`/container/games/api/v1/get-all-players-transactions?search=${filters}`, baseUrl);

    const fetchGameRecord = async () => {
        const response = await fetch(fetchURL.href);
        if (!response.ok) {
            throw new Error(`Error fetching game record: ${response.status} ${response.statusText}`);
        }
        return response.json();
    };

    return useQuery<GameRecordRootResponse>({
        queryKey: ['gameRecord', fetchURL.href], // queryKey único
        queryFn: fetchGameRecord, // control de errores
        // staleTime: 30_000, // Configuración de tiempo de datos frescos
        // refetchOnWindowFocus: true, // Refetch cuando la ventana tiene foco
        // retry: 3, // Número de intentos de reintento
        retryDelay: (attempt) => Math.min(1000 * Math.pow(2, attempt), 30_000)
    });
};

export const useGetGameRecordByUserId = (userId: string) => {
    const baseUrl = getEnviroment();
    const fetchURL = new URL(`/container/auth/api/v1/membersList/${userId}/member-bonus`, baseUrl);

    const fetchGameRecord = async () => {
        const response = await fetch(fetchURL.href);
        if (!response.ok) {
            throw new Error(`Error fetching game record: ${response.status} ${response.statusText}`);
        }
        return response.json();
    };

    const gameRecordByUserId = useQuery<GameRecordRootResponse>({
        queryKey: ['gameRecord', fetchURL.href], // queryKey único
        queryFn: fetchGameRecord, // control de errores
        staleTime: 30_000, // Configuración de tiempo de datos frescos
        refetchOnWindowFocus: true, // Refetch cuando la ventana tiene foco
        retry: 3, // Número de intentos de reintento
        retryDelay: (attempt) => Math.min(1000 * Math.pow(2, attempt), 30_000)
    });

    return { gameRecordByUserId }
};

export const useGetGameRecordByUserFilters = (userId: string, filters: string) => {
    const baseUrl = getEnviroment();
    const fetchURL = new URL(`container/games/api/v1/player-transactions/${userId}?page=1&limit=1&search=${filters}`, baseUrl);

    const fetchGameRecord = async () => {
        const response = await fetch(fetchURL.href);
        if (!response.ok) {
            throw new Error(`Error fetching game record: ${response.status} ${response.statusText}`);
        }
        return response.json();
    };

    return useQuery<GameRecordRootResponse>({
        queryKey: ['gameRecord', fetchURL.href], // queryKey único
        queryFn: fetchGameRecord, // control de errores
        staleTime: 30_000, // Configuración de tiempo de datos frescos
        refetchOnWindowFocus: true, // Refetch cuando la ventana tiene foco
        retry: 3, // Número de intentos de reintento
        retryDelay: (attempt) => Math.min(1000 * Math.pow(2, attempt), 30_000)
    })
};

