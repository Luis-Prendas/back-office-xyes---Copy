import { IconCurrencyDollar } from '@tabler/icons-react';
import React from 'react';
import { currencyFormat } from './Utils';

type Props = {
    curency: number;
    placeholder: string;
    id: string;
};

export default function CurrencyInput({ id, placeholder, curency }: Props) {
    return (
        <>
            <div className="flex items-center justify-center border border-white-light bg-[#fff] px-3 font-semibold dark:border-[#17263c] dark:bg-[#1b2e4b] ltr:rounded-l-md ltr:border-r-0 rtl:rounded-r-md rtl:border-l-0">
                <IconCurrencyDollar className={`${curency >= 0 ? 'text-success' : 'text-danger'}`} />
            </div>
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                className={`form-input border-l-0 text-right ltr:rounded-l-none rtl:rounded-r-none ${curency >= 0 ? 'text-success' : 'text-danger'}`}
                value={currencyFormat(curency)}
                disabled={true}
            />
        </>
    );
}
