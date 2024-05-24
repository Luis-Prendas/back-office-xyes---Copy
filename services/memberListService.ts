import { getEnviroment } from "./getEnviroment";
import { doGet, doPost, doPut } from "./requestHandler";
import { DepositWithdraw, DumpDepositWithdraw, DumpBalance, Balance, DumpCompanyIncome, CompanyIncome } from "../types/memberListService.type";
import { FE_notifications_path } from "./configPaths";

/* const normalBaseUrl = "http://backoffice-xyes-balancer-1266949157.us-east-2.elb.amazonaws.com" */
const normalBaseUrlAuth = getEnviroment() + "/auth";
const normalBaseUrlReferrers = getEnviroment() + "/referrers";

export const getMemberList = (data: any) => {
    return doGet<any>(`${normalBaseUrlAuth}/usersClient?page${data.page}&limit=${data.limit}&filters=${data.filters}&globalFilter${data.globalFilter}&sorting=${data.sorting}`);
};

export const getDepositWithdrawByUserId = (id: string) => {
    return doGet<any>(
        `${normalBaseUrlAuth}/api/v1/membersList/${id}/deposit-withdraw`
    );
};

export const getMemberBonusByUserId = (id: string) => {
    return doGet<any>(
        `${normalBaseUrlAuth}/api/v1/membersList/${id}/member-bonus`
    );
};

export const getCompanyIncomeByUserId = (id: string) => {
    return doGet<any>(
        `${normalBaseUrlAuth}/api/v1/membersList/${id}/company-income`
    );
};

export const getBalanceByUserId = (id: string) => {
    return doGet<{ dump: DumpBalance; balanceTotal: Balance }>(
        `${normalBaseUrlAuth}/api/v1/membersList/${id}/balance`
    );
};

export const getAllParthnersList = (id: string) => {
    return doGet<{ dump: DumpCompanyIncome; companyIncome: CompanyIncome }>(
        `${normalBaseUrlAuth}/api/v1/membersList/${id}/company-income`
    );
};

export const getReferalsList = (data: any) => {
    return doGet<any>(`${normalBaseUrlReferrers}/referrers`);
};

export const createNewCommentMemberRemark = (data: any) => {
    return doPost<any>(`${normalBaseUrlAuth}/api/v1/addMemberRemark`, data);
};

export const getMemberRemarkById = (id: string) => {
    return doGet<any>(`${normalBaseUrlAuth}/api/v1/getMemberRemarkById/${id}`);
};

// export const getAgentsList = (data: any) => {
//     return doGet<any>(`${normalBaseUrl}/usersClient?page${data.page}&limit=${data.limit}&filters=${data.filters}&globalFilter${data.globalFilter}&sorting=${data.sorting}`);
// };

// export const getTagsByUserId = (data: any) => {
//     return doGet<any>(`${normalBaseUrl}/usersClient?page${data.page}&limit=${data.limit}&filters=${data.filters}&globalFilter${data.globalFilter}&sorting=${data.sorting}`);
// };

// export const getRemarksByUserId = (data: any) => {
//     return doGet<any>(`${normalBaseUrl}/usersClient?page${data.page}&limit=${data.limit}&filters=${data.filters}&globalFilter${data.globalFilter}&sorting=${data.sorting}`);
// };

// export const getCompanyIncomeeByUserId = (id: string) => {
//     return doGet<{ dump: DumpCompanyIncome; companyIncome: CompanyIncome }>(
//         `${normalBaseUrl}/api/v1/membersList/${id}/company-income`
//     );
// };

// export const getCompanyIncomeeByUserId = (id: string) => {
//     return doGet<{ dump: DumpCompanyIncome; companyIncome: CompanyIncome }>(
//         `${normalBaseUrl}/api/v1/membersList/${id}/company-income`
//     );
// };

// export const getCompanyIncomeeByUserId = (id: string) => {
//     return doGet<{ dump: DumpCompanyIncome; companyIncome: CompanyIncome }>(
//         `${normalBaseUrl}/api/v1/membersList/${id}/company-income`
//     );
// };

// export const getCompanyIncomeeByUserId = (id: string) => {
//     return doGet<{ dump: DumpCompanyIncome; companyIncome: CompanyIncome }>(
//         `${normalBaseUrl}/api/v1/membersList/${id}/company-income`
//     );
// };
export const updatePartnerSite = (id: string, data: any) => {
    return doPut<any>(`${FE_notifications_path}/partnerSite-update/${id}`, data);
};
