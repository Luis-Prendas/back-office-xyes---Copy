import { getTranslation } from '@/i18n';
const { t } = getTranslation();

const MembersListTableHead = [
    {
        text: 'username',
        value: 'username',
        extras: ['id'],
        class: '!text-center',
    },
    {
        text: 'name',
        value: 'name',
        class: '!text-center',
    },
    {
        text: 'partnerSite',
        value: 'partnerSite',
        class: '!text-center',
    },
    {
        text: 'agent',
        value: 'agent',
        class: '!text-center',
    },
    {
        text: 'memberGrade',
        value: 'memberGrade',
        class: '!text-center',
    },
    {
        text: 'referralAccount',
        value: 'referralAccount',
        class: '!text-center',
    },
    {
        text: 'memberCreditLevel',
        value: 'memberCreditLevel',
        class: '!text-center',
    },
    {
        text: 'depositWithdraw',
        value: 'depositWithdraw',
        class: '!text-center',
    },
    {
        text: 'balanceTotal',
        value: 'balanceTotal',
        class: '!text-center',
    },
    {
        text: 'companyIncome',
        value: 'companyIncome',
        class: '!text-center',
    },
    {
        text: 'memberBonus',
        value: 'memberBonus',
        class: '!text-center',
    },
    {
        text: 'memberTags',
        value: 'memberTags',
        class: '!text-center',
    },
    {
        text: 'memberRemark',
        value: 'memberRemark',
        class: '!text-center',
    },
    {
        text: 'firstIp',
        value: 'firstIp',
        extras: ['domain', 'date'],
        class: '!text-center',
    },
    {
        text: 'lastIp',
        value: 'lastIp',
        extras: ['domain', 'date'],
        class: '!text-center',
    },
    {
        text: 'status',
        value: 'status',
        class: '!text-center',
    },
    {
        text: 'actions',
        value: 'actions',
        class: '!text-center',
    },
];

const balanceData = {
    fiat: 1000,
    cryto: [
        {
           _id: 1,
            coinId: 1283,
            symbol: 'BUSD',
             logoUrl: 'https://resource.cwallet.com/token/icon/farmerdoge.jpg',
            status: 'Normal',
            amount: 100
        },
        {
            _id: 2,
            coinId: 1283,
            symbol: 'PEOPLE',
            logoUrl: 'https://resource.cwallet.com/token/icon/farmerdoge.jpg',
            status: 'Normal',
            amount: 100
        },
        {
           _id: 3,
            coinId: 1283,
            symbol: 'XRP',
            logoUrl: 'https://resource.cwallet.com/token/icon/farmerdoge.jpg',
            status: 'Normal',
            amount: 100
        },
        {
           _id: 4,
            coinId: 1283,
            symbol: 'ETH',
            logoUrl: 'https://resource.cwallet.com/token/icon/farmerdoge.jpg',
            status: 'Normal',
            amount: 100
        },
        {
           _id: 5,
            coinId: 1283,
            symbol: 'BTC',
            logoUrl: 'https://resource.cwallet.com/token/icon/farmerdoge.jpg',
            status: 'Normal',
            amount: 100
        },
        {
           _id: 6,
            coinId: 1283,
            symbol: 'SOL',
            logoUrl: 'https://resource.cwallet.com/token/icon/farmerdoge.jpg',
            status: 'Normal',
            amount: 100
        }
    ]
}

export { MembersListTableHead, balanceData };
