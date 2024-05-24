interface LoginLog {
    ip: string;
    domain: string;
    datetime: string;
    city: string;
    region: string;
    country: string;
    loc: string;
    org: string;
    postal: string;
    timezone: string;
}

interface Settings {
    language: string;
}

export interface GetMemberByIdRootResponse {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    referralCode: string;
    address: string | null;
    status: string;
    memberUsername: string;
    loginType: string;
    lastConnectionDate: string;
    avatar: string;
    partnerSite: string;
    agent: string;
    memberCreditLevel: string;
    balance: number;
    companyIncome: number;
    memberTags: string[];
    memberRemark: string;
    firstLoginLog: LoginLog;
    lastLoginLog: LoginLog;
    settings: Settings;
    two_factor_enabled: boolean;
    country: string | null;
    registratorWay: string | null;
    kyc: string | null;
    memberId: string;
}
