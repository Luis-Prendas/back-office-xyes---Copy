'use client';
import { MEMBER_LIST_TABS, MEMBER_LIST_TABS_ROUTES } from '@/components/constans';
import { getEnviroment } from '@/services/getEnviroment';
import { useQuery } from '@tanstack/react-query';
import { Fragment, useEffect, useState } from 'react';
import ChatUserAccount from '../../chats/chat-user-account';
import CustomLoader from '../../loader/custom-loader';
import TableBonusRecord from '../../tables/bonus-record/table-bonus-record';
import TableGameRecord from '../../tables/game-record/table-game-record';
import { Tab } from '@headlessui/react';
import TableGameRecordByUser from '../../tables/game-record/table-game-record-by-user';
import { getTranslation } from '@/i18n';
import { queryClient } from '@/components/layouts/provider-component';
import TableTransactionRecordByUser from '../../tables/transaction-record/table-transaction-record-by-user';
import TableBankCardCryptoAddress from '../../tables/bank-card-crypto-address/table-bank-card-crypto-address';
import RiskInformationTabs from './risk-information-tab';
import AdminInformationTab from './admin-information-tab';
import { GetMemberByIdRootResponse } from '@/types/get-member-by-id';

export default function TapsGroup({ member }: { member: GetMemberByIdRootResponse }) {
    const authBaseUrl = getEnviroment();
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const { t } = getTranslation();

    const fetchQuery = async (url: string) => {
        const res = await fetch(url);
        if (res.status === 400) {
            throw new Error('Bad Request: Please check your request and try again.');
        }
        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }
        return await res.json();
    };

    const routePath = MEMBER_LIST_TABS_ROUTES[selectedTab];
    const fullRoute = `${authBaseUrl}${routePath}${member._id}${selectedTab === 3 ? '?page=1&limit=1' : ''}`;

    const { data, isLoading, error } = useQuery({
        queryKey: ['fetchData', selectedTab],
        queryFn: () => fetchQuery(fullRoute),
        refetchOnWindowFocus: false,
        staleTime: 30000,
    });

    const handleTabClick = (index: number) => {
        queryClient.clear();
        setSelectedTab(index);
    };

    return (
        <Tab.Group>
            <Tab.List className="flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                {MEMBER_LIST_TABS.map((tab) => (
                    <Tab key={tab.key} as={Fragment}>
                        {({ selected }) => (
                            <button
                                style={{ borderRadius: `${selected ? '0px 30px 0px 0px' : '0px'}` }}
                                className={`${
                                    selected && '!border-white-light !border-b-white text-info dark:!border-[#191e3a] dark:!border-b-black'
                                } -mb-[1px] flex items-center border border-transparent p-3.5 py-2 !outline-none transition duration-300 hover:text-info`}
                                onClick={() => handleTabClick(tab.key)}
                            >
                                {t(tab.label)}
                            </button>
                        )}
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel>
                    <div className="h-[49rem]">{isLoading && data ? <CustomLoader /> : <ChatUserAccount user={member} transactionDetail={data} />}</div>
                </Tab.Panel>
                <Tab.Panel>
                    <TableTransactionRecordByUser userId={member._id} />
                </Tab.Panel>
                <Tab.Panel>
                    <TableBonusRecord userId={member._id} />
                </Tab.Panel>
                <Tab.Panel>
                    <TableGameRecordByUser userId={member._id} />
                </Tab.Panel>
                <Tab.Panel>
                    <TableBankCardCryptoAddress userId={member._id} />
                </Tab.Panel>
                <Tab.Panel>
                    <RiskInformationTabs userId={member._id} />
                </Tab.Panel>
                <Tab.Panel>
                    <AdminInformationTab userId={member._id} />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
}
