export type inputData = {
    details: DataType[];
    totals: any;
    modalResponse?: DataResponse;
};

export type DataResponse = {
    companyIncomeTotal: number;
    totalBetAmount: number;
    totalCountBet: number;
    totalPayout: number;
    totalWager: number;
    totalWinLoss: number;
    _id: string | null | undefined;
};

export type DataType = {
    requestTime: string;
    processTime: string;
    betTime: string;
    gamePlatform: string;
    betNo: string;
    currency: string;
    betType: string;
    gameResult: string;
    betAmount: string;
    payout: string;
    winLoss: string;
    wager: string;
    valid: string;
    bonus: string;
    interest: string;
    vipCashback: string;
    remark: string;
};