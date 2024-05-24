'use client';
import { MRT_VisibilityState, MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { getTranslation } from '@/i18n';
import { FormEvent, useEffect, useState } from 'react';
import CustomLoader from '../../loader/custom-loader';
import { BankCardRecordData, BankCardRecordRootResponse } from '@/types/bankCardCryptoAddress-type';
import { useGetBankRecordRecordByUserFilters } from '@/hooks/useGetBankRecord';
import Filters from '../../filters/default-filter';
import BankCardFilter from '../../filters/bank-card-crypto/filter-bank-card-crypto';
import { getTableProps } from '@/components/Utils';
import { columnsFistTable, FakeData } from '../../tables/bank-card-crypto-address/bank-card-crypto-address-FAKEDATA';
import { columnsTabSelected } from '@/components/constans';
import { useGetDefaultInfo } from '@/hooks/useGetDefaultInfo';
import { getEnviroment } from '@/services/getEnviroment';

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

export default function AdminInformationTab({ userId }: Props) {
    const normalBaseUrlAuth = getEnviroment() + '/auth';
    const [statusError, setMessageStatus] = useState(false);
    const { t } = getTranslation();

    const [formValues, setFormValues] = useState<formValues | null>(null);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });

    const fullRoute = `${normalBaseUrlAuth}/api/v1/admin-cslog`;
    const routePath = 'admin-cslog';

    const { data: fetchedUsers, isError: isLoadingUsersError, isFetching: isFetchingUsers, isLoading: isLoadingUsers, refetch } = useGetDefaultInfo(fullRoute, routePath, setMessageStatus);
    const fetchedData = fetchedUsers ? fetchedUsers.payload : [];
    const columns = columnsTabSelected(5);

    const table = getTableProps(setPagination, pagination, fetchedData, columns, false, isLoadingUsers, statusError, isFetchingUsers);

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="mb-4 rounded border border-gray-400 py-8">
                <BankCardFilter></BankCardFilter>
            </div>
            <div className="py-4">
                <MantineReactTable table={table} />
            </div>
        </div>
    );
}
