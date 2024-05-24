import { getTranslation } from "@/i18n";
import { CheckboxSectionData } from "./partials/filters/transaction-record/types";
import { MRT_ColumnDef } from "mantine-react-table";
import { RiskInformationRecordData } from "@/types/riskInformation.types";

export type DafaultParams = {
    _id: null,
    title: '',
    description: '',
    extra_description: '',
    links: [],
    image: '',
    icon: '',
}

const { t } = getTranslation();

export const contactList = [
    {
        userId: 1,
        name: 'Nia Hillyer',
        path: 'profile-16.jpeg',
        time: '2:09 PM',
        preview: 'How do you do?',
        messages: [
            {
                fromUserId: 0,
                toUserId: 1,
                text: 'Hi, I am back from vacation',
            },
            {
                fromUserId: 0,
                toUserId: 1,
                text: 'How are you?',
            },
            {
                fromUserId: 1,
                toUserId: 0,
                text: 'Welcom Back',
            },
            {
                fromUserId: 1,
                toUserId: 0,
                text: 'I am all well',
            },
            {
                fromUserId: 0,
                toUserId: 1,
                text: 'Coffee?',
            },
        ],
        active: true,
    },
    {
        userId: 2,
        name: 'Sean Freeman',
        path: 'profile-1.jpeg',
        time: '12:09 PM',
        preview: 'I was wondering...',
        messages: [
            {
                fromUserId: 0,
                toUserId: 2,
                text: 'Hello',
            },
            {
                fromUserId: 0,
                toUserId: 2,
                text: "It's me",
            },
            {
                fromUserId: 0,
                toUserId: 2,
                text: "It's me",
            },
            {
                fromUserId: 0,
                toUserId: 2,
                text: "It's me",
            },
            {
                fromUserId: 0,
                toUserId: 2,
                text: "It's me",
            },
            {
                fromUserId: 0,
                toUserId: 2,
                text: "It's me",
            },
            {
                fromUserId: 0,
                toUserId: 2,
                text: "It's me",
            },
            {
                fromUserId: 2,
                toUserId: 0,
                text: "It's me",
            },
            {
                fromUserId: 0,
                toUserId: 2,
                text: 'I have a question regarding project.',
            },
        ],
        active: false,
    },
    {
        userId: 3,
        name: 'Alma Clarke',
        path: 'profile-2.jpeg',
        time: '1:44 PM',
        preview: 'I’ve forgotten how it felt before',
        messages: [
            {
                fromUserId: 0,
                toUserId: 3,
                text: 'Hey Buddy.',
            },
            {
                fromUserId: 0,
                toUserId: 3,
                text: "What's up",
            },
            {
                fromUserId: 3,
                toUserId: 0,
                text: 'I am sick',
            },
            {
                fromUserId: 0,
                toUserId: 3,
                text: 'Not comming to office today.',
            },
        ],
        active: true,
    },
    {
        userId: 4,
        name: 'Alan Green',
        path: 'profile-3.jpeg',
        time: '2:06 PM',
        preview: 'But we’re probably gonna need a new carpet.',
        messages: [
            {
                fromUserId: 0,
                toUserId: 4,
                text: 'Hi, collect your check',
            },
            {
                fromUserId: 4,
                toUserId: 0,
                text: 'Ok, I will be there in 10 mins',
            },
        ],
        active: true,
    },
    {
        userId: 5,
        name: 'Shaun Park',
        path: 'profile-4.jpeg',
        time: '2:05 PM',
        preview: 'It’s not that bad...',
        messages: [
            {
                fromUserId: 0,
                toUserId: 3,
                text: 'Hi, I am back from vacation',
            },
            {
                fromUserId: 0,
                toUserId: 3,
                text: 'How are you?',
            },
            {
                fromUserId: 0,
                toUserId: 5,
                text: 'Welcom Back',
            },
            {
                fromUserId: 0,
                toUserId: 5,
                text: 'I am all well',
            },
            {
                fromUserId: 5,
                toUserId: 0,
                text: 'Coffee?',
            },
        ],
        active: false,
    },
    {
        userId: 6,
        name: 'Roxanne',
        path: 'profile-5.jpeg',
        time: '2:00 PM',
        preview: 'Wasup for the third time like is you bling bitch',
        messages: [
            {
                fromUserId: 0,
                toUserId: 6,
                text: 'Hi',
            },
            {
                fromUserId: 0,
                toUserId: 6,
                text: 'Uploaded files to server.',
            },
        ],
        active: false,
    },
    {
        userId: 7,
        name: 'Ernest Reeves',
        path: 'profile-6.jpeg',
        time: '2:09 PM',
        preview: 'Wasup for the third time like is you bling bitch',
        messages: [],
        active: true,
    },
    {
        userId: 8,
        name: 'Laurie Fox',
        path: 'profile-7.jpeg',
        time: '12:09 PM',
        preview: 'Wasup for the third time like is you bling bitch',
        messages: [],
        active: true,
    },
    {
        userId: 9,
        name: 'Xavier',
        path: 'profile-8.jpeg',
        time: '4:09 PM',
        preview: 'Wasup for the third time like is you bling bitch',
        messages: [],
        active: false,
    },
    {
        userId: 10,
        name: 'Susan Phillips',
        path: 'profile-9.jpeg',
        time: '9:00 PM',
        preview: 'Wasup for the third time like is you bling bitch',
        messages: [],
        active: true,
    },
    {
        userId: 11,
        name: 'Dale Butler',
        path: 'profile-10.jpeg',
        time: '5:09 PM',
        preview: 'Wasup for the third time like is you bling bitch',
        messages: [],
        active: false,
    },
    {
        userId: 12,
        name: 'Grace Roberts',
        path: 'user-profile.jpeg',
        time: '8:01 PM',
        preview: 'Wasup for the third time like is you bling bitch',
        messages: [],
        active: true,
    },
];
export const loginUser = {
    id: 0,
    name: 'Alon Smith',
    path: 'profile-34.jpeg',
    designation: 'Software Developer',
};

export const checkboxSections: CheckboxSectionData[] = [
    {
        label: 'All',
        id: 'all',
        subItems: []
    },
    {
        label: 'Deposit',
        id: 'deposit',
        subItems: [
            {
                id: 'deposit-third-party',
                label: 'Third Party'
            },
            {
                id: 'deposit-cwallet',
                label: 'Cwallet'
            },
            {
                id: 'deposit-manual',
                label: 'Manual'
            },
            {
                id: 'deposit-agent-deposit',
                label: 'Agent Deposit'
            },
            {
                id: 'deposit-buy-crypto',
                label: 'Buy Crypto'
            }
        ]
    },
    {
        label: 'Withdraw',
        id: 'withdraw',
        subItems: [
            {
                id: 'withdraw-third-party',
                label: 'Third Party'
            },
            {
                id: 'withdraw-cwallet',
                label: 'Cwallet'
            },
            {
                id: 'withdraw-manual',
                label: 'Manual'
            }
        ]
    },
    {
        label: 'Transfer',
        id: 'transfer',
        subItems: [
            {
                id: 'transfer-tips',
                label: 'Tips'
            },
            {
                id: 'transfer-chatroom',
                label: 'Chatroom'
            },
            {
                id: 'transfer-vault-pro',
                label: 'Vault Pro'
            }
        ]
    },
    {
        label: 'Swap',
        id: 'swap',
        subItems: []
    }
]

interface TabType {
    key: number;
    label: string;
}

interface RoutesType {
    [key: number]: string;
}

export const MEMBER_LIST_TABS: TabType[] = [
    { key: 0, label: 'messageActivity' },
    { key: 1, label: 'transationRecord' },
    { key: 2, label: 'bonusRecord' },
    { key: 3, label: 'gameRecord' },
    { key: 4, label: 'bankCardCryptoAddress' },
    { key: 5, label: 'riskInformation' },
    { key: 6, label: 'adminCslog' },
    { key: 7, label: 'comulativeData' },
];

export const MEMBER_LIST_TABS_ROUTES: RoutesType = {
    0: '/wallets/api/v1/get-transactions-detail-by-user/',
    1: '/wallets/api/v1/get-transactions-detail-by-user/',
    2: '/auth/api/v1/membersList/',
    3: '/games/api/v1/player-transactions/',
    4: '...',
    5: '...',
    6: '...',
};


export const MEMBER_LIST_SUB_TABS: TabType[] = [
    { key: 0, label: 'Information' },
    { key: 1, label: 'Financial' },
    { key: 2, label: 'Bonus' },
    { key: 3, label: 'Member Loss' },
];

export const MEMBER_LIST_SUB_TABS_ROUTES: RoutesType = {
    0: '/auth/api/v1/usersDetailsMini/_id/',
    1: '/auth/api/v1/members-list/',
    2: '/auth/api/v1/membersList/',
    3: '/games/api/v1/members-loss/',
    4: '/games/api/v1/player-transactions/',
};


export const RISK_INFORMATION_LIST_SUB_TABS: TabType[] = [
    { key: 0, label: 'repeatInformation' },
    { key: 1, label: 'repeatFirstIp' },
    { key: 2, label: 'repeatLastIp' },
    { key: 3, label: 'repeatUUID' },
    { key: 4, label: 'repeatDevice' },
];

export const RISK_INFORMATION_LIST_SUB_TABS_ROUTES: RoutesType = {
    0: '/container/auth/api/v1/repeatInformationById/',
    1: '/container/auth/api/v1/repeatFirstIpById/',
    2: '/container/auth/api/v1/repeatLastIpById/',
    3: '/container/auth/api/v1/repeatUUIDById/',
    4: '/container/auth/api/v1/repeatDeviceById/',
};

export type User = {
    _id?: any;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    state: string;
};

export const fakeData: User[] = [
    {
        id: '9s41rp',
        firstName: 'Kelvin',
        lastName: 'Langosh',
        email: 'Jerod14@hotmail.com',
        state: 'Ohio',
    },
    {
        id: '08m6rx',
        firstName: 'Molly',
        lastName: 'Purdy',
        email: 'Hugh.Dach79@hotmail.com',
        state: 'Rhode Island',
    },
    {
        id: '5ymtrc',
        firstName: 'Henry',
        lastName: 'Lynch',
        email: 'Camden.Macejkovic@yahoo.com',
        state: 'California',
    },
    {
        id: 'ek5b97',
        firstName: 'Glenda',
        lastName: 'Douglas',
        email: 'Eric0@yahoo.com',
        state: 'Montana',
    },
    {
        id: 'xxtydd',
        firstName: 'Leone',
        lastName: 'Williamson',
        email: 'Ericka_Mueller52@yahoo.com',
        state: 'Colorado',
    },
    {
        id: 'wzxj9m',
        firstName: 'Mckenna',
        lastName: 'Friesen',
        email: 'Veda_Feeney@yahoo.com',
        state: 'New York',
    },
    {
        id: '21dwtz',
        firstName: 'Wyman',
        lastName: 'Jast',
        email: 'Melvin.Pacocha@yahoo.com',
        state: 'Montana',
    },
    {
        id: 'o8oe4k',
        firstName: 'Janick',
        lastName: 'Willms',
        email: 'Delfina12@gmail.com',
        state: 'Nebraska',
    },
];


export const fakeDataTest: any = [
    {
        id: '9s41rp',
        beforeValue: 'testBefore',
        afterValue: 'testAfter',
        operator: '66350af0c2caf1ff0356816',
        processTime: '2024-05-03 11:11:59',
    }
];

//50 us states array
export const usStates = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
    'Puerto Rico',
];

export const columnsRepeatInformation: MRT_ColumnDef<RiskInformationRecordData>[] = [
    {
        id: 'No',
        header: t('no'),
        Cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'memberId',
        header: t('memberId'),
    },
    {
        accessorKey: 'dateOfBirth',
        header: t('dateOfBirth'),
    },
    {
        accessorKey: 'passwordMD5',
        header: t('passwordMD5'),
    },
    {
        accessorKey: 'phoneNumberMD5',
        header: t('phoneNumberMD5'),
    },
    {
        accessorKey: 'firstIp',
        header: t('firstIp'),
    },
    {
        accessorKey: 'lastIp',
        header: t('lastIp'),
    },
    {
        accessorKey: 'status',
        header: t('status'),
    },
    {
        accessorKey: 'totalDeposits',
        header: t('totalDeposits'),
    },
    {
        accessorKey: 'totalWithdrawal',
        header: t('totalWithdrawal'),
    }
];

export const columnsRepeatFirstIp: MRT_ColumnDef<RiskInformationRecordData>[] = [
    {
        id: 'No',
        header: t('no'),
        Cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'memberId',
        header: t('memberId'),
    },
    {
        accessorKey: 'firstIp',
        header: t('firstIp'),
    },
    {
        accessorKey: 'lastIp',
        header: t('lastIp'),
    },
    {
        accessorKey: 'status',
        header: t('status'),
    },
    {
        accessorKey: 'totalBonus',
        header: t('totalBonus'),
    },
    {
        accessorKey: 'totalDeposits',
        header: t('totalDeposits'),
    },
    {
        accessorKey: 'totalWithdrawal',
        header: t('totalWithdrawal'),
    },
];

export const columnsRepeatLastIp: MRT_ColumnDef<RiskInformationRecordData>[] = [
    {
        id: 'No',
        header: t('no'),
        Cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'memberId',
        header: t('memberId'),
    },
    {
        accessorKey: 'dateOfBirth',
        header: t('dateOfBirth'),
    },
    {
        accessorKey: 'passwordMD5',
        header: t('passwordMD5'),
    },
    {
        accessorKey: 'firstIp',
        header: t('firstIp'),
    },
    {
        accessorKey: 'lastIp',
        header: t('lastIp'),
    },
    {
        accessorKey: 'status',
        header: t('status'),
    },
    {
        accessorKey: 'totalBonus',
        header: t('totalBonus'),
    },
    {
        accessorKey: 'totalDeposits',
        header: t('totalDeposits'),
    },
    {
        accessorKey: 'totalWithdrawal',
        header: t('totalWithdrawal'),
    },
];

export const columnsRepeatUUID: MRT_ColumnDef<RiskInformationRecordData>[] = [
    {
        id: 'No',
        header: t('no'),
        Cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'memberId',
        header: t('memberId'),
    },
    {
        accessorKey: 'uuID',
        header: t('uuID'),
    },
    {
        accessorKey: 'repeatOrNot',
        header: t('repeatOrNot'),
    },
    {
        accessorKey: 'lastIp',
        header: t('lastIp'),
    },
    {
        accessorKey: 'status',
        header: t('status'),
    }
];

export const columnsRepeatDevice: MRT_ColumnDef<RiskInformationRecordData>[] = [
    {
        id: 'No',
        header: t('no'),
        Cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'memberId',
        header: t('memberId'),
    },
    {
        accessorKey: 'device',
        header: t('device'),
    },
    {
        accessorKey: 'repeatOrNot',
        header: t('repeatOrNot'),
    },
    {
        accessorKey: 'lastIp',
        header: t('lastIp'),
    }
];

export const columnsAdminLogs: MRT_ColumnDef<RiskInformationRecordData>[] = [
    {
        id: 'No',
        header: t('no'),
        Cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'systemNo',
        header: t('systemNo'),
    },
    {
        accessorKey: 'adminId',
        header: t('adminId'),
    },
    {
        accessorKey: 'events',
        header: t('events'),
    },
];

export const columnsMemberRemark: MRT_ColumnDef<RiskInformationRecordData>[] = [
    {
        accessorKey: 'berforeValue',
        header: t('berforeValue'),
    },
    {
        accessorKey: 'afterValue',
        header: t('afterValue'),
    },
    {
        accessorKey: 'operator',
        header: t('operator'),
    },
    {
        accessorKey: 'processTime',
        header: t('processTime'),
    },
    {
        accessorKey: 'operation',
        header: t('operation'),
    },
];

export const columnsDepositReview: MRT_ColumnDef<RiskInformationRecordData>[] = [
    {
        id: 'No',
        header: t('no'),
        Cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'systemNo',
        header: t('systemNo'),
    },
    {
        accessorKey: 'recordId',
        header: t('3rdNo'),
    },
    {
        accessorKey: 'memberId',
        header: t('memberId'),
    },
    {
        accessorKey: 'vipLevel',
        header: t('vipLevel'),
    },
    {
        accessorKey: 'agent',
        header: t('agent'),
    },
    {
        accessorKey: '3rdGateway3rdNameType',
        header: t('3rdGateway3rdNameType'),
    },
    {
        accessorKey: 'currency',
        header: t('currency'),
    },
    {
        accessorKey: 'amount',
        header: t('amount'),
    },
    {
        accessorKey: 'validWagerRequirements',
        header: t('validWagerRequirements'),
    },
    {
        accessorKey: 'device',
        header: t('device'),
    },
    {
        accessorKey: 'memberFeedback',
        header: t('memberFeedback'),
    },
    {
        accessorKey: 'status',
        header: t('status'),
    },
    {
        accessorKey: 'firstDepositAmount',
        header: t('firstDepositAmount'),
    },
    {
        accessorKey: 'requestTime',
        header: t('requestTime'),
    },
    {
        accessorKey: 'finishTime',
        header: t('finishTime'),
    },
    {
        accessorKey: 'operation',
        header: t('operation'),
    }
];

export const columnsRiskReview: MRT_ColumnDef<RiskInformationRecordData>[] = [
    {
        id: 'No',
        header: t('no'),
        Cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'systemNo',
        header: t('systemNo'),
    },
    {
        accessorKey: 'recordId',
        header: t('3rdNo'),
    },
    {
        accessorKey: 'memberId',
        header: t('memberId'),
    },
    {
        accessorKey: 'vipLevel',
        header: t('vipLevel'),
    },
    {
        accessorKey: 'agent',
        header: t('agent'),
    },
    {
        accessorKey: 'currency',
        header: t('currency'),
    },
    {
        accessorKey: 'amount',
        header: t('amount'),
    },
    {
        accessorKey: 'fee',
        header: t('fee'),
    },
    {
        accessorKey: 'totalNumberOfWithdrawals',
        header: t('totalNumberOfWithdrawals'),
    },
    {
        accessorKey: 'lastDepositAmount',
        header: t('lastDepositAmount'),
    },
    {
        accessorKey: 'withdrawalRiskReminder',
        header: t('withdrawalRiskReminder'),
    },
    {
        accessorKey: 'withdrawalRestriction',
        header: t('withdrawalRestriction'),
    },
    {
        accessorKey: 'device',
        header: t('device'),
    },
    {
        accessorKey: 'paymentAddress',
        header: t('paymentAddress'),
    },
    {
        accessorKey: 'wagerCheck',
        header: t('wagerCheck'),
    },
    {
        accessorKey: 'memberRemark',
        header: t('memberRemark'),
    },
    {
        accessorKey: 'riskRemark',
        header: t('riskRemark'),
    },
    {
        accessorKey: 'withdrawRemark',
        header: t('withdrawRemark'),
    },
    {
        accessorKey: 'requestTime',
        header: t('requestTime'),
    },
    {
        accessorKey: 'riskTimeAdmin',
        header: t('riskTimeAdmin'),
    },
    {
        accessorKey: 'withdrawalTimeAdmin',
        header: t('withdrawalTimeAdmin'),
    },
    {
        accessorKey: 'operation',
        header: t('operation'),
    }
];

export const columnsWithdrawalReview: MRT_ColumnDef<RiskInformationRecordData>[] = [
    {
        id: 'No',
        header: t('no'),
        Cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'systemNo',
        header: t('systemNo'),
    },
    {
        accessorKey: 'recordId',
        header: t('3rdNo'),
    },
    {
        accessorKey: 'memberId',
        header: t('memberId'),
    },
    {
        accessorKey: 'vipLevel',
        header: t('vipLevel'),
    },
    {
        accessorKey: 'agent',
        header: t('agent'),
    },
    {
        accessorKey: 'currency',
        header: t('currency'),
    },
    {
        accessorKey: 'amount',
        header: t('amount'),
    },
    {
        accessorKey: 'fee',
        header: t('fee'),
    },
    {
        accessorKey: 'totalNumberOfWithdrawals',
        header: t('totalNumberOfWithdrawals'),
    },
    {
        accessorKey: 'lastDepositAmount',
        header: t('lastDepositAmount'),
    },
    {
        accessorKey: 'withdrawalRiskReminder',
        header: t('withdrawalRiskReminder'),
    },
    {
        accessorKey: 'withdrawalRestriction',
        header: t('withdrawalRestriction'),
    },
    {
        accessorKey: 'device',
        header: t('device'),
    },
    {
        accessorKey: 'paymentAddress',
        header: t('paymentAddress'),
    },
    {
        accessorKey: 'wagerCheck',
        header: t('wagerCheck'),
    },
    {
        accessorKey: 'memberRemark',
        header: t('memberRemark'),
    },
    {
        accessorKey: 'riskRemark',
        header: t('riskRemark'),
    },
    {
        accessorKey: 'withdrawRemark',
        header: t('withdrawRemark'),
    },
    {
        accessorKey: 'requestTime',
        header: t('requestTime'),
    },
    {
        accessorKey: 'riskTimeAdmin',
        header: t('riskTimeAdmin'),
    },
    {
        accessorKey: 'withdrawalTimeAdmin',
        header: t('withdrawalTimeAdmin'),
    },
    {
        accessorKey: 'operation',
        header: t('operation'),
    }
];

export const columnsWithdrawalRecord: MRT_ColumnDef<RiskInformationRecordData>[] = [
    {
        id: 'No',
        header: t('no'),
        Cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'systemNo',
        header: t('systemNo'),
    },
    {
        accessorKey: 'recordId',
        header: t('3rdNo'),
    },
    {
        accessorKey: 'memberId',
        header: t('memberId'),
    },
    {
        accessorKey: 'vipLevel',
        header: t('vipLevel'),
    },
    {
        accessorKey: 'agent',
        header: t('agent'),
    },
    {
        accessorKey: 'currency',
        header: t('currency'),
    },
    {
        accessorKey: 'amount',
        header: t('amount'),
    },
    {
        accessorKey: 'fee',
        header: t('fee'),
    },
    {
        accessorKey: 'totalNumberOfWithdrawals',
        header: t('totalNumberOfWithdrawals'),
    },
    {
        accessorKey: 'lastDepositAmount',
        header: t('lastDepositAmount'),
    },
    {
        accessorKey: 'withdrawalRiskReminder',
        header: t('withdrawalRiskReminder'),
    },
    {
        accessorKey: 'withdrawalRestriction',
        header: t('withdrawalRestriction'),
    },
    {
        accessorKey: 'device',
        header: t('device'),
    },
    {
        accessorKey: 'paymentAddress',
        header: t('paymentAddress'),
    },
    {
        accessorKey: 'wagerCheck',
        header: t('wagerCheck'),
    },
    {
        accessorKey: 'memberRemark',
        header: t('memberRemark'),
    },
    {
        accessorKey: 'riskRemark',
        header: t('riskRemark'),
    },
    {
        accessorKey: 'withdrawRemark',
        header: t('withdrawRemark'),
    },
    {
        accessorKey: 'requestTime',
        header: t('requestTime'),
    },
    {
        accessorKey: 'riskTimeAdmin',
        header: t('riskTimeAdmin'),
    },
    {
        accessorKey: 'withdrawalTimeAdmin',
        header: t('withdrawalTimeAdmin'),
    },
    {
        accessorKey: 'status',
        header: t('status'),
    },
    {
        accessorKey: '3rdGateway',
        header: t('3rdGateway'),
    },
    {
        accessorKey: 'operation',
        header: t('operation'),
    }
];

export const columnsTabSelected = (tab: number) => {
    switch (tab) {
        case 0: return columnsRepeatInformation;
        case 1: return columnsRepeatFirstIp;
        case 2: return columnsRepeatLastIp;
        case 3: return columnsRepeatUUID;
        case 4: return columnsRepeatDevice;

        case 5: return columnsAdminLogs;
        case 6: return columnsMemberRemark;
        case 7: return columnsDepositReview;
        case 8: return columnsRiskReview;
        case 9: return columnsWithdrawalReview;
        case 10: return columnsWithdrawalRecord;

        default:
            return columnsRepeatInformation
    }
}