import ComponentsAppsNotifications from '@/components/apps/others/notifications/components-apps-notifications';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Notifications',
};

const AppsNotifications = () => {
    return <ComponentsAppsNotifications />;
};

export default AppsNotifications;
