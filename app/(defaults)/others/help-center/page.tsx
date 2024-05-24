import ComponentsAppsHelpCenter from '@/components/apps/others/help-center/components-apps-help-center';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Help center',
};

const AppsHelpCenter = () => {
    return <ComponentsAppsHelpCenter />;
};

export default AppsHelpCenter;
