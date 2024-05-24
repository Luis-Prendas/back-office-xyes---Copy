export interface GlobalRegion {
    _id: string;
    countryOrRegion: string;
    regionCode: string;
    flag: boolean;
    flagURL: string;
    currencyName: string;
    sorted: number;
    disable: boolean;
}

export interface RootRegionListEnabled {
    success: boolean;
    globalRegionList: GlobalRegion[];
    total: number;
    page: number;
    limit: number;
}