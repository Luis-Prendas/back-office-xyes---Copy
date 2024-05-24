'use client';
import App from '@/App';
import React, { ReactNode, Suspense } from 'react';
import Loading from '@/components/layouts/loading';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import ReduxProvider from '@/store/redux-provider';

interface IProps {
    children?: ReactNode;
}

export const queryClient = new QueryClient();

const ProviderComponent = ({ children }: IProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReduxProvider>
                <Suspense fallback={<Loading />}>
                    <AuthProvider>
                        <App>{children} </App>
                    </AuthProvider>
                </Suspense>
            </ReduxProvider>
        </QueryClientProvider>
    );
};

export default ProviderComponent;
