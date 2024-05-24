'use client'
import { FormEventHandler, useEffect, useState } from 'react';
import 'flatpickr/dist/flatpickr.css';
import { getTranslation } from '@/i18n';
import { GameRecordTotals } from '@/types/game-record-type';
import { Category, RootReponse, Subcategory, Provider } from '../game-record/filter-game-record-types';

interface Props {
    handleSubmit: FormEventHandler<HTMLFormElement>
}

export default function FilterOthersGames({ handleSubmit }: Props) {
    const { t } = getTranslation();

    const [providerData, setProviderData] = useState<RootReponse[]>([])
    const [providersData, setProvidersData] = useState<Provider[]>([])
    const [categoriesData, setCategoriesData] = useState<Category[]>([])
    const [subCategoriesData, setSubCategoriesData] = useState<Subcategory[]>([])

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const response = await fetch('https://dev-back-backoffice.xyes.com/container/games/api/v1/games/get-third-suppliers');
                const responseData = await response.json() as RootReponse[];

                setProviderData(responseData);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        fetchFilters();
    }, []);

    const providerDataChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const allProviders = providerData.find(i => i.name == e.target.value)?.providers

        setProvidersData(allProviders!)
    }

    const providersDataChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const allProvider = providersData.find(i => i.name == e.target.value)?.categories

        setCategoriesData(allProvider!)
    }

    const categoriesDataChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const allProvider = categoriesData.find(i => i.name == e.target.value)?.subcategories

        if (allProvider?.length! > 0) {
            setSubCategoriesData(allProvider!)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex gap-4 justify-center items-center'>
            <div className='border border-gray-400 rounded flex flex-wrap justify-center items-center p-2 gap-4'>
                <div className='flex items-center gap-2'>
                    <label className='text-nowrap' htmlFor='3rdSuppliers'>{t('3rdSuppliers')}:</label>
                    <select onChange={providerDataChange} id='3rdSuppliers' name='3rdSuppliers' className='form-select text-white-dark w-36'>
                        <option value="">{t('all')}</option>
                        {providerData && providerData.map((e: any) => (
                            <option key={e.name} value={e.name}>{e.name}</option>
                        ))}
                    </select>
                </div>
                <div className='flex items-center gap-2'>
                    <label htmlFor='provider'>{t('provider')}:</label>
                    <select onChange={providersDataChange} id='provider' name='provider' className='form-select text-white-dark w-36'>
                        <option value="">{t('all')}</option>
                        {providersData && providersData.map((e: any) => (
                            <option key={e.name} value={e.name}>{e.name}</option>
                        ))}
                    </select>
                </div>
                <div className='flex items-center gap-2'>
                    <label htmlFor='category'>{t('category')}:</label>
                    <select onChange={categoriesDataChange} id='category' name='category' className='form-select text-white-dark w-36'>
                        <option value="">{t('all')}</option>
                        {categoriesData && categoriesData.map((e: Category) => (
                            <option key={e.name} value={e.name}>{e.name}</option>
                        ))}
                    </select>
                </div>
                <div className='flex items-center gap-2'>
                    <label htmlFor='subCategory'>{t('subCategory')}:</label>
                    <select id='subCategory' name='subCategory' className='form-select text-white-dark w-36'>
                        <option value="">{t('all')}</option>
                        {subCategoriesData && subCategoriesData.map((e: Subcategory) => (
                            <option key={e.name} value={e.name}>{e.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='border border-gray-400 rounded flex justify-start items-start p-2'>
                <div className='flex items-start justify-start gap-4'>
                    <select id='selectField' name='selectField' className='form-select text-white-dark w-36'>
                        <option value='no'>{t('no')}</option>
                        <option value='systemNo'>{t('systemNo')}</option>
                        <option value='3rdNo'>{t('3rdNo')}</option>
                    </select>
                    <input
                        id='inputSearch'
                        name='inputSearch'
                        type='text'
                        placeholder={t('search') + '...'}
                        className='form-input'
                    />
                    <button type='submit' className='btn btn-primary'>
                        {t('search')}
                    </button>
                </div>
            </div>
        </form>
    )
}
