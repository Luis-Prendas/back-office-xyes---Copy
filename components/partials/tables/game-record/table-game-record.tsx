'use client'
import { MRT_VisibilityState, MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { getTranslation } from '@/i18n';
import { FormEvent, useEffect, useState } from 'react';
import FilterGameRecord from '../../filters/game-record/filter-game-record';
import { GameRecordData } from '@/types/game-record-type';
import { useGetGameRecord } from '@/hooks/useGetGameRecord';
import CustomLoader from '../../loader/custom-loader';
import Moment from 'react-moment';
import ModalUserAccount from '../../modals/modal-user-account/modal-user-account';
import { set } from 'lodash';
import Statistics from '@/components/Statistics';

type Status = 'Win' | 'Loss' | 'Draw';

const styleStatus: Record<Status, string> = {
    Win: 'text-green-500',
    Loss: 'text-red-500',
    Draw: 'text-yellow-500'
};

interface formValues {
    selectField: string
    inputSearch: string
    suppliers: string
    provider: string
    category: string
    isUtcTime: boolean
    // inputDate1: string
    // inputDate2: string
}

export default function TableGameRecord() {
    const { t } = getTranslation()

    const [formValues, setFormValues] = useState<formValues | null>(null)
    const [betAmount, setBetAmount] = useState<number>(0)
    const [betResult, setBetResult] = useState<number>(0)
    const [memberWinLoss, setMemberWinLoss] = useState<number>(0)
    const [validWager, setValidWager] = useState<number>(0)
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20, })

    const { data, refetch, isLoading } = useGetGameRecord(JSON.stringify(formValues))

    useEffect(() => {
        const currentPageData = data?.response.details.slice(pagination.pageIndex, pagination.pageSize)

        setBetAmount(currentPageData?.reduce((accumulator, currentValue) => accumulator + currentValue.betAmount, 0)!)
        setBetResult(currentPageData?.reduce((accumulator, currentValue) => accumulator + currentValue.payout, 0)!)
        setMemberWinLoss(currentPageData?.reduce((accumulator, currentValue) => accumulator + currentValue.winLoss, 0)!)
        setValidWager(currentPageData?.reduce((accumulator, currentValue) => accumulator + currentValue.wager, 0)!)

    }, [data?.response.details, pagination]);

    const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>({
        betTimeNoUtc: false,
        settlementTimeNoUtc: false,
        currency: false,
        betAmount: false,
        payout: false,
        winLoss: false,
        wager: false,
        betTimeUtc: true,
        settlementTimeUtc: true,
        currencyUsd: true,
        betAmountUsd: true,
        payoutUsd: true,
        winLossUsd: true,
        wagerUsd: true,
    });

    const [showMemberListModal, setShowMemberListModal] = useState(false)
    const [currentMemberId, setCurrentMemberId] = useState<string | null>(null)

    const handleShowModal = (memberId: string) => {
        setCurrentMemberId(memberId)
        setShowMemberListModal(true)
    }

    const columns: MRT_ColumnDef<GameRecordData>[] = [
        {
            Header: <span className='text-wrap'>{t('no')}</span>,
            id: 'No',
            header: t('no'),
            Cell: ({ row }) => row.index + 1,
        },
        {
            Header: <span className='text-wrap'>{t('member')}</span>,
            id: 'member',
            header: t('member'),
            accessorFn: (row) => (
                <div className='flex flex-col cursor-pointer' onClick={() => handleShowModal(row.userId._id)}>
                    <span>{row.userId.memberId}</span>
                    <span>{row.userId.memberUsername}</span>
                </div>
            )
        },
        {
            Header: <span className='text-wrap'>{t('systemNo')}</span>,
            accessorFn: (row) => <div className='text-wrap'>{row.systemNo}</div>,
            accessorKey: 'systemNo',
            header: t('systemNo'),
        },
        {
            Header: <span className='text-wrap'>{t('3rdNo')}</span>,
            accessorFn: (row) => <div className='text-wrap'>{row.betNo}</div>,
            accessorKey: 'betNo',
            header: t('3rdNo'),
        },
        {
            Header: <span className='text-wrap'>{t('3rdSuppliers')}</span>,
            accessorKey: 'thirdSuppliers',
            header: t('3rdSuppliers'),
        },
        {
            Header: <span className='text-wrap'>{t('provider')}</span>,
            accessorKey: 'provider',
            header: t('provider'),
        },
        {
            Header: <span className='text-wrap'>{t('category')}</span>,
            accessorKey: 'category',
            header: t('category'),
        },
        {
            Header: <span className='text-wrap'>{t('gameName')}</span>,
            accessorKey: 'gameName',
            header: t('gameName'),
        },
        {
            Header: <span className='text-wrap'>{t('currency')}</span>,
            id: 'currencyUsd',
            accessorKey: 'currency',
            header: t('currency'),
        },
        {
            Header: <span className='text-wrap'>{t('currency')}</span>,
            id: 'currency',
            accessorKey: 'betCurrencyExchange.currency',
            header: t('currency'),
        },
        {
            Header: <span className='text-wrap'>{t('betType')}</span>,
            accessorKey: 'betType',
            header: t('betType'),
        },
        {
            Header: <span className='text-wrap'>{t('gameResult')}</span>,
            accessorKey: 'gameResult',
            accessorFn: (row) => (
                <span className={`${styleStatus[row.gameResult as Status]} font-bold`}>{row.gameResult}</span>
            ),
            header: t('gameResult'),
        },
        {
            Header: <span className='text-wrap'>{t('betAmount')} $</span>,
            id: 'betAmountUsd',
            accessorKey: 'betAmount',
            accessorFn: (row) => <>{row.betAmount.toFixed(2)}</>,
            header: t('betAmount') + ' $',
        },
        {
            Header: <span className='text-wrap'>{t('betAmount')}</span>,
            id: 'betAmount',
            accessorKey: 'betCurrencyExchange.betAmount',
            accessorFn: (row) => { Number(row.betCurrencyExchange.betAmount).toFixed(2) },
            header: t('betAmount'),
        },
        {
            Header: <span className='text-wrap'>{t('betResult')} $</span>,
            id: 'payoutUsd',
            accessorKey: 'payout',
            header: t('betResult') + ' $',
        },
        {
            Header: <span className='text-wrap'>{t('betResult')}</span>,
            id: 'payout',
            accessorKey: 'betCurrencyExchange.payout',
            header: t('betResult'),
        },
        {
            Header: <span className='text-wrap'>{t('memberWinLoss')} $</span>,
            id: "winLossUsd",
            accessorFn: (row) => (
                <span className={`${row.winLoss > 0 ? 'text-green-500' : row.winLoss < 0 ? 'text-red-500' : 'text-yellow-400'} font-bold`}>{row.winLoss.toFixed(2)}</span>
            ),
            accessorKey: 'winLoss',
            header: t('memberWinLoss') + ' $',
        },
        {
            Header: <span className='text-wrap'>{t('memberWinLoss')}</span>,
            id: "winLoss",
            accessorFn: (row) => (
                <span className={`${Number(row.betCurrencyExchange.winLoss) > 0 ? 'text-green-500' : Number(row.betCurrencyExchange.winLoss) < 0 ? 'text-red-500' : 'text-yellow-400'} font-bold`}>{Number(row.betCurrencyExchange.winLoss).toFixed(2)}</span>
            ),
            accessorKey: 'betCurrencyExchange.winLoss',
            header: t('memberWinLoss'),
        },
        {
            Header: <span className='text-wrap'>{t('validWager')}</span>,
            id: 'wagerUsd',
            accessorKey: 'wager',
            header: t('validWager'),
        },
        {
            Header: <span className='text-wrap'>{t('validWager')}</span>,
            id: 'wager',
            accessorKey: 'betCurrencyExchange.wager',
            header: t('validWager'),
        },
        {
            Header: <span className='text-wrap'>{t('validInvalid')}</span>,
            accessorFn: (row) => (
                <div className='flex justify-center p-0'>
                    <label className='inline-flex items-center cursor-pointer'>
                        <input type='checkbox' id='usd' name='usd' className='sr-only peer' defaultChecked={row.valid} />
                        <div className='relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600'></div>
                    </label>
                </div>
            ),
            header: t('validInvalid'),
        },
        {
            Header: <span className='text-wrap'>{t('operator')}</span>,
            accessorKey: 'operator',
            header: t('operator'),
        },
        {
            Header: <span className='text-wrap'>{t('BetTime')}</span>,
            accessorFn: (row) => <Moment format="DD-MM-YYYY H:mm:ss">{row.processTime.utcTime}</Moment>,
            id: 'betTimeUtc',
            header: 'Bet Time',
        },
        {
            Header: <span className='text-wrap'>{t('BetTime')}</span>,
            accessorFn: (row) => <Moment format="DD-MM-YYYY H:mm:ss">{row.processTime.originTime}</Moment>,
            id: 'betTimeNoUtc',
            header: 'Bet Time',
        },
        {
            Header: <span className='text-wrap'>{t('SettlementTime')}</span>,
            accessorFn: (row) => <Moment format="DD-MM-YYYY H:mm:ss">{row.requestTime.utcTime}</Moment>,
            id: 'settlementTimeUtc',
            header: 'Settlement Time',
        },
        {
            Header: <span className='text-wrap'>{t('SettlementTime')}</span>,
            accessorFn: (row) => <Moment format="DD-MM-YYYY H:mm:ss">{row.requestTime.originTime}</Moment>,
            id: 'settlementTimeNoUtc',
            header: 'Settlement Time',
        },
    ]

    const table = useMantineReactTable({
        data: data ? data.response.details : [],
        columns,
        enableSorting: false,
        onPaginationChange: setPagination,
        state: {
            columnVisibility,
            pagination
        },
        onColumnVisibilityChange: (newVisibilityState) => {
            setColumnVisibility(newVisibilityState); // Acepta VisibilityState para actualizar el estado
        },
        enableColumnActions: false,
        enableTopToolbar: false,
        enableColumnPinning: true,
        mantineTableHeadCellProps: { align: 'center', cellPadding: 0, style: { padding: 0 } },
        mantineTableBodyCellProps: { align: 'center', cellPadding: 0, style: { padding: 0 } },
        mantineTableProps: {
            highlightOnHover: false,
            withColumnBorders: true,
            striped: true,
            withRowBorders: true,
            withTableBorder: true,
            style: { textAlign: 'center' },
        },
        defaultColumn: {
            size: 20
        },
        initialState: {
            columnPinning: {
                left: ['No', 'member'],
            },
            showColumnFilters: false,
            showSkeletons: false,
            density: 'xs',
        },
        mantinePaginationProps: {
            rowsPerPageOptions: ['20', '50', '100', '200'],
            withEdges: false,
        },
    });

    const handleChangeTime = () => {
        table.getColumn('betTimeUtc').toggleVisibility()
        table.getColumn('betTimeNoUtc').toggleVisibility()

        table.getColumn('settlementTimeUtc').toggleVisibility()
        table.getColumn('settlementTimeNoUtc').toggleVisibility()
    }

    const handleChangeUsd = () => {
        table.getColumn('currency').toggleVisibility()
        table.getColumn('currencyUsd').toggleVisibility()

        table.getColumn('betAmount').toggleVisibility()
        table.getColumn('betAmountUsd').toggleVisibility()

        table.getColumn('payout').toggleVisibility()
        table.getColumn('payoutUsd').toggleVisibility()

        table.getColumn('winLoss').toggleVisibility()
        table.getColumn('winLossUsd').toggleVisibility()

        table.getColumn('wager').toggleVisibility()
        table.getColumn('wagerUsd').toggleVisibility()
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formElements = e.currentTarget.elements;
        const selectField = (formElements.namedItem('selectField') as HTMLSelectElement).value;
        const inputSearch = (formElements.namedItem('inputSearch') as HTMLInputElement).value;
        const inputDate1 = (formElements.namedItem('inputDate1') as HTMLInputElement).value + ':01';
        const inputDate2 = (formElements.namedItem('inputDate2') as HTMLInputElement).value + ':01';
        const isUtcTime = (formElements.namedItem('utcTime') as HTMLInputElement).checked;

        const suppliers = (formElements.namedItem('3rdSuppliers') as HTMLSelectElement).value;
        const provider = (formElements.namedItem('provider') as HTMLSelectElement).value;
        const category = (formElements.namedItem('category') as HTMLSelectElement).value;
        const subCategory = (formElements.namedItem('subCategory') as HTMLSelectElement).value;

        const formValues = { selectField, inputSearch, suppliers, provider, category, isUtcTime, subCategory };

        setFormValues(formValues);

        refetch();
    };

    return (
        <div className='flex flex-col gap-4 p-4'>
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
                                        <Statistics.Name>{t('betAmount')}:</Statistics.Name>
                                        <Statistics.Currency currency={betAmount} />
                                    </Statistics.Stat>
                                    <Statistics.Stat>
                                        <Statistics.Name>{t('betResult')}:</Statistics.Name>
                                        <Statistics.Currency currency={betResult} />
                                    </Statistics.Stat>
                                    <Statistics.Stat>
                                        <Statistics.Name>{t('memberWinLoss')}:</Statistics.Name>
                                        <Statistics.Currency currency={memberWinLoss} />
                                    </Statistics.Stat>
                                    <Statistics.Stat>
                                        <Statistics.Name>{t('validWager')}:</Statistics.Name>
                                        <Statistics.Currency currency={validWager} />
                                    </Statistics.Stat>
                                </Statistics.Child>
                                <Statistics.Child>
                                    <Statistics.Header>{t('searchResultsStatistics')}:</Statistics.Header>
                                    <Statistics.Stat>
                                        <Statistics.Name>{t('betAmount')}:</Statistics.Name>
                                        <Statistics.Currency currency={data?.response.totals.totalBetAmount} />
                                    </Statistics.Stat>
                                    <Statistics.Stat>
                                        <Statistics.Name>{t('betResult')}:</Statistics.Name>
                                        <Statistics.Currency currency={data?.response.totals.totalPayout} />
                                    </Statistics.Stat>
                                    <Statistics.Stat>
                                        <Statistics.Name>{t('memberWinLoss')}:</Statistics.Name>
                                        <Statistics.Currency currency={data?.response.totals.totalWinLoss} />
                                    </Statistics.Stat>
                                    <Statistics.Stat>
                                        <Statistics.Name>{t('validWager')}:</Statistics.Name>
                                        <Statistics.Currency currency={data?.response.totals.totalWager} />
                                    </Statistics.Stat>
                                </Statistics.Child>
                            </Statistics>
                            <FilterGameRecord handleSubmit={handleSubmit} totals={data?.response.totals!} changeTime={handleChangeTime} changeUsd={handleChangeUsd} />
                            <MantineReactTable table={table} />

                        </>
                    ) : (
                        <span className='font-bold text-red-500 mt-8 m-auto'>{t('errorToLoading')}</span>
                    )}
                </>
            )}
            {showMemberListModal && currentMemberId && (
                <ModalUserAccount handleModal={setShowMemberListModal} showModal={showMemberListModal} user={currentMemberId} />
            )}
        </div>
    );
};
