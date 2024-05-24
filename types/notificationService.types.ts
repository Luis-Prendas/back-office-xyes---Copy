export type NotificationsLink = {
    id?: any;
    link: string;
    description: string;
};

export type Notification = {
    totals: any;
    details: any;
    _id?: string | null;
    title: string;
    description: string;
    extra_description: string;
    links: Array<NotificationsLink>;
    image?: string;
    icon?: string;
    created_at?: Date;
    updated_at?: Date;
    __v?: number;
};

export type ResponseInfo = {
    code: string;
    data: Notification[];
};
