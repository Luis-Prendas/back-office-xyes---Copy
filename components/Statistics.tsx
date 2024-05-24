import { IconCurrencyDollar } from "@tabler/icons-react";
import React, { ReactNode } from "react";

const StatisticsContext = React.createContext({});

interface PropsChildren {
    children: ReactNode
}

const Statistics = ({ children }: PropsChildren) => {
    return (
        <div className="w-full h-full border border-gray-400 rounded flex flex-col gap-4 justify-center items-center p-4">
            <StatisticsContext.Provider value={{}}>
                {children}
            </StatisticsContext.Provider>
        </div>
    );
};

const Child = ({ children }: PropsChildren) => {
    return <div className='w-full h-full flex justify-center items-center gap-4'>{children}</div>;
};

const Header = ({ children }: PropsChildren) => {
    return <h3 className='font-bold w-56 text-right'>{children}</h3>;
};

const Stat = ({ children }: PropsChildren) => {
    return <fieldset className={`border rounded p-2 pt-0 text-right w-44 border-black`}>{children}</fieldset>;
};

const Name = ({ children }: PropsChildren) => {
    return <legend className='px-1'>{children}</legend>;
};

const Currency = ({ currency }: { currency: number }) => {
    return <span className={`${currency >= 0 ? 'text-green-500' : 'text-red-500'} font-bold flex justify-between items-center`}><IconCurrencyDollar /> {currency ? currency.toFixed(2) : '0.00'}</span>;
};

// Añadir los subcomponentes a Statistics
Statistics.Child = Child;
Statistics.Header = Header;
Statistics.Stat = Stat;
Statistics.Name = Name;
Statistics.Currency = Currency;

export default Statistics;
