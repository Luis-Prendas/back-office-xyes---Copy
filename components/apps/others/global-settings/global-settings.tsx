'use client'
import { MEMBER_LIST_TABS } from '@/components/constans';
import TableRegionList from '@/components/partials/tables/global-settings/region-list/table-region-list';
import { getTranslation } from '@/i18n';
import { TABS_GLOBAL_SETTINGS } from '@/lib/tabs-global-settings';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

export default function GlobalSettings() {
    const { t } = getTranslation();

    return (
        <section className='bg-white w-full h-full p-4 flex flex-col'>
            <Tab.Group>
                <Tab.List className="flex justify-start items-center border-b border-info dark:border-[#191e3a]">
                    {TABS_GLOBAL_SETTINGS.map(tab => (
                        <Tab key={tab.key} as={Fragment}>
                            {({ selected }) => (
                                <button className={`${selected && '!border-info !border-b-white text-info dark:!border-[#191e3a] dark:!border-b-black font-bold'} -mb-[1px] flex items-center border border-transparent p-3.5 py-2 !outline-none transition duration-300 hover:text-info`}>
                                    {t(tab.label)}
                                </button>
                            )}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className='h-full'>
                    <Tab.Panel className='h-full'>
                        <section className='border border-t-0 border-info p-4 h-full'>
                            <span>tab 1</span>
                        </section>
                    </Tab.Panel>
                    <Tab.Panel className='h-full'>
                        <section className='border border-t-0 border-info p-4 h-full'>
                            <TableRegionList />
                        </section>
                    </Tab.Panel>
                    <Tab.Panel className='h-full'>
                        <section className='border border-t-0 border-info p-4 h-full'>
                            <span>tab 3</span>
                        </section>
                    </Tab.Panel>
                    <Tab.Panel className='h-full'>
                        <section className='border border-t-0 border-info p-4 h-full'>
                            <span>tab 4</span>
                        </section>
                    </Tab.Panel>
                    <Tab.Panel className='h-full'>
                        <section className='border border-t-0 border-info p-4 h-full'>
                            <span>tab 5</span>
                        </section>
                    </Tab.Panel>
                    <Tab.Panel className='h-full'>
                        <section className='border border-t-0 border-info p-4 h-full'>
                            <span>tab 6</span>
                        </section>
                    </Tab.Panel>
                    <Tab.Panel className='h-full'>
                        <section className='border border-t-0 border-info p-4 h-full'>
                            <span>tab 7</span>
                        </section>
                    </Tab.Panel>
                    <Tab.Panel className='h-full'>
                        <section className='border border-t-0 border-info p-4 h-full'>
                            <span>tab 8</span>
                        </section>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </section>
    )
}