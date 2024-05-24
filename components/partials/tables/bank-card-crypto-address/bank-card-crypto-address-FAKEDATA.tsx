import { getTranslation } from '@/i18n';
import { BankCardDetailsData, BankCardRecordData } from '@/types/bankCardCryptoAddress-type';
import { MRT_ColumnDef } from 'mantine-react-table';
const { t } = getTranslation();

export const FakeData: BankCardRecordData[] = [
    {
        betNo: '1',
        bankNo: 'BN999999',
        currency: 'USD/Fiat',
        bankName: '4',
        eWallet: '5',
        cardHolderName: '6',
        cardNumber: '7',
        branch: '8',
        other: '9',
        bondingMethods: 'Front',
        memberRemark: '11',
        status: 'valid',
        creationTime: '25-10-2024 23:29:59',
        _id: '1',
    },
    {
        betNo: '2',
        bankNo: 'BN999999',
        currency: 'CAD/Fiat',
        bankName: '4',
        eWallet: '5',
        cardHolderName: '6',
        cardNumber: '7',
        branch: '8',
        other: '9',
        bondingMethods: 'Front',
        memberRemark: '11',
        status: 'not valid',
        creationTime: '24-10-2024 23:29:59',
        _id: '3',
    },
    {
        betNo: '3',
        bankNo: 'BN999999',
        currency: 'MXN/Fiat',
        bankName: '4',
        eWallet: '5',
        cardHolderName: '6',
        cardNumber: '7',
        branch: '8',
        other: '9',
        bondingMethods: 'Back office',
        memberRemark: '11',
        status: 'not valid',
        creationTime: '23-10-2024 23:29:59',
        _id: '3',
    },
    {
        betNo: '4',
        bankNo: 'BN999999',
        currency: 'RC/Fiat',
        bankName: '4',
        eWallet: '5',
        cardHolderName: '6',
        cardNumber: '7',
        branch: '8',
        other: '9',
        bondingMethods: 'Back office',
        memberRemark: '11',
        status: 'not valid',
        creationTime: '22-10-2024 23:29:59',
        _id: '3',
    },
    {
        betNo: '5',
        bankNo: 'BN999999',
        currency: 'EUR/Fiat',
        bankName: '4',
        eWallet: '5',
        cardHolderName: '6',
        cardNumber: '7',
        branch: '8',
        other: '9',
        bondingMethods: 'Back office',
        memberRemark: '11',
        status: 'not valid',
        creationTime: '21-10-2024 23:29:59',
        _id: '3',
    },
];

export const FakeDataSecondTable: BankCardDetailsData[] = [
    {
        no: '1',
        _id: '1',
        systemNo: 'CA9999999',
        currency: 'USDT/Crypto',
        network: 'TRC20',
        address: 'XXXXXXXXXX',
        bondingMethods: 'Front',
        memberRemark: '8',
        status: 'Valid',
        creationTime: '20-12-2024 16:59:59',
    },
    {
        no: '2',
        _id: '2',
        systemNo: 'CA9999999',
        currency: 'BTC/Crypto',
        network: 'Segwit',
        address: 'XXXXXXXXXX',
        bondingMethods: 'Back office',
        memberRemark: '8',
        status: 'Valid',
        creationTime: '19-12-2024 16:59:59',
    },
    {
        no: '3',
        _id: '3',
        systemNo: 'CA9999999',
        currency: 'ETH/Crypto',
        network: 'BEP20',
        address: 'XXXXXXXXXX',
        bondingMethods: 'Front',
        memberRemark: '8',
        status: 'Not valid',
        creationTime: '18-12-2024 16:59:59',
    },
    {
        no: '4',
        _id: '4',
        systemNo: 'CA9999999',
        currency: 'TRX/Crypto',
        network: 'TRON',
        address: 'XXXXXXXXXX',
        bondingMethods: 'Back office',
        memberRemark: '8',
        status: 'Not valid',
        creationTime: '17-12-2024 16:59:59',
    },
];

export const columnsFistTable: MRT_ColumnDef<BankCardRecordData>[] = [
    {
        id: 'No',
        header: t('no'),
        Cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'bankNo',
        header: t('bankNo'),
    },
    {
        accessorKey: 'currency',
        header: t('currency'),
    },
    {
        accessorKey: 'bankName',
        header: t('bankName'),
    },
    {
        accessorKey: 'eWallet',
        header: t('eWallet'),
    },
    {
        accessorKey: 'cardHolderName',
        header: t('cardHolderName'),
    },
    {
        accessorKey: 'cardNumber',
        header: t('cardNumber'),
    },
    {
        accessorKey: 'branch',
        header: t('branch'),
    },
    {
        accessorKey: 'other',
        header: t('other'),
    },
    {
        accessorKey: 'bondingMethods',
        header: t('bondingMethods'),
    },
    {
        accessorKey: 'memberRemark',
        header: t('memberRemark'),
    },
    {
        accessorKey: 'status',
        header: t('status'),
    },
    {
        accessorKey: 'creationTime',
        header: t('creationTime'),
    },
    {
        accessorKey: 'operation',
        header: t('operation'),
    },
];

export const columnsSecondTable: MRT_ColumnDef<BankCardDetailsData>[] = [
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
        accessorKey: 'currency',
        header: t('currency'),
    },
    {
        accessorKey: 'network',
        header: t('network'),
    },
    {
        accessorKey: 'address',
        header: t('address'),
    },
    {
        accessorKey: 'bondingMethods',
        header: t('bondingMethods'),
    },
    {
        accessorKey: 'memberRemark',
        header: t('memberRemark'),
    },
    {
        accessorKey: 'status',
        header: t('status'),
    },
    {
        accessorKey: 'creationTime',
        header: t('creationTime'),
    },
    {
        accessorKey: 'operation',
        header: t('operation'),
    },
];
