import CustomLoader from "@/components/partials/loader/custom-loader";
import ModalRegionListAdd from "@/components/partials/modals/global-settings/region-list/modal-region-list-add";
import ModalRegionListEdit from "@/components/partials/modals/global-settings/region-list/modal-region-list-edit";
import { useGetRegionListEnabled } from "@/hooks/useGetRegionList";
import { getTranslation } from "@/i18n";
import { getEnviroment } from "@/services/getEnviroment";
import { GlobalRegion } from "@/types/region-list-enabled";
import { IconFlag, IconXboxX } from "@tabler/icons-react";
import axios from "axios";
import { MRT_ColumnDef, MantineReactTable, useMantineReactTable } from "mantine-react-table";
import Image from "next/image";
import { FormEvent, useState } from "react";

export default function TableRegionListEnabled() {
    const { t } = getTranslation();
    const baseUrl = getEnviroment();
    const { data, isLoading, refetch } = useGetRegionListEnabled()

    const [showModalEdit, setShowModalEdit] = useState<boolean>(false)
    const [rowSelected, setRowSelected] = useState<GlobalRegion | null>()

    const selectedRow = (row: GlobalRegion) => {
        setRowSelected(row)
        setShowModalEdit(true)
    }

    const columns: MRT_ColumnDef<GlobalRegion>[] = [
        {
            Header: <span className='text-wrap'>{t('no')}</span>,
            id: 'No',
            header: t('no'),
            Cell: ({ row }) => row.index + 1,
        },
        {
            header: t('countryOrRegion'),
            accessorKey: 'countryOrRegion'
        },
        {
            header: t('regionCodes'),
            accessorKey: 'regionCode'
        },
        {
            header: t('flag'),
            accessorFn: (row) => (
                <div className="flex justify-center items-center">
                    {row.flag ? <Image alt={`Flag of ${row.countryOrRegion}`} src={row.flagURL} width={50} height={50} /> : <IconFlag />}
                </div>
            )
        },
        {
            header: t('currencyName'),
            accessorKey: 'currencyName'
        },
        {
            header: t('currencyCode'),
            accessorKey: 'currencyCode'
        },
        {
            header: t('sorted'),
            accessorKey: 'sorted'
        },
        {
            header: t('operation'),
            accessorFn: (row) => (
                <div className="flex gap-2 justify-center items-center">
                    <button onClick={() => selectedRow(row)} className="btn btn-primary px-2 py-1">{t('edit')}</button>
                    <button className="btn btn-primary px-2 py-1">{t('disable')}</button>
                </div>
            )
        },
    ]

    const table = useMantineReactTable({
        data: data ? data.globalRegionList : [],
        columns,
        enableSorting: false,
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

    const handleSubmitEdit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formElements = e.currentTarget.elements;

        const countryOrRegion = (formElements.namedItem('countryOrRegion') as HTMLInputElement).value;
        const regionCode = (formElements.namedItem('regionCode') as HTMLInputElement).value;
        const flagURL = (formElements.namedItem('flagURL') as HTMLInputElement).value;
        const currencyName = (formElements.namedItem('currencyName') as HTMLInputElement).value;
        const sorted = (formElements.namedItem('sorted') as HTMLInputElement).value;
        const currencyCode = (formElements.namedItem('currencyCode') as HTMLInputElement).value;

        const formValues = { countryOrRegion, regionCode, flagURL, currencyName, sorted, flag: true, id: rowSelected?._id, disable: false, currencyCode }

        const fetchURL = new URL(`container/config/api/v1/updateGlobalRegionList`, baseUrl).toString();

        try {
            await axios.put(fetchURL, formValues, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setShowModalEdit(false);
            refetch();
        } catch (error) {
            console.error('Error PUT:', error);
        }
    }

    return (
        <div className='flex flex-col gap-4 p-4'>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <>
                    {data ? (
                        <MantineReactTable table={table} />
                    ) : (
                        <span className='font-bold text-red-500 mt-8 m-auto'>{t('errorToLoading')}</span>
                    )}
                </>
            )}
            {showModalEdit && rowSelected && (
                <ModalRegionListEdit handleModal={setShowModalEdit} showModal={showModalEdit} row={rowSelected} onSubmit={handleSubmitEdit} />
            )}
        </div>
    )
}