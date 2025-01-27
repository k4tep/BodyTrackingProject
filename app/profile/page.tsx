'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './page.module.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import MyHeader from '@/components/header/header';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { getMe } from '@/api/me/get-me';
import { putMe } from '@/api/me/put-me';

export default function Profile() {
    library.add(fas);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [newDataAnswer, setNewDataAnswer] = useState('');
    const [data, setData] = useState({
        id: 0,
        email: '',
        age: 0,
        height: 0,
    });

    async function putNewData() {
        try {
            await putMe(data);
            setNewDataAnswer('Saved successfully');
        } catch (error) {
            alert(`${error}`);
            setNewDataAnswer('Save error');
        }
        setTimeout(() => {
            setNewDataAnswer('');
        }, 2000);
    }

    useEffect(() => {
        if (!localStorage.getItem('token') || error === '401 Token expired') {
            router.push('/auth');
        }
    }, []);

    useEffect(() => {
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
            <MyHeader type={'profile'} />
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
                                <input
                                    className={styles.info_input}
                                    defaultValue={data.email}
                                ></input>
                            </div>
                            <div className={styles.info}>
                                <h3>Height</h3>
                                <input
                                    className={styles.info_input}
                                    defaultValue={data.height || 'unknown'}
                                    onBlur={(event) => {
                                        setData({
                                            ...data,
                                            height: Number(event.target.value),
                                        });
                                    }}
                                ></input>
                            </div>
                            <div className={styles.info}>
                                <h3>Age</h3>
                                <input
                                    className={styles.info_input}
                                    defaultValue={data.age || 'unknown'}
                                    onBlur={(event) => {
                                        setData({
                                            ...data,
                                            age: Number(event.target.value),
                                        });
                                    }}
                                ></input>
                            </div>
                            <div className={styles.info}>
                                <h3>{newDataAnswer}</h3>
                                <button
                                    className={styles.save_btn}
                                    onClick={() => {
                                        putNewData();
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
