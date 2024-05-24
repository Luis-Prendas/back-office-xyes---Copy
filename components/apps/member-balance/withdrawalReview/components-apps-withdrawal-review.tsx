'use client';
import BankCardFilter from '@/components/partials/filters/bank-card-crypto/filter-bank-card-crypto';
import CustomLoader from '@/components/partials/loader/custom-loader';
import { columnsTabSelected } from '@/components/constans';
import { getTableProps } from '@/components/Utils';
import { getEnviroment } from '@/services/getEnviroment';
import { useQuery } from '@tanstack/react-query';
import { MantineReactTable } from 'mantine-react-table';
import { useState } from 'react';
import { useGetDefaultInfo } from '@/hooks/useGetDefaultInfo';

export default function ComponentsAppsWithdrawalReview() {
    const normalBaseUrlAuth = getEnviroment() + '/auth';
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
    const [statusError, setMessageStatus] = useState(false);

    const fullRoute = `${normalBaseUrlAuth}/api/v1/withdrawal-review`;
    const routePath = 'withdrawal-review';

    const { data: fetchedUsers, isError: isLoadingUsersError, isFetching: isFetchingUsers, isLoading: isLoadingUsers, refetch } = useGetDefaultInfo(fullRoute, routePath, setMessageStatus);
    const fetchedData = fetchedUsers ? fetchedUsers.payload : [];
    const columns = columnsTabSelected(9);

    const table = getTableProps(setPagination, pagination, fetchedData, columns, false, isLoadingUsers, statusError, isFetchingUsers);

    return (
        <div>
            <div className="mb-8 rounded border border-gray-400 py-8">
                <BankCardFilter></BankCardFilter>
            </div>
            <div>
                <div>{<MantineReactTable table={table} />}</div>
            </div>
        </div>
    );
}
