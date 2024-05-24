import { getEnviroment } from "./getEnviroment";
import { doGet } from "./requestHandler";
import { DepositWithdraw, DumpDepositWithdraw, DumpBalance, Balance, DumpCompanyIncome, CompanyIncome } from "../types/memberListService.type";

/* const normalBaseUrl = "http://backoffice-xyes-balancer-1266949157.us-east-2.elb.amazonaws.com" */
const normalBaseUrl = getEnviroment() + "/auth";

export const getMemberList = (data: any) => {
    return doGet<any>(`${normalBaseUrl}/usersClient?page${data.page}&limit=${data.limit}&filters=${data.filters}&globalFilter${data.globalFilter}&sorting=${data.sorting}`);
};

export const getDepositWithdrawByUserId = (id: string) => {
    return doGet<any>(
        `${normalBaseUrl}/api/v1/membersList/${id}/deposit-withdraw`
    );
};

export const getMemberBonusByUserId = (id: string) => {
    return doGet<any>(
        `${normalBaseUrl}/api/v1/membersList/${id}/member-bonus`
    );
};

export const getCompanyIncomeByUserId = (id: string) => {
    return doGet<any>(
        `${normalBaseUrl}/api/v1/membersList/${id}/company-income`
    );
};

export const getBalanceByUserId = (id: string) => {
    return doGet<{ dump: DumpBalance; balanceTotal: Balance }>(
        `${normalBaseUrl}/api/v1/membersList/${id}/balance`
    );
};

export const getCompanyIncomeeByUserId = (id: string) => {
    return doGet<{ dump: DumpCompanyIncome; companyIncome: CompanyIncome }>(
        `${normalBaseUrl}/api/v1/membersList/${id}/company-income`
    );
};