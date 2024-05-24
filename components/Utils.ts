import Swal from 'sweetalert2';
const { t, i18n } = getTranslation();


export const showMessage = (msg = '', type = 'success') => {
    const toast: any = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 5000,
        customClass: { container: 'toast' },
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '10px 20px',
    });
};

export const currencyFormat = (num: any) => {
    if (num === null || num === undefined || isNaN(num)) {
        return ''; // or return some default value, e.g., '0.00'
    }

    // Convert num to a number
    const number = Number(num);

    // Format the number
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const removeHtmlTags = (html: string) => {
    let result: string = '';
    if (typeof html == 'string') {
        const regex = /(<([^>]+)>)/gi;
        result = html.replace(regex, '');
    }
    return result;
};

import { MRT_Localization_EN } from 'mantine-react-table/locales/en/index.esm.mjs';
import { MRT_Localization_ES } from 'mantine-react-table/locales/es/index.esm.mjs';
import { MRT_ColumnDef, MRT_DensityState, useMantineReactTable } from 'mantine-react-table';
import { ModalProps } from '@/types/baseTypes';
import { divide } from 'lodash';
import { getTranslation } from '@/i18n';
import { Tooltip } from '@mantine/core';

export const getLocalizationLangs = (lang: string) => {
    switch (lang) {
        case 'en':
            return MRT_Localization_EN

        case 'es':
            return MRT_Localization_ES

        default:
            return MRT_Localization_EN
    }
}

export const formatearFechaHora = (fechaHoraString: string) => {
    const partes = fechaHoraString.split(/[T:+-]/);
    const fechaHoraObj = new Date(
        parseInt(partes[0]),
        parseInt(partes[1]) - 1,
        parseInt(partes[2]),
        parseInt(partes[3]),
        parseInt(partes[4]),
        parseInt(partes[5])
    );

    const dia = fechaHoraObj.getDate();
    const mes = fechaHoraObj.getMonth() + 1;
    const ano = fechaHoraObj.getFullYear();
    const horas = fechaHoraObj.getHours();
    const minutos = fechaHoraObj.getMinutes();
    const segundos = fechaHoraObj.getSeconds();

    const formatoFechaHora = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${ano} ${horas < 10 ? '0' : ''}${horas}:${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

    return formatoFechaHora;
};

type MantineColumnHeaderTable = {
    no?: string;
    name?: string;
    memberId?: string;
    partnerSite?: string;
    agent?: string;
    memberGrade?: string;
    vipLevel?: string;
    referralAccount?: string;
    memberCreditLevel?: string;
    depositWithdraw?: string;
    balance?: string;
    companyIncome?: string;
    memberBonus?: string;
    memberTags?: string;
    memberRemark?: string;
    ipLogs?: string;
    firstLoginLog?: string;
    lastLoginLog?: string;
    status?: string;
    actions?: any;
};

const columnHeaders: MantineColumnHeaderTable = {
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

export type Locale = keyof typeof columnHeaders;

export const isValidColumnKey = (key: string): key is Locale => {
    return key in columnHeaders;
}

interface TableProps {
    setPagination: any;
    pagination: any;
    data: any;
    columns: any;
    enableBottomToolbar: boolean;
    setColumnFilterFns: any;
    isLoadingUsers: boolean;
    showAlertBanner: boolean;
    showProgressBars: boolean;
}

export function getTableProps(
    setPagination: any,
    pagination: any,
    fetchedData: any,
    columns: any,
    enableBottomToolbar: boolean,
    isLoadingUsers: boolean,
    isLoadingUsersError: boolean,
    isFetchingUsers: boolean
): TableProps | any {
    return useMantineReactTable({
        data: fetchedData ? fetchedData : [],
        columns: columns,
        enableSorting: false,
        onPaginationChange: setPagination,
        enableColumnActions: false,
        enableTopToolbar: true,
        enableColumnPinning: true,
        mantineTableProps: {
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
        },
        defaultColumn: {
            size: 20,
        },
        initialState: {
            columnPinning: {
                left: ['No', 'user'],
            },
            showColumnFilters: false,
            showSkeletons: false,
            density: 'xs',
        },
        mantinePaginationProps: {
            rowsPerPageOptions: ['20', '50', '100', '200'],
        },
        mantineTableHeadCellProps: {
            align: 'center',
            cellPadding: 0,
            style: {
                whiteSpace: 'normal',
                textAlign: 'center',
            },
        },
        mantineTableBodyCellProps: {
            align: 'center',
            cellPadding: 0,
            style: {
                whiteSpace: 'normal',
                textAlign: 'center',
            },
        },
        enableBottomToolbar: enableBottomToolbar,
        mantineToolbarAlertBannerProps: isLoadingUsersError
            ? {
                color: 'red',
                children: 'Error loading data',
            }
            : undefined,
        state: {
            isLoading: isLoadingUsers,
            //isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
            showAlertBanner: isLoadingUsersError,
            showProgressBars: isFetchingUsers,
        },
    });


    // return useMantineReactTable({
    //     data: fetchedData,
    //     enableStickyHeader: true,
    //     enableColumnPinning: true,
    //     enableColumnFilterModes: false,
    //     enableColumnOrdering: false,
    //     enableEditing: false,
    //     enableRowActions: false,
    //     enableRowSelection: false, // deshabilita la opcion de checkbox
    //     enableSelectAll: false,
    //     enableColumnFilters: false,
    //     enableColumnActions: false,
    //     enableFilters: false,
    //     enableMultiSort: false,
    //     enableSorting: false,
    //     onColumnFilterFnsChange: setColumnFilterFns,
    //     onColumnFiltersChange: setColumnFilters,
    //     onGlobalFilterChange: setGlobalFilter,
    //     onPaginationChange: setPagination,
    //     onSortingChange: setSorting,
    //     rowCount: totalRowCount,
    //     columns: columns
    // })

}


type Props = {
    columns: any;
    columnHeaders: any;
    isValidColumnKey: any;
    fetchedUsers: any;
    t: any;
    refetch: any;
    totalRowCount: any;
    isError: any;
    setColumnFilterFns: any;
    setColumnFilters: any;
    setGlobalFilter: any;
    setPagination: any;
    setSorting: any;
    columnFilterFns: any;
    columnFilters: any;
    globalFilter: any;
    isLoading: any;
    isFetching: any;
    pagination: any;
    sorting: any;
    locale: any;
    renderTopToolbarCustomActions: any;
}

export const getTableConfig = ({
    columns,
    columnHeaders,
    isValidColumnKey,
    fetchedUsers,
    t,
    refetch,
    totalRowCount,
    isError,
    setColumnFilterFns,
    setColumnFilters,
    setGlobalFilter,
    setPagination,
    setSorting,
    columnFilterFns,
    columnFilters,
    globalFilter,
    isLoading,
    pagination,
    isFetching,
    sorting,
    renderTopToolbarCustomActions,
    locale }: Props) => {
    const density: MRT_DensityState = 'xs'; // Asegúrate de que esto es del tipo correcto

    return {
        columns: columns.map((column: any) => ({
            ...column,
            header: isValidColumnKey(column.accessorKey) ? columnHeaders[column.accessorKey] : column.accessorKey,
        })),
        data: fetchedUsers,
        enableStickyHeader: true,
        enableColumnPinning: true,
        enableColumnFilterModes: false,
        enableColumnOrdering: false,
        enableEditing: false,
        enableRowActions: false,
        enableRowSelection: false,
        enableSelectAll: false,
        enableColumnFilters: false,
        enableColumnActions: false,
        enableFilters: false,
        enableMultiSort: false,
        enableSorting: false,
        onColumnFilterFnsChange: setColumnFilterFns,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        renderTopToolbarCustomActions: renderTopToolbarCustomActions,
        rowCount: totalRowCount,
        mantineToolbarAlertBannerProps: isError
            ? {
                color: 'red',
                children: 'Error loading data',
            }
            : undefined,
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        mantineTableFooterProps: {
            style: {
                display: 'flex',
                justifyContent: 'left',
                background: 'blue',
            },
        },
        mantineTableHeadRowProps: {
            style: {
                whiteSpace: 'normal',
                background: 'blue',
            },
        },
        mantineTableHeadProps: {
            style: {
                whiteSpace: 'normal',
            },
        },
        mantineTableHeadCellProps: {
            align: 'center',
            cellPadding: 0,
            style: {
                whiteSpace: 'normal',
            },
        },
        mantineTableBodyCellProps: {
            align: 'center',
            cellPadding: '200px',
            style: {
                padding: 0,
                textAlign: 'center',
                lineHeight: '13px',
                width: '10px',
            },
        },
        mantineTableContainerProps: {
            cellPadding: '200px',
            style: { maxHeight: '61rem' },
        },
        positionPagination: 'bottom',
        state: {
            columnFilterFns,
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isFetching,
            sorting,
        },
        enableDensityToggle: false,
        initialState: {
            showColumnFilters: false,
            showGlobalFilter: true,
            showToolbarDropZone: false,
            columnPinning: {
                left: ['no', 'user'],
            },
            showSkeletons: false,
            density,
        },
        mantineTableProps: {
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
        },
        mantinePaginationProps: {
            rowsPerPageOptions: ['20', '50', '100', '200'],
        },
        localization: getLocalizationLangs(locale),
    }
}