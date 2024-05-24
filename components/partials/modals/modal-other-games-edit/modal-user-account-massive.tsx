'use client';
import React, { FormEventHandler, useState } from 'react';
import { getTranslation } from '@/i18n';
import { Dialog } from '@headlessui/react';
import { IconX } from '@tabler/icons-react';
import Image from 'next/image';
import { MRT_RowSelectionState } from 'mantine-react-table';

interface Props {
    showModal: boolean
    handleModal: any
    onSubmit: FormEventHandler<HTMLFormElement>
}

export default function ModalOthersGamesMassiveEdit({ showModal, handleModal, onSubmit }: Props) {
    const { t } = getTranslation();

    // Estado local para mantener el estado de los botones de radio
    const [status, setStatus] = useState<string>('');
    const [frontendDisplay, setFrontendDisplay] = useState<string>('');

    // Función para manejar el cambio en el botón de radio 'status'
    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setStatus(value);
    };

    // Función para manejar el cambio en el botón de radio 'frontendDisplay'
    const handleFrontendDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFrontendDisplay(value);
    };

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
                    <article className='flex w-full justify-center items-center gap-4'>
                        <span className='w-2/5 text-right'>{t('status')}</span>
                        <div className='w-3/5'>
                            <div className='w-full flex justify-start gap-4 items-center'>
                                <div className='flex justify-center items-center gap-2'>
                                    <input type="radio" id='statusNormal' name='statusNormal' value='normal' checked={status === 'normal'} onChange={handleStatusChange} />
                                    <label htmlFor="statusNormal">{t('normal')}</label>
                                </div>
                                <div className='flex justify-center items-center gap-2'>
                                    <input type="radio" id='statusOff' name='statusOff' value='off' checked={status === 'off'} onChange={handleStatusChange} />
                                    <label htmlFor="statusOff">{t('off')}</label>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article className='flex w-full justify-center items-center gap-4'>
                        <span className='w-2/5 text-right'>{t('frontendDisplay')}</span>
                        <div className='w-3/5'>
                            <div className='w-full flex justify-start gap-4 items-center'>
                                <div className='flex justify-center items-center gap-2'>
                                    <input type="radio" id='frontendDisplayShow' name='frontendDisplayShow' value='show' checked={frontendDisplay === 'show'} onChange={handleFrontendDisplayChange} />
                                    <label htmlFor="frontendDisplayShow">{t('show')}</label>
                                </div>
                                <div className='flex justify-center items-center gap-2'>
                                    <input type="radio" id='frontendDisplayHide' name='frontendDisplayHide' value='hide' checked={frontendDisplay === 'hide'} onChange={handleFrontendDisplayChange} />
                                    <label htmlFor="frontendDisplayHide">{t('hide')}</label>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article className='flex w-full justify-center items-center gap-4'>
                        <span className='w-2/5 text-right'>{t('gamePlatformIconSetting')}</span>
                        <div className='w-3/5 flex justify-around items-center'>
                            <fieldset className='flex gap-2 justify-center items-center'>
                                <input name='new' id='new' type="checkbox" />
                                <Image width={20} height={20} alt='new' src='https://cs.venaaa.com/image/icon_new_eng.png' />
                            </fieldset>
                            <span>/</span>
                            <fieldset className='flex gap-2 justify-center items-center'>
                                <input name='hot' id='hot' type="checkbox" />
                                <Image width={20} height={20} alt='hot' src='https://cs.venaaa.com/image/icon_hot.png' />
                            </fieldset>
                            <span>/</span>
                            <fieldset className='flex gap-2 justify-center items-center'>
                                <input name='promot' id='promot' type="checkbox" />
                                <Image width={20} height={20} alt='promot' src='https://cs.venaaa.com/image/icon_promot.png' />
                            </fieldset>
                            <span>/</span>
                            <fieldset className='flex gap-2 justify-center items-center'>
                                <input name='allIcons' id='allIcons' type="checkbox" />
                                <span>*</span>
                            </fieldset>
                        </div>
                    </article>
                </section>

                <footer className="border-b border-gray-300 p-4 flex justify-end items-center">
                    <button className='btn btn-primary' type='submit'>{t('edit')}</button>
                </footer>
            </form>
        </Dialog>
    );
}
