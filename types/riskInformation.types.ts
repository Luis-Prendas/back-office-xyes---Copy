export interface RiskInformationRootResponse {
    message: string
    response: {
        data: RiskInformationRecordData[]
    };
}


export type RiskInformationRecordData = {
    _id: string | null;
    No: string;
    memberId: string;
    dateOfBirth?: string;
    passwordMD5?: string;
    phoneNumberMD5?: string;
    firstIp?: string;
    lastIp?: string;
    status?: string;
    totalDeposits?: string;
    totalWithdrawal?: string;

    totalBonus?: string;

    uuID?: string;
    repeatOrNot?: string;

    device?: string;
}
