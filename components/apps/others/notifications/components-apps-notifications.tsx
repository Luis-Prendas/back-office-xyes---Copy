'use client';
import { removeHtmlTags, showMessage } from '@/components/Utils';
import IconSearch from '@/components/icon/icon-search';
import IconUserPlus from '@/components/icon/icon-user-plus';
import { getTranslation } from '@/i18n';
import { deleteNotification, getAllNotifications } from '@/services/notificationService';
import { Notification } from '@/types/notificationService.types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import ModalNotifications from './modal-notifications';
import { NotificationsTableHead } from './notificationsData';

const ComponentsAppsNotifications = () => {
    const { t } = getTranslation();

    // Modal
    const [addNotificationModal, setAddNotificationModal] = useState<boolean>(false);

    const handleModalNotificationChange = (action: string, data: any) => {
        switch (action) {
            case 'modal':
                setAddNotificationModal(data);
                break;
            case 'save_new':
                saveNotis(data);
            default:
                break;
        }
    };

    // Misc
    const [value, _setValue] = useState<any>('list');

    const [search, setSearch] = useState<any>('');

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getNotifications'],
        queryFn: getAllNotifications,
    });

    const [noti, setParams] = useState<Notification | null>();

    const rawData: Notification[] = data?.code === 'success' ? data.data.notifications : [];

    const [filteredItems, setFilteredItems] = useState<Array<Notification>>(rawData);

    const recoveryData: Notification[] = useMemo(() => {
        if (search) {
            const newData: Notification[] = rawData.filter((r: Notification) => {
                const title = r.title;
                if (title && title.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    return r;
                }
            });
            const filterData: Notification[] = newData.filter((el: Notification) => el !== null);
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
        searchNotis();
    }, [search]);

    const mutationDelete = useMutation({
        mutationKey: ['notification-delete'],
        mutationFn: (_id: string) => deleteNotification(_id),
    });

    // Actions
    const handleDeleteNotis = async (noti: Notification | null = null) => {
        if (noti == null || noti._id == undefined || noti._id == null) {
            showMessage(t('deleteError') + t('notification'), 'error');
            return;
        }
        const mutation = await mutationDelete.mutateAsync(noti._id);

        if (mutation.code === 'success') {
            setFilteredItems(filteredItems.filter((d: Notification) => d._id !== noti?._id));
            showMessage(t('notification') + t('deleteSuccess'));
        } else {
            showMessage(t('deleteError') + t('notification'), 'error');
        }
    };

    const saveNotis = async (result: any) => {
        if (result.code === 'success') {
            const msg = t('notification') + t('savedSuccess');
            showMessage(msg);
        } else {
            showMessage(t('deleteError') + t('notification'), 'error');
        }
        searchNotis();
        setAddNotificationModal(false);
    };

    const searchNotis = () => {
        setFilteredItems(() => {
            return filteredItems.filter((item: Notification) => {
                return item.title.toLowerCase().includes(search.toLowerCase());
            });
        });
    };

    const editNotis = (noti: Notification | null = null) => {
        setParams(noti);
        setAddNotificationModal(true);
    };

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">{t('notifications')}</h2>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editNotis()}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                {t('addNotifications')}
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder={t('searchNotification')} className="peer form-input py-2 ltr:pr-11 rtl:pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                                    {NotificationsTableHead &&
                                        NotificationsTableHead.map((head) => {
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
                                    filteredItems.map((noti: Notification) => {
                                        return (
                                            <tr key={noti._id}>
                                                <td>{noti.title}</td>
                                                <td>{noti.description}</td>
                                                <td className="whitespace-nowrap">{removeHtmlTags(noti.extra_description)}</td>
                                                <td className="whitespace-nowrap">{noti.image ? <img src={noti.image} className="h-12 w-12 rounded" /> : <></>}</td>
                                                <td className="whitespace-nowrap">{noti.icon ? <img src={noti.icon} className="h-12 w-12 rounded" /> : <></>}</td>
                                                <td>
                                                    <div className="flex items-center justify-center gap-4">
                                                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editNotis(noti)}>
                                                            {t('edit')}
                                                        </button>
                                                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteNotis(noti)}>
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
            {addNotificationModal && (
                <ModalNotifications addNotificationModal={addNotificationModal} handleModalNotificationChange={handleModalNotificationChange} notification={noti}></ModalNotifications>
            )}
        </div>
    );
};

export default ComponentsAppsNotifications;
