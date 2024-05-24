export type SectionKey = 'deposit' | 'withdraw' | 'transfer' | 'all';

export interface OpenSections {
    deposit: boolean;
    withdraw: boolean;
    transfer: boolean;
    all: boolean
}

// Definiendo la interfaz para sub-items
interface SubItem {
    id: string;
    label: string;
}

// Definiendo la interfaz para secciones principales
interface CheckboxSectionData {
    label: string;
    id: string;
    subItems: SubItem[];
}

// Componente para mostrar las secciones con sus sub-items
export interface CheckboxSectionProps {
    section: CheckboxSectionData;
}