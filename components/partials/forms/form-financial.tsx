'use client';
import { IRootState } from '@/store';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTranslation } from '@/i18n';
import { contactList, loginUser } from '@/components/constans';
import { MemberInformation2 } from '@/types/memberListService.type';
import PanelCodeHighlight from '@/components/panel-code-highlight';
import { currencyFormat } from '@/components/Utils';
import Flatpickr from 'react-flatpickr';
import CustomLoader from '../loader/custom-loader';
import CurrencyInput from '@/components/currency-input';

type inputData = {
    user: any;
    data: any;
    hasError: Error | null;
    isLoading: boolean;
};

const FormFinantial = ({ user, data, hasError, isLoading }: inputData) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    console.log(data, 'dataaa');

    const { t } = getTranslation();

    const [isShowUserChat, setIsShowUserChat] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [textMessage, setTextMessage] = useState('');
    const [filteredItems, setFilteredItems] = useState<any>(contactList);
    const [toggleActive, setToggleActive] = useState<string>('1');
    const toggleAccordionList = (value: string) => {
        setToggleActive((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    // defaults
    const [defaultParams] = useState('');

    const [params, setParams] = useState<MemberInformation2>(JSON.parse(JSON.stringify(user ?? defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const selectUser = (user: any) => {
        setSelectedUser(user);
        setIsShowUserChat(true);
    };

    return (
        <div>
            {hasError ? (
                <PanelCodeHighlight title="" className={`flex h-[22rem] items-center justify-center`}>
                    <div className="p-4 text-center text-red-500">{hasError?.message}</div>
                </PanelCodeHighlight>
            ) : (
                <div>
                    <PanelCodeHighlight title="" className={`mb-5 px-5`}>
                        {isLoading ? (
                            <CustomLoader />
                        ) : (
                            <div className="mb-5 flex items-center justify-center">
                                <div className="p-0">
                                    <form>
                                        <div className="grid grid-cols-1 gap-4 p-3">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex items-center justify-end gap-4">
                                                    <div className="flex content-center">
                                                        <label className="mb-0 ml-2" htmlFor="description">
                                                            {t('companyIncome')}
                                                        </label>
                                                    </div>
                                                    <div className="flex w-48">
                                                        <CurrencyInput curency={data.companyImcome.totalBetAmount} placeholder={t('companyIncome')} id={'companyIncome'} />
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end gap-4">
                                                    <div className="flex content-center">
                                                        <label className="mb-0 ml-2" htmlFor="description">
                                                            {t('memberLoss')}
                                                        </label>
                                                    </div>
                                                    <div className="flex w-48">
                                                        <CurrencyInput curency={data.companyImcome.totalWinLoss} placeholder={t('memberLoss')} id={'memberLoss'} />
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end gap-4">
                                                    <div className="flex content-center">
                                                        <label className="mb-0 ml-2" htmlFor="description">
                                                            {t('betAmount')}
                                                        </label>
                                                    </div>
                                                    <div className="flex w-48">
                                                        <CurrencyInput curency={data.companyImcome.totalBetAmount} placeholder={t('betAmount')} id={'betAmount'} />
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end gap-4">
                                                    <div className="flex content-center">
                                                        <label className="mb-0 ml-2" htmlFor="description">
                                                            {t('betResults')}
                                                        </label>
                                                    </div>
                                                    <div className="flex w-48">
                                                        <CurrencyInput curency={data.companyImcome.totalPayout} placeholder={t('betResults')} id={'betResults'} />
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end gap-4">
                                                    <div className="flex content-center">
                                                        <label className="mb-0 ml-2" htmlFor="description">
                                                            {t('bonus')}
                                                        </label>
                                                    </div>

                                                    <div className="flex w-48">
                                                        <CurrencyInput curency={data.companyImcome.totalPayout} placeholder={t('bonus')} id={'bonus'} />
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end gap-4">
                                                    <div className="flex content-center">
                                                        <label className="mb-0 ml-2" htmlFor="description">
                                                            {t('validWager')}
                                                        </label>
                                                    </div>
                                                    <div className="flex w-48">
                                                        <CurrencyInput curency={data.companyImcome.totalWager} placeholder={t('validWager')} id={'validWager'} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </PanelCodeHighlight>
                    <PanelCodeHighlight title="" className={`px-5`}>
                        {isLoading ? (
                            <CustomLoader />
                        ) : (
                            <div className="mb-5 flex items-center justify-center">
                                <div className="p-0">
                                    {data.message != undefined ? (
                                        <form>
                                            <div className="grid grid-cols-1 gap-4 p-3">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex items-center justify-end gap-4">
                                                        <div className="flex content-center">
                                                            <label className="mb-0 ml-2" htmlFor="description">
                                                                {t('accountBalance')}
                                                            </label>
                                                        </div>
                                                        <div className="flex w-48">
                                                            <CurrencyInput curency={data.transactions.data.totals.fiatBalance} placeholder={t('accountBalance')} id={'accountBalance'} />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-end gap-4">
                                                        <div className="flex content-center">
                                                            <label className="mb-0 ml-2" htmlFor="description">
                                                                {t('vaultBalance')}
                                                            </label>
                                                        </div>
                                                        <div className="flex w-48">
                                                            <CurrencyInput curency={500} placeholder={t('vaultBalance')} id={'vaultBalance'} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-4 p-3">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex items-center justify-end gap-4">
                                                        <div className="flex content-center">
                                                            <label className="mb-0 ml-2" htmlFor="description">
                                                                {t('firstDepositAmountTime')}
                                                            </label>
                                                        </div>
                                                        <div className="flex w-48">
                                                            <CurrencyInput
                                                                curency={data.transactions.data.totals.deposit.first.amount ? data.transactions.data.totals.deposit.first.amount : 0}
                                                                placeholder={t('firstDepositAmountTime')}
                                                                id={'firstDepositAmountTime'}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-end gap-4">
                                                        <div className="flex w-96 gap-2">
                                                            <select id="ctnSelect1" className="form-select text-white-dark" required>
                                                                <option>Crypto tag</option>
                                                                <option>Fiat tag</option>
                                                            </select>
                                                            <Flatpickr
                                                                value={data.transactions.data.totals.deposit.first.time}
                                                                options={{ dateFormat: 'Y-m-d H:i', position: isRtl ? 'auto right' : 'auto left' }}
                                                                className="form-input w-48 text-center"
                                                                disabled={true}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex items-center justify-end gap-4">
                                                        <div className="flex content-center">
                                                            <label className="mb-0 ml-2" htmlFor="description">
                                                                {t('lastDepositAmountTime')}
                                                            </label>
                                                        </div>
                                                        <div className="flex w-48">
                                                            <CurrencyInput
                                                                curency={data.transactions.data.totals.deposit.last.amount ? data.transactions.data.totals.deposit.last.amount : 0}
                                                                placeholder={t('lastDepositAmountTime')}
                                                                id={'lastDepositAmountTime'}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-end gap-4">
                                                        <div className="flex w-96 gap-2">
                                                            <select id="ctnSelect1" className="form-select text-white-dark" required>
                                                                <option>Fiat tag</option>
                                                                <option>Crypto tag</option>
                                                            </select>
                                                            <Flatpickr
                                                                value={data.transactions.data.totals.deposit.last.time}
                                                                options={{ dateFormat: 'Y-m-d H:i', position: isRtl ? 'auto right' : 'auto left' }}
                                                                className="form-input w-48 text-center"
                                                                disabled={true}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-4 p-3">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex items-center justify-end gap-4">
                                                        <div className="flex content-center">
                                                            <label className="mb-0 ml-2" htmlFor="description">
                                                                {t('totalDepositAmount')}
                                                            </label>
                                                        </div>

                                                        <div className="flex w-48">
                                                            <CurrencyInput
                                                                curency={data.transactions.data.totals.deposit.totalAmount}
                                                                placeholder={t('totalDepositAmount')}
                                                                id={'totalDepositAmount'}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-end gap-4">
                                                        <div className="flex content-center">
                                                            <label className="mb-0 ml-2" htmlFor="description">
                                                                {t('depositTimes')}
                                                            </label>
                                                        </div>

                                                        <div className="flex w-48">
                                                            <CurrencyInput curency={data.transactions.data.totals.deposit.times} placeholder={t('depositTimes')} id={'depositTimes'} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-4 p-3">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex items-center justify-end gap-4">
                                                        <div className="flex content-center">
                                                            <label className="mb-0 ml-2" htmlFor="description">
                                                                {t('firstWithdrawAmountTime')}
                                                            </label>
                                                        </div>

                                                        <div className="flex w-48">
                                                            <CurrencyInput
                                                                curency={data.transactions.data.totals.withdraw.first.amount}
                                                                placeholder={t('firstWithdrawAmountTime')}
                                                                id={'firstWithdrawAmountTime'}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-end gap-4">
                                                        <div className="flex w-96 gap-2">
                                                            <select id="ctnSelect1" className="form-select text-white-dark" required>
                                                                <option>Fiat Type</option>
                                                                <option>Crypto Type</option>
                                                            </select>
                                                            <Flatpickr
                                                                value={data.transactions.data.totals.withdraw.first.time}
                                                                options={{ dateFormat: 'Y-m-d H:i', position: isRtl ? 'auto right' : 'auto left' }}
                                                                className="form-input w-48 text-center"
                                                                disabled={true}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex items-center justify-end gap-4">
                                                        <div className="flex content-center">
                                                            <label className="mb-0 ml-2" htmlFor="description">
                                                                {t('lastWithdrawAmountTime')}
                                                            </label>
                                                        </div>

                                                        <div className="flex w-48">
                                                            <CurrencyInput
                                                                curency={data.transactions.data.totals.withdraw.last.amount ? data.transactions.data.totals.withdraw.last.amount : 0}
                                                                placeholder={t('lastWithdrawAmountTime')}
                                                                id={'lastWithdrawAmountTime'}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-end gap-4">
                                                        <div className="flex w-96 gap-2">
                                                            <select id="ctnSelect1" className="form-select text-white-dark" required>
                                                                <option>Crypto Type</option>
                                                                <option>Fiat Type</option>
                                                            </select>
                                                            <Flatpickr
                                                                value={data.transactions.data.totals.withdraw.last.time}
                                                                options={{ dateFormat: 'Y-m-d H:i', position: isRtl ? 'auto right' : 'auto left' }}
                                                                className="form-input w-48 text-center"
                                                                disabled={true}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 gap-4 p-3">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="flex items-center justify-end gap-4">
                                                            <div className="flex content-center">
                                                                <label className="mb-0 ml-2" htmlFor="description">
                                                                    {t('totalWithdrawalAmount')}
                                                                </label>
                                                            </div>

                                                            <div className="flex w-48">
                                                                <CurrencyInput
                                                                    curency={data.transactions.data.totals.withdraw.totalAmount}
                                                                    placeholder={t('totalWithdrawalAmount')}
                                                                    id={'totalWithdrawalAmount'}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-end gap-4">
                                                            <div className="flex content-center">
                                                                <label className="mb-0 ml-2" htmlFor="description">
                                                                    {t('withdrawalTimes')}
                                                                </label>
                                                            </div>

                                                            <div className="flex w-48">
                                                                <CurrencyInput curency={data.transactions.data.totals.withdraw.times} placeholder={t('withdrawalTimes')} id={'withdrawalTimes'} />
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-end gap-4">
                                                            <div className="flex content-center">
                                                                <label className="mb-0 ml-2" htmlFor="description">
                                                                    {t('cionDraps')}
                                                                </label>
                                                            </div>

                                                            <div className="flex w-48">
                                                                <CurrencyInput curency={data.transactions.data.totals.coinDraps} placeholder={t('cionDraps')} id={'cionDraps'} />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-end gap-4">
                                                            <div className="flex content-center">
                                                                <label className="mb-0 ml-2" htmlFor="description">
                                                                    {t('raining')}
                                                                </label>
                                                            </div>

                                                            <div className="flex w-48">
                                                                <CurrencyInput
                                                                    curency={data.transactions.data.totals.raining ? data.transactions.data.totals.raining : 0}
                                                                    placeholder={t('raining')}
                                                                    id={'raining'}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-end gap-4">
                                                            <div className="flex content-center">
                                                                <label className="mb-0 ml-2" htmlFor="description">
                                                                    {t('tips')}
                                                                </label>
                                                            </div>

                                                            <div className="flex w-48">
                                                                <CurrencyInput curency={data.transactions.data.totals.tips} placeholder={t('tips')} id={'tips'} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    ) : (
                                        <>
                                            <span>Error From Server please contact your administrator</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </PanelCodeHighlight>
                </div>
            )}
        </div>
    );
};

export default FormFinantial;
