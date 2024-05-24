'use client';
import { MRT_RowSelectionState, MRT_SelectCheckbox, MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { getTranslation } from '@/i18n';
import { FormEvent, useEffect, useState } from 'react';
import CustomLoader from '../../loader/custom-loader';
import { OthersGamesData } from '@/types/others-games-types';
import { useGetOthersGames } from '@/hooks/useGetOthersGames';
import Image from 'next/image';
import ModalOthersGamesEdit from '../../modals/modal-other-games-edit/modal-user-account';
import { getEnviroment } from '@/services/getEnviroment';
import axios from 'axios';
import { ActionIcon, Box, Button, Flex, Tooltip } from '@mantine/core';
import { IconEdit, IconSortAscendingNumbers } from '@tabler/icons-react';
import { formatearFechaHora } from '@/components/Utils';
import FilterOthersGames from '../../filters/others-games/filter-others-games';
import ModalOthersGamesMassiveEdit from '../../modals/modal-other-games-edit/modal-user-account-massive';
import ModalOthersGamesSort from '../../modals/modal-other-games-edit/modal-sort-game';

interface formValues {
    selectField: string
    inputSearch: string
    suppliers: string
    provider: string
    category: string
    subCategory: string
}

export default function TableOthersGames() {
    const { t } = getTranslation();

    const [formValues, setFormValues] = useState<formValues | null>(null)
    const { data, isLoading, refetch } = useGetOthersGames(JSON.stringify(formValues));
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showSortModal, setShowSortModal] = useState<boolean>(false);
    const [showMassiveEditModal, setShowMassiveEditModal] = useState<boolean>(false);
    const [game, setGame] = useState<OthersGamesData | null>(null);
    const [currentData, setCurrentData] = useState<OthersGamesData[]>(data ? data.data : []);
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const baseUrl = getEnviroment();

    useEffect(() => {
        if (data) setCurrentData(data.data);
    }, [data]);

    const editGame = (game: OthersGamesData) => {
        setShowEditModal(true);
        setGame(game);
    };

    const sortModal = (game: OthersGamesData) => {
        setShowSortModal(true)
        setGame(game)
    }

    const columns: MRT_ColumnDef<OthersGamesData>[] = [
        { id: 'No', header: t('no'), Cell: ({ row }) => row.index + 1 },
        { header: t('gameId'), accessorKey: 'gameId' },
        { header: t('name'), accessorKey: 'name' },
        { header: t('provider'), accessorFn: (row) => row.provider.name },
        { header: t('category'), accessorKey: 'category' },
        {
            Header: () => <span className='text-wrap'>{t('releaseDate')}</span>,
            header: t('releaseDate'),
            accessorFn: (row) => <div className='text-wrap'>{formatearFechaHora(row.releaseDate)}</div>
        },
        { header: t('platform'), accessorKey: 'platform' },
        { header: t('status'), accessorFn: (row) => (row.status ? t('normal') : t('off')) },
        { header: t('frontendDisplay'), accessorFn: (row) => (row.displayFrontend ? t('show') : t('hiden')) },
        {
            header: t('gamePlatformIconSetting'),
            accessorFn: (row) => (
                <div className='flex justify-between items-center px-2'>
                    <fieldset className='flex gap-2 justify-center items-center'>
                        <input
                            type="checkbox"
                            defaultChecked={row.icon.includes(1)}
                        />
                        <Image width={20} height={20} alt='new' src='https://cs.venaaa.com/image/icon_new_eng.png' />
                    </fieldset>
                    <span>/</span>
                    <fieldset className='flex gap-2 justify-center items-center'>
                        <input
                            type="checkbox"
                            defaultChecked={row.icon.includes(2)}
                        />
                        <Image width={20} height={20} alt='hot' src='https://cs.venaaa.com/image/icon_hot.png' />
                    </fieldset>
                    <span>/</span>
                    <fieldset className='flex gap-2 justify-center items-center'>
                        <input
                            type="checkbox"
                            defaultChecked={row.icon.includes(3)}
                        />
                        <Image width={20} height={20} alt='promot' src='https://cs.venaaa.com/image/icon_promot.png' />
                    </fieldset>
                    <span>/</span>
                    <fieldset className='flex gap-2 justify-center items-center'>
                        <input
                            type="checkbox"
                            defaultChecked={row.icon.includes(4)}
                        />
                        <span>*</span>
                    </fieldset>
                </div>
            )
        },
        {
            header: t('operation'),
            accessorFn: (row) => (
                <div className='flex justify-center items-center gap-4'>
                    <button className='btn btn-primary' onClick={() => editGame(row)}>
                        <IconEdit className='w-5' />
                    </button>
                    <button className='btn btn-primary' onClick={() => sortModal(row)}>
                        <IconSortAscendingNumbers className='w-5' />
                    </button>
                </div>
            ),
            mantineTableBodyCellProps: { align: 'center' }
        }
    ];

    const table = useMantineReactTable({
        data: currentData,
        columns,
        enableRowSelection: true,
        getRowId: (row) => row._id,
        onRowSelectionChange: setRowSelection,
        mantineSelectCheckboxProps: { color: 'red', size: 'lg', style: { justifyContent: 'center', alignItems: 'center' } },
        positionToolbarAlertBanner: 'head-overlay',
        defaultColumn: { size: 5 },
        enableSorting: false,
        onPaginationChange: setPagination,
        state: { pagination, rowSelection },
        enableColumnActions: false,
        enableTopToolbar: false,
        mantineTableHeadCellProps: { align: 'center' },
        mantineTableBodyCellProps: { align: 'center', style: { padding: 1 } },
        mantineTableProps: { withColumnBorders: true, striped: true },
        mantinePaginationProps: { rowsPerPageOptions: ['20', '50', '100', '200'] },
        renderToolbarAlertBannerContent: ({ selectedAlert, table }) => (
            <Flex justify="space-between">
                <Flex p="6px" gap="xl">
                    <MRT_SelectCheckbox table={table} /> {selectedAlert}{' '}
                </Flex>

                <Flex gap="md">
                    <button onClick={() => setShowMassiveEditModal(true)} className='btn btn-primary'>
                        {t('edit')}
                    </button>
                </Flex>
            </Flex>
        )
    }
    );

    const handleSubmitEdit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formElements = e.currentTarget.elements;
        const statusNormal = (formElements.namedItem('statusNormal') as HTMLInputElement).checked;
        const frontendDisplayShow = (formElements.namedItem('frontendDisplayShow') as HTMLInputElement).checked;
        const isNew = (formElements.namedItem('new') as HTMLInputElement).checked;
        const hot = (formElements.namedItem('hot') as HTMLInputElement).checked;
        const promot = (formElements.namedItem('promot') as HTMLInputElement).checked;
        const allIcons = (formElements.namedItem('allIcons') as HTMLInputElement).checked;

        const icons = [];

        if (isNew) {
            icons.push(1);
        }
        if (hot) {
            icons.push(2);
        }
        if (promot) {
            icons.push(3);
        }
        if (allIcons) {
            icons.push(4);
        }
        if (icons.length === 0) {
            icons.push(0);
        }

        const formValues = {
            displayFrontend: frontendDisplayShow,
            status: statusNormal,
            icon: icons
        };

        const fetchURL = new URL(`container/games/api/v1/games/${game?._id}/update`, baseUrl).toString();

        try {
            await axios.put(fetchURL, formValues, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setShowEditModal(false);
            refetch();
        } catch (error) {
            console.error('Error PUT:', error);
        }
    };

    const handleSubmitFilters = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formElements = e.currentTarget.elements;

        const selectField = (formElements.namedItem('selectField') as HTMLSelectElement).value;
        const inputSearch = (formElements.namedItem('inputSearch') as HTMLInputElement).value;
        const suppliers = (formElements.namedItem('3rdSuppliers') as HTMLSelectElement).value;
        const provider = (formElements.namedItem('provider') as HTMLSelectElement).value;
        const category = (formElements.namedItem('category') as HTMLSelectElement).value;
        const subCategory = (formElements.namedItem('subCategory') as HTMLSelectElement).value;

        const formValues = { selectField, inputSearch, suppliers, provider, category, subCategory };

        setFormValues(formValues);

        refetch();
    }

    const handleSubmitMassiveEdit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formElements = e.currentTarget.elements;
        const statusNormal = (formElements.namedItem('statusNormal') as HTMLInputElement).checked;
        const frontendDisplayShow = (formElements.namedItem('frontendDisplayShow') as HTMLInputElement).checked;
        const isNew = (formElements.namedItem('new') as HTMLInputElement).checked;
        const hot = (formElements.namedItem('hot') as HTMLInputElement).checked;
        const promot = (formElements.namedItem('promot') as HTMLInputElement).checked;
        const allIcons = (formElements.namedItem('allIcons') as HTMLInputElement).checked;

        const icons = [];

        if (isNew) {
            icons.push(1);
        }
        if (hot) {
            icons.push(2);
        }
        if (promot) {
            icons.push(3);
        }
        if (allIcons) {
            icons.push(4);
        }
        if (icons.length === 0) {
            icons.push(0);
        }

        const updateEndpoints = [
            {
                url: `container/games/api/v1/games/massive-update/status`,
                data: { ids: Object.keys(rowSelection), status: statusNormal }
            },
            {
                url: `container/games/api/v1/games/massive-update/display-frontend`,
                data: { ids: Object.keys(rowSelection), status: frontendDisplayShow }
            },
            {
                url: `container/games/api/v1/games/massive-update/icons`,
                data: { ids: Object.keys(rowSelection), icon: icons }
            }
        ];

        try {
            await Promise.all(updateEndpoints.map(async (endpoint) => {
                const url = new URL(endpoint.url, baseUrl).toString();
                await axios.put(url, endpoint.data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }));
            setShowMassiveEditModal(false);
            refetch();
        } catch (error) {
            console.error('Error PUT:', error);
        }
    }

    const handleSubmitSortGame = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formElements = e.currentTarget.elements;
        const newPosition = (formElements.namedItem('newPosition') as HTMLInputElement).value;

        const formValues = {
            order: Number(newPosition),
            gameId: game?._id
        }

        const fetchURL = new URL(`container/games/api/v1/games/order`, baseUrl).toString();

        try {
            await axios.put(fetchURL, formValues, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setShowSortModal(false);
            refetch();
        } catch (error) {
            console.error('Error PUT:', error);
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <>
                    {data ? (
                        <>
                            <FilterOthersGames handleSubmit={handleSubmitFilters} />
                            <MantineReactTable table={table} />
                            {/* <Example /> */}
                        </>
                    ) : (
                        <span className='font-bold text-red-500 mt-8 m-auto'>{t('errorToLoading')}</span>
                    )}
                </>
            )}

            {showEditModal && game && <ModalOthersGamesEdit showModal={showEditModal} handleModal={setShowEditModal} game={game} onSubmit={handleSubmitEdit} />}
            {showMassiveEditModal && rowSelection && <ModalOthersGamesMassiveEdit showModal={showMassiveEditModal} handleModal={setShowMassiveEditModal} onSubmit={handleSubmitMassiveEdit} />}
            {showSortModal && game && <ModalOthersGamesSort showModal={showSortModal} handleModal={setShowSortModal} game={game} onSubmit={handleSubmitSortGame} />}
        </div>
    );
}
