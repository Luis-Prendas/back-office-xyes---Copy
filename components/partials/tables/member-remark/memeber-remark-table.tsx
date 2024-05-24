'use client';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useMemo, useState } from 'react';
import { MantineReactTable, type MRT_ColumnDef, type MRT_Row, type MRT_TableOptions, useMantineReactTable } from 'mantine-react-table';
import { ActionIcon, Button, Flex, Text, Tooltip } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { keepPreviousData, QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTranslation } from '@/i18n';
import { createNewCommentMemberRemark } from '@/services/memberListService';
import { getEnviroment } from '@/services/getEnviroment';
import { showMessage } from '@/components/Utils';
import Moment from 'react-moment';
import { queryClient } from '@/components/layouts/provider-component';
import { User } from '@/services/transactionsService.types';
import { useGetmemberRemarkById } from '@/hooks/useGetMemberRemark';
import { useAppSelector } from '@/store';

type Props = {
    userData: any;
};

type MemberRecordData = {
    id?: any;
    _id: string;
    no?: any;
    beforeValue: string;
    afterValue: string;
    operator: OperatorType;
    userId: string;
    processTime: string;
    createdAt: string;
    updatedAt: string;
    operation?: string;
    actions?: any;
    __v?: number;
};

type OperatorType = {
    _id: string;
    username: string;
};

const MemberRemarkTable = ({ userData }: Props) => {
    const userInfo = useAppSelector((state) => state.userInfo);
    const { t } = getTranslation();
    const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

    const [showInput, setShowInput] = useState<boolean>(false);

    const [inputData, setInputData] = useState<string>('');

    const mutationAddNewComent = useMutation({
        mutationKey: ['member-remark-add-new-comment'],
        mutationFn: (data: any) => createNewCommentMemberRemark(data),
    });

    //call READ hook
    const { data: fetchedUsers, isError: isLoadingUsersError, isFetching: isFetchingUsers, isLoading: isLoadingUsers, refetch } = useGetmemberRemarkById(userData._id);

    const handleShowOrHideEvent = async (showTextorNot: boolean) => {
        setShowInput((showTextorNot) => !showTextorNot);
    };

    const saveComment = async () => {
        const data = {
            operator: userInfo._id, //(usuario actual)
            userId: userData._id,
            value: inputData,
        };
        const test = await mutationAddNewComent.mutateAsync(data);
        if (test.data.success) {
            refetch();
        } else {
            showMessage(t(test.data.message), 'error');
        }
    };

    const openDeleteConfirmModal = (row: MRT_Row<MemberRecordData>) => {
        console.log(row);
    };

    const columns = useMemo<MRT_ColumnDef<MemberRecordData>[]>(
        () => [
            {
                accessorKey: 'beforeValue',
                header: t('beforeValue'),
                enableEditing: false,
                size: 80,
            },
            {
                accessorKey: 'afterValue',
                header: t('afterValue'),
                enableEditing: false,
            },
            {
                accessorKey: 'operator.username',
                header: t('operator'),
                enableEditing: false,
            },
            {
                accessorFn: (row) => (
                    <>
                        <div>
                            <Moment format="YYYY-MM-DD H:mm:ss">{row.processTime}</Moment>
                        </div>
                    </>
                ),
                accessorKey: 'processTime',
                header: t('processTime'),
                enableEditing: false,
            },
            {
                accessorFn: (row) => (
                    <>
                        <div>
                            <Moment format="YYYY-MM-DD H:mm:ss">{row.updatedAt}</Moment>
                        </div>
                    </>
                ),
                accessorKey: 'updatedAt',
                header: t('updatedAt'),
                enableEditing: false,
            },
        ],
        [validationErrors]
    );

    const fetchedData = fetchedUsers ? fetchedUsers.memberRemark : [];

    const table = useMantineReactTable({
        columns,
        data: fetchedData,
        createDisplayMode: 'row', // ('modal', and 'custom' are also available)
        editDisplayMode: 'cell', // ('modal', 'row', 'table', and 'custom' are also available)
        enableEditing: true,
        enableRowActions: true,
        enableGlobalFilter: false,
        enableFilters: false,
        enableColumnPinning: false,
        enableDensityToggle: false,
        enableFullScreenToggle: false,
        enableColumnFilterModes: false,
        enableColumnActions: false,
        enableHiding: false,
        enableSorting: false,
        positionActionsColumn: 'last',
        mantineTableHeadCellProps: {
            align: 'center',
        },
        mantineTableBodyCellProps: {
            align: 'center',
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
        getRowId: (row) => row._id,
        mantineToolbarAlertBannerProps: isLoadingUsersError
            ? {
                  color: 'red',
                  children: 'Error loading data',
              }
            : undefined,
        mantineTableContainerProps: {
            style: {
                minHeight: '500px',
            },
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        renderRowActions: ({ row }) => (
            <Tooltip label="Delete">
                <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
                    <IconTrash />
                </ActionIcon>
            </Tooltip>
        ),
        renderBottomToolbarCustomActions: () => (
            <Flex align="center" gap="md">
                {Object.values(validationErrors).some((error) => !!error) && <Text color="red">Fix errors before submitting</Text>}
            </Flex>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <div className="flex justify-end">
                <button onClick={() => handleShowOrHideEvent(showInput)} className="btn btn-info mx-3">
                    New Comment
                </button>
                {showInput ? (
                    <div className="flex">
                        <input type="text" placeholder={t('New comment')} className="peer form-input" value={inputData} onChange={(e) => setInputData(e.target.value)} />
                        <button onClick={() => saveComment()} className="btn btn-primary mx-3">
                            Save
                        </button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        ),
        mantineTopToolbarProps: {
            style: {
                justifyContent: 'space-between',
            },
        },
        state: {
            isLoading: isLoadingUsers,
            //isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
            showAlertBanner: isLoadingUsersError,
            showProgressBars: isFetchingUsers,
        },
    });

    return <MantineReactTable table={table} />;
};

export default MemberRemarkTable;

const validateRequired = (value: string) => !!value?.length;
const validateEmail = (email: string) =>
    !!email.length &&
    email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

function validateUser(user: any) {
    return {
        firstName: !validateRequired(user.username) ? 'First Name is Required' : '',
        lastName: !validateRequired(user.memberUsername) ? 'Last Name is Required' : '',
        email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
    };
}
