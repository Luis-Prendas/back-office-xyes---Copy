import React from 'react';
import ModalAgent from '@/components/partials/modals/modal-agent';
import ModalBalance from '@/components/partials/modals/modal-balance';
import ModalCompanyIncome from '@/components/partials/modals/modal-company-income';
import ModalDepositWithdraw from '@/components/partials/modals/modal-deposit-withdraw';
import ModalMemberBonus from '@/components/partials/modals/modal-member-bonus';
import ModalMemberCreditLevel from '@/components/partials/modals/modal-member-credit-level';
import ModalMemberGrade from '@/components/partials/modals/modal-member-grade';
import ModalMemberRemark from '@/components/partials/modals/modal-member-remark';
import ModalMemberTags from '@/components/partials/modals/modal-member-tags';
import ModalPartnerSite from '@/components/partials/modals/modal-partner-site';
import ModalUserAccount from '@/components/partials/modals/modal-user-account/modal-user-account';
import ModalReferralAccount from '@/components/partials/modals/modal-referral-account';
import ModalNotifications from '@/components/apps/others/notifications/modal-notifications';
import { User } from '@/types/usersService.types';

export const Modals = {
    ModalUserAccount,
    ModalPartnerSite,
    ModalAgent,
    ModalMemberGrade,
    ModalBalance,
    ModalCompanyIncome,
    ModalDepositWithdraw,
    ModalMemberBonus,
    ModalMemberCreditLevel,
    ModalMemberRemark,
    ModalMemberTags,
    ModalReferralAccount,
    ModalNotifications,
};

interface ModalProps {
    type: keyof typeof Modals; // Se asegura de que `type` solo pueda ser una de las claves de `Modals`
    showModal: boolean;
    handleModal: React.Dispatch<React.SetStateAction<boolean>>;
    user: any; // Cambia el tipo según lo que sea `userId`
}

export default function ModalDefault({ type, showModal, handleModal, user }: ModalProps) {
    const SpecificModal = Modals[type];

    if (!SpecificModal) {
        return null;
    }

    return <SpecificModal showModal={showModal} handleModal={handleModal} user={user} addNotificationModal={undefined} handleModalNotificationChange={undefined} notification={undefined} />;
}
