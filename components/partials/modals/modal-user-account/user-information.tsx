import CurrencyInput from '@/components/currency-input';
import { currencyFormat } from '@/components/Utils';
import { getTranslation } from '@/i18n';
import { IconCurrencyDollar } from '@tabler/icons-react';
import { useState } from 'react';
import ModalDefault, { Modals } from '../modal-default';
import { GetMemberByIdRootResponse } from '@/types/get-member-by-id';

export default function UserInformation({ member }: { member: GetMemberByIdRootResponse }) {
    const { t } = getTranslation();

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<keyof typeof Modals | null>(null);
    const [userSelected, setUser] = useState<string>('');

    const openModal = (type: keyof typeof Modals, user: any) => {
        setUser(user);
        setModalType(type);
        setShowModal(true);
    };

    const handleModal = (action: string, data: any) => {
        console.log(action, data);
        setShowModal(false);
    };

    return (
        <section className="grid h-40 grid-cols-6 grid-rows-1 gap-2 p-4">
            <div className="col-span-1 row-span-1 flex items-start justify-center">
                <div className="flex items-center justify-center">
                    <img src={member.avatar} className="h-28 w-28 rounded-full object-cover ring-4 ring-red-500 p-1" alt="" />
                </div>
            </div>
            <div className="col-span-5 row-span-1 flex items-start justify-between">
                <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-end gap-4">
                        <div className="flex content-center">
                            <label className="mb-0 ml-2 font-semibold" htmlFor="description">
                                {t('memberId')}
                            </label>
                        </div>
                        <input id={'memberId'} type="text" placeholder={t('memberId')} className="form-input w-48 text-center" value={member.memberId} disabled={true} />
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <div className="flex content-center">
                            <label className="mb-0 ml-2 font-semibold" htmlFor="description">
                                {t('nickName')}
                            </label>
                        </div>
                        <input id={'nickName'} type="text" placeholder={t('nickName')} className="form-input w-48 text-center" value={member.memberUsername} disabled={true} />
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <div className="flex content-center">
                            <label className="mb-0 ml-2 font-semibold" htmlFor="description">
                                {t('realName')}
                            </label>
                        </div>
                        <input id={'realName'} type="text" placeholder={t('realName')} className="form-input w-48 text-center" value={member.name + ' ' + member.lastname} disabled={true} />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-end gap-4">
                        <div className="w-100 flex content-center text-right">
                            <label className="mb-0 ml-2 font-semibold" htmlFor="description">
                                {t('status')}
                            </label>
                        </div>
                        <div className="flex w-48 gap-2">
                            <select id="ctnSelect1" className="form-select text-white-dark" required>
                                <option>{t('lock')} </option>
                                <option>{t('normal')} </option>
                                <option>{t('onlyLogin')} </option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <div className="flex content-center">
                            <label className="mb-0 ml-2 font-semibold" htmlFor="description">
                                {t('balance')}
                            </label>
                        </div>
                        <div className="flex w-48">
                            <CurrencyInput curency={member.balance} placeholder={t('balance')} id={'balance'} />
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <div className="flex content-center">
                            <label className="mb-0 ml-2 font-semibold" htmlFor="description">
                                {t('companyIncome')}
                            </label>
                        </div>
                        <div className="flex w-48">
                            <CurrencyInput curency={member.companyIncome} placeholder={t('companyIncome')} id={'companyIncome'} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-end gap-4">
                        <div className="flex content-center">
                            <label className="mb-0 ml-2 font-semibold" htmlFor="description">
                                {t('vipLevel')}
                            </label>
                        </div>
                        <select id="ctnSelect1" className="form-select w-48 text-white-dark" required>
                            <option> {t('Platinum II 56-69')} </option>
                            <option>{t('one')}</option>
                            <option>{t('two')}</option>
                            <option>{t('three')}</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <div className="flex content-center">
                            <label className="mb-0 ml-2 font-semibold" htmlFor="description">
                                {t('creditLevel')}
                            </label>
                        </div>
                        <input id={'creditLevel'} type="text" placeholder={t('creditLevel')} className="form-input w-48 text-center" value={member.memberCreditLevel} disabled={true} />
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <div className="flex content-center">
                            <label className="mb-0 ml-2 font-semibold" htmlFor="description">
                                {t('agentName')}
                            </label>
                        </div>
                        <input id={'agentName'} type="text" placeholder={t('agentName')} className="form-input w-48 text-center" value={member.agent} disabled={true} />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <div className="content-start gap-3">
                        <div className="mb-2 flex items-center justify-end gap-4">
                            <div className="flex content-center">
                                <label className="mb-0 ml-2 font-semibold" htmlFor="description">
                                    {t('memberTags')}
                                </label>
                            </div>
                            <input
                                id={'memeberTags'}
                                type="text"
                                placeholder={t('memberTags')}
                                className="form-input w-48"
                                value={member.memberTags.length > 0 ? member.memberTags : '-'}
                                disabled={true}
                            />
                        </div>
                        <div className="flex items-center justify-end gap-4" onClick={() => openModal('ModalMemberRemark', member)}>
                            <div className="flex content-center">
                                <label className="mb-0 ml-2 font-semibold" htmlFor="description">
                                    {t('memberRemark')}
                                </label>
                            </div>
                            <input
                                id={'memberRemark'}
                                type="text"
                                placeholder={t('memberRemark')}
                                className="form-input w-48 cursor-pointer"
                                value={member.memberRemark}
                                onClick={() => openModal('ModalMemberRemark', member)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <ModalDefault type={modalType!} showModal={showModal} handleModal={setShowModal} user={member} />}
        </section>
    );
}
