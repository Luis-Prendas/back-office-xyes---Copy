'use client';
import { columnsTabSelected, RISK_INFORMATION_LIST_SUB_TABS, RISK_INFORMATION_LIST_SUB_TABS_ROUTES } from '@/components/constans';
import { Fragment, useState } from 'react';
import { Tab } from '@headlessui/react';
import { getTranslation } from '@/i18n';
import { queryClient } from '@/components/layouts/provider-component';
import { MantineReactTable } from 'mantine-react-table';
import { getTableProps } from '@/components/Utils';
import { useGetDefaultInfo } from '@/hooks/useGetDefaultInfo';
import BankCardFilter from '../../filters/bank-card-crypto/filter-bank-card-crypto';

type Props = {
    userId: string;
};

export default function RiskInformationTabs({ userId }: Props) {
    const { t } = getTranslation();
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
    const [statusError, setMessageStatus] = useState(false);

    const routePath = RISK_INFORMATION_LIST_SUB_TABS_ROUTES[selectedTab];
    const fullRoute = `${routePath}${userId}?page=1&limit=1'`;

    //call READ hook
    const { data: fetchedUsers, isError: isLoadingUsersError, isFetching: isFetchingUsers, isLoading: isLoadingUsers, refetch } = useGetDefaultInfo(fullRoute, routePath, setMessageStatus);

    const handleTabClick = (index: number) => {
        queryClient.clear();
        setSelectedTab(index);
    };

    const fetchedData = fetchedUsers ? fetchedUsers.payload : [];

    const columns = columnsTabSelected(selectedTab);

    console.log(isLoadingUsersError);

    const table = getTableProps(setPagination, pagination, fetchedData, columns, false, isLoadingUsers, statusError, isFetchingUsers);

    return (
        <div>
            <div className="mb-8 rounded border border-gray-400 py-8">
                <BankCardFilter></BankCardFilter>
            </div>
            <Tab.Group>
                <Tab.List className="flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                    {RISK_INFORMATION_LIST_SUB_TABS.map((tab) => (
                        <Tab key={tab.key} as={Fragment}>
                            {({ selected }) => (
                                <button
                                    style={{ borderRadius: `${selected ? '0px 30px 0px 0px' : '0px'}` }}
                                    className={`${selected ? '!border-white-light !border-b-[#f3f1f1] bg-[#f3f1f1] text-info dark:!border-[#191e3a] dark:!border-b-black dark:bg-[#060818]' : ''}
                                                                            ' -mb-[1px] flex items-center border border-transparent p-3.5 py-2 !outline-none transition duration-300 hover:text-info`}
                                    onClick={() => handleTabClick(tab.key)}
                                >
                                    {t(tab.label)}
                                </button>
                            )}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels>
                    {RISK_INFORMATION_LIST_SUB_TABS.map((tab) => (
                        <Tab.Panel key={tab.key}>
                            <div>{<MantineReactTable table={table} />}</div>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
