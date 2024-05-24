'use client';
import Dropdown from '@/components/dropdown';
import IconBell from '@/components/icon/icon-bell';
import IconCamera from '@/components/icon/icon-camera';
import IconCopy from '@/components/icon/icon-copy';
import IconDownload from '@/components/icon/icon-download';
import IconHelpCircle from '@/components/icon/icon-help-circle';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots';
import IconLogin from '@/components/icon/icon-login';
import IconMenu from '@/components/icon/icon-menu';
import IconMessage from '@/components/icon/icon-message';
import IconMessagesDot from '@/components/icon/icon-messages-dot';
import IconMicrophoneOff from '@/components/icon/icon-microphone-off';
import IconMoodSmile from '@/components/icon/icon-mood-smile';
import IconPhone from '@/components/icon/icon-phone';
import IconPhoneCall from '@/components/icon/icon-phone-call';
import IconSearch from '@/components/icon/icon-search';
import IconSend from '@/components/icon/icon-send';
import IconSettings from '@/components/icon/icon-settings';
import IconShare from '@/components/icon/icon-share';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import IconUserPlus from '@/components/icon/icon-user-plus';
import IconVideo from '@/components/icon/icon-video';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { IRootState } from '@/store';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import IconAirplay from '@/components/icon/icon-airplay';
import IconCaretDown from '@/components/icon/icon-caret-down';
import AnimateHeight from 'react-animate-height';
import IconBox from '@/components/icon/icon-box';
import IconLayout from '@/components/icon/icon-layout';
import { getTranslation } from '@/i18n';
import { Dialog, Tab, Transition } from '@headlessui/react';
import { IconHome, IconUser, IconX } from '@tabler/icons-react';
import { contactList, loginUser, MEMBER_LIST_SUB_TABS, MEMBER_LIST_SUB_TABS_ROUTES } from '@/components/constans';
import { MemberInformation1 } from '@/types/memberListService.type';
import FormMemberInfo2 from '../forms/form-financial';
import IconMessages from '@/components/icon/icon-messages';
import FormInformation from '../forms/form-information';
import FormFinantial from '../forms/form-financial';
import MemberBonusForm from '../forms/member-bonus-form';
import { User } from '@/types/usersService.types';
import MemberLossForm from '../forms/member-loss-form';
import { getEnviroment } from '@/services/getEnviroment';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/components/layouts/provider-component';

type inputData = {
    user: any;
    transactionDetail: any;
};

const ChatUserAccount = ({ user, transactionDetail }: inputData) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const authBaseUrl = getEnviroment();

    const { t } = getTranslation();
    const isFirstRender = useRef(true);

    const [isShowChatMenu, setIsShowChatMenu] = useState(false);
    const [searchUser, setSearchUser] = useState('');
    const [isShowUserChat, setIsShowUserChat] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [textMessage, setTextMessage] = useState('');
    const [filteredItems, setFilteredItems] = useState<any>(contactList);
    const [toggleActive, setToggleActive] = useState<string>('1');
    const toggleAccordionList = (value: string) => {
        setToggleActive((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        setFilteredItems(() => {
            return contactList.filter((d) => {
                return d.name.toLowerCase().includes(searchUser.toLowerCase());
            });
        });
    }, [searchUser]);

    // defaults
    const [defaultParams] = useState();

    const [params, setParams] = useState<MemberInformation1>(JSON.parse(JSON.stringify(user ?? defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const scrollToBottom = () => {
        if (isShowUserChat) {
            setTimeout(() => {
                const element: any = document.querySelector('.chat-conversation-box');
                element.behavior = 'smooth';
                element.scrollTop = element.scrollHeight;
            });
        }
    };
    const selectUser = (user: any) => {
        setSelectedUser(user);
        setIsShowUserChat(true);
        scrollToBottom();
        setIsShowChatMenu(false);
    };

    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabClick = (index: React.SetStateAction<number>) => {
        queryClient.clear();
        setSelectedTab(index);
    };

    const sendMessage = () => {
        if (textMessage.trim()) {
            let list = contactList;
            let user: any = list.find((d) => d.userId === selectedUser.userId);
            user.messages.push({
                fromUserId: selectedUser.userId,
                toUserId: 0,
                text: textMessage,
                time: 'Just now',
            });
            setFilteredItems(list);
            setTextMessage('');
            scrollToBottom();
        }
    };
    const sendMessageHandle = (event: any) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const fetchQuery = async (url: string) => {
        const res = await fetch(url);
        if (res.status === 400) {
            throw new Error('Bad Request: Please check your request and try again.');
        }
        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }
        return await res.json();
    };

    const routePath = MEMBER_LIST_SUB_TABS_ROUTES[selectedTab];

    const getEndPointSupabase = (selectedTab: number) => {
        switch (selectedTab) {
            case 0:
                return `${authBaseUrl}${routePath}${user._id}`;

            case 1:
                return `${authBaseUrl}${routePath}${user._id}/financial`;

            case 2:
                return `${authBaseUrl}${routePath}${user._id}/bonus`;

            case 3:
                return `${authBaseUrl}${routePath}${user._id}/totals`; //member loss

            default:
                return `${authBaseUrl}${routePath}${user._id}/totals`;
        }
    };

    const fullRoute = getEndPointSupabase(selectedTab);

    const { data, isLoading, error } = useQuery({
        queryKey: ['fetchSubData', selectedTab],
        queryFn: () => fetchQuery(fullRoute),
        refetchOnWindowFocus: false,
    });

    return (
        <div>
            <div className={`relative grid h-full grid-cols-1 gap-5 sm:h-[calc(80vh_-_150px)] sm:min-h-0 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 ${isShowChatMenu ? 'min-h-[999px]' : ''}`}>
                <div className={`absolute z-[5] hidden h-full w-full rounded-md bg-black/60 ${isShowChatMenu ? '!block xl:!hidden' : ''}`} onClick={() => setIsShowChatMenu(!isShowChatMenu)}></div>

                {/* // este es el chat  */}

                <div className="panel w-100 p-0">
                    {!isShowUserChat && (
                        <div className="relative flex h-full items-center justify-center p-4">
                            <button type="button" onClick={() => setIsShowChatMenu(!isShowChatMenu)} className="absolute top-4 hover:text-primary xl:hidden ltr:left-4 rtl:right-4">
                                <IconMenu />
                            </button>

                            <div className="flex flex-col items-center justify-center py-8">
                                <div className="mb-8 h-[calc(40vh_-_320px)] min-h-[120px] w-[280px] text-white dark:text-black md:w-[430px]">
                                    <IconMessages isDark={isDark} className="h-full w-full" />
                                </div>
                                <button onClick={() => selectUser(contactList[0])} className="mx-auto flex max-w-[2000px] justify-center rounded-md bg-white-dark/20 p-2 font-semibold">
                                    <IconMessage className="ltr:mr-2 rtl:ml-2" />
                                    Click to show messages
                                </button>
                            </div>
                        </div>
                    )}
                    {isShowUserChat && selectedUser ? (
                        <div className="relative">
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <button type="button" className="hover:text-primary xl:hidden" onClick={() => setIsShowChatMenu(!isShowChatMenu)}>
                                        <IconMenu />
                                    </button>
                                    <div className="relative flex-none">
                                        <img src={`${user.avatar}`} className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12" alt="" />
                                        <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
                                            <div className="h-4 w-4 rounded-full bg-success"></div>
                                        </div>
                                    </div>
                                    <div className="mx-3">
                                        <p className="font-semibold">{selectedUser.name}</p>
                                        <p className="text-xs text-white-dark">{selectedUser.active ? 'Active now' : 'Last seen at ' + selectedUser.time}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 sm:gap-5">
                                    <button type="button">
                                        <IconPhoneCall className="hover:text-primary" />
                                    </button>

                                    <button type="button">
                                        <IconVideo className="h-5 w-5 hover:text-primary" />
                                    </button>
                                    <div className="dropdown">
                                        <Dropdown
                                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                            btnClassName="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light w-8 h-8 rounded-full !flex justify-center items-center"
                                            button={<IconHorizontalDots className="rotate-90 opacity-70 hover:text-primary" />}
                                        >
                                            <ul className="text-black dark:text-white-dark">
                                                <li>
                                                    <button type="button">
                                                        <IconSearch className="shrink-0 ltr:mr-2 rtl:ml-2" />
                                                        Search
                                                    </button>
                                                </li>
                                                <li>
                                                    <button type="button">
                                                        <IconCopy className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                                        Copy
                                                    </button>
                                                </li>
                                                <li>
                                                    <button type="button">
                                                        <IconTrashLines className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                                        Delete
                                                    </button>
                                                </li>
                                                <li>
                                                    <button type="button">
                                                        <IconShare className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                                        Share
                                                    </button>
                                                </li>
                                                <li>
                                                    <button type="button">
                                                        <IconSettings className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                                        Settings
                                                    </button>
                                                </li>
                                            </ul>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                            <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>

                            <PerfectScrollbar className="chat-conversation-box relative h-full sm:h-[calc(75vh_-_200px)]">
                                <div className="min-h-[400px] space-y-5 p-4 pb-[68px] sm:min-h-[300px] sm:pb-0">
                                    <div className="m-6 mt-0 block">
                                        <h4 className="relative border-b border-[#f4f4f4] text-center text-xs dark:border-gray-800">
                                            <span className="relative top-2 bg-white px-3 dark:bg-black">{'Today, ' + selectedUser.time}</span>
                                        </h4>
                                    </div>

                                    {/* // ESTA ES FUNCION DONDE SE MUESTRA EL CHAT */}

                                    {selectedUser.messages && selectedUser.messages.length ? (
                                        <>
                                            {selectedUser.messages.map((message: any, index: any) => {
                                                return (
                                                    <div key={index}>
                                                        <div className={`flex items-start gap-3 ${selectedUser.userId === message.fromUserId ? 'justify-end' : ''}`}>
                                                            <div className={`flex-none ${selectedUser.userId === message.fromUserId ? 'order-2' : ''}`}>
                                                                {selectedUser.userId === message.fromUserId ? (
                                                                    <img src={`/assets/images/${loginUser.path}`} className="h-10 w-10 rounded-full object-cover" alt="" />
                                                                ) : (
                                                                    ''
                                                                )}
                                                                {selectedUser.userId !== message.fromUserId ? (
                                                                    <img src={`/assets/images/${selectedUser.path}`} className="h-10 w-10 rounded-full object-cover" alt="" />
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </div>
                                                            <div className="space-y-2">
                                                                <div className="flex items-center gap-3">
                                                                    <div
                                                                        className={`rounded-md bg-black/10 p-4 py-2 dark:bg-gray-800 ${
                                                                            message.fromUserId === selectedUser.userId
                                                                                ? '!bg-primary text-white ltr:rounded-br-none rtl:rounded-bl-none'
                                                                                : 'ltr:rounded-bl-none rtl:rounded-br-none'
                                                                        }`}
                                                                    >
                                                                        {message.text}
                                                                    </div>
                                                                    <div className={`${selectedUser.userId === message.fromUserId ? 'hidden' : ''}`}>
                                                                        <IconMoodSmile className="hover:text-primary" />
                                                                    </div>
                                                                </div>
                                                                <div className={`text-xs text-white-dark ${selectedUser.userId === message.fromUserId ? 'ltr:text-right rtl:text-left' : ''}`}>
                                                                    {message.time ? message.time : '5h ago'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </PerfectScrollbar>

                            <div className="relative bottom-0 left-0 w-full p-4">
                                <div className="w-full items-center space-x-3 sm:flex rtl:space-x-reverse">
                                    <div className="relative flex-1">
                                        <input
                                            className="form-input rounded-full border-0 bg-[#f4f4f4] px-12 py-2 focus:outline-none"
                                            placeholder="Type a message"
                                            value={textMessage}
                                            onChange={(e: any) => setTextMessage(e.target.value)}
                                            onKeyUp={sendMessageHandle}
                                        />
                                        <button type="button" className="absolute top-1/2 -translate-y-1/2 hover:text-primary ltr:left-4 rtl:right-4">
                                            <IconMoodSmile />
                                        </button>
                                        <button type="button" className="absolute top-1/2 -translate-y-1/2 hover:text-primary ltr:right-4 rtl:left-4" onClick={() => sendMessage()}>
                                            <IconSend />
                                        </button>
                                    </div>
                                    <div className="hidden items-center space-x-3 py-3 sm:block sm:py-0 rtl:space-x-reverse">
                                        <button type="button" className="rounded-md bg-[#f4f4f4] p-2 hover:bg-primary-light hover:text-primary dark:bg-[#1b2e4b]">
                                            <IconMicrophoneOff />
                                        </button>
                                        <button type="button" className="rounded-md bg-[#f4f4f4] p-2 hover:bg-primary-light hover:text-primary dark:bg-[#1b2e4b]">
                                            <IconDownload />
                                        </button>
                                        <button type="button" className="rounded-md bg-[#f4f4f4] p-2 hover:bg-primary-light hover:text-primary dark:bg-[#1b2e4b]">
                                            <IconCamera />
                                        </button>
                                        <button type="button" className="rounded-md bg-[#f4f4f4] p-2 hover:bg-primary-light hover:text-primary dark:bg-[#1b2e4b]">
                                            <IconHorizontalDots className="opacity-70" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>

                {/* //panel del chat */}

                <div className={`panel w-100 absolute z-10 hidden h-[57rem] space-y-4 overflow-hidden p-5 dark:bg-[#0e1726] xl:relative xl:block ${isShowChatMenu ? '!block' : ''}`}>
                    <div className="!mt-0">
                        <div className="mb-5">
                            <div className="space-y-2 font-semibold">
                                <Tab.Group>
                                    <Tab.List
                                        style={{ position: 'sticky', top: '0px' }}
                                        className="z-10 flex flex-wrap border-b border-white-light bg-[#ffffff] pt-0 dark:border-[#0e1726] dark:bg-[#0e1726]"
                                    >
                                        {MEMBER_LIST_SUB_TABS.map((tab, index) => (
                                            <Tab key={index} as={Fragment}>
                                                {({ selected }) => (
                                                    <button
                                                        style={{
                                                            borderRadius: `${selected ? '0px 30px 0px 0px' : '0px'}`,
                                                        }}
                                                        className={`${
                                                            selected
                                                                ? '!border-white-light !border-b-[#f3f1f1] bg-[#f3f1f1] text-info dark:!border-[#191e3a] dark:!border-b-black dark:bg-[#060818]'
                                                                : ''
                                                        }
                                                                            ' -mb-[1px] flex items-center border border-transparent p-3.5 py-2 !outline-none transition duration-300 hover:text-info`}
                                                        onClick={() => handleTabClick(tab.key)}
                                                    >
                                                        {t(tab.label)}
                                                    </button>
                                                )}
                                            </Tab>
                                        ))}
                                    </Tab.List>
                                    <Tab.Panels style={{ marginTop: '0px', marginBottom: '0px' }}>
                                        <Tab.Panel>
                                            <div className="active bg-[#f3f1f1] p-5 dark:bg-[#060818]">
                                                <FormInformation user={params} data={data} hasError={error} isLoading={isLoading}></FormInformation>
                                            </div>
                                        </Tab.Panel>

                                        <Tab.Panel>
                                            <div className="active bg-[#f3f1f1] p-5 dark:bg-[#060818]">
                                                <FormFinantial user={params} data={data} hasError={error} isLoading={isLoading}></FormFinantial>
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <div className="active bg-[#f3f1f1] p-5 dark:bg-[#060818]">
                                                <MemberBonusForm data={params} handleModal={undefined}></MemberBonusForm>
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <div className="active bg-[#f3f1f1] p-5 dark:bg-[#060818]">
                                                <MemberLossForm data={data} handleModal={undefined}></MemberLossForm>
                                            </div>
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </Tab.Group>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatUserAccount;
