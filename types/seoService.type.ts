export type Seo = {
    _id?: string | null;
    title: string;
    description: string;
    tags: any;
    component: string;
    language: string;
    status?: string;
    created_at?: Date;
    updated_at?: Date;
    __v?: number;
};

export type ResponseInfo = {
    code: string;
    data: Seo[];
};
