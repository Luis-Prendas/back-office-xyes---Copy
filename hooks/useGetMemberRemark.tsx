import { useQuery } from '@tanstack/react-query';
import { getEnviroment } from '@/services/getEnviroment';
import { keepPreviousData } from '@tanstack/react-query';

export interface ApiResponse {
    memberRemark: any;
    message: string;
    totals: string;
}

export const useGetmemberRemarkById = (id: string) => {
    const baseUrl = getEnviroment();
    const fetchURL = new URL(`/container/auth/api/v1/getMemberMemarkById/${id}`, baseUrl);

    return useQuery<ApiResponse>({
        queryKey: ['getMemberRemark', fetchURL.href],
        queryFn: () => fetch(fetchURL.href).then((res) => res.json()),
        placeholderData: keepPreviousData,
    });
};
