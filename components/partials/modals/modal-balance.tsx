'use client';
import IconX from '@/components/icon/icon-x';
import { showMessage } from '@/components/Utils';
import { getTranslation } from '@/i18n';
import { getEnviroment } from '@/services/getEnviroment';
import { BalanceInfoData } from '@/types/memberListService.type';
import { Dialog, Transition } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { Fragment, forwardRef, useEffect, useRef, useState } from 'react';
import { balanceData } from '../tables/balance/balanceListData';
import CurrencyInput from '@/components/currency-input';
import CustomLoader from '../loader/custom-loader';

type inputData = {
    showModal: any;
    handleModal: any;
    user: any;
};

const ModalBalance = ({ showModal, handleModal, user }: inputData) => {
    const { t } = getTranslation();
    const authBaseUrl = getEnviroment();

    const [params, setParams] = useState<BalanceInfoData>(JSON.parse(JSON.stringify(balanceData)));

    const fetchURL = new URL(`/container/auth/api/v1/memberslist/${user._id}/balance`, authBaseUrl);
    const { data, isLoading, error } = useQuery({
        queryKey: ['balance', fetchURL.href],
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
    });

    return (
        <Transition appear show={showModal} as={Fragment}>
            <Dialog
                as="div"
                open={showModal}
                onClose={(e) => {
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
                                    <Dialog.Panel className="panel my-8 w-full max-w-5xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                        <button
                                            type="button"
                                            onClick={() => handleModal(false)}
                                            className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 dark:hover:text-gray-600 ltr:right-4 rtl:left-4"
                                        >
                                            <IconX />
                                        </button>
                                        {/* title */}
                                        <div className="bg-[#fbfbfb] py-3 text-lg font-medium dark:bg-[#121c2c] ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5">{t('balanceTotal')}</div>
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
                                                <form>
                                                    {data && data.data && (
                                                        <div className="flex gap-3">
                                                            <div className="mb-5">
                                                                <label htmlFor="title">{t('totalFiatValue')}</label>
                                                                <CurrencyInput curency={data.data.assets.totalFiatValue} placeholder={t('totalFiatValue')} id={t('totalFiatValue')} />
                                                            </div>
                                                            <div className="mb-5">
                                                                <label htmlFor="title">{t('totalCryptoValue')}</label>
                                                                <CurrencyInput curency={data.data.assets.totalCryptoValue} placeholder={t('totalCryptoValue')} id={t('totalCryptoValue')} />
                                                            </div>
                                                            <div className="mb-5">
                                                                <label htmlFor="title">{t('totalUSDValue')}</label>
                                                                <CurrencyInput curency={data.data.assets.totalUSDValue} placeholder={t('totalUSDValue')} id={t('totalUSDValue')} />
                                                            </div>
                                                            <div className="mb-5">
                                                                <label htmlFor="title">{t('totalUsdLockedValue')}</label>
                                                                <CurrencyInput curency={data.data.assets.totalUsdLockedValue} placeholder={t('totalUsdLockedValue')} id={t('totalUsdLockedValue')} />
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="grid grid-cols-1 gap-4 p-3">
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {data &&
                                                                data.data &&
                                                                data.data.assets.assets.map((item: any, index: any) => {
                                                                    return item.available > 0 ? (
                                                                        <div key={index} className="flex items-center justify-end gap-4">
                                                                            <div className="flex content-center">
                                                                                <label className="mb-0 ml-2 font-semibold" htmlFor="description">
                                                                                    {t(item.coinSymbol)}
                                                                                </label>
                                                                            </div>
                                                                            <div className="flex w-48">
                                                                                <CurrencyInput curency={item.available} placeholder={item.coinSymbol} id={item.coinId} />
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div key={index}></div>
                                                                    );
                                                                })}

                                                            {data &&
                                                                data.data &&
                                                                data.data.assets.assetsFIAT.map((item: any, index: any) => {
                                                                    return item.available > 0 ? (
                                                                        <div key={index} className="flex items-center justify-end gap-4">
                                                                            <div className="flex content-center">
                                                                                <label className="mb-0 ml-2 font-semibold" htmlFor="description">
                                                                                    {t(item.fiatSymbol)}
                                                                                </label>
                                                                            </div>
                                                                            <div className="flex w-48">
                                                                                <CurrencyInput curency={item.available} placeholder={item.fiatSymbol} id={item.fiatId} />
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div key={index}></div>
                                                                    );
                                                                })}
                                                        </div>
                                                    </div>
                                                    <div className="mt-8 flex items-center justify-end">
                                                        <button type="button" className="btn btn-outline-danger" onClick={() => handleModal(false)}>
                                                            {t('close')}
                                                        </button>
                                                        <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                            {t('update')}
                                                        </button>
                                                    </div>
                                                </form>
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

export default ModalBalance;
