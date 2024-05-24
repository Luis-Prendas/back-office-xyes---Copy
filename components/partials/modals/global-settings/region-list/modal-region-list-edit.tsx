import { getTranslation } from "@/i18n";
import { GlobalRegion } from "@/types/region-list-enabled";
import { Dialog } from "@headlessui/react";
import { IconX } from "@tabler/icons-react";
import { FormEventHandler } from "react";

interface Props {
    showModal: boolean
    handleModal: any
    row: GlobalRegion
    onSubmit: FormEventHandler<HTMLFormElement>
}

export default function ModalRegionListEdit({ showModal, handleModal, row, onSubmit }: Props) {
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
                    <h2 className="text-lg font-medium">{t('editRegion')}</h2>
                    <button
                        onClick={() => handleModal(false)}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-800 dark:hover:text-gray-600"
                    >
                        <IconX />
                    </button>
                </header>

                <section className="w-full p-4 flex flex-col gap-4 justify-center items-center">
                    <article className='flex w-full justify-center items-center gap-4'>
                        <span className='w-1/5 text-right'>{t('countryOrRegion')}</span>
                        <div className='w-3/5'>
                            <input className='form-input' type="text" id='countryOrRegion' name='countryOrRegion' defaultValue={row.countryOrRegion} />
                        </div>
                    </article>
                    <article className='flex w-full justify-center items-center gap-4'>
                        <span className='w-1/5 text-right'>{t('regionCode')}</span>
                        <div className='w-3/5'>
                            <input className='form-input' type="text" id='regionCode' name='regionCode' defaultValue={row.regionCode} />
                        </div>
                    </article>
                    <article className='flex w-full justify-center items-center gap-4'>
                        <span className='w-1/5 text-right'>{t('flagURL')}</span>
                        <div className='w-3/5'>
                            <input className='form-input' type="text" id='flagURL' name='flagURL' defaultValue={row.flagURL} />
                        </div>
                    </article>
                    <article className='flex w-full justify-center items-center gap-4'>
                        <span className='w-1/5 text-right'>{t('currencyName')}</span>
                        <div className='w-3/5'>
                            <input className='form-input' type="text" id='currencyName' name='currencyName' defaultValue={row.currencyName} />
                        </div>
                    </article>
                    <article className='flex w-full justify-center items-center gap-4'>
                        <span className='w-1/5 text-right'>{t('currencyCode')}</span>
                        <div className='w-3/5'>
                            <input className='form-input' type="text" id='currencyCode' name='currencyCode' defaultValue='currencyCode' />
                        </div>
                    </article>
                    <article className='flex w-full justify-center items-center gap-4'>
                        <span className='w-1/5 text-right'>{t('sorted')}</span>
                        <div className='w-3/5'>
                            <input className='form-input' type="text" id='sorted' name='sorted' defaultValue={row.sorted} />
                        </div>
                    </article>
                </section>

                <footer className="border-b border-gray-300 p-4 flex justify-end items-center">
                    <button className='btn btn-primary' type='submit'>{t('edit')}</button>
                </footer>
            </form>
        </Dialog>
    )
}