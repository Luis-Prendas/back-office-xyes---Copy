import { ReactNode, useState } from "react";

interface HoverModalProps {
    triggerIcon: ReactNode;
    count: number;
    label: string;
    content: ReactNode;
}

const HoverModal: React.FC<HoverModalProps> = ({ triggerIcon, count, label, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button>
                {triggerIcon}
                {count > 0 && (
                    <span className="bg-red-500 absolute -top-2 -right-2 text-white px-2 font-light text-sm rounded-full">
                        {count}
                    </span>
                )}
            </button>
            {isOpen && (
                <div className="absolute flex flex-col gap-2 border border-gray-300 w-72 top-full right-0 bg-white shadow-lg rounded-lg p-2 z-10">
                    <p className='text-center'>{label}</p>
                    {content}
                </div>
            )}
        </div>
    );
};

export default HoverModal