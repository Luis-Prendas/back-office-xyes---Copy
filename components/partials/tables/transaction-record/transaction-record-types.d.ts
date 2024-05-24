export interface TransactionRecordRootObject {
    message: string; // Cadena de texto
    data: TransactionRecordData; // Objeto con propiedades 'totals' y 'details'
    success: boolean; // Booleano
}

export interface TransactionRecordTotals {
    fiatBalance: number; // Número (balance en moneda fiat)
    deposit: Transaction; // Objeto de transacciones de depósito
    withdraw: Transaction; // Objeto de transacciones de retiro
    tips: number; // Número (propina)
    coinDraps: number; // Número (monedas que se dejan caer)
}

export export interface Transaction {
    times: number; // Número de veces
    totalAmount: number; // Cantidad total
    first: TransactionDetail; // Detalles del primer depósito/retiro
    last: TransactionDetail; // Detalles del último depósito/retiro
}

export interface TransactionDetail {
    time: string; // Fecha y hora en formato ISO 8601
    amount: number | null; // Cantidad (puede ser nulo)
}

export interface TransactionRecordData {
    totals: TransactionRecordTotals; // Objeto 'totals'
    details: Array<TransactionItem>; // Lista de objetos 'TransactionItem'
}

interface User {
    _id: string;
    memberUsername: string;
    memberId: string;
}

interface Time {
    request: string;
    process: string;
}

interface Generated {
    systemNo: string;
    date: string;
    counter: number;
    randomNumber: string;
    paddedNumber: string;
}

export interface TransactionItem {
    _id: string;
    type: string;
    coinId: string | null;
    amount: string;
    status: string;
    platform: string;
    activityName: string;
    user: User;
    previousBalance: number;
    currency: string;
    billNo: string;
    admin: string;
    time: Time;
    requestTime: number;
    finishTime: number;
    fiatReference: string;
    exchangeRate: string;
    generated: Generated;
    createdAt: string;
    updatedAt: string;
    balance: number;
    nextBalance: number;
}
