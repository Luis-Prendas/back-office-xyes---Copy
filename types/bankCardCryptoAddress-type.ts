export interface BankCardRecordRootResponse {
    message: string
    response: {
        details: BankCardDetailsData[];
        data: BankCardRecordData[]
    };
}


export type BankCardRecordData = {
    _id: string | null;
    bankNo: string;
    betNo: string;
    currency: string;
    bankName: string;
    eWallet: string;
    cardHolderName: string;
    cardNumber: string;
    branch: string;
    other: string;
    bondingMethods: string;
    memberRemark: string;
    status: string;
    creationTime: string;
}

export type BankCardDetailsData = {
    _id: string;
    no: string;
    systemNo: string;
    currency: string;
    network: string;
    address: string;
    bondingMethods: string;
    memberRemark: string;
    status: string;
    creationTime: string;
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

interface User {
    _id: string;
    memberUsername: string;
    memberId: string;
}