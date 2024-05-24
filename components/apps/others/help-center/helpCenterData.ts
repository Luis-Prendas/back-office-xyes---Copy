import { getTranslation } from '@/i18n';
import { createInfo, deleteInfo, updateInfo } from '@/services/infoService';
import { useMutation } from '@tanstack/react-query';
const { t } = getTranslation();

const HelpCenterTableHead = [
    {
        text: t('name'),
        value: 'name',
        class: '',
    },
    {
        text: t('route'),
        value: 'route',
        class: '',
    },
    {
        text: t('category'),
        value: 'category',
        class: '',
    },
    {
        text: t('actions'),
        value: 'actions',
        class: '!text-center',
    },
];

export { HelpCenterTableHead };
