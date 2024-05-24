'use client';
import IconX from '@/components/icon/icon-x';
import { getTranslation } from '@/i18n';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, forwardRef, useEffect, useRef, useState } from 'react';
import MemberRemarkTable from '../tables/member-remark/memeber-remark-table';
import { queryClient } from '@/components/layouts/provider-component';

type inputData = {
    showModal: any;
    handleModal: any;
    user: any;
};

const ModalMemberRemark = ({ showModal, handleModal, user }: inputData) => {
    const { t } = getTranslation();

    return (
        <Transition appear show={showModal} as={Fragment}>
            <Dialog
                as="div"
                open={showModal}
                onClose={(e) => {
                    handleModal(false);
                }}
                className="relative z-[250]"
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
                                        <div className="bg-[#fbfbfb] py-3 text-lg font-medium dark:bg-[#121c2c] ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5">{t('memberRemark')}</div>
                                        <div className="w-1/2 p-10">
                                            <div className="flex flex-row rounded-md border border-gray-500/20 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)]">
                                                <div className="relative h-full w-full basis-1/3 pr-3">
                                                    <div className="mx-auto my-3 h-28 w-28 rounded-full bg-dark p-1">
                                                        <img srcSet={user.avatar} className="w-full" />
                                                    </div>
                                                </div>
                                                <div className="flex basis-2/3 items-center justify-center">
                                                    <div className="block">
                                                        <span className="block text-center text-4xl font-black">{user.username}</span>
                                                        <span className="block text-center text-2xl font-black">
                                                            {user.name} {user.lastname}
                                                        </span>
                                                        <span className="block text-center">{user.memberId}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <MemberRemarkTable userData={user}></MemberRemarkTable>
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

export default ModalMemberRemark;
