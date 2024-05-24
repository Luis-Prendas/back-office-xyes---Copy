'use client';
import React, { FormEventHandler, useState } from 'react';
import { getTranslation } from '@/i18n';
import { Dialog } from '@headlessui/react';
import { IconCircleX, IconPencil, IconX } from '@tabler/icons-react';
import { OthersGamesData } from '@/types/others-games-types';
import Image from 'next/image';

interface Props {
    showModal: boolean
    handleModal: any
    game: OthersGamesData
    onSubmit: FormEventHandler<HTMLFormElement>
}

export default function ModalOthersGamesSort({ showModal, handleModal, game, onSubmit }: Props) {
    const { t } = getTranslation();

    return (
        <Dialog
            as="div"
            open={showModal}
            onClose={() => handleModal(false)}
            className="fixed inset-0 z-[100] overflow-y-auto backdrop-blur-md bg-black/60 p-8 flex items-center justify-center min-h-screen"
        >
            <form onSubmit={onSubmit} className="bg-white rounded-lg w-[700px]">
                <header className="border-b border-gray-300 p-4 flex justify-between items-center">
                    <h2 className="text-lg font-medium">{t('gameSettings')}</h2>
                    <button
                        onClick={() => handleModal(false)}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-800 dark:hover:text-gray-600"
                    >
                        <IconX />
                    </button>
                </header>

                <section className="w-full p-4 flex flex-col gap-4 justify-center items-center">
                    <div className='font-bold text-lg p-8 rounded-xl bg-yellow-200 text-yellow-700'>
                        <span>*{t('theCurrentPositionOfThisGameIs')}: {Math.floor(game.order)}*</span>
                    </div>
                    <fieldset className='flex justify-center items-center gap-2'>
                        <label className='text-lg text-nowrap' htmlFor='newPosition'>{t('newPosition')}:</label>
                        <input className='form-input' placeholder='10...' type="number" min={1} required name='newPosition' id='newPosition' />
                    </fieldset>
                </section>

                <footer className="border-b border-gray-300 p-4 flex justify-end items-center gap-4">
                    <button className='btn btn-primary flex justify-center items-center gap-2' type='submit'>{t('edit')}<IconPencil /></button>
                    <button className='btn btn-primary flex justify-center items-center gap-2' onClick={() => handleModal(false)}>{t('cancel')}<IconCircleX /></button>
                </footer>
            </form>
        </Dialog>
    );
}
