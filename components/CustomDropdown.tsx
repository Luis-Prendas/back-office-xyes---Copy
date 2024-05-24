import Link from 'next/link';
import React, { createContext, useContext, ReactNode, FC } from 'react';

// Definir una interfaz para el contexto del dropdown
interface DropdownContextProps {
    isOpen: boolean;
    toggleDropdown: () => void;
    sidebar: boolean;
    activeLink: string | null;
    setActiveLink: (link: string) => void;
}

const DropdownContext = createContext<DropdownContextProps>({
    isOpen: false,
    toggleDropdown: () => { },
    sidebar: false,
    activeLink: null,
    setActiveLink: () => { },
});

interface PropsChildren {
    children: ReactNode;
    isOpen: boolean;
    toggleDropdown: () => void;
    sidebar: boolean;
    activeLink: string | null;
    setActiveLink: (link: string) => void;
}

const CustomDropdown: FC<PropsChildren> & {
    Toggle: FC<ToggleProps>;
    Menu: FC<MenuProps>;
    MenuItem: FC<MenuItemProps>;
} = ({ children, isOpen, toggleDropdown, sidebar, activeLink, setActiveLink }) => {
    return (
        <DropdownContext.Provider value={{ isOpen, toggleDropdown, sidebar, activeLink, setActiveLink }}>
            <li className="w-full">
                {children}
            </li>
        </DropdownContext.Provider>
    );
};

interface ToggleProps {
    children: (isOpen: boolean, sidebar: boolean) => ReactNode;
}

const Toggle: FC<ToggleProps> = ({ children }) => {
    const { isOpen, toggleDropdown, sidebar } = useContext(DropdownContext);

    return (
        <button
            type="button"
            className="flex items-center w-full text-gray-900 text-sm transition duration-75 py-2 px-4 rounded-lg group dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-expanded={isOpen}
            onClick={sidebar ? undefined : toggleDropdown}
        >
            {children(isOpen, sidebar)}
        </button>
    );
};

interface MenuProps {
    children: ReactNode;
}

const Menu: FC<MenuProps> = ({ children }) => {
    const { isOpen } = useContext(DropdownContext);

    return (
        <ul className={`${isOpen ? 'block' : 'hidden'}`}>
            {children}
        </ul>
    );
};

interface MenuItemProps {
    href: string;
    children: ReactNode;
}

const MenuItem: FC<MenuItemProps> = ({ href, children }) => {
    const { activeLink, setActiveLink } = useContext(DropdownContext);

    const handleClick = () => {
        setActiveLink(href);
    };

    return (
        <li>
            <Link
                href={href}
                className={`flex items-center w-full text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 p-2 ${activeLink === href ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
                onClick={handleClick}
            >
                {children}
            </Link>
        </li>
    );
};

// Añadir los subcomponentes a CustomDropdown
CustomDropdown.Toggle = Toggle;
CustomDropdown.Menu = Menu;
CustomDropdown.MenuItem = MenuItem;

export default CustomDropdown;
