export type ImageVip = {
    badge?: string;
    pointer?: string;
    color?: string;
};

export type Vip = {
    _id?: string | null;
    category: string;
    icon: string;
    image: ImageVip;
    order: string;
    rewards: any;
    image_medal: string;
    info_levels: string;
    extra_missions_daily: number;
    extra_missions_week: number;
    created_at?: Date;
    updated_at?: Date;
    __v?: number;
};

export type ResponseInfo = {
    code: string;
    data: Vip[];
};
