'use client';
import React, { Fragment } from 'react';
import { getTranslation } from '@/i18n';
import { Dialog, Tab, Transition } from '@headlessui/react';
import { IconX } from '@tabler/icons-react';
import UserInformation from './user-information';
import TapsGroup from './taps-group';
import { useGetMemberById } from '@/hooks/useGetMember';
import CustomLoader from '../../loader/custom-loader';
import { User } from '@/types/usersService.types';

interface Props {
    showModal: boolean;
    handleModal: React.Dispatch<React.SetStateAction<boolean>>;
    user: any;
}

export default function ModalUserAccount({ showModal, handleModal, user }: Props) {
    const { t } = getTranslation();
    const { data } = useGetMemberById(user._id);

    if (!data) return <CustomLoader />;

    return (
        <Dialog as="div" open={showModal} onClose={handleModal} className="fixed inset-0 z-[100] flex min-h-screen items-start justify-center overflow-y-auto bg-black/60 p-8 backdrop-blur-md">
            <main className="w-10/12 rounded-lg bg-[#fbfbfb] dark:bg-[#121c2c] ">
                <header className="flex justify-between border-b border-gray-300 p-4">
                    <h2 className="text-lg font-medium">{t('memberInformation')}</h2>
                    <button
                        onClick={() => handleModal(false)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-gray-600 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600"
                    >
                        <IconX />
                    </button>
                </header>

                <section className="mb-5 h-[70rem] px-10">
                    <UserInformation member={data} />
                    <TapsGroup member={data} />
                </section>
            </main>
        </Dialog>
    );
}
