export type Info = {
    _id?: string | null;
    name?: string;
    description?: string;
    route: string;
    category: string;
    created_at?: Date;
    updated_at?: Date;
    __v?: number;
};

export type ResponseInfo = {
    code: string;
    data: Info[];
};
