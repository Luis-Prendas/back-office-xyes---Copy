'use client';
import { IRootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';

const MainContainer = ({ children }: { children: React.ReactNode }) => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    return <main className={`${themeConfig.navbar} grid grid-cols-[65px_180px_repeat(10,_1fr)] grid-rows-[65px_repeat(10,_1fr)_35px] gap-x-[0px] gap-y-[0px] h-screen`}> {children}</main>;
};

export default MainContainer;
