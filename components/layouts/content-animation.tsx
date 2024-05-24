'use client';
import { useRoutesSidebar } from '@/hooks/useRoutesSidebar';
import { IRootState } from '@/store';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

const ContentAnimation = ({ children }: { children: React.ReactNode }) => {
    const { sidebar, animation } = useSelector((state: IRootState) => state.themeConfig);
    const router = usePathname();
    const { getLabelByLink } = useRoutesSidebar()
    const currentTab = getLabelByLink(router)

    return (
        <>
            {/* BEGIN CONTENT AREA */}
            <div className={`${animation} ${sidebar ? '[grid-area:2_/_2_/_12_/_13]' : '[grid-area:2_/_3_/_12_/_13]'} animate__animated bg-gray-100 overflow-auto p-4 flex flex-col`}>
                <span>{currentTab ? currentTab.foundLink.i18n : null}</span>
                {children}
            </div>
            {/* END CONTENT AREA */}
        </>
    );
};

export default ContentAnimation;