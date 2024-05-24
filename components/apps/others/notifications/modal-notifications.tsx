'use client';
import { removeHtmlTags, showMessage } from '@/components/Utils';
import IconX from '@/components/icon/icon-x';
import { getTranslation } from '@/i18n';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { Notification, NotificationsLink } from '@/types/notificationService.types';
import { useMutation } from '@tanstack/react-query';
import { createNotification, deleteNotification, updateNotification } from '@/services/notificationService';

type inputData = {
    addNotificationModal: any;
    handleModalNotificationChange: any;
    notification: any;
};

const ModalNotifications = ({ addNotificationModal, handleModalNotificationChange, notification }: inputData) => {
    const { t } = getTranslation();
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (addNotificationModal && isFirstRender.current) {
            if (params.image) setImage([{ dataURL: params.image }]);

            if (params.icon) setIcon([{ dataURL: params.icon }]);
        }

        isFirstRender.current = false;
        return () => {
            isFirstRender.current = true;
        };
    }, []);

    // Mutaciones
    const mutation = useMutation({
        mutationKey: ['notification-add'],
        mutationFn: (data: any) => createNotification(data),
    });

    const mutationEdit = useMutation({
        mutationKey: ['notification-update'],
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

    const [params, setParams] = useState<Notification>(JSON.parse(JSON.stringify(notification ?? defaultParams)));

    // images
    const [images, setImage] = useState<any>([]);
    const maxNumber = 1;
    const onChangeImage = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImage(imageList as never[]);
        if (imageList.length > 0) {
            setParams({ ...params, ['image']: imageList[0].dataURL });
        }
    };

    // // icons
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
            handleModalNotificationChange('save_new', mutation);
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
        <Transition appear show={addNotificationModal} as={Fragment}>
            <Dialog
                as="div"
                open={addNotificationModal}
                onClose={(e) => {
                    setImage([]);
                    setIcon([]);
                    handleModalNotificationChange('modal', false);
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
                                            onClick={() => handleModalNotificationChange('modal', false)}
                                            className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 dark:hover:text-gray-600 ltr:right-4 rtl:left-4"
                                        >
                                            <IconX />
                                        </button>
                                        <div className="bg-[#fbfbfb] py-3 text-lg font-medium dark:bg-[#121c2c] ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5">
                                            {params._id ? t('add') : t('edit')} {t('notification')}
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
                                                <div className="mb-5">
                                                    <label htmlFor="extra_description">{t('extraDescription')}</label>
                                                    <ReactQuill id="extra_description" theme="snow" value={params.extra_description} onChange={(e) => (params.extra_description = e)} />
                                                </div>
                                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                                    <div className="mb-5">
                                                        <div className="custom-file-container" data-upload-id="myFirstImage">
                                                            <div className="label-container">
                                                                <label>{t('uploadImage')}</label>
                                                                <button
                                                                    type="button"
                                                                    className="custom-file-container__image-clear"
                                                                    title="Clear Image"
                                                                    onClick={() => {
                                                                        setImage([]);
                                                                    }}
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                            <label className="custom-file-container__custom-file"></label>
                                                            <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                                            <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                                            <ImageUploading value={images} onChange={onChangeImage} maxNumber={maxNumber} acceptType={['jpg', 'jpeg', 'png', 'svg']}>
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
                                                            {/* w-full max-w-md */}
                                                            {images.length === 0 ? <img src="/assets/images/file-preview.svg" className="m-auto w-[260px]" alt="" /> : ''}
                                                        </div>
                                                    </div>
                                                    <div className="mb-5">
                                                        <div className="custom-file-container" data-upload-id="icon">
                                                            <div className="label-container">
                                                                <label>{t('icon')}</label>
                                                                <button
                                                                    type="button"
                                                                    className="custom-file-container__image-clear"
                                                                    title="Clear Image"
                                                                    onClick={() => {
                                                                        setIcon([]);
                                                                    }}
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                            <label className="custom-file-container__custom-file"></label>
                                                            <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                                            <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                                            <ImageUploading value={icon} onChange={onChangeIcon} maxNumber={maxNumber} acceptType={['jpg', 'jpeg', 'png', 'svg']}>
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
                                                            {/* w-full max-w-md */}
                                                            {icon.length === 0 ? <img src="/assets/images/file-preview.svg" className="m-auto w-[260px]" alt="" /> : ''}
                                                        </div>
                                                    </div>
                                                    {/* <div className="mb-5">
                                                            <label htmlFor="number">{t('icon')}</label>
                                                            <select id="category" name="category" className="form-select" onChange={(e: any) => changeValue(e)}>
                                                                <option disabled={true} value=""></option>
                                                                <option value="icon-1">icono 1</option>
                                                                <option value="icon-2">icono 2</option>
                                                                <option value="icon-3">icono 3</option>
                                                                <option value="icon-4">icono 4</option>
                                                            </select>
                                                        </div> */}
                                                </div>
                                                <div className="mb-5">
                                                    <div className="table-responsive">
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>{t('link')}</th>
                                                                    <th>{t('description')}</th>
                                                                    <th className="!text-center">{t('actions')}</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {params.links && params.links.length <= 0 && (
                                                                    <tr>
                                                                        <td colSpan={2} className="!text-center font-semibold">
                                                                            {t('notItems')}
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                                {params.links &&
                                                                    params.links.map((link: NotificationsLink, ind: number) => {
                                                                        let lastId = 0;
                                                                        if (link.id == undefined) {
                                                                            params.links[ind].id = link.id = lastId;
                                                                            lastId++;
                                                                        }
                                                                        return (
                                                                            <tr className="align-top" key={link.id}>
                                                                                <td>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-input min-w-[200px]"
                                                                                        placeholder={t('link')}
                                                                                        defaultValue={link.link}
                                                                                        onChange={(e) => changeLinkValue(e, link, 'link')}
                                                                                    />
                                                                                </td>
                                                                                <td>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-input min-w-[200px]"
                                                                                        placeholder={t('description')}
                                                                                        defaultValue={link.description}
                                                                                        onChange={(e) => changeLinkValue(e, link, 'description')}
                                                                                    />
                                                                                </td>
                                                                                <td className="!text-center">
                                                                                    <button type="button" onClick={() => removeLink(link)}>
                                                                                        <IconX className="h-5 w-5" />
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="mt-6 flex flex-col justify-between px-4 sm:flex-row">
                                                        <button type="button" className="btn btn-primary" onClick={() => addLink()}>
                                                            {t('addLink')}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="mt-8 flex items-center justify-end">
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => handleModalNotificationChange('modal', false)}>
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

export default ModalNotifications;
