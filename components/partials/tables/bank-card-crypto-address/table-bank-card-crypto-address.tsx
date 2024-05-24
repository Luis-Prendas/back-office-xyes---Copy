'use client';
import { MRT_VisibilityState, MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { getTranslation } from '@/i18n';
import { FormEvent, useEffect, useState } from 'react';
import CustomLoader from '../../loader/custom-loader';
import { BankCardRecordData, BankCardRecordRootResponse } from '@/types/bankCardCryptoAddress-type';
import { useGetBankRecordRecordByUserFilters } from '@/hooks/useGetBankRecord';
import Filters from '../../filters/default-filter';
import BankCardFilter from '../../filters/bank-card-crypto/filter-bank-card-crypto';
import { columnsFistTable, columnsSecondTable, FakeData, FakeDataSecondTable } from './bank-card-crypto-address-FAKEDATA';
import { getTableProps } from '@/components/Utils';
import { useGetDefaultInfo } from '@/hooks/useGetDefaultInfo';
import { getEnviroment } from '@/services/getEnviroment';
import { columnsTabSelected } from '@/components/constans';

interface formValues {
    selectField: string;
    inputSearch: string;
    suppliers: string;
    provider: string;
    category: string;
    isUtcTime: boolean;
}

interface Props {
    userId: string;
}

export default function TableBankCardCryptoAddress({ userId }: Props) {
    const normalBaseUrlAuth = getEnviroment() + '/auth';
    const [statusError, setMessageStatus] = useState(false);
    const { t } = getTranslation();

    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });

    const fullRoute = `${normalBaseUrlAuth}/api/v1/admin-cslog`;
    const routePath = 'admin-cslog';

    const { data: fetchedUsers, isError: isLoadingUsersError, isFetching: isFetchingUsers, isLoading: isLoadingUsers, refetch } = useGetDefaultInfo(fullRoute, routePath, setMessageStatus);

    const fetchedData = fetchedUsers ? fetchedUsers.payload : FakeData;

    const table = getTableProps(setPagination, pagination, FakeData, columnsFistTable, false, isLoadingUsers, statusError, isFetchingUsers);
    const table2 = getTableProps(setPagination, pagination, FakeDataSecondTable, columnsSecondTable, false, isLoadingUsers, statusError, isFetchingUsers);

    return (
        <div className="flex flex-col gap-4 p-4">
            <>
                <div className="py-8">
                    <MantineReactTable table={table} />
                </div>
                <MantineReactTable table={table2} />
            </>
        </div>
    );
}
