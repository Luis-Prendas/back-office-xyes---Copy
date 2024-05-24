export interface GameRecordRootResponse {
    message: string
    response: {
        totals: GameRecordTotals
        details: GameRecordData[]
    };
}

export interface GameRecordTotals {
    _id: string | null;
    totalBetAmount: number;
    totalPayout: number;
    totalWager: number;
    totalWinLoss: number;
}

// Definición de la estructura para el tiempo de las transacciones
interface TimeData {
    originTime: string;
    utcTime: string;
    dateOriginTime: String
}

// Estructura para el intercambio de monedas
interface CurrencyExchange {
    exchangeRate: number;
    currency: string;
    betAmount: number | string;
    payout: number | string;
    winLoss: number | string;
    wager: number | string;
    bonus: number;
    interest: number;
}

// Estructura para información generada
interface Generated {
    systemNo: string;
    date: string;
    counter: number;
    randomNumber: string;
    paddedNumber: string;
}

export interface GameRecordData {
    requestTime: TimeData;
    processTime: TimeData;
    _id: string;
    type: string;
    betNo: string;
    currency: string;
    betType: string;
    betAmount: number;
    payout: number;
    winLoss: number;
    wager: number;
    valid: boolean;
    bonus: number;
    interest: number;
    vipCashback: number;
    userId: User;
    gameTransactions: string[];
    provider: string;
    category: string;
    gameName: string;
    operator: string;
    betCurrencyExchange: CurrencyExchange;
    generated: Generated;
    thirdSuppliers: string;
    systemNo: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    gameResult: string;
}

interface User {
    _id: string;
    memberUsername: string;
    memberId: string;
}

export interface BetCurrencyExchange {
    exchangeRate: number;
    currency: string;
    betAmount: number;
    payout: number;
    winLoss: number;
    wager: number;
    bonus: number;
    interest: number;
}