import { getTranslation } from '@/i18n';
const { t } = getTranslation();

const CompanyIncomeTotalHead = [
    {
        text: 'Bet Amount Total',
        value: 'Bet Amount Total',
        class: '!text-center border border-gray-400',
    },
    {
        text: 'Win Amount Total',
        value: 'Win Amount Total',
        class: '!text-center border border-gray-400',
    },
    {
        text: 'bonusTotal',
        value: 'bonusTotal',
        class: '!text-center border border-gray-400',
    },
    {
        text: 'incomeTotal',
        value: 'incomeTotal',
        class: '!text-center border border-gray-400',
    }
];

const CompanyWinLossHead = [
    {
        text: 'Bet Amount Total',
        value: 'Bet Amount Total',
        class: '!text-center border border-gray-400',
    },
    {
        text: 'Win Amount Total',
        value: 'Win Amount Total',
        class: '!text-center border border-gray-400',
    },
    {
        text: 'Win Loss Total',
        value: 'Win Loss Total',
        class: '!text-center border border-gray-400',
    },
    {
        text: 'Wallet Total',
        value: 'Wallet Total',
        class: '!text-center border border-gray-400',
    }
];

export { CompanyIncomeTotalHead, CompanyWinLossHead };
