import { Metadata } from 'next';
import React from 'react';
import BoxedSignIn from './boxed-signin/page';

export const metadata: Metadata = {
    title: 'Login',
};

const Login = () => {
    return <BoxedSignIn />;
};

export default Login;
