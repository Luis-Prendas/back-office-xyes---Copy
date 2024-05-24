'use client';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)
import { useMemo, useState } from 'react';
import {
    MantineReactTable,
    // createRow,
    type MRT_ColumnDef,
    type MRT_Row,
    type MRT_TableOptions,
    useMantineReactTable,
} from 'mantine-react-table';
import { ActionIcon, Button, Flex, Text, Tooltip } from '@mantine/core';
// import { modals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons-react';
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type User, fakeData, usStates } from '@/components/constans';

const Example = () => {
    const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
    //keep track of rows that have been edited
    const [editedUsers, setEditedUsers] = useState<Record<string, User>>({});

    const [showTextorNot, setShowTextorNot] = useState<boolean>(false);

    //call CREATE hook
    const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();
    //call READ hook
    const { data: fetchedUsers = [], isError: isLoadingUsersError, isFetching: isFetchingUsers, isLoading: isLoadingUsers } = useGetUsers();
    //call UPDATE hook
    const { mutateAsync: updateUsers, isPending: isUpdatingUser } = useUpdateUsers();
    //call DELETE hook
    const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteUser();

    //CREATE action
    const handleCreateUser: MRT_TableOptions<User>['onCreatingRowSave'] = async ({ values, exitCreatingMode }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => !!error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createUser(values);
        exitCreatingMode();
    };

    const handleShowOrHideEvent = async (showTextorNot: boolean) => {
        setShowTextorNot((showTextorNot) => !showTextorNot);

        console.log(showTextorNot);
        //  if (Object.values(validationErrors).some((error) => !!error)) return;
        //  debugger;
        //  await updateUsers(Object.values(editedUsers));
        //  setEditedUsers({});
    };

    //UPDATE action
    const handleSaveUsers = async () => {
        if (Object.values(validationErrors).some((error) => !!error)) return;
        debugger;
        await updateUsers(Object.values(editedUsers));
        setEditedUsers({});
    };

    //DELETE action
    // const openDeleteConfirmModal = (row: MRT_Row<User>) =>
    //     modals.openConfirmModal({
    //         title: 'Are you sure you want to delete this user?',
    //         children: (
    //             <Text>
    //                 Are you sure you want to delete {row.original.firstName} {row.original.lastName}? This action cannot be undone.
    //             </Text>
    //         ),
    //         labels: { confirm: 'Delete', cancel: 'Cancel' },
    //         confirmProps: { color: 'red' },
    //         onConfirm: () => deleteUser(row.original.id),
    //     });
    const openDeleteConfirmModal = (row: MRT_Row<User>) => {
        console.log(row);
    };

    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
                enableEditing: false,
                size: 80,
            },
            {
                accessorKey: showTextorNot ? 'firstName' : 'lastName',
                header: showTextorNot ? 'First Name' : 'Last Name',
                mantineEditTextInputProps: ({ cell, row }) => ({
                    type: 'text',
                    required: true,
                    error: validationErrors?.[cell.id],
                    //store edited user in state to be saved later
                    onBlur: (event) => {
                        const validationError = !validateRequired(event.currentTarget.value) ? 'Required' : undefined;
                        setValidationErrors({
                            ...validationErrors,
                            [cell.id]: validationError,
                        });
                        setEditedUsers({ ...editedUsers, [row.id]: row.original });
                    },
                }),
            },
            {
                accessorKey: showTextorNot ? 'lastName' : 'firstName',
                header: 'Last Name',
                mantineEditTextInputProps: ({ cell, row }) => ({
                    type: 'text',
                    required: true,
                    error: validationErrors?.[cell.id],
                    //store edited user in state to be saved later
                    onBlur: (event) => {
                        const validationError = !validateRequired(event.currentTarget.value) ? 'Required' : undefined;
                        setValidationErrors({
                            ...validationErrors,
                            [cell.id]: validationError,
                        });
                        setEditedUsers({ ...editedUsers, [row.id]: row.original });
                    },
                }),
            },
            {
                accessorKey: 'email',
                header: 'Email',
                mantineEditTextInputProps: ({ cell, row }) => ({
                    type: 'email',
                    required: true,
                    error: validationErrors?.[cell.id],
                    //store edited user in state to be saved later
                    onBlur: (event) => {
                        const validationError = !validateEmail(event.currentTarget.value) ? 'Invalid Email' : undefined;
                        setValidationErrors({
                            ...validationErrors,
                            [cell.id]: validationError,
                        });
                        setEditedUsers({ ...editedUsers, [row.id]: row.original });
                    },
                }),
            },
            {
                accessorKey: 'state',
                header: 'State',
                editVariant: 'select',
                mantineEditSelectProps: ({ row }) => ({
                    data: usStates,
                    //store edited user in state to be saved later
                    onChange: (value: any) =>
                        setEditedUsers({
                            ...editedUsers,
                            [row.id]: { ...row.original, state: value },
                        }),
                }),
            },
        ],
        [editedUsers, validationErrors]
    );

    const table = useMantineReactTable({
        columns,
        data: fetchedUsers,
        createDisplayMode: 'row', // ('modal', and 'custom' are also available)
        editDisplayMode: 'cell', // ('modal', 'row', 'table', and 'custom' are also available)
        enableEditing: true,
        enableRowActions: true,
        positionActionsColumn: 'last',
        getRowId: (row) => row.id,
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

        onCreatingRowSave: handleCreateUser,
        renderRowActions: ({ row }) => (
            <Tooltip label="Delete">
                <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
                    <IconTrash />
                </ActionIcon>
            </Tooltip>
        ),
        renderBottomToolbarCustomActions: () => (
            <Flex align="center" gap="md">
                <Button color="blue" onClick={handleSaveUsers} disabled={Object.keys(editedUsers).length === 0 || Object.values(validationErrors).some((error) => !!error)} loading={isUpdatingUser}>
                    Save
                </Button>
                {Object.values(validationErrors).some((error) => !!error) && <Text color="red">Fix errors before submitting</Text>}
            </Flex>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <div className="flex">
                <button
                    onClick={() => {
                        table.setCreatingRow(true); //simplest way to open the create row modal with no default values
                        //or you can pass in a row object to set default values with the `createRow` helper function
                        // table.setCreatingRow(
                        //   createRow(table, {
                        //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
                        //   }),
                        // );
                    }}
                    className="btn btn-primary mx-3"
                >
                    Create New User
                </button>

                <button
                    onClick={() => {
                        handleShowOrHideEvent(showTextorNot);
                    }}
                    className="btn btn-success mx-3"
                >
                    Show or hide event
                </button>
            </div>
        ),
        state: {
            isLoading: isLoadingUsers,
            isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
            showAlertBanner: isLoadingUsersError,
            showProgressBars: isFetchingUsers,
        },
    });

    return <MantineReactTable table={table} />;
};

//CREATE hook (post new user to api)
function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user: User) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newUserInfo: User) => {
            queryClient.setQueryData(
                ['users'],
                (prevUsers: any) =>
                    [
                        ...prevUsers,
                        {
                            ...newUserInfo,
                            id: (Math.random() + 1).toString(36).substring(7),
                        },
                    ] as User[]
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

//READ hook (get users from api)
function useGetUsers() {
    return useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => {
            //send api request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve(fakeData);
        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put users in api)
function useUpdateUsers() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (users: User[]) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newUsers: User[]) => {
            queryClient.setQueryData(['users'], (prevUsers: any) =>
                prevUsers?.map((user: User) => {
                    const newUser = newUsers.find((u) => u.id === user.id);
                    return newUser ? newUser : user;
                })
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userId: string) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (userId: string) => {
            queryClient.setQueryData(['users'], (prevUsers: any) => prevUsers?.filter((user: User) => user.id !== userId));
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

const ExampleWithProviders = () => (
    //Put this with your other react-query providers near root of your app
    <Example />
);

export default ExampleWithProviders;

const validateRequired = (value: string) => !!value?.length;
const validateEmail = (email: string) =>
    !!email.length &&
    email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

function validateUser(user: User) {
    return {
        firstName: !validateRequired(user.firstName) ? 'First Name is Required' : '',
        lastName: !validateRequired(user.lastName) ? 'Last Name is Required' : '',
        email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
    };
}
