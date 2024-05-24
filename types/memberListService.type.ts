import { MRT_ColumnFilterFnsState, MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from "mantine-react-table"

export type DepositWithdraw = {
    balanceTotal: number,
    first_deposit_time_amount: number
    deposit_time: number,
    deposit_amount: number,
    last_deposit_time_amount: number,
    first_withdraw_time_amount: number,
    withdraw_time: number,
    withdraw_amount: number,
    last_withdraw_time_amount: number,
}

export type DumpDepositWithdraw = {
    id: number,
    type: string,
    platform: string,
    bill_no: string,
    currency: string,
    amount: number,
    amountUsd: number,
    currency_exchange_amount: number,
    fee: number,
    feeUsd: number,
    totalAmount: number,
    totalAmountUsd: number,
    netAmount: number
}

export type BalanceInfoData = {
    fiat: number,
    cryto: CriptoType[]
}

export type CriptoType = {
    _id: any,
    coinId: number,
    symbol: string,
    logoUrl: string,
    status: string,
    amount: number
}

export type Balance = {
    balanceTotal: number,
    fiatTotal: number,
    cryptoTotal: number,
}

export type BalanceData = {
    tips: number,
    fiatBalance: number,
    coinDraps: number,
    deposit: DepositWithdraw
}

export type DumpBalance = {
    type: string,
    currency: string,
    balance: number,
    balanceUsd: number,
    balanceLock: number,
}

export type CompanyIncome = {
    incomeTotal: number,
    winLossTotal: number,
    betAmountTotal: number,
    wagerTotal: number,
    bonusTotal: number,
    vipCashbackTotal: number,
    interestTotal: number,
}

export type DumpCompanyIncome = {
    type: string,
    gamePlatform: string,
    betNo: string,
    betTime: string,
    currency: string,
    betType: string,
    gameResult: string,
    betAmount: number,
    payout: number,
    winLoss: number,
    wager: number,
    valid: boolean,
    bonus: number,
    interest: number,
    vipCashback: number,
    remark: string,
    requestTime: string,
    processTime: string,
}

export type AgentType = {
    market: string | number | readonly string[] | undefined
    registeredDomain: string | number | readonly string[] | undefined
    joinIp: string | number | readonly string[] | undefined
    facebook: string | number | readonly string[] | undefined
    skype: string | number | readonly string[] | undefined
    whatsApp: string | number | readonly string[] | undefined
    qq: string | number | readonly string[] | undefined
    status: string | number | readonly string[] | undefined
    agentGroup: string | number | readonly string[] | undefined
    email: string | number | readonly string[] | undefined
    name: string | number | readonly string[] | undefined
    afiliateLinkDomain: string | number | readonly string[] | undefined
    lastSeen: string | number | readonly string[] | undefined
    registeredTime: string | number | readonly string[] | undefined
    line: string | number | readonly string[] | undefined
    telegram: string | number | readonly string[] | undefined
    weChat: string | number | readonly string[] | undefined
    cellPhone: string | number | readonly string[] | undefined
    defaultPlayerLevel: string | number | readonly string[] | undefined
    allLevels: string | number | readonly string[] | undefined
    agentNo: string | number | readonly string[] | undefined
    userName: string | number | readonly string[] | undefined
    _id?: string | null;
};

export type MemberInformation = {
    currency: string;
    rebate: number;
    bonus: number;
    editBalance: number;
    depositBonus: number;
    agentTransfer: number;
    bet: number;
    payout: number;
    winLoss: number;
    validBet: number;
    companyIncome: number;
    depositTime: number;
    depositAmount: number;
    lastDeposit: number;
    widthdrawalTime: number;
    widthdrawalAmount: number;
    lastWidthdrawal: number;
    depositWidthdrawalDifference: number;
}


export type MemberInformation1 = {
    _id: string | number | readonly string[] | undefined
    id: string;
    partnerSite: string;
    avatar: string;
    name: string;
    agent: string;
    memberGrade: string;
    referralAccount: string;
    memberCreditLevel: string;
    depositWithdraw: string;
    cBalance: string;
    fBalance: string;
    dollarEquivalent: string;
    companyIncome: string;
    firstIp: string;
    lastIp: string;
    memberTags: string;
    memberRemark: string;
    status: string;
}

export type MemberInformation2 = {
    country: string;
    email: string;
    phone: string;
    language: string;
    registratorWay: string;
    verificationCode: string;
    kyc: string;
    twoFactorVerification: string;
    offlineDate: string;
    memberRemark: string;
}

export interface MantineParams {
    columnFilterFns: MRT_ColumnFilterFnsState;
    columnFilters: MRT_ColumnFiltersState;
    globalFilter: string;
    sorting: MRT_SortingState;
    pagination: MRT_PaginationState;
}