import ComponentsAppsWithdrawalReview from '@/components/apps/member-balance/withdrawalReview/components-apps-withdrawal-review';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Notifications',
};

export default function DepositReview() {
    return <ComponentsAppsWithdrawalReview />;
}
