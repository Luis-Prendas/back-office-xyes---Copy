'use client'
import 'flatpickr/dist/flatpickr.css';
import { checkboxSections } from '@/components/constans';
import { FormEventHandler, useState } from 'react';
import { getTranslation } from '@/i18n';
import { TransactionRecordTotals } from '../../tables/transaction-record/transaction-record-types';
import Filters from '../default-filter';
import { Totals } from '@/services/transactionsService.types';

type SelectedCheckboxes = {
    [key: string]: boolean;
};

interface Props {
    totals: Totals;
    changeTime: () => void;
    changeUsd: () => void;
    handleSubmit: FormEventHandler<HTMLFormElement>
}

const CheckboxSections = () => {
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<SelectedCheckboxes>({});

    // Maneja el cambio de selección para la opción "All"
    const handleAllChange = () => {
        const allSelected = !selectedCheckboxes['all'];
        const newSelections: SelectedCheckboxes = {};

        checkboxSections.forEach((section) => {
            newSelections[section.id] = allSelected;

            section.subItems.forEach((subItem) => {
                newSelections[subItem.id] = allSelected;
            });
        });

        setSelectedCheckboxes(newSelections);
    };

    // Maneja el cambio de selección para cada checkbox
    const handleCheckboxChange = (id: string, sectionId?: string) => {
        setSelectedCheckboxes((prevState) => {
            const updatedState = { ...prevState, [id]: !prevState[id] };

            // Si el checkbox hijo es seleccionado y el padre no lo está, activa el padre
            if (sectionId && !prevState[sectionId]) {
                updatedState[sectionId] = true;
            }

            return updatedState;
        });
    };

    // Maneja el cambio de selección para el padre y sus sub-items
    const handleParentCheckboxChange = (sectionId: string) => {
        const isSelected = !selectedCheckboxes[sectionId];
        const updatedState: SelectedCheckboxes = { ...selectedCheckboxes, [sectionId]: isSelected };

        checkboxSections.forEach((section) => {
            if (section.id === sectionId) {
                section.subItems.forEach((subItem) => {
                    updatedState[subItem.id] = isSelected;
                });
            }
        });

        setSelectedCheckboxes(updatedState);
    };

    return (
        <>
            {checkboxSections.map((section) => (
                <div key={section.id} className="flex flex-col">
                    {/* Checkbox para el padre */}
                    <div className='flex items-center gap-2'>
                        <input
                            id={section.id}
                            name={section.id}
                            type="checkbox"
                            checked={selectedCheckboxes[section.id] || false}
                            onChange={() => section.id === 'all' ? handleAllChange() : handleParentCheckboxChange(section.id)}
                        />
                        <label htmlFor={section.id}>{section.label}</label>
                    </div>

                    {/* Checkboxes para los sub-items */}
                    {section.subItems.length > 0 && (
                        <>
                            {section.subItems.map((subItem) => (
                                <div key={subItem.id} className='flex items-center gap-2'>
                                    <input
                                        id={subItem.id}
                                        name={subItem.id}
                                        type="checkbox"
                                        checked={selectedCheckboxes[subItem.id] || false}
                                        onChange={() => handleCheckboxChange(subItem.id, section.id)}
                                    />
                                    <label htmlFor={subItem.id}>{subItem.label}</label>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            ))}
        </>

    );
};

export default function FilterDepositWithdraw({ totals, changeTime, changeUsd, handleSubmit }: Props) {
    const { t } = getTranslation();

    return (
        <Filters changeTime={changeTime} changeUsd={changeUsd} handleSubmit={handleSubmit}>
            <div className="w-full h-full col-span-2 row-span-1 border border-gray-400 rounded flex justify-between items-start p-2">
                <CheckboxSections />
            </div>
        </Filters>

    )

}
