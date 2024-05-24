import CurrencyInput from '@/components/currency-input';
import PanelCodeHighlight from '@/components/panel-code-highlight';
import { currencyFormat } from '@/components/Utils';
import { getTranslation } from '@/i18n';
import React from 'react';

type inputData = {
    data: any;
    handleModal: any;
};

const MemberLossForm = ({ data, handleModal }: inputData) => {
    const { t } = getTranslation();

    console.log(data);

    return (
        <PanelCodeHighlight title="" className="px-3">
            <div className="mb-5 flex items-center justify-center">
                <div className="p-0">
                    {data ? (
                        <form>
                            <div className="grid grid-cols-1 gap-4 p-3">
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="flex items-center justify-end gap-4">
                                        <div className="flex content-center">
                                            <label className="mb-0 ml-2" htmlFor="description">
                                                {t('Member Loss Total')}
                                            </label>
                                        </div>
                                        <div className="flex w-48">
                                            <CurrencyInput curency={data.response.grandTotalLoss} placeholder={t('Member Loss Total')} id={t('Member Loss Total')} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {data.response.categories.map((item: any, index: number) => {
                                return (
                                    <div key={index} className="grid grid-cols-1 gap-4 p-3">
                                        <div className="grid grid-cols-1 gap-2">
                                            <div className="flex items-center justify-end gap-4">
                                                <div className="flex content-center">
                                                    <label className="mb-0 ml-2" htmlFor="description">
                                                        {t(item.category)}
                                                    </label>
                                                </div>
                                                <div className="flex w-48">
                                                    <CurrencyInput curency={item.totalLoss} placeholder={t(item.category)} id={item.category} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </form>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </PanelCodeHighlight>
    );
};

export default MemberLossForm;
