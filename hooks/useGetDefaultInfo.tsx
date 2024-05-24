import { useQuery } from '@tanstack/react-query';
import { getEnviroment } from '@/services/getEnviroment';
import { keepPreviousData } from '@tanstack/react-query';
import { showMessage } from '@/components/Utils';
import { getTranslation } from '@/i18n';

export interface ApiResponse {
    payload: Array<[]>;
    message: string;
    totals: string;
}

export const useGetDefaultInfo = (linkURL: string, id: string, setMessageStatus: any) => {
    const baseUrl = getEnviroment();
    const { t } = getTranslation();

    const fetchURL = new URL(linkURL, baseUrl);
    return useQuery<ApiResponse>({
        queryKey: [id, fetchURL.href], //refetch whenever the URL changes (columnFilters, globalFilter, sorting, pagination)
        queryFn: () =>
            fetch(fetchURL.href)
                .then((res) => {
                    if (res.status === 400) {
                        showMessage(t('error_server'), 'error');
                        setMessageStatus(true);
                    } else {
                        setMessageStatus(false);
                    }
                    return res ? res.json() : [];
                })
                .catch((error) => {
                    console.log(error);
                    showMessage(t('error_server'), 'error');
                }),
        placeholderData: keepPreviousData, //useful for paginated queries by keeping data from previous pages on screen while fetching the next page
    });
};
