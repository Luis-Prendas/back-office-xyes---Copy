import ComponentsAppsOthersGames from '@/components/apps/others/games/componentes-apps-others-games';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Game Settings',
};

export default function GameSetting () {
    return <ComponentsAppsOthersGames />
};
