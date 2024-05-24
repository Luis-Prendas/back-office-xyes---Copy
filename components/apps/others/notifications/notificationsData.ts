import { getTranslation } from '@/i18n';
const { t } = getTranslation();

const NotificationsTableHead = [
    {
        text: t('title'),
        value: 'title',
        class: '',
    },
    {
        text: t('description'),
        value: 'description',
        class: '',
    },
    {
        text: t('extraDescription'),
        value: 'extraDescription',
        class: '',
    },
    {
        text: t('image'),
        value: 'image',
        class: '',
    },
    {
        text: t('icon'),
        value: 'icon',
        class: '',
    },
    {
        text: t('actions'),
        value: 'actions',
        class: '!text-center',
    },
];

export { NotificationsTableHead };
