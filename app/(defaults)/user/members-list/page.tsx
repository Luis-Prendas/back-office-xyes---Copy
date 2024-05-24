import ComponentsUsersMembersLists from '@/components/apps/users/members-list/components-user-members-list';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Members list',
};

const Contacts = () => {
    return <ComponentsUsersMembersLists />;
};

export default Contacts;
