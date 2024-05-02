'use client';
import MyInput from '@/components/input/input';
import styles from './page.module.scss';
import { SetStateAction, useState } from 'react';
import { signIn } from '@/api/auth';
import { redirect } from 'next/navigation';

export default function Auth() {
    const [authType, setAuthType] = useState('Sign In');
    const [error, setError] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    if (localStorage.getItem('token')) {
        redirect('/your-body');
    }

    async function getToken() {
        try {
            const data = await signIn(emailValue, passwordValue, authType);
            localStorage.setItem('token', data.token);
            redirect('/your-body');
        } catch (error) {
            setError(`${error}`);
        }
    }

    return (
        <div className={styles.container}>
            <img src="background.png" className={styles.auth_img}></img>
            <div className={styles.auth_container}>
                {/* <img src="logo.png" className={styles.logo_img}></img> */}
                <h1 className={styles.auth_text}>{authType}</h1>
                <div className={styles.auth_input_container}>
                    <MyInput
                        placeholder="Email"
                        type="email"
                        onBlur={(event: { target: { value: SetStateAction<string> } }) => {
                            setEmailValue(event.target.value);
                        }}
                    />
                    <MyInput
                        placeholder="Password"
                        type="password"
                        onBlur={(event: { target: { value: SetStateAction<string> } }) => {
                            setPasswordValue(event.target.value);
                        }}
                    />
                    <button
                        className={styles.auth_change_btn}
                        onClick={() => setAuthType(authType === 'Sign Up' ? 'Sign In' : 'Sign Up')}
                    >
                        But maybe you wanna {authType === 'Sign Up' ? 'Sign In' : 'Sign Up'}
                    </button>
                    <button className={styles.auth_btn} onClick={getToken}>
                        {authType}
                    </button>
                </div>
            </div>
        </div>
    );
}
