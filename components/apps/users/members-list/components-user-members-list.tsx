'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    MantineReactTable,
    useMantineReactTable,
    type MRT_ColumnDef,
    type MRT_ColumnFiltersState,
    type MRT_PaginationState,
    type MRT_SortingState,
    type MRT_ColumnFilterFnsState,
} from 'mantine-react-table';
import { ActionIcon, Button, Group, HoverCard, MantineProvider, Tooltip, useMantineTheme } from '@mantine/core';
import { IconBell, IconFlag, IconLocation, IconRefresh } from '@tabler/icons-react';
import { QueryClient, QueryClientProvider, keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { getEnviroment } from '@/services/getEnviroment';
import { User } from '@/types/usersService.types';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import classes from '../../../../styles/CSS.module.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Moment from 'react-moment';
import { currencyFormat, getLocalizationLangs, showMessage } from '@/components/Utils';
import { getTranslation } from '@/i18n';
import CopyToClipboard from 'react-copy-to-clipboard';
import ModalDefault, { Modals } from '@/components/partials/modals/modal-default';

type UserApiResponse = {
    data: Array<User>;
    users: Array<User>;
    limit: number;
    total: number;
};

type MemberColumnHeaderTable = {
    no: string;
    name: string;
    memberId: string;
    partnerSite: string;
    agent: string;
    memberGrade: string;
    vipLevel: string;
    referralAccount: string;
    memberCreditLevel: string;
    depositWithdraw: string;
    balance: string;
    companyIncome: string;
    memberBonus: string;
    memberTags: string;
    memberRemark: string;
    ipLogs: string;
    firstLoginLog: string;
    lastLoginLog: string;
    status: string;
    actions: any;
};
interface Params {
    columnFilterFns: MRT_ColumnFilterFnsState;
    columnFilters: MRT_ColumnFiltersState;
    globalFilter: string;
    sorting: MRT_SortingState;
    pagination: MRT_PaginationState;
}

const ComponentsUsersMembersList = () => {
    const authBaseUrl = getEnviroment();
    const { t, i18n } = getTranslation();
    const [locale, setLocale] = useState<Locale>(i18n.language);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<keyof typeof Modals | null>(null);
    const [user, setUser] = useState<any>(null);

    const openModal = (type: keyof typeof Modals, user: any) => {
        setUser(user);
        setModalType(type);
        setShowModal(true);
    };

    const handleModal = (action: string, data: any) => {
        console.log(action, data);
        setShowModal(false);
    };

    const columnHeaders: MemberColumnHeaderTable = {
        no: t('no'),
        name: t('name'),
        memberId: t('memberId'),
        partnerSite: t('partnerSite'),
        agent: t('agent'),
        memberGrade: t('memberGrade'),
        vipLevel: t('vipLevel'),
        referralAccount: t('referralAccount'),
        memberCreditLevel: t('memberCreditLevel'),
        depositWithdraw: t('depositWithdraw'),
        balance: t('balance'),
        companyIncome: t('companyIncome'),
        memberBonus: t('memberBonus'),
        memberTags: t('memberTags'),
        memberRemark: t('memberRemark'),
        ipLogs: t('ipLogs'),
        firstLoginLog: t('firstLoginLog'),
        lastLoginLog: t('lastLoginLog'),
        status: t('status'),
        actions: t('actions'),
    };

    type Locale = keyof typeof columnHeaders;

    // Verify column key id valid
    function isValidColumnKey(key: string): key is Locale {
        return key in columnHeaders;
    }
    const [copied, setCopied] = useState(false);

    const onCopy = useCallback(() => {
        setCopied(true);
    }, []);

    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            {
                id: 'no',
                header: columnHeaders.no,
                accessorKey: 'no',
                Cell: ({ row }) => row.index + 1,
                enablePinning: true,
                size: 5,
            },
            {
                accessorFn: (row) => (
                    <div className="flex items-center justify-center" onClick={() => openModal('ModalUserAccount', row)}>
                        <div className="block cursor-pointer">
                            <span className="text-md block">{row.memberUsername}</span>
                            <span className="block">{(row.name ? row.name : '-') + ' ' + (row.lastname ? row.lastname : '-')}</span>
                        </div>
                    </div>
                ), //accessorFn used to join multiple data into a single cell
                accessorKey: 'name',
                Header: () => <div className="text-wrap text-center">{columnHeaders.name}</div>,
                header: columnHeaders.name,
                size: 30,
                maxSize: 30,
            },
            {
                enableClickToCopy: true,
                accessorKey: 'memberId',
                header: 'memberId',
                size: 30,
                maxSize: 30,
            },
            {
                accessorFn: (row) => (
                    <div className="text-wrap font-semibold">
                        <button type="button" className="text-gray-80 rounded bg-transparent px-4 py-2 font-semibold" onClick={() => openModal('ModalPartnerSite', row)}>
                            {row.partnerSite}
                        </button>
                    </div>
                ),
                accessorKey: 'partnerSite',
                header: columnHeaders.partnerSite,
                Header: () => <div className="text-wrap text-center">{columnHeaders.partnerSite}</div>,
                size: 40,
                maxSize: 40,
            },
            {
                accessorFn: (row) => (
                    <div className="text-wrap font-semibold">
                        <button type="button" className="text-gray-80 rounded bg-transparent px-4 py-2 font-semibold" onClick={() => openModal('ModalAgent', row)}>
                            {row.agent}
                        </button>
                    </div>
                ),
                accessorKey: 'agent',
                header: columnHeaders.agent,
                size: 5,
            },
            {
                accessorFn: (row) => (
                    <div className="text-wrap font-semibold">
                        <button type="button" className="text-gray-80 rounded bg-transparent px-4 py-2 font-semibold" onClick={() => openModal('ModalMemberGrade', row)}>
                            {row.vipLevel}
                        </button>
                    </div>
                ),
                accessorKey: 'vipLevel',
                header: columnHeaders.vipLevel,
                size: 5,
                Header: () => <div className="flex w-8 justify-center text-wrap text-center">{columnHeaders.vipLevel}</div>,
            },
            {
                accessorFn: (row) => (
                    <div className="text-wrap font-semibold">
                        <span className="w-full border-none text-inherit" onClick={() => openModal('ModalReferralAccount', row)}>
                            {row.referralAccount ? row.referralAccount : '-'}
                        </span>
                    </div>
                ),
                accessorKey: 'referralAccount',
                header: columnHeaders.referralAccount,
                Header: () => <div className="text-wrap text-center">{columnHeaders.referralAccount}</div>,
                size: 1,
            },
            {
                accessorFn: (row) => (
                    <div className="text-wrap font-semibold">
                        <button type="button" className="text-gray-80 rounded bg-transparent px-4 py-2 font-semibold" onClick={() => openModal('ModalMemberCreditLevel', row)}>
                            {row.memberCreditLevel}
                        </button>
                    </div>
                ),
                accessorKey: 'memberCreditLevel',
                header: columnHeaders.memberCreditLevel,
                size: 50,
                Header: () => <div className="text-wrap text-center">{columnHeaders.memberCreditLevel}</div>,
            },
            {
                accessorFn: (row) => (
                    <div className="text-wrap font-semibold">
                        <button type="button" className="text-gray-80 rounded bg-transparent px-4 py-2 font-semibold" onClick={() => openModal('ModalDepositWithdraw', row)}>
                            {currencyFormat(row.depositWithdraw)}
                        </button>
                    </div>
                ),
                accessorKey: 'depositWithdraw',
                header: columnHeaders.depositWithdraw,
                size: 30,
                Header: () => <div className="text-wrap text-center">{columnHeaders.depositWithdraw}</div>,
            },
            {
                accessorFn: (row) => (
                    <div className="text-wrap font-semibold">
                        <button type="button" className="text-gray-80 rounded bg-transparent px-4 py-2 font-semibold" onClick={() => openModal('ModalBalance', row)}>
                            {currencyFormat(row.balance)}
                        </button>
                    </div>
                ),
                accessorKey: 'balance',
                header: columnHeaders.balance,
                size: 5,
            },
            {
                accessorFn: (row) => (
                    <div className="text-wrap font-semibold">
                        <button type="button" className="text-gray-80 rounded bg-transparent px-4 py-2 font-semibold" onClick={() => openModal('ModalCompanyIncome', row)}>
                            {currencyFormat(row.companyIncome)}
                        </button>
                    </div>
                ),
                accessorKey: 'companyIncome',
                header: columnHeaders.companyIncome,
                Header: () => <div className="text-wrap text-center">{columnHeaders.companyIncome}</div>,
                size: 10,
                maxSize: 10,
            },
            {
                accessorFn: (row) => (
                    <div className="text-wrap font-semibold">
                        <button type="button" className="text-gray-80 rounded bg-transparent px-4 py-2 font-semibold" onClick={() => openModal('ModalMemberBonus', row)}>
                            {currencyFormat(row.memberBonus)}
                        </button>
                    </div>
                ),
                accessorKey: 'memberBonus',
                header: columnHeaders.memberBonus,
                Header: () => <div className="text-wrap text-center">{columnHeaders.memberBonus}</div>,
                size: 10,
                maxSize: 10,
            },
            {
                accessorFn: (row) => (
                    <div className="text-wrap font-semibold">
                        <span className="w-full border-none text-inherit" onClick={() => openModal('ModalMemberRemark', row)}>
                            {row.memberRemark}
                        </span>
                    </div>
                ),
                accessorKey: 'memberRemark',
                header: columnHeaders.memberRemark,
                Header: () => <div className="text-wrap text-center">{columnHeaders.memberRemark}</div>,
                size: 10,
                maxSize: 10,
            },
            {
                accessorFn: (row) => (
                    <div className="text-wrap font-semibold">
                        <span className="w-full border-none text-inherit" onClick={() => openModal('ModalMemberRemark', row)}>
                            {row.memberTags}
                        </span>
                    </div>
                ),
                accessorKey: 'memberTags',
                header: columnHeaders.memberTags,
                Header: () => <div className="text-wrap text-center">{columnHeaders.memberTags}</div>,
                size: 10,
                maxSize: 10,
            },
            {
                accessorFn: (row) => (
                    <>
                        <Group justify="center">
                            <HoverCard shadow="md">
                                <HoverCard.Target>
                                    <span>{row.firstLoginLog?.country + ' / ' + row.firstLoginLog?.domain}</span>
                                </HoverCard.Target>
                                <HoverCard.Dropdown>
                                    <p>{row.firstLoginLog?.ip}</p>
                                </HoverCard.Dropdown>
                            </HoverCard>
                        </Group>
                        <div>
                            <Moment format="YYYY-MM-DD H:mm:ss">{row.firstLoginLog?.datetime}</Moment>
                        </div>
                    </>
                ),
                accessorKey: 'firstLoginLog',
                header: columnHeaders.firstLoginLog,
                size: 100,
            },
            {
                accessorFn: (row) => (
                    <>
                        <Group justify="center">
                            <HoverCard shadow="md">
                                <HoverCard.Target>
                                    <span>{row.lastLoginLog?.country + ' / ' + row.lastLoginLog?.domain}</span>
                                </HoverCard.Target>
                                <HoverCard.Dropdown>
                                    <p>{row.lastLoginLog?.ip}</p>
                                </HoverCard.Dropdown>
                            </HoverCard>
                        </Group>
                        <div>
                            <Moment format="YYYY-MM-DD H:mm:ss">{row.lastLoginLog?.datetime}</Moment>
                        </div>
                    </>
                ),
                accessorKey: 'lastLoginLog',
                header: columnHeaders.lastLoginLog,
                size: 100,
            },
            {
                accessorFn: ({ status }) => (
                    <div className="text-wrap font-semibold">
                        <div className="font-semibold">
                            <span className={`badge badge-outline-${status == 'ACTIVE' ? 'success' : 'warning'}`}>{t(status)}</span>
                        </div>
                    </div>
                ),
                accessorKey: 'status',
                header: columnHeaders.status,
                size: 100,
            },
            {
                accessorFn: (row) => (
                    <div className="mx-auto flex w-max items-center gap-2 font-semibold">
                        <button type="button" className={`btn btn-sm btn-${row.status == 'ACTIVE' ? 'danger' : 'success'}`}>
                            {t(row.status == 'ACTIVE' ? 'Ban' : 'Unban')}
                        </button>

                        {/* <button type="button" className="btn btn-sm btn-info">
                            <IconBell />
                        </button> */}
                    </div>
                ),
                accessorKey: 'actions',
                enablePinning: true,
                header: columnHeaders.actions,
                size: 100,
            },
        ],
        []
    );

    //Manage MRT state that we want to pass to our API
    const parentTheme = useMantineTheme();
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [columnFilterFns, setColumnFilterFns] = useState<MRT_ColumnFilterFnsState>(Object.fromEntries(columns.map(({ accessorKey }) => [accessorKey, 'contains']))); //default to "contains" for all columns
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    //custom react-query hook
    const useGetUsers = ({ columnFilterFns, columnFilters, globalFilter, sorting, pagination }: Params) => {
        const fetchURL = new URL('/container/auth/api/v1/usersClient', authBaseUrl);
        fetchURL.searchParams.set('start', `${pagination.pageIndex}`);
        fetchURL.searchParams.set('limit', `${pagination.pageSize * 1}`);
        fetchURL.searchParams.set('page', `${pagination.pageIndex + 1}`);
        fetchURL.searchParams.set('size', `${pagination.pageSize}`);
        fetchURL.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
        fetchURL.searchParams.set('filterModes', JSON.stringify(columnFilterFns ?? {}));
        fetchURL.searchParams.set('globalFilter', globalFilter ?? '');
        fetchURL.searchParams.set('sorting', JSON.stringify(sorting ?? []));

        return useQuery<UserApiResponse>({
            queryKey: ['userMemberList', fetchURL.href], //refetch whenever the URL changes (columnFilters, globalFilter, sorting, pagination)
            queryFn: () =>
                fetch(fetchURL.href)
                    .then((res) => {
                        if (res.status === 400) {
                            showMessage(t('error_server'), 'error');
                        }
                        return res ? res.json() : [];
                    })
                    .catch((error) => {
                        console.log(error);
                        showMessage(t('error_server'), 'error');
                    }),
            placeholderData: keepPreviousData, //useful for paginated queries by keeping data from previous pages on screen while fetching the next page
            staleTime: 30_000, //don't refetch previously viewed pages until cache is more than 30 seconds old
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

    //this will depend on your API response shape
    const fetchedUsers = data?.users ?? [];

    // const duplicatedUsers = [...fetchedUsers, ...fetchedUsers, ...fetchedUsers, ...fetchedUsers, ...fetchedUsers];

    const totalRowCount = data?.total ?? 0;
    return (
        <>
            <MantineProvider theme={{ ...parentTheme, primaryColor: 'red' }}>
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
                        isError
                            ? {
                                  color: 'red',
                                  children: 'Error loading data',
                              }
                            : undefined
                    }
                    manualFiltering={true}
                    manualPagination={true}
                    manualSorting={true}
                    mantinePaperProps={{ className: classes.paper }}
                    mantineTopToolbarProps={{ className: classes.toolbars }}
                    mantineBottomToolbarProps={{
                        className: classes.test,
                    }}
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
                        showAlertBanner: isError,
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
                        rowsPerPageOptions: ['10', '20', '50', '100', '200'],
                    }}
                    localization={getLocalizationLangs(locale)}
                />
            </MantineProvider>

            {showModal && <ModalDefault type={modalType!} showModal={showModal} handleModal={setShowModal} user={user} />}
        </>
    );
};

export default ComponentsUsersMembersList;
