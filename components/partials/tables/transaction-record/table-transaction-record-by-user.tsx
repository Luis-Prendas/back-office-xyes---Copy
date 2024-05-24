import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import Moment from 'react-moment';
import { getTranslation } from '@/i18n';
import FilterDepositWithdraw from '../../filters/transaction-record/filter-deposit-withdraw';
import { TransactionItem, TransactionRecordTotals } from './transaction-record-types';
import { Children, FormEvent, useEffect, useState } from 'react';
import { QueryObserverResult } from '@tanstack/react-query';
import { useGetTransactionsByUserId } from '@/hooks/useGetTransactions';
import CustomLoader from '../../loader/custom-loader';
import { Detail } from '@/services/transactionsService.types';
import Statistics from '@/components/Statistics';

type Status = 'success' | 'fail' | 'pending';

const styleStatus: Record<Status, string> = {
    success: 'bg-green-200 text-green-800',
    fail: 'bg-red-200 text-red-800',
    pending: 'bg-yellow-200 text-yellow-800',
};

interface Props {
    userId: string;
}

export default function TableTransactionRecordByUser({ userId }: Props) {
    const { t } = getTranslation();

    const [deposit, setDeposit] = useState<number>(0);
    const [withdraw, setWithdraw] = useState<number>(0);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
    const { data, isLoading } = useGetTransactionsByUserId(userId);

    useEffect(() => {
        const currentPageData = data?.data.details.slice(pagination.pageIndex, pagination.pageSize);
        const onlyDeposit = currentPageData?.filter((e) => e.type === 'deposit');
        const onlyWithdraw = currentPageData?.filter((e) => e.type === 'withdraw');
        setDeposit(onlyDeposit?.reduce((accumulator, currentValue) => accumulator + Number(currentValue.amount), 0)!);
        setWithdraw(onlyWithdraw?.reduce((accumulator, currentValue) => accumulator + Number(currentValue.amount), 0)!);
    }, [data?.data.details, pagination]);

    const columns: MRT_ColumnDef<Detail>[] = [
        {
            id: 'no',
            header: t('no'),
            Cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: 'generated.systemNo',
            header: t('systemNo'),
        },
        {
            accessorKey: '3rdNo',
            header: t('3rdNo'),
        },
        {
            accessorKey: 'type',
            header: t('type'),
        },
        {
            accessorKey: 'platform',
            header: t('platform'),
        },
        {
            accessorKey: 'activityName',
            header: t('activityName'),
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
            accessorKey: 'previousBalance',
            header: t('before'),
        },
        {
            accessorKey: 'nextBalance',
            header: t('after'),
        },
        {
            accessorKey: 'exchangeRate',
            header: t('exchangeRates'),
        },
        {
            accessorFn: (row) => <span className={`${styleStatus[row.status as Status]} w-24 rounded p-1`}>{row.status}</span>,
            accessorKey: 'status',
            header: t('status'),
        },
        {
            accessorKey: 'memberFeedback',
            header: t('memberFeedback'),
        },
        {
            accessorKey: 'remark',
            header: t('remark'),
        },
        {
            accessorKey: 'operator',
            header: t('operator'),
        },
        {
            accessorFn: (row) => <Moment format="DD-MM-YYYY H:mm:ss">{row.requestTime}</Moment>,
            header: t('dateRequest'),
        },
        {
            accessorFn: (row) => <Moment format="DD-MM-YYYY H:mm:ss">{row.finishTime}</Moment>,
            header: t('dateProcess'),
        },
    ];

    const table = useMantineReactTable({
        data: data ? data.data.details : [],
        columns,
        mantineTableContainerProps: { cellPadding: '200px', style: { maxHeight: '30rem' } },
        getRowId: (row) => row._id,
        mantineSelectCheckboxProps: { color: 'red', size: 'lg', style: { justifyContent: 'center', alignItems: 'center' } },
        positionToolbarAlertBanner: 'head-overlay',
        defaultColumn: { size: 5 },
        enableSorting: false,
        onPaginationChange: setPagination,
        state: { pagination },
        enableColumnActions: false,
        enableTopToolbar: false,
        mantineTableHeadCellProps: { align: 'center', cellPadding: 0, style: { padding: 0 } },
        mantineTableBodyCellProps: { align: 'center', cellPadding: 0, style: { padding: 0 } },
        mantineTableProps: { withColumnBorders: true, striped: true },
        mantinePaginationProps: { rowsPerPageOptions: ['20', '50', '100', '200'] },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formElements = e.currentTarget.elements;

        const selectField = (formElements.namedItem('selectField') as HTMLSelectElement).value;
        const inputSearch = (formElements.namedItem('inputSearch') as HTMLInputElement).value;
        const all = (formElements.namedItem('all') as HTMLInputElement).checked;
        const deposit = (formElements.namedItem('deposit') as HTMLInputElement).checked;
        const depositThirdParty = (formElements.namedItem('deposit-third-party') as HTMLInputElement).checked;
        const depositCwallet = (formElements.namedItem('deposit-cwallet') as HTMLInputElement).checked;
        const depositManual = (formElements.namedItem('deposit-manual') as HTMLInputElement).checked;
        const depositAgentDeposit = (formElements.namedItem('deposit-agent-deposit') as HTMLInputElement).checked;
        const depositBuyCrypto = (formElements.namedItem('deposit-buy-crypto') as HTMLInputElement).checked;
        const withdraw = (formElements.namedItem('withdraw') as HTMLInputElement).checked;
        const withdrawThirdParty = (formElements.namedItem('withdraw-third-party') as HTMLInputElement).checked;
        const withdrawCwallet = (formElements.namedItem('withdraw-cwallet') as HTMLInputElement).checked;
        const withdrawManual = (formElements.namedItem('withdraw-manual') as HTMLInputElement).checked;
        const transfer = (formElements.namedItem('transfer') as HTMLInputElement).checked;
        const transferTips = (formElements.namedItem('transfer-tips') as HTMLInputElement).checked;
        const transferChatroom = (formElements.namedItem('transfer-chatroom') as HTMLInputElement).checked;
        const transferVaultPro = (formElements.namedItem('transfer-vault-pro') as HTMLInputElement).checked;
        const swap = (formElements.namedItem('swap') as HTMLInputElement).checked;
        const inputDate1 = (formElements.namedItem('inputDate1') as HTMLInputElement).value;
        const inputDate2 = (formElements.namedItem('inputDate2') as HTMLInputElement).value;
        const isUtcTime = (formElements.namedItem('utcTime') as HTMLInputElement).checked;

        // Crear un objeto con todos los valores obtenidos
        const formValues = {
            selectField,
            inputSearch,
            checkBox: [
                {
                    field: 'all',
                    checked: all,
                    children: [
                        { field: 'swap', checked: swap, children: [] },
                        {
                            field: 'deposit',
                            checked: deposit,
                            children: [
                                { field: 'depositThirdParty', checked: depositThirdParty, children: [] },
                                { field: 'depositCwallet', checked: depositCwallet, children: [] },
                                { field: 'depositManual', checked: depositManual, children: [] },
                                { field: 'depositAgentDeposit', checked: depositAgentDeposit, children: [] },
                                { field: 'depositBuyCrypto', checked: depositBuyCrypto, children: [] },
                            ],
                        },
                        {
                            field: 'withdraw',
                            checked: withdraw,
                            children: [
                                { field: 'withdrawThirdParty', checked: withdrawThirdParty, children: [] },
                                { field: 'withdrawCwallet', checked: withdrawCwallet, children: [] },
                                { field: 'withdrawManual', checked: withdrawManual, children: [] },
                            ],
                        },
                        {
                            field: 'transfer',
                            checked: transfer,
                            children: [
                                { field: 'transferTips', checked: transferTips, children: [] },
                                { field: 'transferChatroom', checked: transferChatroom, children: [] },
                                { field: 'transferVaultPro', checked: transferVaultPro, children: [] },
                            ],
                        },
                    ],
                },
            ],
            inputDate1,
            inputDate2,
            isUtcTime,
        };

        console.log('Form Values:', formValues);
    };

    const handleChangeTime = () => { };

    const handleChangeUsd = () => { };

    return (
        <div className="flex flex-col gap-4 p-4">
            {isLoading ? (
                <CustomLoader />
            ) : (
                <>
                    {data ? (
                        <>
                            <Statistics>
                                <Statistics.Child>
                                    <Statistics.Header>{t('currentPageStatistics')}:</Statistics.Header>
                                    <Statistics.Stat>
                                        <Statistics.Name>{t('deposit')}:</Statistics.Name>
                                        <Statistics.Currency currency={deposit && deposit} />
                                    </Statistics.Stat>
                                    <Statistics.Stat>
                                        <Statistics.Name>{t('withdraw')}:</Statistics.Name>
                                        <Statistics.Currency currency={withdraw && withdraw} />
                                    </Statistics.Stat>
                                    <Statistics.Stat>
                                        <Statistics.Name>{t('transfer')}:</Statistics.Name>
                                        <Statistics.Currency currency={0} />
                                    </Statistics.Stat>
                                    <Statistics.Stat>
                                        <Statistics.Name>{t('swap')}:</Statistics.Name>
                                        <Statistics.Currency currency={0} />
                                    </Statistics.Stat>
                                </Statistics.Child>
                                <Statistics.Child>
                                    <Statistics.Header>{t('searchResultsStatistics')}:</Statistics.Header>
                                    <Statistics.Stat>
                                        <Statistics.Name>{t('deposit')}:</Statistics.Name>
                                        <Statistics.Currency currency={data.data.totals.data.totals.deposit.totalAmount} />
                                    </Statistics.Stat>
                                    <Statistics.Stat>
                                        <Statistics.Name>{t('withdraw')}:</Statistics.Name>
                                        <Statistics.Currency currency={data.data.totals.data.totals.withdraw.totalAmount} />
                                    </Statistics.Stat>
                                    <Statistics.Stat>
                                        <Statistics.Name>{t('transfer')}:</Statistics.Name>
                                        <Statistics.Currency currency={0} />
                                    </Statistics.Stat>
                                    <Statistics.Stat>
                                        <Statistics.Name>{t('swap')}:</Statistics.Name>
                                        <Statistics.Currency currency={0} />
                                    </Statistics.Stat>
                                </Statistics.Child>
                            </Statistics>
                            <FilterDepositWithdraw handleSubmit={handleSubmit} totals={data?.data.totals!} changeTime={handleChangeTime} changeUsd={handleChangeUsd} />
                            <MantineReactTable table={table} />
                        </>
                    ) : (
                        <span className="m-auto mt-8 font-bold text-red-500">{t('errorToLoading')}</span>
                    )}
                </>
            )}
        </div>
    );
}
