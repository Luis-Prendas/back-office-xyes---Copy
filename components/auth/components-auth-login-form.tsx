'use client';
import { signInSchema } from '@/Validators/AuthValidators';
import IconLockDots from '@/components/icon/icon-lock-dots';
import IconMail from '@/components/icon/icon-mail';
import { useAuth } from '@/contexts/AuthContext';
import { emailAndPasswordSignIn } from '@/services/authService';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showMessage } from '../Utils';
import { getTranslation } from '@/i18n';
import { getEnviroment } from '@/services/getEnviroment';
import axios from 'axios';
import { IRootState, useAppDispatch } from '@/store';
import { useAppSelector } from "@/store";
import { singIn } from '@/store/userInfoSlice';

const ComponentsAuthLoginForm = () => {
    const { t } = getTranslation();
    const authBaseUrl = getEnviroment()
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector((state) => state.userInfo);

    const signInDefaultValues = {
        username: '',
        password: '',
    };

    type SignInSchema = z.infer<typeof signInSchema>;

    const router = useRouter();
    const { setIsAuthenticated } = useAuth();

    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const mutation = useMutation({
        mutationKey: ['email-sign-in'],
        mutationFn: emailAndPasswordSignIn,
    });

    const {
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitted },
        register,
        setValue,
    } = useForm({
        defaultValues: signInDefaultValues,
        resolver: zodResolver(signInSchema),
    });

    const onSignIn: SubmitHandler<SignInSchema> = async (data) => {
        setError(null);
        setShowLoading(true);

        // Crear un nuevo objeto con el campo 'email' en lugar de 'username'
        const signInData = {
            username: data.username, // Usar el valor de 'username' como 'email'
            password: data.password,
        };

        const res = await mutation.mutateAsync(signInData);

        if (res.code === 'error') {
            setShowLoading(false);
            showMessage(t('login_error'), 'error');
            setError(res.error.message);
            return;
        }


        try {
            const Tresponse = await axios.get(`${authBaseUrl}/auth_backoffice/api/v1/me`, {
                headers: {
                    Authorization: res.data.token
                }
            });
            const Tres = Tresponse.data;
            dispatch(singIn(Tres))
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        setShowLoading(false);
        showMessage('Inicio de sesión exitoso');

        localStorage.setItem('access_token', res.data.token);
        setIsAuthenticated(true);
        router.push('/');
    };

    return (
        <form className="space-y-5 dark:text-white" onSubmit={handleSubmit(onSignIn)}>
            <div>
                <label htmlFor="Username">{t('Username')}</label> {/* Cambiado de 'Email' a 'Username' */}
                <div className="relative text-white-dark">
                    <input {...register('username')} name="username" id="Username" type="text" placeholder="Enter Username" className="form-input ps-10 placeholder:text-white-dark" /> {/* Cambiado de 'email' a 'username' y el tipo a 'text' */}
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconMail fill={true} /> {/* Considera cambiar el ícono para reflejar que es para 'username' */}
                    </span>
                </div>
            </div>
            <div>
                <label htmlFor="Password">{t('password')}</label>
                <div className="relative text-white-dark">
                    <input {...register('password')} name="password" id="Password" type="password" placeholder="Enter Password" className="form-input ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconLockDots fill={true} />
                    </span>
                </div>
            </div>

            <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                {!showLoading ? (
                    t('Sign in')
                ) : (
                    <div>
                        <svg aria-hidden="true" role="status" className="mr-3 inline h-4 w-4 animate-spin text-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                            ></path>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <span>{t('Loading')}</span>
                    </div>
                )}
            </button>
        </form>
    );
};

type Status = ErrorStatus | SuccessStatus;
type ErrorStatus = {
    text: string;
    value: 'error';
};
type SuccessStatus = {
    value: 'success';
};
const getStatus = (error: any, submit: boolean): Status | undefined => {
    if (!submit) return undefined;

    if (error?.message) {
        return {
            value: 'error',
            text: error.message,
        };
    } else {
        return {
            value: 'success',
        };
    }
};

export default ComponentsAuthLoginForm;
