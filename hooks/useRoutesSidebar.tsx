import { getTranslation } from "@/i18n";
import { useState, useEffect } from "react";
import { IconAffiliate, IconBrandBinance, IconClipboardData, IconCreditCardPay, IconDeviceGamepad, IconGift, IconLayersIntersect, IconProgressBolt, IconScale, IconTank, IconUserExclamation, IconUsers, IconVip } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";

interface RouteLink {
    label: string;
    href: string;
    i18n: string;
}

interface RouteSidebar {
    tab: string;
    icon: JSX.Element;
    links: RouteLink[];
}
export const useRoutesSidebar = () => {
    const { t } = getTranslation();
    const { currentLang } = useSelector((state: IRootState) => state.themeConfig);

    const [routesSidebar, setRoutesSidebar] = useState<RouteSidebar[]>([]);

    useEffect(() => {
        const obj: RouteSidebar[] = [
            {
                tab: t('member'),

                icon: <IconUsers />,
                links: [
                    { label: t('membersList'), href: '/user/members-list', i18n: `/ ${t('member')} / ${t('membersList')}` },
                    { label: t('transactionRecord'), href: '/user/transactions', i18n: `/ ${t('member')} / ${t('transactionRecord')}` }
                ]
            },
            {
                tab: t('memberTransactionRecord'),
                icon: <IconCreditCardPay />,
                links: [
                    { label: t('duplicateOfMemberList'), href: '/member-transaction-record/duplicate-member-list', i18n: `/ ${t('memberTransactionRecord')} / ${t('duplicateOfMemberList')}` },
                    { label: t('transactionRecord'), href: '/member-transaction-record/transaction-record', i18n: `/ ${t('memberTransactionRecord')} / ${t('transactionRecord')}` }
                ]
            },
            {
                tab: t('TurnoverGameSystem'),
                icon: <IconCreditCardPay />,
                links: [
                    { label: t('duplicateOfMemberList'), href: '/turnover-game-system/duplicate-member-list', i18n: `/ ${t('TurnoverGameSystem')} / ${t('duplicateOfMemberList')}` }
                ]
            },
            {
                tab: t('game'),
                icon: <IconDeviceGamepad />,
                links: [
                    { label: t('gameSetting'), href: '/game/gameSetting', i18n: `/ ${t('game')} / ${t('gameSetting')}` },
                    { label: t('gameRecord'), href: '/game/gameRecord', i18n: `/ ${t('game')} / ${t('gameRecord')}` },
                    { label: t('gameRakeback'), href: '/game/gameRakeback', i18n: `/ ${t('game')} / ${t('gameRakeback')}` }
                ]
            },
            {
                tab: t('memberBalance'),
                icon: <IconScale />,
                links: [
                    { label: t('withdrawVerification'), href: '/member-balance/withdraw-verification', i18n: `/ ${t('memberBalance')} / ${t('withdrawVerification')}` },
                    { label: t('depositReview'), href: '/member-balance/deposit-review', i18n: `/ ${t('memberBalance')} / ${t('depositReview')}` },
                    { label: t('riskReview'), href: '/member-balance/risk-review', i18n: `/ ${t('memberBalance')} / ${t('riskReview')}` },
                    { label: t('withdrawalReview'), href: '/member-balance/withdrawal-review', i18n: `/ ${t('memberBalance')} / ${t('withdrawalReview')}` },
                    { label: t('withdrawRecord'), href: '/member-balance/withdraw-record', i18n: `/ ${t('memberBalance')} / ${t('withdrawRecord')}` }
                ]
            },
            {
                tab: t('FiatCryptoFunds'),
                icon: <IconBrandBinance />,
                links: [
                    { label: t('duplicateOfMemberList'), href: '/member-transaction-record/duplicate-member-list', i18n: `/ ${t('FiatCryptoFunds')} / ${t('duplicateOfMemberList')}` }
                ]
            },
            {
                tab: t('vipClub'),
                icon: <IconVip />,
                links: [
                    { label: t('membersList'), href: '/vip-clup/member-list', i18n: `/ ${t('vipClub')} / ${t('membersList')}` }
                ]
            },
            {
                tab: t('affiliateSystem'),
                icon: <IconAffiliate />,
                links: [
                    { label: t('membersList'), href: '/affiliate-system/members-list', i18n: `/ ${t('affiliateSystem')} / ${t('membersList')}` }
                ]
            },
            {
                tab: t('vaultPro'),
                icon: <IconProgressBolt />,
                links: [
                    { label: t('membersList'), href: '/vault-pro/members-list', i18n: `/ ${t('vaultPro')} / ${t('membersList')}` }
                ]
            },
            {
                tab: t('battle'),
                icon: <IconTank />,
                links: [
                    { label: t('duplicateOfMemberList'), href: '/battle/duplicate-memberList', i18n: `/ ${t('battle')} / ${t('duplicateOfMemberList')}` }
                ]
            },
            {
                tab: t('generalBouns'),
                icon: <IconGift />,
                links: [
                    { label: t('duplicateOfMemberList'), href: '/general-bonus/duplicate-memberList', i18n: `/ ${t('generalBouns')} / ${t('duplicateOfMemberList')}` }
                ]
            },
            {
                tab: t('report'),
                icon: <IconClipboardData />,
                links: [
                    { label: t('duplicateOfMemberList'), href: '/report/duplicate-memberList', i18n: `/ ${t('report')} / ${t('duplicateOfMemberList')}` }
                ]
            },
            {
                tab: t('adExeclusive'),
                icon: <IconUserExclamation />,
                links: [
                    { label: t('duplicateOfMemberList'), href: '/ad-execlusive/duplicate-memberList', i18n: `/ ${t('adExeclusive')} / ${t('duplicateOfMemberList')}` }
                ]
            },
            {
                tab: t('others'),
                icon: <IconLayersIntersect />,
                links: [
                    { label: t('seo'), href: '/others/seo', i18n: `/ ${t('others')} / ${t('seo')}` },
                    { label: t('vip'), href: '/others/vip', i18n: `/ ${t('others')} / ${t('vip')}` },
                    { label: t('globalSettings'), href: '/others/global-settings', i18n: `/ ${t('others')} / ${t('globalSettings')}` },
                    { label: t('notifications'), href: '/others/notifications', i18n: `/ ${t('others')} / ${t('notifications')}` }
                ]
            }
        ]

        setRoutesSidebar(obj)
    }, [currentLang])

    const getLabelByLink = (link: string) => {
        for (const route of routesSidebar) {
            const foundLink = route.links.find(routeLink => routeLink.href === link);
            if (foundLink) {
                return { foundLink, route };
            }
        }
        return null; // Si no se encuentra el link, devuelve strings vacíos
    };

    return { routesSidebar, getLabelByLink };
};
