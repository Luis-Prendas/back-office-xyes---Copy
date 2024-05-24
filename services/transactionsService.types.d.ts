interface Data {
    totals: Totals;
    details: Detail[];
}

interface Totals {
    message: string;
    data: TotalsData;
}

interface TotalsData {
    totals: AggregatedTotals;
}

interface AggregatedTotals {
    fiatBalance: number;
    deposit: TransactionSummary;
    withdraw: TransactionSummary;
    tips: number;
    coinDraps: number;
}

interface TransactionSummary {
    times: number;
    totalAmount: number;
    first: TransactionDetail;
    last: TransactionDetail;
}

interface TransactionDetail {
    time: string | null;
    amount: number;
}

interface Detail {
    _id: string;
    type: string;
    user: User;
    coinId: number;
    orderId: string;
    recordId?: string;
    amount: string;
    realityamount: string;
    balance: number;
    previousBalance: number;
    nextBalance: number;
    status: string;
    platform: string;
    fee: string;
    activityName: string;
    requestTime: number;
    finishTime: number;
    fiatReference: string;
    currency: string;
    exchangeRate: string;
    operator: string;
    createdAt: string;
    updatedAt: string;
    generated: Generated;
    billNo: string;
    inc: number;
    __v: number;
}

interface User {
    _id: string;
    name: string;
    lastname: string;
    memberUsername: string;
    memberId: string;
}

interface Generated {
    systemNo: string;
    date: string;
    counter: number;
    randomNumber: string;
    paddedNumber: string;
}

export interface ApiResponse {
    message: string;
    data: Data;
    totals: string;
}