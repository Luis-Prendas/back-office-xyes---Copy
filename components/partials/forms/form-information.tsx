'use client';
import { IRootState } from '@/store';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTranslation } from '@/i18n';
import { contactList, loginUser } from '@/components/constans';
import { MemberInformation1 } from '@/types/memberListService.type';
import PanelCodeHighlight from '@/components/panel-code-highlight';
import Moment from 'react-moment';
import Flatpickr from 'react-flatpickr';
import moment from 'moment';
import CustomLoader from '../loader/custom-loader';

type inputData = {
    user: any;
    data: any;
    hasError: Error | null;
    isLoading: boolean;
};

const FormInformation = ({ user, data, hasError, isLoading }: inputData) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

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

    const [params, setParams] = useState<MemberInformation1>(JSON.parse(JSON.stringify(user ?? defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const selectUser = (user: any) => {
        setSelectedUser(user);
        setIsShowUserChat(true);
    };

    const getLastConnectionDay = (givenMoment: Date | string): string => {
        return moment(givenMoment).fromNow();
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
                            <div className="flex justify-center pb-4">
                                <form style={{ width: '47rem' }}>
                                    <div className="grid grid-cols-1 gap-2 py-1">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex items-center justify-end gap-2">
                                                <div className="flex content-center">
                                                    <label className="mb-0 ml-2" htmlFor="description">
                                                        {t('partnerSite')}
                                                    </label>
                                                </div>
                                                <input
                                                    id={'partnerSite'}
                                                    type="text"
                                                    placeholder={t('partnerSite')}
                                                    className="form-input w-48 text-center"
                                                    value={data.partnerSite ? data.partnerSite : '-'}
                                                    disabled={true}
                                                />
                                            </div>

                                            <div className="flex items-center justify-end gap-2">
                                                <div className="flex content-center">
                                                    <label className="mb-0 ml-2" htmlFor="description">
                                                        {t('offlineDate')}
                                                    </label>
                                                </div>
                                                <input
                                                    id={'offlineDate'}
                                                    type="text"
                                                    placeholder={t('offlineDate')}
                                                    className="form-input w-48 text-center"
                                                    value={getLastConnectionDay(data.lastLoginLog.datetime)}
                                                    disabled={true}
                                                />
                                            </div>

                                            <div className="flex items-center justify-end gap-2">
                                                <div className="flex content-center">
                                                    <label className="mb-0 ml-2" htmlFor="description">
                                                        {t('referralAccountID')}
                                                    </label>
                                                </div>
                                                <input
                                                    id={'referralAccountId'}
                                                    type="text"
                                                    placeholder={t('referralAccountID')}
                                                    className="form-input w-48 text-center"
                                                    value={data.referralCode}
                                                    disabled={true}
                                                />
                                            </div>

                                            <div className="flex items-center justify-end gap-2">
                                                <div className="flex content-center">
                                                    <label className="mb-0 ml-2" htmlFor="description">
                                                        {t('language')}
                                                    </label>
                                                </div>
                                                <input
                                                    id={'partnerSite'}
                                                    type="text"
                                                    placeholder={t('language')}
                                                    className="form-input w-48 text-center"
                                                    value={data.settings.language ? data.settings.language : '-'}
                                                    disabled={true}
                                                />
                                            </div>

                                            <div className="flex items-center justify-end gap-2">
                                                <div className="flex content-center">
                                                    <label className="mb-0 ml-2" htmlFor="description">
                                                        {t('registrationWay')}
                                                    </label>
                                                </div>
                                                <select id="ctnSelect1" className="form-select w-48 text-center text-white-dark" required>
                                                    <option>Google</option>
                                                    <option>Whatsapp</option>
                                                    <option>Metamask</option>
                                                    <option>Line</option>
                                                </select>
                                            </div>

                                            <div className="flex items-center justify-end gap-2">
                                                <div className="flex content-center">
                                                    <label className="mb-0 ml-2" htmlFor="description">
                                                        {t('loginMethod')}
                                                    </label>
                                                </div>
                                                <select id="ctnSelect1" value={data.loginType} className="form-select w-48 text-center text-white-dark" required>
                                                    <option>Telegram</option>
                                                    <option>Email</option>
                                                    <option>Whatsapp</option>
                                                    <option>Metamask</option>
                                                    <option>Line</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-2 py-1">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex items-center justify-end gap-2">
                                                <div className="flex content-center">
                                                    <label className="mb-0 ml-2" htmlFor="description">
                                                        {t('firstIPDomainDate')}
                                                    </label>
                                                </div>
                                                <input
                                                    id={'firstIPDomainDate'}
                                                    type="text"
                                                    placeholder={t('firstIPDomainDate')}
                                                    className="form-input w-48 text-center"
                                                    value={data.firstLoginLog.domain}
                                                    disabled={true}
                                                />
                                            </div>

                                            <div className="flex items-center justify-end gap-2">
                                                <input id={'firstIpDomain2'} type="text" placeholder={''} className="form-input w-48 text-center" value={'Mexico City'} disabled={true} />
                                            </div>

                                            <div className="flex items-center justify-end gap-2">
                                                <input id={'firstIpDomain3'} type="text" placeholder={''} className="form-input w-48 text-center" value={data.firstLoginLog.ip} disabled={true} />
                                            </div>

                                            <div className="flex items-center justify-end gap-2">
                                                <Flatpickr
                                                    value={data.firstLoginLog.datetime}
                                                    options={{ dateFormat: 'Y-m-d H:i', position: isRtl ? 'auto right' : 'auto left' }}
                                                    className="form-input w-48 text-center"
                                                    disabled={true}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-2 py-1">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex items-center justify-end gap-2">
                                                <div className="flex content-center">
                                                    <label className="mb-0 ml-2" htmlFor="description">
                                                        {t('lastIPDomainDate')}
                                                    </label>
                                                </div>
                                                <input
                                                    id={'lastIPDomainDate'}
                                                    type="text"
                                                    placeholder={t('lastIPDomainDate')}
                                                    className="form-input w-48 text-center"
                                                    value={data.lastLoginLog.domain}
                                                    disabled={true}
                                                />
                                            </div>

                                            <div className="flex items-center justify-end gap-2">
                                                <input id={'lastIpDomain2'} type="text" placeholder={''} className="form-input w-48 text-center" value={'San Jose Costa Rica'} disabled={true} />
                                            </div>

                                            <div className="flex items-center justify-end gap-2">
                                                <input id={'lastIpDomain3'} type="text" placeholder={''} className="form-input w-48 text-center" value={data.lastLoginLog.ip} disabled={true} />
                                            </div>

                                            <div className="flex items-center justify-end gap-2">
                                                <Flatpickr
                                                    value={data.lastLoginLog.datetime}
                                                    options={{ dateFormat: 'Y-m-d H:i', position: isRtl ? 'auto right' : 'auto left' }}
                                                    className="form-input w-48 text-center"
                                                    disabled={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </PanelCodeHighlight>
                    <PanelCodeHighlight title="" className={`px-5 `}>
                        {isLoading ? (
                            <CustomLoader />
                        ) : (
                            <form className="mx-8 p-5">
                                <div className="grid grid-cols-1 gap-2 py-1">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="flex content-center">
                                                <label className="mb-0 ml-2" htmlFor="description">
                                                    {t('citizenship')}
                                                </label>
                                            </div>
                                            <input id={'citizenship'} type="text" placeholder={t('citizenship')} className="form-input w-48" value={data.country} disabled={true} />
                                        </div>

                                        <div className="flex items-center justify-end gap-2">
                                            <div className="flex content-center">
                                                <label className="mb-0 ml-2" htmlFor="description">
                                                    {t('2FA')}
                                                </label>
                                            </div>
                                            <select id="ctnSelect1" value={data.two_factor_enabled} className="form-select w-48 text-white-dark" required>
                                                <option value={data.two_factor_enabled ? 'Yes' : 'No'}>{t('yes')}</option>
                                                <option>{t('no')}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-2 py-1">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="flex content-center">
                                                <label className="mb-0 ml-2" htmlFor="description">
                                                    {t('phone')}
                                                </label>
                                            </div>
                                            <input id={'phone'} type="text" placeholder={t('phone')} className="form-input w-48" value={data.phone} disabled={true} />
                                        </div>

                                        <div className="flex items-center justify-end gap-2">
                                            <div className="flex content-center">
                                                <label className="mb-0 ml-2" htmlFor="description">
                                                    {t('KYCLevel')}
                                                </label>
                                            </div>
                                            <select id="ctnSelect1" value={data.kyc} className="form-select w-48 text-white-dark" required>
                                                <option>{t('none')}</option>
                                                <option>{t('basic')}</option>
                                                <option>{t('advanced')}</option>
                                            </select>
                                        </div>

                                        <div className="flex items-center justify-end gap-2">
                                            <div className="flex content-center">
                                                <label className="mb-0 ml-2" htmlFor="description">
                                                    {t('birthday')}
                                                </label>
                                            </div>
                                            <input id={'birthday'} type="text" placeholder={t('birthday')} className="form-input w-48" value={'15-09-2000'} disabled={true} />
                                        </div>

                                        <div className="flex items-center justify-end gap-2">
                                            <div className="flex content-center">
                                                <label className="mb-0 ml-2" htmlFor="description">
                                                    {t('email')}
                                                </label>
                                            </div>
                                            <input id={'email'} type="text" placeholder={t('email')} className="form-input w-48" value={'duke@moonhicr.com'} disabled={true} />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-2 py-1">
                                    <div className="grid grid-cols-1 gap-2">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="flex content-center">
                                                <label className="mb-0 ml-2" htmlFor="description">
                                                    {t('address')}
                                                </label>
                                            </div>
                                            <textarea
                                                id="ctnTextarea"
                                                style={{ width: '36.1rem' }}
                                                rows={3}
                                                className="form-textarea"
                                                value={data.address ?? ''}
                                                placeholder={t('address')}
                                                required
                                                readOnly
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 grid grid-cols-1 gap-2 py-1">
                                    <div className="grid grid-cols-1 gap-2">
                                        <div className="flex items-center justify-center gap-2 pl-8">
                                            <div className="flex content-center">
                                                <label className="mb-0 ml-2" htmlFor="description">
                                                    {t('KYCFile')}
                                                </label>
                                            </div>
                                            <span className="text-primary underline underline-offset-2"> {t('driverLicense')} </span> |
                                            <span className="text-primary underline underline-offset-2"> {t('IDCard')} </span> |
                                            <span className="text-primary underline underline-offset-2"> {t('passport')} </span> |
                                            <span className="text-primary underline underline-offset-2"> {t('socialSecurityCard')} </span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </PanelCodeHighlight>
                </div>
            )}
        </div>
    );
};

export default FormInformation;
