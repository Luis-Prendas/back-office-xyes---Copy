import { getTranslation } from "@/i18n";
import { Tab } from '@headlessui/react';
import { IconChevronRight } from "@tabler/icons-react";
import { FormEvent, Fragment, useState } from "react";
import TableRegionListEnabled from "./table-enabled";
import ModalRegionListAdd from "@/components/partials/modals/global-settings/region-list/modal-region-list-add";
import axios from "axios";
import { getEnviroment } from "@/services/getEnviroment";

export default function TableRegionList() {
    const { t } = getTranslation();
    const baseUrl = getEnviroment();
    const [showModalAdd, setShowModalAdd] = useState<boolean>(false)

    const handleSubmitAdd = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formElements = e.currentTarget.elements;

        const countryOrRegion = (formElements.namedItem('countryOrRegion') as HTMLInputElement).value;
        const regionCode = (formElements.namedItem('regionCode') as HTMLInputElement).value;
        const flagURL = (formElements.namedItem('flagURL') as HTMLInputElement).value;
        const currencyName = (formElements.namedItem('currencyName') as HTMLInputElement).value;
        const sorted = (formElements.namedItem('sorted') as HTMLInputElement).value;
        const currencyCode = (formElements.namedItem('currencyCode') as HTMLInputElement).value;

        const formValues = { countryOrRegion, regionCode, flagURL, currencyName, sorted, flag: true, disable: false, currencyCode }

        const fetchURL = new URL(`container/config/api/v1/addGlobalRegionList`, baseUrl).toString();

        try {
            await axios.post(fetchURL, formValues, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setShowModalAdd(false);
        } catch (error) {
            console.error('Error PUT:', error);
        }
    }

    return (
        <section className="flex flex-col items-start justify-start gap-4 w-full h-full">
            <div className="flex justify-center items-center text-xl font-bold">
                <IconChevronRight />
                <span>{t('globalRegionList')}</span>
            </div>

            <button onClick={() => setShowModalAdd(true)} className="btn btn-primary px-4 py-2">{t('addRegionInformation')}</button>

            <article className="w-full h-full flex flex-col">
                <Tab.Group>
                    <Tab.List className="flex justify-end items-center border-b border-info dark:border-[#191e3a]">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button className={`${selected && '!border-info border-b-2 !border-b-white text-info dark:!border-[#191e3a] dark:!border-b-black font-bold'} -mb-[1px] flex items-center border border-transparent p-3.5 py-2 !outline-none transition duration-300 hover:text-info`}>
                                    {t('enabled')}
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button className={`${selected && '!border-info border-b-2 !border-b-white text-info dark:!border-[#191e3a] dark:!border-b-black font-bold'} -mb-[1px] flex items-center border border-transparent p-3.5 py-2 !outline-none transition duration-300 hover:text-info`}>
                                    {t('disabled')}
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className='h-full'>
                        <Tab.Panel className='h-full'>
                            <section className='border border-t-0 border-info p-4 h-full'>
                                <TableRegionListEnabled />
                            </section>
                        </Tab.Panel>
                        <Tab.Panel className='h-full'>
                            <section className='border border-t-0 border-info p-4 h-full'>
                                <span>tab 2</span>
                            </section>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </article>

            {showModalAdd && (
                <ModalRegionListAdd handleModal={setShowModalAdd} showModal={showModalAdd} onSubmit={handleSubmitAdd} />
            )}
        </section>
    )
}