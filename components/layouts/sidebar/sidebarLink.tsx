import Link from "next/link";

interface SidebarLinkProps {
    href: string
    label: string
    onClick: () => void
    isActive: boolean
}

export default function SidebarLink({ href, label, isActive, onClick }: SidebarLinkProps) {
    return (
        <li>
            <Link href={href} onClick={onClick} className={`nav-link group ${isActive && 'active bg-gray-300'}`}>
                <span className={`text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3`}>
                    {label}
                </span>
            </Link>
        </li>
    )
}