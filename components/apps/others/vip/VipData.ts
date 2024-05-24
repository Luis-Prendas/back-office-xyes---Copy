import { getTranslation } from '@/i18n';
const { t } = getTranslation();

const VipTableHead = [
    {
        text: t('medal'),
        value: 'image_medal',
        class: '',
    },
    {
        text: t('category'),
        value: 'category',
        class: '',
    },
    {
        text: t('badge'),
        value: 'badge',
        class: '',
    },
    {
        text: t('pointer'),
        value: 'pointer',
        class: '',
    },
    {
        text: t('color'),
        value: 'color',
        class: '',
    },
    {
        text: t('order'),
        value: 'order',
        class: '',
    },
    {
        text: t('extraMissionsDaily'),
        value: 'extra_missions_daily',
        class: '',
    },
    {
        text: t('extraMissionsWeek'),
        value: 'extra_missions_week',
        class: '',
    },
    {
        text: t('infoLevels'),
        value: 'infoLevels',
        class: '',
    },

    {
        text: t('actions'),
        value: 'actions',
        class: '!text-center',
    },
];

export { VipTableHead };
