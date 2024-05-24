import { getTranslation } from '@/i18n';
import { FormEventHandler, ReactNode, useState } from 'react';
import Flatpickr from 'react-flatpickr';

interface Props {
    children?: ReactNode;
    handleSubmit?: FormEventHandler<HTMLFormElement>;
    changeTime?: () => void;
}

export default function BankCardFilter({ children, handleSubmit, changeTime }: Props) {
    const { t } = getTranslation();
    const [selectedOption, setSelectedOption] = useState<string>('today');

    const calculateMinDate = (selectedOption: string): string => {
        switch (selectedOption) {
            case 'today':
                return new Date().toISOString().split('T')[0];
            case 'yesterday':
                return getDateString(new Date(Date.now() - 86400000));
            case 'thisWeek':
                return getDateString(getStartOfWeek(new Date()));
            case 'lastWeek':
                const startOfLastWeek = getStartOfWeek(new Date());
                startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
                return getDateString(startOfLastWeek);
            case 'thisMonth':
                return getDateString(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
            case 'lastMonth':
                const startOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
                return getDateString(startOfLastMonth);
            default:
                return new Date().toISOString().split('T')[0];
        }
    };

    const getDateString = (date: Date): string => {
        return date.toISOString().split('T')[0];
    };

    const getStartOfWeek = (date: Date): Date => {
        const dayOfWeek = date.getDay();
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - dayOfWeek);
        return startOfWeek;
    };

    const getEndOfWeek = (date: Date): Date => {
        const dayOfWeek = date.getDay();
        const endOfWeek = new Date(date);
        endOfWeek.setDate(date.getDate() + (6 - dayOfWeek));
        return endOfWeek;
    };

    const calculateMaxDate = (selectedOption: string): string => {
        switch (selectedOption) {
            case 'today':
                return new Date().toISOString().split('T')[0];
            case 'yesterday':
                return getDateString(new Date(Date.now() - 86400000));
            case 'thisWeek':
                return getDateString(getEndOfWeek(new Date()));
            case 'lastWeek':
                const endOfLastWeek = getEndOfWeek(new Date());
                endOfLastWeek.setDate(endOfLastWeek.getDate() - 7);
                return getDateString(endOfLastWeek);
            case 'thisMonth':
                return getDateString(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));
            case 'lastMonth':
                const endOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
                return getDateString(endOfLastMonth);
            default:
                return new Date().toISOString().split('T')[0];
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-3 grid-rows-1 gap-4">
            <div className="col-span-1 row-span-1 flex h-full w-full items-start justify-start rounded p-2">
                <div className="flex h-full w-full items-start justify-start gap-4">
                    <select id="selectField" name="selectField" className="form-select w-1/2 text-white-dark">
                        <option value="no">{t('no')}</option>
                        <option value="systemNo">{t('systemNo')}</option>
                        <option value="3rdNo">{t('3rdNo')}</option>
                    </select>
                    <input id="inputSearch" name="inputSearch" type="text" placeholder={t('search') + '...'} className="form-input w-1/2" />
                    <button type="submit" className="btn btn-primary">
                        {t('search')}
                    </button>
                </div>
            </div>

            <div className="col-span-2 row-span-1 flex h-full w-full flex-col items-end justify-between gap-4 rounded p-2">
                <div className="flex items-center justify-start gap-4">
                    <select id="select2" name="select2" className="form-select w-1/2 text-white-dark" required onChange={handleSelectChange}>
                        <option value="today">{t('today')}</option>
                        <option value="yesterday">{t('yesterday')}</option>
                        <option value="thisWeek">{t('thisWeek')}</option>
                        <option value="lastWeek">{t('lastWeek')}</option>
                        <option value="thisMonth">{t('thisMonth')}</option>
                        <option value="lastMonth">{t('lastMonth')}</option>
                    </select>
                    <Flatpickr
                        options={{
                            enableTime: true,
                            minDate: calculateMinDate(selectedOption),
                            maxDate: calculateMaxDate(selectedOption),
                            defaultDate: new Date().toISOString().split('T')[0],
                        }}
                        defaultValue={new Date().toISOString().split('T')[0]}
                        className="h-full w-1/2 border border-gray-400 text-center"
                        id="inputDate1"
                        name="inputDate1"
                    />
                    <span className="text-xl">/</span>
                    <Flatpickr
                        options={{
                            enableTime: true,
                            minDate: calculateMinDate(selectedOption),
                            maxDate: calculateMaxDate(selectedOption),
                            defaultDate: new Date().toISOString().split('T')[0],
                        }}
                        defaultValue={new Date().toISOString().split('T')[0]}
                        className="h-full w-1/2 border border-gray-400 text-center"
                        id="inputDate2"
                        name="inputDate2"
                    />
                </div>
                {/* <div className="flex w-full items-end justify-end gap-4">
                    <label className="inline-flex cursor-pointer items-center">
                        <input onChange={changeUsd} type="checkbox" id="usd" name="usd" className="peer sr-only" defaultChecked />
                        <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">USD</span>
                    </label>

                    <label className="inline-flex cursor-pointer items-center">
                        <input onChange={changeTime} type="checkbox" id="utcTime" name="utcTime" className="peer sr-only" defaultChecked />
                        <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{t('utcTime')}</span>
                    </label>
                </div> */}
            </div>
        </form>
    );
}
