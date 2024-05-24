'use client';
import IconSearch from '@/components/icon/icon-search';
import IconUserPlus from '@/components/icon/icon-user-plus';
import IconX from '@/components/icon/icon-x';
import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { getTranslation } from '@/i18n';
import { useMutation, useQuery } from '@tanstack/react-query';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { SeoTableHead } from './SeoData';
import { showMessage } from '@/components/Utils';
import { Seo } from '@/types/seoService.type';
import { createSeo, deleteSeo, getAllSeos, updateSeo } from '@/services/seoService';

import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

const ComponentsAppsSeo = () => {
    const { t } = getTranslation();

    // Mutaciones
    const mutation = useMutation({
        mutationKey: ['seo-add'],
        mutationFn: (data: any) => createSeo(data),
    });

    const mutationEdit = useMutation({
        mutationKey: ['seo-update'],
        mutationFn: (data: any) => updateSeo(data._id, data),
    });

    const mutationDelete = useMutation({
        mutationKey: ['seo-delete'],
        mutationFn: (_id: string) => deleteSeo(_id),
    });

    // Modal
    const [addSeoModal, setAddSeoModal] = useState<any>(false);

    // Misc
    const [value, _setValue] = useState<any>('list');

    const [defaultParams] = useState({
        _id: null,
        title: '',
        description: '',
        tags: [],
        component: '',
        language: '',
        status: '',
    });

    const [params, setParams] = useState<Seo>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const [search, setSearch] = useState<any>('');

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getSeos'],
        queryFn: getAllSeos,
    });

    const rawData: Seo[] = data?.code === 'success' ? data.data : [];

    const [filteredItems, setFilteredItems] = useState<Array<Seo>>(rawData);

    const recoveryData: Seo[] = useMemo(() => {
        if (search) {
            const newData: Seo[] = rawData.filter((r: Seo) => {
                const title = r.title;
                if (title && title.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    return r;
                }
            });
            const filterData: Seo[] = newData.filter((el: Seo) => el !== null);
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
        searchSeo();
    }, [search]);

    // Actions
    const handleDeleteSeo = async (seo: Seo | null = null) => {
        if (seo == null || seo._id == undefined || seo._id == null) {
            showMessage(t('deleteError') + t('seo'), 'error');
            return;
        }
        const mutation = await mutationDelete.mutateAsync(seo._id);

        if (mutation.code === 'success') {
            setFilteredItems(filteredItems.filter((d: Seo) => d._id !== seo?._id));
            showMessage(t('seo') + t('deleteSuccess'));
        } else {
            showMessage(t('deleteError') + t('seo'), 'error');
        }
    };

    const saveSeo = async () => {
        params.tags = tags ?? [];
        if (!params.title) {
            showMessage(t('title') + t('isRequired') + '.', 'error');
            return true;
        }
        if (!params.description) {
            showMessage(t('description') + t('isRequired') + '.', 'error');
            return true;
        }
        if (!params.component) {
            showMessage(t('component') + t('isRequired') + '.', 'error');
            return true;
        }
        if (!params.language) {
            showMessage(t('language') + t('isRequired') + '.', 'error');
            return true;
        }
        let mutation: any;
        let seo: Seo;
        if (params._id) {
            //update
            seo = filteredItems.find((d: Seo) => d._id === params._id) ?? defaultParams;
            seo.title = params.title;
            seo.description = params.description;
            seo.tags = params.tags;
            seo.component = params.component;
            seo.language = params.language;
            seo.status = params.status;
            mutation = await mutationEdit.mutateAsync(seo);
        } else {
            seo = {
                title: params.title,
                description: params.description,
                tags: params.tags,
                component: params.component,
                language: params.language,
                status: params.status,
            };
            mutation = await mutation.mutateAsync(seo);
            seo._id = mutation.data._id;
            filteredItems.splice(0, 0, seo);
        }
        if (mutation.code === 'success') {
            setFilteredItems(filteredItems.filter((d: Seo) => d._id !== seo?._id));
            showMessage(t('seo') + t('editSuccess'));
            setTags([]);
        } else {
            showMessage(t('deleteError') + t('seo'), 'error');
        }
        setAddSeoModal(true);

        const msg = t('seo') + t('savedSuccess');
        searchSeo();
        showMessage(msg);
        setAddSeoModal(false);
    };

    const searchSeo = () => {
        setFilteredItems(() => {
            return filteredItems.filter((item: Seo) => {
                return item.title.toLowerCase().includes(search.toLowerCase());
            });
        });
    };

    const editSeo = (seo: Seo | null = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (seo) {
            let json1 = JSON.parse(JSON.stringify(seo));
            setParams(json1);
            setTags(json1.tags);
        } else {
            setTags([]);
        }
        setAddSeoModal(true);
    };

    const [tags, setTags] = useState<any>(params?.tags);

    const handleChangeTags = (newTags: any) => {
        setTags(newTags);
    };

    function defaultRenderTag(props: any) {
        let { tag, key, disabled, onRemove, classNameRemove, getTagDisplayValue, ...other } = props;
        return (
            <span key={key} {...other}>
                {getTagDisplayValue(tag)}
                {
                    <a className={classNameRemove} onClick={(e) => onRemove(key)}>
                        {/* x */}
                    </a>
                }
            </span>
        );
    }

    function defaultRenderInput(props: any) {
        let { onChange, value, addTag, ...other } = props;
        return <input type="text" onChange={onChange} value={value} {...other} />;
    }

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">{t('seo')}</h2>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editSeo()}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                {t('addSeo')}
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder={t('searchSeo')} className="peer form-input py-2 ltr:pr-11 rtl:pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                                    {SeoTableHead &&
                                        SeoTableHead.map((head) => {
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
                                    filteredItems.map((seo: Seo) => {
                                        return (
                                            <tr key={seo._id}>
                                                <td>{seo.title}</td>
                                                <td>{seo.description}</td>
                                                <td>{seo.component}</td>
                                                <td>{seo.language}</td>
                                                <td className="whitespace-nowrap">
                                                    {seo.tags &&
                                                        seo.tags.map((tag: any) => {
                                                            return (
                                                                <>
                                                                    <span className="ml-2">#{tag}</span>
                                                                </>
                                                            );
                                                        })}
                                                </td>
                                                <td>
                                                    <div className="flex items-center justify-center gap-4">
                                                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editSeo(seo)}>
                                                            {t('edit')}
                                                        </button>
                                                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteSeo(seo)}>
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

            <Transition appear show={addSeoModal} as={Fragment}>
                <Dialog as="div" open={addSeoModal} onClose={() => setAddSeoModal(false)} className="relative z-50">
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
                                        onClick={() => setAddSeoModal(false)}
                                        className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 dark:hover:text-gray-600 ltr:right-4 rtl:left-4"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium dark:bg-[#121c2c] ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5">
                                        {params._id ? t('edit') : t('add')} {t('seo')}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="title">{t('title')}</label>
                                                <input id="title" type="text" placeholder={t('title')} className="form-input" value={params.title} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="description">{t('description')}</label>
                                                <input id="description" type="text" placeholder={t('description')} className="form-input" value={params.description} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                                                <div className="mb-5">
                                                    <label htmlFor="number">{t('component')}</label>
                                                    <select id="component" name="select" className="form-select" onChange={(e: any) => changeValue(e)}>
                                                        <option disabled={true} value=""></option>
                                                        <option value="home">Home</option>
                                                        <option value="casino">Casino</option>
                                                        <option value="sports">Sports</option>
                                                        <option value="racing">Racing</option>
                                                        <option value="lottery">Lottery</option>
                                                        <option value="wallet">Wallet</option>
                                                        <option value="help-center">Help center</option>
                                                        <option value="settings">Settings</option>
                                                    </select>
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="number">{t('language')}</label>
                                                    <select id="language" name="select" className="form-select" onChange={(e: any) => changeValue(e)}>
                                                        <option disabled={true} value=""></option>
                                                        <option value="en">English</option>
                                                        <option value="es">Spanish</option>
                                                        <option value="cz">Simplified Chinese</option>
                                                        <option value="czh">Traditional Chinese</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="keywords">{t('keywords')}</label>
                                                <TagsInput value={tags} addOnBlur onChange={handleChangeTags} renderTag={defaultRenderTag} renderInput={defaultRenderInput} />
                                                {/* <input id="keywords" type="text" placeholder={t('keywords')} className="form-input" value={params.tags} onChange={(e) => changeValue(e)} /> */}
                                            </div>

                                            <div className="mt-8 flex items-center justify-end">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddSeoModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveSeo}>
                                                    {params._id ? 'Update' : 'Add'}
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

export default ComponentsAppsSeo;
