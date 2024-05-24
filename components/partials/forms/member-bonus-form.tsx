import CurrencyInput from '@/components/currency-input';
import PanelCodeHighlight from '@/components/panel-code-highlight';
import { getTranslation } from '@/i18n';
import React from 'react';

type inputData = {
    data: any;
    handleModal: any;
};

const MemberBonusForm = ({ data, handleModal }: inputData) => {
    const { t } = getTranslation();

    return (
        <PanelCodeHighlight title="" className="px-3">
            <div className="mb-5 flex items-center justify-center">
                <div className="p-0">
                    <form>
                        <div className="grid grid-cols-1 gap-4 p-3">
                            <div className="grid grid-cols-2 gap-2 pl-3">
                                <div className="flex items-center justify-center gap-4">
                                    <div className="flex content-center"></div>
                                    <label className="mb-0 ml-2" htmlFor="description">
                                        {t('claimedBonus')}
                                    </label>
                                </div>

                                <div className="flex items-center justify-start gap-4">
                                    <label className="mb-0 ml-8 pl-8" htmlFor="description">
                                        {t('pending')}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 p-3">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center justify-end gap-4">
                                    <div className="flex content-center">
                                        <label className="mb-0 ml-2" htmlFor="description">
                                            {t('bonusTotal')}
                                        </label>
                                    </div>
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('bonusTotal')} id={'bonusTotal'} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-4">
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('bonusTotal2')} id={'bonusTotal2'} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-3">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center justify-end gap-4">
                                    <div className="flex content-center">
                                        <label className="mb-0 ml-2" htmlFor="description">
                                            {t('calendarBonus')}
                                        </label>
                                    </div>
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('calendarBonus')} id={'calendarBonus'} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-4">
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('calendarBonus2')} id={'calendarBonus2'} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-3">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center justify-end gap-4">
                                    <div className="flex content-center">
                                        <label className="mb-0 ml-2" htmlFor="description">
                                            {t('generalBonus')}
                                        </label>
                                    </div>
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('generalBonus')} id={'generalBonus'} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-4">
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('generalBonus2')} id={'generalBonus2'} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-3">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center justify-end gap-4">
                                    <div className="flex content-center">
                                        <label className="mb-0 ml-2" htmlFor="description">
                                            {t('viplevelBonus')}
                                        </label>
                                    </div>
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('viplevelBonus')} id={'viplevelBonus'} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-4">
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('viplevelBonus2')} id={'viplevelBonus2'} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-3">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center justify-end gap-4">
                                    <div className="flex content-center">
                                        <label className="mb-0 ml-2" htmlFor="description">
                                            {t('specialBonus')}
                                        </label>
                                    </div>
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('specialBonus')} id={'specialBonus'} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-4">
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('specialBonus2')} id={'specialBonus2'} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-3">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center justify-end gap-4">
                                    <div className="flex content-center">
                                        <label className="mb-0 ml-2" htmlFor="description">
                                            {t('battleBonus')}
                                        </label>
                                    </div>
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('battleBonus')} id={'battleBonus'} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-4">
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('battleBonus2')} id={'battleBonus2'} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-3">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center justify-end gap-4">
                                    <div className="flex content-center">
                                        <label className="mb-0 ml-2" htmlFor="description">
                                            {t('taskBonus')}
                                        </label>
                                    </div>
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('taskBonus')} id={'taskBonus'} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-4">
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('taskBonus2')} id={'taskBonus2'} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-3">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center justify-end gap-4">
                                    <div className="flex content-center">
                                        <label className="mb-0 ml-2" htmlFor="description">
                                            {t('addExclusiveBonus')}
                                        </label>
                                    </div>
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('addExclusiveBonus')} id={'addExclusiveBonus'} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-4">
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('addExclusiveBonus2')} id={'addExclusiveBonus2'} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-3">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center justify-end gap-4">
                                    <div className="flex content-center">
                                        <label className="mb-0 ml-2" htmlFor="description">
                                            {t('chatRoomBonus')}
                                        </label>
                                    </div>
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('chatRoomBonus')} id={'chatRoomBonus'} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-4">
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('chatRoomBonus2')} id={'chatRoomBonus2'} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-3">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center justify-end gap-4">
                                    <div className="flex content-center">
                                        <label className="mb-0 ml-2" htmlFor="description">
                                            {t('interestBonus')}
                                        </label>
                                    </div>
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('interestBonus')} id={'interestBonus'} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-4">
                                    <div className="flex w-48">
                                        <CurrencyInput curency={10000} placeholder={t('interestBonus2')} id={'interestBonus2'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </PanelCodeHighlight>
    );
};

export default MemberBonusForm;
