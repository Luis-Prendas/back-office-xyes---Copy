'use client';
import BankCardFilter from '@/components/partials/filters/bank-card-crypto/filter-bank-card-crypto';
import { getLocalizationLangs, getTableProps, isValidColumnKey, Locale, showMessage } from '@/components/Utils';
import { getEnviroment } from '@/services/getEnviroment';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { MantineReactTable, MRT_ColumnDef, MRT_ColumnFilterFnsState, MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'mantine-react-table';
import { FormEvent, useMemo, useState } from 'react';
import { MantineParams } from '@/types/memberListService.type';
import { getTranslation } from '@/i18n';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';

type RiskReviewApiResponse = {
    memberRemark: Array<RiskInformationRecordData>;
    limit: number;
    total: number;
    page: number;
    success: boolean;
};

type RiskInformationRecordData = {
    _id?: string | null;
    no: string;
    systemNo: string;
    recordId: string;
    memberId: string;
    vipLevel: string;
    agent: string;
    currency: string;
    amount: string;
    fee: string;
    totalNumberOfWithdrawals: string;
    lastDepositAmount: string;
    withdrawalRiskReminder: string;
    withdrawalRestriction: string;
    device: string;
    paymentAddress: string;
    wagerCheck: string;
    riskRemark: string;
    withdrawRemark: string;
    requestTime: string;
    riskTimeAdmin: string;
    withdrawalTimeAdmin: string;
    operation: string;
};

export default function ComponentsAppsRiskReview() {
    const authBaseUrl = getEnviroment();
    const { t, i18n } = getTranslation();
    const [locale, setLocale] = useState<Locale>(i18n.language);

    const columnHeaders: any = {
        no: t('no'),
        systemNo: t('systemNo'),
        recordId: t('recordId'),
        memberId: t('memberId'),
        vipLevel: t('vipLevel'),
        agent: t('agent'),
        currency: t('currency'),
        amount: t('amount'),
        fee: t('fee'),
        totalNumberOfWithdrawals: t('totalNumberOfWithdrawals'),
        lastDepositAmount: t('lastDepositAmount'),
        withdrawalRiskReminder: t('withdrawalRiskReminder'),
        withdrawalRestriction: t('withdrawalRestriction'),
        device: t('device'),
        paymentAddress: t('paymentAddress'),
        wagerCheck: t('wagerCheck'),
        riskRemark: t('riskRemark'),
        withdrawRemark: t('withdrawRemark'),
        requestTime: t('requestTime'),
        riskTimeAdmin: t('riskTimeAdmin'),
        withdrawalTimeAdmin: t('withdrawalTimeAdmin'),
        operation: t('operation'),
    };

    const columns = useMemo<MRT_ColumnDef<RiskInformationRecordData>[]>(
        () => [
            {
                id: 'No',
                header: t('no'),
                Cell: ({ row }) => row.index + 1,
            },
            {
                accessorKey: 'systemNo',
                header: t('systemNo'),
            },
            {
                accessorKey: 'recordId',
                header: t('3rdNo'),
            },
            {
                accessorKey: 'memberId',
                header: t('memberId'),
            },
            {
                accessorKey: 'vipLevel',
                header: t('vipLevel'),
            },
            {
                accessorKey: 'agent',
                header: t('agent'),
            },
            {
                accessorKey: 'currency',
                header: t('currency'),
            },
            {
                accessorKey: 'amount',
                header: t('amount'),
            },
            {
                accessorKey: 'fee',
                header: t('fee'),
            },
            {
                accessorKey: 'totalNumberOfWithdrawals',
                header: t('totalNumberOfWithdrawals'),
            },
            {
                accessorKey: 'lastDepositAmount',
                header: t('lastDepositAmount'),
            },
            {
                accessorKey: 'withdrawalRiskReminder',
                header: t('withdrawalRiskReminder'),
            },
            {
                accessorKey: 'withdrawalRestriction',
                header: t('withdrawalRestriction'),
            },
            {
                accessorKey: 'device',
                header: t('device'),
            },
            {
                accessorKey: 'paymentAddress',
                header: t('paymentAddress'),
            },
            {
                accessorKey: 'wagerCheck',
                header: t('wagerCheck'),
            },
            {
                accessorKey: 'memberRemark',
                header: t('memberRemark'),
            },
            {
                accessorKey: 'riskRemark',
                header: t('riskRemark'),
            },
            {
                accessorKey: 'withdrawRemark',
                header: t('withdrawRemark'),
            },
            {
                accessorKey: 'requestTime',
                header: t('requestTime'),
            },
            {
                accessorKey: 'riskTimeAdmin',
                header: t('riskTimeAdmin'),
            },
            {
                accessorKey: 'withdrawalTimeAdmin',
                header: t('withdrawalTimeAdmin'),
            },
            {
                accessorKey: 'operation',
                header: t('operation'),
            },
        ],
        []
    );

    //Manage MRT state that we want to pass to our API
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [columnFilterFns, setColumnFilterFns] = useState<MRT_ColumnFilterFnsState>(Object.fromEntries(columns.map(({ accessorKey }) => [accessorKey, 'contains']))); //default to "contains" for all columns
    const [globalFilter, setGlobalFilter] = useState('');
    const [statusError, setMessageStatus] = useState(false);
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 20,
    });

    //custom react-query hook
    const useGetUsers = ({ columnFilterFns, columnFilters, globalFilter, sorting, pagination }: MantineParams) => {
        const fetchURL = new URL('/container/auth/api/v1/risk-review', authBaseUrl);
        fetchURL.searchParams.set('start', `${pagination.pageIndex}`);
        fetchURL.searchParams.set('limit', `${pagination.pageSize * 1}`);
        fetchURL.searchParams.set('page', `${pagination.pageIndex + 1}`);
        fetchURL.searchParams.set('size', `${pagination.pageSize}`);
        fetchURL.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
        fetchURL.searchParams.set('filterModes', JSON.stringify(columnFilterFns ?? {}));
        fetchURL.searchParams.set('globalFilter', globalFilter ?? '');
        fetchURL.searchParams.set('sorting', JSON.stringify(sorting ?? []));

        return useQuery<RiskReviewApiResponse>({
            queryKey: ['userMemberList', fetchURL.href], //refetch whenever the URL changes (columnFilters, globalFilter, sorting, pagination)
            queryFn: () =>
                fetch(fetchURL.href)
                    .then((res) => {
                        if (res.status === 400) {
                            setMessageStatus(true);
                            showMessage(t('error_server'), 'error');
                        } else {
                            setMessageStatus(false);
                        }
                        return res ? res.json() : [];
                    })
                    .catch((error) => {
                        console.log(error);
                        showMessage(t('error_server'), 'error');
                    }),
            placeholderData: keepPreviousData, //useful for paginated queries by keeping data from previous pages on screen while fetching the next page
        });
    };

    //call our custom react-query hook
    const { data, isError, isFetching, isLoading, refetch } = useGetUsers({
        columnFilterFns,
        columnFilters,
        globalFilter,
        pagination,
        sorting,
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formElements = e.currentTarget.elements;
        const selectField = (formElements.namedItem('selectField') as HTMLSelectElement).value;
        const inputSearch = (formElements.namedItem('inputSearch') as HTMLInputElement).value;
        const inputDate1 = (formElements.namedItem('inputDate1') as HTMLInputElement).value + ':01';
        const inputDate2 = (formElements.namedItem('inputDate2') as HTMLInputElement).value + ':01';

        const formValues = { selectField, inputSearch, inputDate1, inputDate2 };
        console.log(formValues);

        //setFormValues(formValues);

        //refetch();
    };

    const fetchedUsers = data?.memberRemark ?? [];
    const totalRowCount = data?.total ?? 0;
    return (
        <div>
            <div className="mb-8 rounded border border-gray-400 py-8">
                <BankCardFilter handleSubmit={handleSubmit}></BankCardFilter>
            </div>
            <div>
                <MantineReactTable
                    columns={columns.map((column) => ({
                        ...column,
                        header: isValidColumnKey(column.accessorKey!) ? columnHeaders[column.accessorKey!] : column.accessorKey,
                    }))}
                    data={fetchedUsers}
                    enableStickyHeader={true}
                    enableColumnPinning={true}
                    enableColumnFilterModes={false}
                    enableColumnOrdering={false}
                    enableEditing={false}
                    enableRowActions={false}
                    enableRowSelection={false} // deshabilita la opcion de checkbox
                    enableSelectAll={false}
                    enableColumnFilters={false}
                    enableColumnActions={false}
                    enableFilters={false}
                    enableMultiSort={false}
                    enableSorting={false}
                    onColumnFilterFnsChange={setColumnFilterFns}
                    onColumnFiltersChange={setColumnFilters}
                    onGlobalFilterChange={setGlobalFilter}
                    onPaginationChange={setPagination}
                    onSortingChange={setSorting}
                    renderTopToolbarCustomActions={() => (
                        <Tooltip label={t('refreshData')}>
                            <ActionIcon onClick={() => refetch()}>
                                <IconRefresh />
                            </ActionIcon>
                        </Tooltip>
                    )}
                    rowCount={totalRowCount}
                    mantineToolbarAlertBannerProps={
                        statusError
                            ? {
                                  color: 'red',
                                  children: 'Error loading data',
                              }
                            : undefined
                    }
                    manualFiltering={true}
                    manualPagination={true}
                    manualSorting={true}
                    mantineTableFooterProps={{
                        style: {
                            display: 'flex',
                            justifyContent: 'left',
                            background: 'blue',
                        },
                    }}
                    mantineTableHeadRowProps={{
                        style: {
                            whiteSpace: 'normal',
                            background: 'blue',
                        },
                    }}
                    mantineTableHeadProps={{
                        style: {
                            whiteSpace: 'normal',
                        },
                    }}
                    mantineTableHeadCellProps={{
                        align: 'center',
                        cellPadding: 0,
                        style: {
                            whiteSpace: 'normal',
                        },
                    }}
                    mantineTableBodyCellProps={{
                        align: 'center',
                        cellPadding: '200px',
                        style: {
                            padding: 0,
                            textAlign: 'center',
                            lineHeight: '13px',
                            width: '10px',
                        },
                    }}
                    mantineTableContainerProps={{
                        cellPadding: '200px',
                        style: { maxHeight: '61rem' },
                    }}
                    positionPagination={'bottom'}
                    state={{
                        columnFilterFns,
                        columnFilters,
                        globalFilter,
                        isLoading,
                        pagination,
                        showAlertBanner: statusError,
                        showProgressBars: isFetching,
                        sorting,
                    }}
                    enableDensityToggle={false}
                    initialState={{
                        showColumnFilters: false,
                        showGlobalFilter: true,
                        showToolbarDropZone: false,
                        columnPinning: {
                            left: ['no', 'user'],
                        },
                        showSkeletons: false,
                        density: 'xs',
                    }}
                    mantineTableProps={{
                        highlightOnHover: true,
                        striped: true,
                        withColumnBorders: true,
                        withRowBorders: true,
                        withTableBorder: true,
                        style: {
                            textAlign: 'center',
                            padding: 2,
                            sx: {
                                tableLayout: 'fixed',
                            },
                        },
                    }}
                    mantinePaginationProps={{
                        rowsPerPageOptions: ['20', '50', '100', '200'],
                    }}
                    localization={getLocalizationLangs(locale)}
                />
            </div>
        </div>
    );
}
