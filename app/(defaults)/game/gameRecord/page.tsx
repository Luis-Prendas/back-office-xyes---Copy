import ComponentsAppsGameRecord from '@/components/apps/games/gameRecord/components-apps-game-record';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Notifications',
};

export default function GameRecord () {
    return <ComponentsAppsGameRecord />
};
