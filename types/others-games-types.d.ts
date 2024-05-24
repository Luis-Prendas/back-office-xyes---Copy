interface Provider {
    id: string;
    name: string;
}

interface Language {
    id: string;
    name: string;
}

interface Currency {
    id: string;
    name: string;
}

interface Theme {
    id: string;
    name: string;
}

interface Feature {
    id: string;
    name: string;
}

interface Volatility {
    id: string;
    name: string;
}

interface Device {
    id: string;
    name: string;
}

interface Image {
    type: string;
    url: string;
}

export interface OthersGamesData {
    _id: string;
    gameId: string;
    name: string;
    description: string;
    category: string;
    demoSupport: boolean;
    freeRoundSupport: boolean;
    releaseDate: string;
    platform: string;
    status: boolean;
    order: number;
    displayFrontend: boolean;
    icon: Number[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    volatility: Volatility;
    provider: Provider;
    images: Image[];
    clientTypes: string[];
    supportedDevices: Device[];
    features: Feature[];
    themes: Theme[];
    customName: any[]; // Define el tipo correcto si es necesario
    customImage: any[]; // Define el tipo correcto si es necesario
    languages: Language[];
    currencies: Currency[];
}

export interface RootResponseOthersGames {
    message: string;
    data: OthersGamesData[];
}
