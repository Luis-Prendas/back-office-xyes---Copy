import ComponentsAppsSeo from '@/components/apps/others/seo/components-apps-seo';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Members list',
};

const AppsSeo = () => {
    return <ComponentsAppsSeo />;
};

export default AppsSeo;
