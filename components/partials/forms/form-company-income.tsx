import PanelCodeHighlight from '@/components/panel-code-highlight';
import { currencyFormat } from '@/components/Utils';
import { getTranslation } from '@/i18n';
import React from 'react';

type inputData = {
    data: FormatData;
};

type FormatData = {
    response: ResponseData;
    message: string;
};

type ResponseData = {
    totalBetAmount: number;
    companyIncomeTotal: number;
    totalCountBet: number;
    totalPayout: number;
    totalWager: number;
    totalWinLoss: number;
};

const CompanyIncomeForm = ({ data }: inputData) => {
    const { t } = getTranslation();

    return (
        <PanelCodeHighlight title="" className="px-3">
            <div className="mb-5 flex items-center justify-center">
                <div className="p-0">
                    <form>
                        <div className="grid grid-cols-1 gap-4 p-3">
                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex items-center justify-end gap-4">
                                    <div className="flex content-center">
                                        <label className="mb-0 ml-2" htmlFor="description">
                                            {t('companyIncomeTotal')}
                                        </label>
                                    </div>
                                    <input
                                        id={'companyIncomeTotal'}
                                        type="text"
                                        placeholder={t('companyIncomeTotal')}
                                        className="form-input w-48 text-right"
                                        value={currencyFormat(data.response.companyIncomeTotal)}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-3">
                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex items-center justify-end gap-4">
                                    <div className="flex content-center">
                                        <label className="mb-0 ml-2" htmlFor="description">
                                            {t('totalBetAmount')}
                                        </label>
                                    </div>
                                    <input
                                        id={'totalBetAmount'}
                                        type="text"
                                        placeholder={t('totalBetAmount')}
                                        className="form-input w-48 text-right"
                                        value={currencyFormat(data.response.totalBetAmount)}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-3">
                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex items-center justify-end gap-4">
                                    <div className="flex content-center">
                                        <label className="mb-0 ml-2" htmlFor="description">
                                            {t('totalCountBet')}
                                        </label>
                                    </div>
                                    <input
                                        id={'totalCountBet'}
                                        type="text"
                                        placeholder={t('totalCountBet')}
                                        className="form-input w-48 text-right"
                                        value={currencyFormat(data.response.totalCountBet)}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-3">
                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex items-center justify-end gap-4">
                                    <div className="flex content-center">
                                        <label className="mb-0 ml-2" htmlFor="description">
                                            {t('totalPayout')}
                                        </label>
                                    </div>
                                    <input
                                        id={'totalPayout'}
                                        type="text"
                                        placeholder={t('totalPayout')}
                                        className="form-input w-48 text-right"
                                        value={currencyFormat(data.response.totalPayout)}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-3">
                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex items-center justify-end gap-4">
                                    <div className="flex content-center">
                                        <label className="mb-0 ml-2" htmlFor="description">
                                            {t('totalWager')}
                                        </label>
                                    </div>
                                    <input
                                        id={'totalWager'}
                                        type="text"
                                        placeholder={t('totalWager')}
                                        className="form-input w-48 text-right"
                                        value={currencyFormat(data.response.totalWager)}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-3">
                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex items-center justify-end gap-4">
                                    <div className="flex content-center">
                                        <label className="mb-0 ml-2" htmlFor="description">
                                            {t('totalWinLoss')}
                                        </label>
                                    </div>
                                    <input
                                        id={'totalWinLoss'}
                                        type="text"
                                        placeholder={t('totalWinLoss')}
                                        className="form-input w-48 text-right"
                                        value={currencyFormat(data.response.totalWinLoss)}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </PanelCodeHighlight>
    );
};

export default CompanyIncomeForm;
