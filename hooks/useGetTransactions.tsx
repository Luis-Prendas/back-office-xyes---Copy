import { useQuery } from '@tanstack/react-query';
import { getEnviroment } from '@/services/getEnviroment';
import { keepPreviousData } from '@tanstack/react-query';
import { TransactionRecordRootObject } from '@/components/partials/tables/transaction-record/transaction-record-types';
import { ApiResponse } from '@/services/transactionsService.types';
import { FormValuesGetTransactions } from '@/components/partials/tables/transaction-record/table-transaction-record';

const CACHE_STALE_TIME = 30_000;

export const useGetTransactions = (filters: string) => {
    const baseUrl = getEnviroment();
    const fetchURL = new URL(`/container/wallets/api/v1/get-all-transactions?page=1&limit=100&search=${filters}`, baseUrl);

    return useQuery<ApiResponse>({
        queryKey: ['transactions', fetchURL.href],
        queryFn: () => fetch(fetchURL.href).then((res) => res.json()),
        placeholderData: keepPreviousData,
        staleTime: CACHE_STALE_TIME,
    });
};

export const useGetTransactionsByUserId = (userId: string) => {
    const baseUrl = getEnviroment();
    const fetchURL = new URL(`/container/wallets/api/v1/get-all-transactions/${userId}`, baseUrl);

    return useQuery<ApiResponse>({
        queryKey: ['transactions', fetchURL.href],
        queryFn: () => fetch(fetchURL.href).then((res) => res.json()),
        placeholderData: keepPreviousData,
        staleTime: CACHE_STALE_TIME,
    });
};