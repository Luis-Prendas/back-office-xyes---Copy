import { getEnviroment } from "@/services/getEnviroment";
import { GetMemberByIdRootResponse } from "@/types/get-member-by-id";
import { useQuery } from "@tanstack/react-query";

export const useGetMemberById = (memberId: string) => {
    const baseUrl = getEnviroment();
    const fetchURL = new URL(`/container/auth/api/v1/usersDetailsMini/_id/${memberId}`, baseUrl);

    const fetchData = async () => {
        const response = await fetch(fetchURL.href);
        if (!response.ok) {
            throw new Error(`Error fetching game record: ${response.status} ${response.statusText}`);
        }
        return response.json();
    };

    return useQuery<GetMemberByIdRootResponse>({
        queryKey: ['gameRecord', fetchURL.href],
        queryFn: fetchData,
        staleTime: 30_000,
        refetchOnWindowFocus: true,
        retry: 3,
        retryDelay: (attempt) => Math.min(1000 * Math.pow(2, attempt), 30_000)
    })
};