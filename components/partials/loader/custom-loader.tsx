import React from 'react';

export default function CustomLoader() {
    return (
        <div className="aling-center flex h-[22rem] justify-center">
            <span className="m-auto inline-block h-14 w-14 animate-spin rounded-full border-8 border-[#f1f2f3] border-l-primary"></span>
        </div>
    );
}
