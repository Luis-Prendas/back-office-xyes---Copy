'use client';
import IconSearch from '@/components/icon/icon-search';
import IconUserPlus from '@/components/icon/icon-user-plus';
import IconX from '@/components/icon/icon-x';
import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useEffect, useMemo, useState } from 'react';

import { getTranslation } from '@/i18n';
import { useMutation, useQuery } from '@tanstack/react-query';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { VipTableHead } from './VipData';
import { showMessage } from '@/components/Utils';
import { createVip, deleteVip, getAllVips, updateVip } from '@/services/vipService';
import { Vip, ImageVip } from '@/types/vipService.type';
import ImageUploading, { ImageListType } from 'react-images-uploading';

const ComponentsAppsVip = () => {
    const { t } = getTranslation();

    // Mutaciones
    const mutation = useMutation({
        mutationKey: ['info-add'],
        mutationFn: (data: any) => createVip(data),
    });

    const mutationEdit = useMutation({
        mutationKey: ['info-update'],
        mutationFn: (data: any) => updateVip(data._id, data),
    });

    const mutationDelete = useMutation({
        mutationKey: ['info-delete'],
        mutationFn: (_id: string) => deleteVip(_id),
    });

    // Modal
    const [addHelpModal, setAddHelpModal] = useState<any>(false);

    // Misc
    const [value, _setValue] = useState<any>('list');

    const [defaultParams] = useState({
        _id: null,
        category: '',
        icon: '',
        image: { badge: '', pointer: '', color: '' },
        order: '',
        rewards: '',
        image_medal: '',
        info_levels: '',
        extra_missions_daily: 0,
        extra_missions_week: 0,
    });

    const [params, setParams] = useState<Vip>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const [search, setSearch] = useState<any>('');

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getVips'],
        queryFn: getAllVips,
    });

    const rawData: Array<Vip> = data?.code === 'success' ? data.data.vips : [];

    // const rawData: Vip[] = data?.code === 'success' ? data.data : [];

    const [filteredItems, setFilteredItems] = useState<Array<Vip>>(rawData);

    const recoveryData: Vip[] = useMemo(() => {
        // if (search) {
        //     const newData: Vip[] = rawData.filter((r: Vip) => {
        //         const name = r.;
        //         if (name && name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
        //             return r;
        //         }
        //     });
        //     const filterData: Vip[] = newData.filter((el: Vip) => el !== null);
        //     setFilteredItems(() => {
        //         return filterData;
        //     });
        //     return filterData;
        // } else {
        setFilteredItems(() => {
            return rawData;
        });
        return rawData;
        // }
    }, [search, data]);

    useEffect(() => {
        searchHelp();
    }, [search]);

    // Actions
    const handleDeleteHelp = async (help: Vip | null = null) => {
        if (help == null || help._id == undefined || help._id == null) {
            showMessage(t('deleteError') + t('help'), 'error');
            return;
        }
        const mutation = await mutationDelete.mutateAsync(help._id);

        if (mutation.code === 'success') {
            setFilteredItems(filteredItems.filter((d: Vip) => d._id !== help?._id));
            showMessage(t('help') + t('deleteSuccess'));
        } else {
            showMessage(t('deleteError') + t('help'), 'error');
        }
    };

    const saveHelp = async () => {
        if (!params.category) {
            showMessage(t('title') + t('isRequired') + '.', 'error');
            return true;
        }
        // if (!params.route) {
        //     showMessage(t('title') + t('isRequired') + '.', 'error');
        //     return true;
        // }
        // if (!params.category) {
        //     showMessage(t('title') + t('isRequired') + '.', 'error');
        //     return true;
        // }
        // if (!params.description) {
        //     showMessage(t('title') + t('isRequired') + '.', 'error');
        //     return true;
        // }
        let mutation: any;
        let vip: Vip;
        if (params._id) {
            //update
            vip = filteredItems.find((d: Vip) => d._id === params._id) ?? defaultParams;
            vip.category = params.category;
            vip.icon = params.icon;
            vip.image = params.image;
            vip.order = params.order;
            vip.rewards = params.rewards;
            vip.image_medal = params.image_medal;
            vip.info_levels = params.info_levels;
            vip.extra_missions_daily = params.extra_missions_daily;
            vip.extra_missions_week = params.extra_missions_week;
            mutation = await mutationEdit.mutateAsync(vip);
        } else {
            vip = {
                category: params.category,
                icon: params.icon,
                image: params.image,
                order: params.order,
                rewards: params.rewards,
                image_medal: params.image_medal,
                info_levels: params.info_levels,
                extra_missions_daily: params.extra_missions_daily,
                extra_missions_week: params.extra_missions_week,
            };
            mutation = await mutation.mutateAsync(vip);
            vip._id = mutation.data._id;
            filteredItems.splice(0, 0, vip);
        }
        if (mutation.code === 'success') {
            setFilteredItems(filteredItems.filter((d: Vip) => d._id !== vip?._id));
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
            return filteredItems.filter((item: Vip) => {
                return item.category.toLowerCase().includes(search.toLowerCase());
            });
        });
    };

    const editHelp = (help: Vip | null = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (help) {
            let json1 = JSON.parse(JSON.stringify(help));
            setParams(json1);
        }
        setAddHelpModal(true);
    };

    const [medal, setMedal] = useState<any>([]);
    const onChangeMedal = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setMedal(imageList as never[]);
        if (imageList.length > 0) {
            params.image_medal = imageList[0].dataURL ?? '';
        }
    };

    const [badge, setBadge] = useState<any>([]);
    const maxNumber = 1;
    const onChangeBadge = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setBadge(imageList as never[]);
        if (imageList.length > 0) {
            params.image.badge = imageList[0].dataURL;
        }
    };

    const [pointer, setPointer] = useState<any>([]);
    const onChangePointer = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setPointer(imageList as never[]);
        if (imageList.length > 0) {
            params.image.pointer = imageList[0].dataURL;
        }
    };

    const changeValueColor = (e: any) => {
        const { value, id } = e.target;
        params.image.color = value;
        console.log(params);
    };

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">{t('vip')}</h2>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editHelp()}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                {t('addVip')}
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
                                    {VipTableHead &&
                                        VipTableHead.map((head) => {
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
                                    filteredItems.map((vip: Vip) => {
                                        const imageVip: ImageVip = vip.image;
                                        return (
                                            <tr key={vip._id}>
                                                <td>
                                                    <img className="h-12 w-12 rounded" src={vip.image_medal} />
                                                </td>
                                                <td>{vip.category}</td>
                                                <td>
                                                    <img className="h-12 w-12 rounded" src={imageVip.badge} />
                                                </td>
                                                <td>
                                                    <img className="h-12 w-12 rounded" src={imageVip.pointer} />
                                                </td>
                                                <td>
                                                    <span className="badge bg-dark" style={{ backgroundColor: imageVip.color, color: '#000' }}>
                                                        {imageVip.color}
                                                    </span>
                                                </td>
                                                <td>{vip.order}</td>
                                                <td>{vip.extra_missions_daily}</td>
                                                <td>{vip.extra_missions_week}</td>
                                                <td>{vip.info_levels}</td>
                                                <td>
                                                    <div className="flex items-center justify-center gap-4">
                                                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editHelp(vip)}>
                                                            {t('edit')}
                                                        </button>
                                                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteHelp(vip)}>
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
                                        {params._id ? t('edit') : t('add')} {t('vip')}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
                                                <div className="mb-5">
                                                    <div className="custom-file-container" data-upload-id="myFirstImage">
                                                        <div className="label-container">
                                                            <label>{t('uploadMedal')}</label>
                                                            <button
                                                                type="button"
                                                                className="custom-file-container__image-clear"
                                                                title="Clear Image"
                                                                onClick={() => {
                                                                    setMedal([]);
                                                                }}
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                        <label className="custom-file-container__custom-file"></label>
                                                        <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                                        <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                                        <ImageUploading value={medal} onChange={onChangeMedal} maxNumber={maxNumber} acceptType={['jpg', 'jpeg', 'png', 'svg']}>
                                                            {({ imageList, onImageUpload }) => (
                                                                <div className="upload__image-wrapper">
                                                                    <button type="button" className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                                        {t('chooseFile')}
                                                                    </button>
                                                                    &nbsp;
                                                                    {imageList.map((image, index) => (
                                                                        <div key={index} className="custom-file-container__image-preview relative">
                                                                            <img src={image.dataURL} alt="img" className="m-auto w-[260px]" />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </ImageUploading>
                                                        {medal.length === 0 ? <img src="/assets/images/file-preview.svg" className="m-auto w-[260px]" alt="" /> : ''}
                                                    </div>
                                                </div>
                                                <div className="mb-5">
                                                    <div className="custom-file-container" data-upload-id="myFirstImage">
                                                        <div className="label-container">
                                                            <label>{t('uploadBadge')}</label>
                                                            <button
                                                                type="button"
                                                                className="custom-file-container__image-clear"
                                                                title="Clear Image"
                                                                onClick={() => {
                                                                    setBadge([]);
                                                                }}
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                        <label className="custom-file-container__custom-file"></label>
                                                        <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                                        <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                                        <ImageUploading value={badge} onChange={onChangeBadge} maxNumber={maxNumber} acceptType={['jpg', 'jpeg', 'png', 'svg']}>
                                                            {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                                                <div className="upload__image-wrapper">
                                                                    <button type="button" className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                                        {t('chooseFile')}
                                                                    </button>
                                                                    &nbsp;
                                                                    {imageList.map((image, index) => (
                                                                        <div key={index} className="custom-file-container__image-preview relative">
                                                                            <img src={image.dataURL} alt="img" className="m-auto w-[260px]" />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </ImageUploading>
                                                        {/* w-full max-w-md */}
                                                        {badge.length === 0 ? <img src="/assets/images/file-preview.svg" className="m-auto w-[260px]" alt="" /> : ''}
                                                    </div>
                                                </div>
                                                <div className="mb-5">
                                                    <div className="custom-file-container" data-upload-id="myFirstImage">
                                                        <div className="label-container">
                                                            <label>{t('uploadPointer')}</label>
                                                            <button
                                                                type="button"
                                                                className="custom-file-container__image-clear"
                                                                title="Clear Image"
                                                                onClick={() => {
                                                                    setPointer([]);
                                                                }}
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                        <label className="custom-file-container__custom-file"></label>
                                                        <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                                        <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                                        <ImageUploading value={pointer} onChange={onChangePointer} maxNumber={maxNumber} acceptType={['jpg', 'jpeg', 'png', 'svg']}>
                                                            {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                                                <div className="upload__image-wrapper">
                                                                    <button type="button" className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                                                        {t('chooseFile')}
                                                                    </button>
                                                                    &nbsp;
                                                                    {imageList.map((image, index) => (
                                                                        <div key={index} className="custom-file-container__image-preview relative">
                                                                            <img src={image.dataURL} alt="img" className="m-auto w-[260px]" />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </ImageUploading>
                                                        {/* w-full max-w-md */}
                                                        {pointer.length === 0 ? <img src="/assets/images/file-preview.svg" className="m-auto w-[260px]" alt="" /> : ''}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                                                <div className="mb-5">
                                                    <label htmlFor="category">{t('category')}</label>
                                                    <input id="category" type="text" placeholder={t('category')} className="form-input" value={params.category} onChange={(e) => changeValue(e)} />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="color">{t('color')}</label>
                                                    <input
                                                        id="color"
                                                        type="color"
                                                        placeholder={t('color')}
                                                        className="form-input"
                                                        value={params.image.color}
                                                        onChange={(e) => changeValueColor(e)}
                                                        style={{ padding: '3px', height: '38px' }}
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="extra_missions_daily">{t('extraMissionsDaily')}</label>
                                                    <input
                                                        id="extra_missions_daily"
                                                        type="number"
                                                        placeholder={t('extraMissionsDaily')}
                                                        className="form-input"
                                                        value={params.extra_missions_daily}
                                                        onChange={(e) => changeValue(e)}
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="extra_missions_week">{t('extraMissionsWeek')}</label>
                                                    <input
                                                        id="extra_missions_week"
                                                        type="number"
                                                        placeholder={t('extraMissionsWeek')}
                                                        className="form-input"
                                                        value={params.extra_missions_week}
                                                        onChange={(e) => changeValue(e)}
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="info_levels">{t('infoLevels')}</label>
                                                    <input
                                                        id="info_levels"
                                                        type="text"
                                                        placeholder={t('infoLevels')}
                                                        className="form-input"
                                                        value={params.info_levels}
                                                        onChange={(e) => changeValue(e)}
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="order">{t('order')}</label>
                                                    <input id="order" type="number" placeholder={t('order')} className="form-input" value={params.order} onChange={(e) => changeValue(e)} />
                                                </div>
                                            </div>
                                            <div className="mt-8 flex items-center justify-end">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddHelpModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveHelp}>
                                                    {/* <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleSubmit(HandleSaveUpdateHelp)}> */}
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

export default ComponentsAppsVip;
