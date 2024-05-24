import ComponentsAppsVip from '@/components/apps/others/vip/components-apps-vip';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Members list',
};

const AppsVip = () => {
    return <ComponentsAppsVip />;
};

export default AppsVip;
