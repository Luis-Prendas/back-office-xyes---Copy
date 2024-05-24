import { getTranslation } from '@/i18n';

interface Props {
    userId: string
}

const TableBonusRecord = ({ userId }: Props) => {
    const { t } = getTranslation();

    return (
        <div className='flex flex-col gap-4 p-4 h-full'>
            <span className='font-bold text-red-500 mt-8 m-auto'>{t('errorToLoading')}</span>
        </div>
    );
};

export default TableBonusRecord;
