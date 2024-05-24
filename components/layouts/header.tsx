'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, useAppSelector } from '@/store';
import { changeCurrentLang, toggleRTL, toggleSidebar } from '@/store/themeConfigSlice';
import Dropdown from '@/components/dropdown';
import IconLogout from '@/components/icon/icon-logout';
import { usePathname, useRouter } from 'next/navigation';
import { getTranslation } from '@/i18n';
import { useAuth } from '@/contexts/AuthContext';
import { showMessage } from '../Utils';
import { IconBell, IconClipboardText, IconClock, IconCloudDownload, IconCode, IconCreditCard, IconEye, IconMenu } from '@tabler/icons-react';
import HoverModal from '../partials/modals/modal-hover';
import IconChatDots from '../icon/icon-chat-dots';
import IconCpuBolt from '../icon/icon-cpu-bolt';
import Link from 'next/link';

const Header = () => {
    const { setIsAuthenticated } = useAuth();
    const userInfo = useAppSelector((state) => state.userInfo);

    const dispatch = useDispatch();
    const router = useRouter();
    const { t, i18n } = getTranslation();

    const setLocale = (flag: string) => {
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
        router.refresh();
    };

    const handleCloseSesion = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('access_token');
        showMessage('Has cerrado sesion');
        router.push('/auth');
    };

    const { sidebar, semidark, menu, languageList, rtlClass } = useSelector((state: IRootState) => state.themeConfig);

    return (
        <header className={`${semidark && menu === 'horizontal' ? 'dark' : ''} ${sidebar ? '[grid-area:1_/_2_/_2_/_13]' : '[grid-area:1_/_3_/_2_/_13]'} shadow-lg px-4 py-2 flex items-center justify-between dark:bg-black`}>
            <div className="horizontal-logo flex items-center justify-between lg:hidden ltr:mr-2 rtl:ml-2">
                <Link href="/" className="main-logo flex shrink-0 items-center">
                    <img className="inline w-20 ltr:-ml-1 rtl:-mr-1" src="/assets/img/xyes-logo.svg" alt="logo" />
                </Link>
                <button
                    type="button"
                    className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden ltr:ml-2 rtl:mr-2"
                    onClick={() => dispatch(toggleSidebar())}
                >
                    <IconMenu className="h-5 w-5" />
                </button>
            </div>

            <span className="text-green-600">Current Online: 0,000.00</span>

            <div className="flex items-center gap-4">
                <span className="text-gray-700">Current All Players Main Account Balance: 0,000.00</span>

                <span className="text-red-600">Current available game platform balance: 0,000.00</span>
            </div>

            <div className="flex items-center space-x-4">
                <HoverModal
                    triggerIcon={<IconChatDots />}
                    count={3}
                    label="Transfer that pending to process"
                    content={
                        <p className="flex w-full items-center justify-between bg-gray-200 p-4">
                            Past 7 days <span>0</span>
                        </p>
                    }
                />

                <HoverModal
                    triggerIcon={<IconClipboardText />}
                    count={0}
                    label="Game platform maintenance currently"
                    content={<p className="flex w-full items-center justify-between bg-gray-200 p-4">No ongoing maintenance</p>}
                />

                <HoverModal triggerIcon={<IconClock />} count={2} label="Annoucement" content={<p className="flex w-full items-center justify-between bg-gray-200 p-4">No announcements</p>} />

                <HoverModal triggerIcon={<IconCpuBolt />} count={0} label="New player deposit" content={<p className="flex w-full items-center justify-between bg-gray-200 p-4">No data</p>} />

                <HoverModal triggerIcon={<IconCreditCard />} count={1} label="New player withdraw" content={<p className="flex w-full items-center justify-between bg-gray-200 p-4">No data</p>} />

                <HoverModal triggerIcon={<IconBell />} count={0} label="0 Task notifications" content={<p className="flex w-full items-center justify-between bg-gray-200 p-4">No data</p>} />

                <HoverModal triggerIcon={<IconEye />} count={0} label="Over Limit Bank Card" content={<p className="flex w-full items-center justify-between bg-gray-200 p-4">No data</p>} />

                <HoverModal triggerIcon={<IconBell />} count={0} label="0 PG monitor notifications" content={<p className="flex w-full items-center justify-between bg-gray-200 p-4">No data</p>} />

                <HoverModal triggerIcon={<IconBell />} count={0} label="0 New Export Action" content={<p className="flex w-full items-center justify-between bg-gray-200 p-4">No data</p>} />

                <HoverModal
                    triggerIcon={<IconCloudDownload />}
                    count={0}
                    label="Export player bet info 0/0"
                    content={<p className="flex w-full items-center justify-between bg-gray-200 p-4">No data</p>}
                />

                {/* User Profile */}
                <div className="dropdown flex shrink-0 gap-2">
                    <Dropdown
                        offset={[0, 8]}
                        placement={`${rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'}`}
                        btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                        button={
                            <div className="flex items-center space-x-1 text-gray-600 focus:outline-none">
                                <img src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" alt="User avatar" className="h-6 w-6 rounded-full" />
                                <span>{userInfo.name}</span>
                            </div>
                        }
                    >
                        <ul className="flex w-[280px] flex-col gap-2 !px-2 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                            <li>
                                <button>Change password</button>
                            </li>
                            <li>
                                <button>Change Back Office Display Timezone</button>
                            </li>
                        </ul>
                    </Dropdown>

                    <Dropdown
                        offset={[0, 8]}
                        placement={`${rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'}`}
                        btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                        button={i18n.language && <img className="h-5 w-5 rounded-full object-cover" src={`/assets/images/flags/${i18n.language.toUpperCase()}.svg`} alt="flag" />}
                    >
                        <ul className="grid w-[280px] grid-cols-2 gap-2 !px-2 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                            {languageList.map((item: any) => {
                                return (
                                    <li key={item.code}>
                                        <button
                                            type="button"
                                            className={`flex w-full hover:text-primary ${i18n.language === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                            onClick={() => {
                                                i18n.changeLanguage(item.code);
                                                setLocale(item.code);
                                                dispatch(changeCurrentLang(item.code))
                                            }}
                                        >
                                            <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="h-5 w-5 rounded-full object-cover" />
                                            <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </Dropdown>
                </div>

                {/* Logout */}
                <div>
                    <a href="#" onClick={() => handleCloseSesion()} className="flex items-center space-x-1">
                        <IconLogout className="-rotate-90" />
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
