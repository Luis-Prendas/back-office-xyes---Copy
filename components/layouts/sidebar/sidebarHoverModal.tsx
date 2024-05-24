import { ReactNode, useState } from "react";

interface HoverModalProps {
    triggerIcon: ReactNode;
    label: string;
    content: ReactNode;
}

const SidebarHoverModal: React.FC<HoverModalProps> = ({ triggerIcon, label, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    return (
        <li
            className="menu nav-item relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button type="button" className="nav-link group w-full">
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center">
                        {triggerIcon}
                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{label}</span>
                    </div>
                </div>
            </button>
            {
                isOpen && (
                    <div className="absolute flex flex-col gap-2 border border-gray-300 w-72 top-0 left-full bg-white shadow-lg rounded-lg p-2 z-10">
                        <p className='text-center'>{label}</p>
                        <div className="bg-gray-50 shadow border border-gray-300">
                            {content}
                        </div>
                    </div>
                )
            }
        </li>
    );
};

export default SidebarHoverModal

