'use client';
import IconSearch from '@/components/icon/icon-search';
import IconUserPlus from '@/components/icon/icon-user-plus';
import IconX from '@/components/icon/icon-x';
import { showMessage } from '@/components/Utils';
import { getTranslation } from '@/i18n';
import { createInfo, deleteInfo, getAllInfos, updateInfo } from '@/services/infoService';
import { Dialog, Transition } from '@headlessui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Fragment, useEffect, useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { HelpCenterTableHead } from './helpCenterData';
import { Info } from '@/types/infoService.type';

const ComponentsAppsHelpCenter = () => {
    const { t } = getTranslation();

    // Mutaciones
    const mutationHelpCenterAdd = useMutation({
        mutationKey: ['info-add'],
        mutationFn: (data: any) => createInfo(data),
    });

    const mutationHelpCenterEdit = useMutation({
        mutationKey: ['info-update'],
        mutationFn: (data: any) => updateInfo(data._id, data),
    });

    const mutationHelpCenterDelete = useMutation({
        mutationKey: ['info-delete'],
        mutationFn: (_id: string) => deleteInfo(_id),
    });

    // Modal
    const [addHelpModal, setAddHelpModal] = useState<any>(false);

    // Misc
    const [value, _setValue] = useState<any>('list');

    const [defaultParams] = useState({
        _id: null,
        name: '',
        route: '',
        category: '',
        description: '',
    });

    const [params, setParams] = useState<Info>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const [search, setSearch] = useState<any>('');

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getInfos'],
        queryFn: getAllInfos,
    });

    const rawData: Info[] = data?.code === 'success' ? data.data : [];

    const [filteredItems, setFilteredItems] = useState<Array<Info>>(rawData);

    const recoveryData: Info[] = useMemo(() => {
        if (search) {
            const newData: Info[] = rawData.filter((r: Info) => {
                const name = r.name;
                if (name && name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    return r;
                }
            });
            const filterData: Info[] = newData.filter((el: Info) => el !== null);
            setFilteredItems(() => {
                return filterData;
            });
            return filterData;
        } else {
            setFilteredItems(() => {
                return rawData;
            });
            return rawData;
        }
    }, [search, data]);

    useEffect(() => {
        searchHelp();
    }, [search]);

    // Actions
    const handleDeleteHelp = async (help: Info | null = null) => {
        if (help == null || help._id == undefined || help._id == null) {
            showMessage(t('deleteError') + t('help'), 'error');
            return;
        }
        const mutation = await mutationHelpCenterDelete.mutateAsync(help._id);

        if (mutation.code === 'success') {
            setFilteredItems(filteredItems.filter((d: Info) => d._id !== help?._id));
            showMessage(t('help') + t('deleteSuccess'));
        } else {
            showMessage(t('deleteError') + t('help'), 'error');
        }
    };

    const saveHelp = async () => {
        if (!params.name) {
            showMessage(t('name') + t('isRequired') + '.', 'error');
            return true;
        }
        if (!params.route) {
            showMessage(t('route') + t('isRequired') + '.', 'error');
            return true;
        }
        if (!params.category) {
            showMessage(t('category') + t('isRequired') + '.', 'error');
            return true;
        }
        if (!params.description) {
            showMessage(t('description') + t('isRequired') + '.', 'error');
            return true;
        }
        let mutation: any;
        let help: Info;
        if (params._id) {
            //update
            help = filteredItems.find((d: Info) => d._id === params._id) ?? defaultParams;
            help.name = params.name;
            help.route = params.route;
            help.category = params.category;
            help.description = params.description;
            mutation = await mutationHelpCenterEdit.mutateAsync(help);
        } else {
            help = {
                name: params.name,
                route: params.route,
                category: params.category,
                description: params.description,
            };
            mutation = await mutationHelpCenterAdd.mutateAsync(help);
            help._id = mutation.data._id;
            filteredItems.splice(0, 0, help);
        }
        if (mutation.code === 'success') {
            setFilteredItems(filteredItems.filter((d: Info) => d._id !== help?._id));
            showMessage(t('help') + t('editSuccess'));
        } else {
            showMessage(t('deleteError') + t('help'), 'error');
        }
        setAddHelpModal(true);

        const msg = t('help') + t('savedSuccess');
        searchHelp();
        showMessage(msg);
        setAddHelpModal(false);
    };

    const searchHelp = () => {
        setFilteredItems(() => {
            return filteredItems.filter((item: Info) => {
                return item.name?.toLowerCase().includes(search.toLowerCase());
            });
        });
    };

    const editHelp = (help: Info | null = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (help) {
            let json1 = JSON.parse(JSON.stringify(help));
            setParams(json1);
        }
        setAddHelpModal(true);
    };

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">{t('helpCenter')}</h2>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editHelp()}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                {t('addHelp')}
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder={t('searchHelp')} className="peer form-input py-2 ltr:pr-11 rtl:pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
            {value === 'list' && (
                <div className="panel mt-5 overflow-hidden border-0 p-0">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    {HelpCenterTableHead &&
                                        HelpCenterTableHead.map((head) => {
                                            return (
                                                <th key={head.value} className={head.class ?? ''}>
                                                    {head.text}
                                                </th>
                                            );
                                        })}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems &&
                                    filteredItems.map((help: Info) => {
                                        return (
                                            <tr key={help._id}>
                                                <td>{help.name}</td>
                                                <td>{help.route}</td>
                                                <td className="whitespace-nowrap">{help.category}</td>
                                                <td>
                                                    <div className="flex items-center justify-center gap-4">
                                                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editHelp(help)}>
                                                            {t('edit')}
                                                        </button>
                                                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteHelp(help)}>
                                                            {t('delete')}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <Transition appear show={addHelpModal} as={Fragment}>
                <Dialog as="div" open={addHelpModal} onClose={() => setAddHelpModal(false)} className="relative z-50">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-[999] bg-[black]/60">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel my-8 w-full max-w-5xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddHelpModal(false)}
                                        className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 dark:hover:text-gray-600 ltr:right-4 rtl:left-4"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium dark:bg-[#121c2c] ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5">
                                        {params._id ? t('add') : t('edit')} {t('help')}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="name">{t('name')}</label>
                                                <input id="name" type="text" placeholder={t('name')} className="form-input" value={params.name} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="route">{t('route')}</label>
                                                <input id="route" type="text" placeholder={t('route')} className="form-input" value={params.route} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="number">{t('category')}</label>
                                                <select id="category" name="select" className="form-select" onChange={(e: any) => changeValue(e)}>
                                                    <option disabled={true} value=""></option>
                                                    <option value="legal-aspects-and-regulations">Legal aspects and regulations</option>
                                                    <option value="general-information">General Information</option>
                                                    <option value="functionalities">Funcionalities</option>
                                                    <option value="providers">Providers</option>
                                                </select>
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="description">{t('description')}</label>
                                                <ReactQuill id="description" theme="snow" value={params.description} onChange={(e) => (params.description = e)} />
                                            </div>
                                            <div className="mt-8 flex items-center justify-end">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddHelpModal(false)}>
                                                    {t('cancel')}
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveHelp}>
                                                    {/* <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleSubmit(HandleSaveUpdateHelp)}> */}
                                                    {params._id ? t('update') : t('add')}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ComponentsAppsHelpCenter;
