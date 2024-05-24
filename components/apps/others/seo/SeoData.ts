import { getTranslation } from '@/i18n';
const { t } = getTranslation();

const SeoTableHead = [
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
        text: t('component'),
        value: 'component',
        class: '',
    },
    {
        text: t('language'),
        value: 'language',
        class: '',
    },
    {
        text: t('keywords'),
        value: 'keywords',
        class: '',
    },
    {
        text: t('actions'),
        value: 'actions',
        class: '!text-center',
    },
];

export { SeoTableHead };
