import ComponentsAppsRiskReview from '@/components/apps/member-balance/riskReview/components-apps-risk-review';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Notifications',
};

export default function DepositReview() {
    return <ComponentsAppsRiskReview />;
}
