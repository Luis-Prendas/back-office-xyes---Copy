'use client';
import IconX from '@/components/icon/icon-x';
import { getTranslation } from '@/i18n';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useQuery } from '@tanstack/react-query';
import TableMemberBonus from '../tables/game-record/table-game-record';
import { showMessage } from '@/components/Utils';
import { getEnviroment } from '@/services/getEnviroment';
import { queryClient } from '@/components/layouts/provider-component';
import MemberBonusForm from '../forms/member-bonus-form';
import CustomLoader from '../loader/custom-loader';

type inputData = {
    showModal: any;
    handleModal: any;
    user: any;
};

let cleanforce: boolean = false;

const ModalMemberBonus = ({ showModal, handleModal, user }: inputData) => {
    const authBaseUrl = getEnviroment();
    const { t } = getTranslation();

    const fetchURL = new URL(`/container/auth/api/v1/membersList/${user._id}/member-bonus`, authBaseUrl);
    const { data, isLoading, error } = useQuery({
        queryKey: ['memberBonus', fetchURL.href],
        refetchOnWindowFocus: false,
        queryFn: () =>
            fetch(fetchURL.href)
                .then((res) => {
                    if (res.status === 400) {
                        showMessage(t('error_server'), 'error');
                    }
                    return res.json();
                })
                .catch((error) => {
                    console.log(error);
                    showMessage(t('error_server'), 'error');
                }),
        staleTime: 30_000, //don't refetch previously viewed pages until cache is more than 30 seconds old
    });

    return (
        <Transition appear show={showModal} as={Fragment}>
            <Dialog
                as="div"
                open={showModal}
                onClose={() => {
                    handleModal(false);
                }}
                className="relative z-50"
                static={true}
            >
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-[black]/60" />
                </Transition.Child>
                <div className="fixed inset-0 z-[999] bg-[black]/60">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="fixed inset-0 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4">
                                    <Dialog.Panel className="panel w-11/11 my-8 overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                queryClient.clear(); // Revisar query client
                                                handleModal(false);
                                            }}
                                            className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 dark:hover:text-gray-600 ltr:right-4 rtl:left-4"
                                        >
                                            <IconX />
                                        </button>
                                        {/* title */}
                                        <div className="bg-[#fbfbfb] py-3 text-lg font-medium dark:bg-[#121c2c] ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5">{t('memberBonus')}</div>
                                        <div className="w-100 p-5">
                                            <div className="flex flex-row items-center justify-center rounded-md border border-gray-500/20 p-10 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)]">
                                                <div className="flex basis-2/3">
                                                    <div className="block">
                                                        <span className="block text-center text-2xl font-black">
                                                            {user.name} {user.lastname}
                                                        </span>
                                                        <span className="block text-center">{user.memberId}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            {isLoading ? (
                                                <CustomLoader />
                                            ) : (
                                                <>
                                                    {/* <TableMemberBonus detailsData={params != undefined ? params.details : []} totalsData={params != undefined ? params.totals : []}></TableMemberBonus> */}
                                                    {/* <TableMemberBonus details={data.data.details} totals={data.data.totals}></TableMemberBonus> */}
                                                    <MemberBonusForm handleModal={handleModal} data={data} />
                                                </>
                                            )}
                                        </div>
                                    </Dialog.Panel>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ModalMemberBonus;
