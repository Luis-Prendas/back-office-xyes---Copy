import { useQuery } from '@tanstack/react-query';
import { getEnviroment } from '@/services/getEnviroment';
import { RootRegionListEnabled } from '@/types/region-list-enabled';

export const useGetRegionListEnabled = () => {
    const baseUrl = getEnviroment();
    const fetchURL = new URL(`/container/config/api/v1/getGlobalRegionList`, baseUrl);

    const fetchData = async () => {
        const response = await fetch(fetchURL.href);
        if (!response.ok) {
            throw new Error(`Error fetching game record: ${response.status} ${response.statusText}`);
        }
        return response.json();
    };

    return useQuery<RootRegionListEnabled>({
        queryKey: ['RegionList', fetchURL.href],
        queryFn: fetchData,
        retryDelay: (attempt) => Math.min(1000 * Math.pow(2, attempt), 30_000)
    });
};
