'use client';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { changeSidebarLinkselect, changeSidebarTapOpen, resetToggleSidebar, toggleSidebar } from '@/store/themeConfigSlice';
import { IRootState } from '@/store';
import React, { useState, useEffect, useCallback } from 'react';
import IconCaretsDown from '@/components/icon/icon-carets-down';
import { usePathname } from 'next/navigation';
import { getTranslation } from '@/i18n';
import {
    IconAffiliate,
    IconAssembly,
    IconBrandBinance,
    IconCaretDown,
    IconChevronDown,
    IconChevronRight,
    IconChevronUp,
    IconClipboardData,
    IconCreditCardPay,
    IconDashboard,
    IconDeviceGamepad,
    IconGift,
    IconLayersIntersect,
    IconProgressBolt,
    IconScale,
    IconShoppingCart,
    IconTank,
    IconUserExclamation,
    IconUsers,
    IconVip,
} from '@tabler/icons-react';
import CustomDropdown from '@/components/CustomDropdown';
import { useRoutesSidebar } from '@/hooks/useRoutesSidebar';

export default function Sidebar() {
    const { t } = getTranslation();
    const dispatch = useDispatch();
    const router = usePathname();
    const { sidebar, semidark, sidebarTapOpen, sidebarLinkselect } = useSelector((state: IRootState) => state.themeConfig);
    const [openDropdown, setOpenDropdown] = useState<string | null>(sidebarTapOpen);
    const [activeLink, setActiveLink] = useState<string | null>(sidebarLinkselect);

    const { getLabelByLink, routesSidebar } = useRoutesSidebar()

    useEffect(() => {
        const currentTab = getLabelByLink(router)
        console.log(currentTab)
        dispatch(changeSidebarTapOpen(currentTab ? currentTab.route.tab : null))
        dispatch(changeSidebarLinkselect(currentTab ? currentTab.foundLink.href : null))
        setOpenDropdown(currentTab ? currentTab.route.tab : null)
        setActiveLink(currentTab ? currentTab.foundLink.href : null)
    }, [router])

    const collapseSidebar = () => {
        dispatch(toggleSidebar());
        setOpenDropdown(null)
    };

    const toggleDropdown = (dropdown: string) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    return (
        <nav className={`${semidark && 'dark text-white-dark'} ${sidebar ? '[grid-area:1_/_1_/_13_/_2]' : '[grid-area:1_/_1_/_13_/_3]'} border-r border-gray-200 flex flex-col gap-4`}>
            <section className="flex items-center justify-between p-4">
                <div className={`main-logo xyes-logo flex shrink-0 items-center ${sidebar ? 'hidden' : 'block'}`}>
                    <img className="ml-[5px] w-24 flex-none" src="/assets/img/xyes-logo.svg" alt="logo" />
                </div>

                <button
                    type="button"
                    className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 dark:text-white-light dark:hover:bg-dark-light/10 rtl:rotate-180"
                    onClick={collapseSidebar}
                >
                    <IconCaretsDown className={`m-auto ${sidebar ? '-rotate-90' : 'rotate-90'} `} />
                </button>
            </section>
            <ul className="flex flex-col">
                {/* DASHBOARD */}
                <li>
                    <Link href="/" className="flex items-center gap-2 w-full text-gray-900 text-sm transition duration-75 py-2 px-4 rounded-lg group dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <IconDashboard />
                        <span className={`text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3 ${sidebar ? 'hidden' : 'block'}`}>{t('dashboard')}</span>
                    </Link>
                </li>

                {routesSidebar.map((menuItem) => (
                    <CustomDropdown
                        key={menuItem.tab}
                        isOpen={openDropdown === menuItem.tab}
                        toggleDropdown={() => toggleDropdown(menuItem.tab)}
                        sidebar={sidebar}
                        activeLink={activeLink}
                        setActiveLink={setActiveLink}
                    >
                        <CustomDropdown.Toggle>
                            {(isOpen, sidebar) => (
                                <>
                                    {menuItem.icon}
                                    {!sidebar && (
                                        <span className="flex-1 ms-3 truncate text-left rtl:text-right whitespace-nowrap">
                                            {menuItem.tab}
                                        </span>
                                    )}
                                    {!sidebar && (
                                        isOpen ? <IconChevronDown className="w-5" /> : <IconChevronRight className="w-5" />
                                    )}
                                </>
                            )}
                        </CustomDropdown.Toggle>
                        <CustomDropdown.Menu>
                            {menuItem.links.map((link, linkIndex) => (
                                <CustomDropdown.MenuItem key={linkIndex} href={link.href}>
                                    {link.label}
                                </CustomDropdown.MenuItem>
                            ))}
                        </CustomDropdown.Menu>
                    </CustomDropdown>
                ))}
            </ul>
        </nav>
    );
}
