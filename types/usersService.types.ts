type loginLogInterface = {
    ip: string;
    domain: string;
    datetime: Date;
    country: string;
}

export type User = {
    vipLevel: string;
    icon: any;
    image: any;
    _id: string;
    name?: string;
    userId: number;
    lastname?: string;
    email: string;
    phone: null | string;
    referralCode: string;
    loginCode: null | string;
    password: string;
    address: null | string;
    loginAttemps: number;
    roles: string[];
    mainAccountBalance: number;
    numberOfWithdrawal: number;
    firstDepositAmount: number;
    tick: number;
    numberOfDeposits: number;
    totalWithdrawal: number;
    recentBonusAmount: number;
    cost: number;
    totalDeposit: number;
    recentDepositAmount: number;
    prohibitedDepositTypes: string[];
    loginType: 'Email' | 'Facebook' | 'Google' | string;
    created_at: Date;
    updated_at: Date;
    memberId: string;
    __v: number;
    // status: "ACTIVE" | "INACTIVE" | string;

    // nuevo campos v2
    memberUsername?: string;
    username?: string;
    partnerSite?: string;
    agent?: string;
    memberGrade?: string;
    referralAccount?: string;
    memberCreditLevel?: string;
    depositWithdraw?: number;
    balance?: number;
    companyIncome?: number;
    memberBonus?: number;
    memberTags?: Array<string>;
    memberRemark?: string;
    firstLoginLog?: loginLogInterface;
    lastLoginLog?: loginLogInterface;
    status: 'LOCK' | 'NORMAL' | 'ONLY LOGIN' | string;
    levelInfo?: any;
    id?: any;
    avatar?: string;
};

export type ResponseUser = {
    code: string;
    data: User[];
};
