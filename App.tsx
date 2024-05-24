'use client';
import { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '@/store'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css' //if using mantine date picker features
import 'mantine-react-table/styles.css' //make sure MRT styles were imported in your app root (once)

function App({ children }: PropsWithChildren) {
    const { isDarkMode } = useSelector((state: IRootState) => state.themeConfig)

    return (
        <div className='main-section relative font-nunito text-sm font-normal antialiased'>
            <MantineProvider forceColorScheme={isDarkMode ? 'dark' : 'light'}>
                {children}
            </MantineProvider>
        </div>
    )
}

export default App