'use client';
import { removeHtmlTags, showMessage } from '@/components/Utils';
import IconX from '@/components/icon/icon-x';
import { getTranslation } from '@/i18n';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, forwardRef, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { Notification, NotificationsLink } from '@/types/notificationService.types';
import { useMutation } from '@tanstack/react-query';
import { createNotification, deleteNotification, updateNotification } from '@/services/notificationService';

type inputData = {
    showModal: any;
    handleModal: any;
    user: any;
};
// getReferalsList
const ModalReferralAccount = ({ showModal, handleModal, user }: inputData) => {
    const { t } = getTranslation();
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (showModal && isFirstRender.current) {
        }
        isFirstRender.current = false;
        return () => {
            isFirstRender.current = true;
        };
    }, []);

    const mutationEdit = useMutation({
        mutationKey: ['partnerSite-update'],
        mutationFn: (data: any) => updateNotification(data._id, data),
    });

    // defaults
    const [defaultParams] = useState({
        _id: null,
        title: '',
        description: '',
        extra_description: '',
        links: [],
        image: '',
        icon: '',
    });

    const [params, setParams] = useState<Notification>(JSON.parse(JSON.stringify(user ?? defaultParams)));

    // images
    const [images, setImage] = useState<any>([]);
    const maxNumber = 1;
    const onChangeImage = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImage(imageList as never[]);
        if (imageList.length > 0) {
            setParams({ ...params, ['image']: imageList[0].dataURL });
        }
    };

    // icons
    const [icon, setIcon] = useState<any>([]);
    const onChangeIcon = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setIcon(imageList as never[]);
        if (imageList.length > 0) {
            setParams({ ...params, ['icon']: imageList[0].dataURL });
        }
    };

    // save process
    const saveNotis = async () => {
        if (!params.title) {
            showMessage(t('title') + t('isRequired') + '.', 'error');
            return true;
        }
        if (!params.description) {
            showMessage(t('description') + t('isRequired') + '.', 'error');
            return true;
        }
        if (!params.extra_description) {
            showMessage(t('extraDescription') + t('isRequired') + '.', 'error');
            return true;
        }
        let mutation: any;
        let notis: Notification;
        if (params._id) {
            // if update
            notis = params;
            notis.title = params.title;
            notis.description = params.description;
            notis.extra_description = params.extra_description;
            notis.links = params.links;
            notis.image = params.image;
            notis.icon = params.icon;
            mutation = await mutationEdit.mutateAsync(notis);
        } else {
            // if add
            // notis = {
            //     title: params.title,
            //     description: params.description,
            //     extra_description: params.extra_description,
            //     links: params.links,
            //     image: params.image,
            //     icon: params.icon,
            // };
            // mutation = await mutation.mutateAsync(notis);
            // notis._id = mutation.data.notification._id;
            // filteredItems.splice(0, 0, notis);
        }
        if (mutation.code === 'success') {
            setImage([]);
            setIcon([]);
            const msg = t('notification') + t('savedSuccess');
            handleModal('save_new', mutation);
            showMessage(msg);
        } else {
            showMessage(t('deleteError') + t('notification'), 'error');
        }
    };

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const [links, setLinks] = useState<Array<NotificationsLink>>([]);

    const addLink = () => {
        params.links = [
            ...links,
            {
                id: params.links?.length ?? 0,
                link: '',
                description: '',
            },
        ];
        setLinks(params.links);
    };

    const removeLink = (item: any = null) => {
        params.links = params.links.filter((d: any) => d.id !== item.id);
        setLinks(params.links);
    };

    const changeLinkValue = (e: any, link: any, field: 'description' | 'link') => {
        const { value } = e.target;
        params.links[link.id][field] = value;
    };

    return (
        <Transition appear show={showModal} as={Fragment}>
            <Dialog
                as="div"
                open={showModal}
                onClose={(e) => {
                    setImage([]);
                    setIcon([]);
                    handleModal(false);
                }}
                className="relative z-50"
                static={true}
            >
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
                            <div className="fixed inset-0 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4">
                                    <Dialog.Panel className="panel my-8 w-full max-w-5xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                        <button
                                            type="button"
                                            onClick={() => handleModal(false)}
                                            className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 dark:hover:text-gray-600 ltr:right-4 rtl:left-4"
                                        >
                                            <IconX />
                                        </button>
                                        {/* title */}
                                        <div className="bg-[#fbfbfb] py-3 text-lg font-medium dark:bg-[#121c2c] ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5">{t('referralAccount')}</div>
                                        <div className="w-1/2 p-10">
                                            <div className="flex flex-row rounded-md border border-gray-500/20 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)]">
                                                <div className="relative h-full w-full basis-1/3 pr-3">
                                                    <div className="mx-auto my-3 h-28 w-28 rounded-full bg-dark p-1">
                                                        <img srcSet={user.avatar} className="w-full" />
                                                    </div>
                                                </div>
                                                <div className="flex basis-2/3 items-center justify-center">
                                                    <div className="block">
                                                        <span className="block text-center text-4xl font-black">{user.username}</span>
                                                        <span className="block text-center text-2xl font-black">
                                                            {user.name} {user.lastname}
                                                        </span>
                                                        <span className="block text-center">{user._id}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <form>
                                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                                    <div className="mb-5">
                                                        <label htmlFor="title">{t('title')}</label>
                                                        <input id="title" type="text" placeholder={t('title')} className="form-input" value={params.title} onChange={(e) => changeValue(e)} />
                                                    </div>
                                                    <div className="mb-5">
                                                        <label htmlFor="description">{t('description')}</label>
                                                        <input
                                                            id="description"
                                                            type="text"
                                                            placeholder={t('description')}
                                                            className="form-input"
                                                            value={params.description}
                                                            onChange={(e) => changeValue(e)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-8 flex items-center justify-end">
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => handleModal(false)}>
                                                        {t('cancel')}
                                                    </button>
                                                    <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveNotis}>
                                                        {params._id ? t('update') : t('add')}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </Dialog.Panel>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ModalReferralAccount;
