'use client'
import { IRootState } from "@/store";
import { useSelector } from "react-redux";

const Footer = () => {
    const { sidebar } = useSelector((state: IRootState) => state.themeConfig);

    return (
        <footer className={`${sidebar ? '[grid-area:12_/_2_/_13_/_13]' : '[grid-area:12_/_3_/_13_/_13]'} bg-gray-100 flex justify-start items-center px-4`}>© {new Date().getFullYear()}. Vristo All rights reserved.</footer>
    );
};

export default Footer;
