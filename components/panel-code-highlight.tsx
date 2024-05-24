'use client';
import React, { useState, ReactNode } from 'react';

interface PanelCodeHighlightProps {
    children: ReactNode;
    title?: string;
    codeHighlight?: string;
    id?: string;
    className?: string;
}

const PanelCodeHighlight = ({ children, title, codeHighlight, id, className = '' }: PanelCodeHighlightProps) => {
    return (
        <div className={`panel dark:bg-[#0e1726] ${className}`} id={id}>
            <div className="mb-5 flex items-center justify-start">
                <h5 className="text-sm font-semibold dark:text-white-light">{title}</h5>
            </div>
            {children}
        </div>
    );
};

export default PanelCodeHighlight;
