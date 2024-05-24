import IconCaretDown from '@/components/icon/icon-caret-down'
import IconChatDots from '@/components/icon/icon-chat-dots'
import { ReactNode } from "react"
import AnimateHeight from "react-animate-height"
import SidebarHoverModal from './sidebarHoverModal'

interface SidebarMenuItemProps {
    label: string
    icon: ReactNode
    onClick: () => void
    isActive: boolean
    children?: ReactNode
    sidebar: boolean
}

export default function SidebarMenuItem({ label, icon, onClick, isActive, children, sidebar }: SidebarMenuItemProps) {
    const handleClick = () => {
        if (!sidebar) {
            onClick()
        }
    }
    return (
        <li className="menu nav-item">
            {sidebar ? (
                <SidebarHoverModal
                    triggerIcon={icon}
                    label={label}
                    content={children}
                />
            ) : (
                <>
                    <button type="button" className={`nav-link group w-full ${isActive && 'active'}`} onClick={handleClick}>
                        <div className="w-full flex justify-between items-center">
                            <div className="flex items-center">
                                {icon}
                                <span title={label} className="text-black truncate max-w-40 dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{label}</span>
                            </div>
                            <IconCaretDown className={`transition-transform ${!isActive && '-rotate-90 rtl:rotate-90'}`} />
                        </div>
                    </button>
                    <AnimateHeight duration={300} height={isActive ? 'auto' : 0}>
                        {children}
                    </AnimateHeight>
                </>
            )}
        </li>
    )
}