'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './page.module.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import MyHeader from '@/components/header/header';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { getMe } from '@/api/me/get-me';

export default function Profile() {
    library.add(fas);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState({
        id: 0,
        email: '',
        age: 0,
        height: 0,
    });

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/auth');
        }
        async function getList() {
            setLoading(true);
            try {
                const data = await getMe();
                setData(data);
            } catch (error) {
                setError(`${error}`);
            }
            setLoading(false);
        }
        getList();
    }, []);

    return (
        <main className={styles.main}>
            <MyHeader />
            <div className={styles.container}>
                <div className={styles.side_container}>
                    <div className={styles.side_btn}>
                        <FontAwesomeIcon icon={['fas', 'user']} size="2xl" />
                        <h1>Profile info</h1>
                    </div>
                </div>
                {loading ? (
                    <FontAwesomeIcon icon={['fas', 'spinner']} spinPulse size="2xl" />
                ) : error != '' ? (
                    <>
                        <FontAwesomeIcon icon={['fas', 'circle-exclamation']} beatFade size="2xl" />
                        <h1 className={styles.error_message}>{error}</h1>
                        <FontAwesomeIcon icon={['fas', 'circle-exclamation']} beatFade size="2xl" />
                    </>
                ) : (
                    <div className={styles.main_container}>
                        <div className={styles.info_main_container}>
                            <h1>Personal information</h1>
                            <h3>Information about you and your body</h3>
                        </div>
                        <div className={styles.info_container}>
                            <div className={styles.info}>
                                <h3>Email</h3>
                                <h3>{data.email}</h3>
                            </div>
                            <div className={styles.info}>
                                <h3>Height</h3>
                                <h3>{data.height}</h3>
                            </div>
                            <div className={styles.info}>
                                <h3>Age</h3>
                                <h3>{data.age}</h3>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
