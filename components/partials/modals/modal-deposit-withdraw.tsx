'use client';
import IconX from '@/components/icon/icon-x';
import { getTranslation } from '@/i18n';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getDepositWithdrawByUserId } from '@/services/memberListService';
import { ResponseBase } from '@/types/baseTypes';
import TableDepositWithdraw from '../tables/transaction-record/table-transaction-record';
import { showMessage } from '@/components/Utils';
import { getEnviroment } from '@/services/getEnviroment';
import { queryClient } from '@/components/layouts/provider-component';
import FilterDepositWithdraw from '../filters/transaction-record/filter-deposit-withdraw';
import CustomLoader from '../loader/custom-loader';

type inputData = {
    showModal: any;
    handleModal: any;
    user: any;
};

let cleanforce: boolean = false;

const ModalDepositWithdraw = ({ showModal, handleModal, user }: inputData) => {
    const authBaseUrl = getEnviroment();
    const { t } = getTranslation();

    const fetchURL = new URL(`container/wallets/api/v1/get-transactions-detail-by-user/${user._id}`, authBaseUrl);
    const { data, isLoading, error } = useQuery({
        queryKey: ['depositWithdraw', fetchURL.href],
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
                                        <div className="bg-[#fbfbfb] py-3 text-lg font-medium dark:bg-[#121c2c] ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5">{t('depositWithdraw')}</div>
                                        <div className="p-5">
                                            {isLoading ? (
                                                <CustomLoader />
                                            ) : (
                                                <>
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
                                                        <form>
                                                            <div className="grid grid-cols-1 gap-5">
                                                                <div className="flex items-center justify-between gap-4">
                                                                    <div className="flex content-center">
                                                                        <label className="mb-0 ml-2" htmlFor="description">
                                                                            {t('fiatBalance')}
                                                                        </label>
                                                                    </div>
                                                                    <input
                                                                        id={'fiatBalance'}
                                                                        type="text"
                                                                        placeholder={t('fiatBalance')}
                                                                        className="form-input w-48"
                                                                        value={data.data ? data.data.totals.fiatBalance : 0}
                                                                        disabled={true}
                                                                    />
                                                                </div>

                                                                <div className="flex items-center justify-between gap-4">
                                                                    <div className="flex content-center">
                                                                        <label className="mb-0 ml-2" htmlFor="description">
                                                                            {t('First deposit Time')}
                                                                        </label>
                                                                    </div>
                                                                    <input
                                                                        id={'First Deposit Time'}
                                                                        type="text"
                                                                        placeholder={t('First Deposit Time')}
                                                                        className="form-input w-48"
                                                                        value={data.data ? data.data.totals.deposit.first.time : 0}
                                                                        disabled={true}
                                                                    />
                                                                </div>

                                                                <div className="flex items-center justify-between gap-4">
                                                                    <div className="flex content-center">
                                                                        <label className="mb-0 ml-2" htmlFor="description">
                                                                            {t('Desposit time(s)')}
                                                                        </label>
                                                                    </div>
                                                                    <input
                                                                        id={'Desposit time(s)'}
                                                                        type="text"
                                                                        placeholder={t('Desposit time(s)')}
                                                                        className="form-input w-48"
                                                                        value={data.data ? data.data.totals.deposit.times : 0}
                                                                        disabled={true}
                                                                    />
                                                                </div>

                                                                <div className="flex items-center justify-between gap-4">
                                                                    <div className="flex content-center">
                                                                        <label className="mb-0 ml-2" htmlFor="description">
                                                                            {t('Desposit amount')}
                                                                        </label>
                                                                    </div>
                                                                    <input
                                                                        id={'Desposit amount'}
                                                                        type="text"
                                                                        placeholder={t('Desposit amount')}
                                                                        className="form-input w-48"
                                                                        value={data.data ? data.data.totals.deposit.totalAmount : 0}
                                                                        disabled={true}
                                                                    />
                                                                </div>

                                                                <div className="flex items-center justify-between gap-4">
                                                                    <div className="flex content-center">
                                                                        <label className="mb-0 ml-2" htmlFor="description">
                                                                            {t('Last deposit Time')}
                                                                        </label>
                                                                    </div>
                                                                    <input
                                                                        id={'Last deposit Time'}
                                                                        type="text"
                                                                        placeholder={t('Last deposit Time')}
                                                                        className="form-input w-48"
                                                                        value={data.data ? data.data.totals.deposit.last.time : 0}
                                                                        disabled={true}
                                                                    />
                                                                </div>

                                                                <div className="flex items-center justify-between gap-4">
                                                                    <div className="flex content-center">
                                                                        <label className="mb-0 ml-2" htmlFor="description">
                                                                            {t('First withdraw Time')}
                                                                        </label>
                                                                    </div>
                                                                    <input
                                                                        id={'First withdraw Time'}
                                                                        type="text"
                                                                        placeholder={t('First withdraw Time')}
                                                                        className="form-input w-48"
                                                                        value={data.data ? data.data.totals.withdraw.first.time : 0}
                                                                        disabled={true}
                                                                    />
                                                                </div>

                                                                <div className="flex items-center justify-between gap-4">
                                                                    <div className="flex content-center">
                                                                        <label className="mb-0 ml-2" htmlFor="description">
                                                                            {t('Withdraw time(s)')}
                                                                        </label>
                                                                    </div>
                                                                    <input
                                                                        id={'Withdraw time(s)'}
                                                                        type="text"
                                                                        placeholder={t('Withdraw time(s)')}
                                                                        className="form-input w-48"
                                                                        value={data.data ? data.data.totals.withdraw.times : 0}
                                                                        disabled={true}
                                                                    />
                                                                </div>

                                                                <div className="flex items-center justify-between gap-4">
                                                                    <div className="flex content-center">
                                                                        <label className="mb-0 ml-2" htmlFor="description">
                                                                            {t('Last withdraw')}
                                                                        </label>
                                                                    </div>
                                                                    <input
                                                                        id={'Last withdraw'}
                                                                        type="text"
                                                                        placeholder={t('Last withdraw')}
                                                                        className="form-input w-48"
                                                                        value={data.data ? data.data.totals.withdraw.last.time : 0}
                                                                        disabled={true}
                                                                    />
                                                                </div>

                                                                <div className="flex items-center justify-between gap-4">
                                                                    <div className="flex content-center">
                                                                        <label className="mb-0 ml-2" htmlFor="description">
                                                                            {t('Withdraw amount')}
                                                                        </label>
                                                                    </div>
                                                                    <input
                                                                        id={'Withdraw amount'}
                                                                        type="text"
                                                                        placeholder={t('Withdraw amount')}
                                                                        className="form-input w-48"
                                                                        value={data.data ? data.data.totals.withdraw.totalAmount : 0}
                                                                        disabled={true}
                                                                    />
                                                                </div>

                                                                <div className="flex items-center justify-between gap-4">
                                                                    <div className="flex content-center">
                                                                        <label className="mb-0 ml-2" htmlFor="description">
                                                                            {t('Tips')}
                                                                        </label>
                                                                    </div>
                                                                    <input
                                                                        id={'Tips'}
                                                                        type="text"
                                                                        placeholder={t('Tips')}
                                                                        className="form-input w-48"
                                                                        value={data.data ? data.data.totals.tips : 0}
                                                                        disabled={true}
                                                                    />
                                                                </div>

                                                                <div className="flex items-center justify-between gap-4">
                                                                    <div className="flex content-center">
                                                                        <label className="mb-0 ml-2" htmlFor="description">
                                                                            {t('Coin Draps')}
                                                                        </label>
                                                                    </div>
                                                                    <input
                                                                        id={'Coin Draps'}
                                                                        type="text"
                                                                        placeholder={t('Coin Draps')}
                                                                        className="form-input w-48"
                                                                        value={data.data ? data.data.totals.coinDraps : 0}
                                                                        disabled={true}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="mt-8 flex items-center justify-end">
                                                                <button type="button" className="btn btn-outline-danger" onClick={() => handleModal(false)}>
                                                                    {t('close')}
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
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

export default ModalDepositWithdraw;
