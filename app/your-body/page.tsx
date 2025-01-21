'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import { getData } from '@/api/data/get-data';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MyEcharts from '@/components/echarts-container/echarts';
import MyGrid from '@/components/grid-container/grid';
import MyHeader from '@/components/header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import MyDatePicker from '@/components/date-picker/date';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import MyPopUp from '@/components/popup/popup';

export default function Main() {
    const router = useRouter();
    library.add(fas);
    const [data, setData] = useState([
        {
            id: 0,
            userId: 0,
            date: '',
            value: 0,
        },
    ]);
    const [date, setDate] = useState({
        startDate: dayjs(Date.now() - 30 * 24 * 60 * 60 * 1000),
        endDate: dayjs(Date.now()),
    });
    const [preset, setPreset] = useState('month');
    const [deleteID, setDeleteID] = useState(null);
    const [popUp, setPopUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token') || error === '401 Unauthorized') {
            router.push('/auth');
        }
    }, []);

    useEffect(() => {
        async function getList() {
            setDeleteID(null);
            setLoading(true);
            try {
                const data = await getData(date);
                setData(data);
            } catch (error) {
                setError(`${error}`);
            }
            setLoading(false);
        }
        getList();
    }, [date, deleteID, popUp]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MyPopUp setPopUp={setPopUp} popUp={popUp} />
            <main className={styles.main}>
                <MyHeader type={'your-body'} />
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
                        <div className={styles.data_container}>
                            <div className={styles.date_container}>
                                <MyDatePicker label="Start date" date={date} setDate={setDate} />
                                <MyDatePicker label="End date" date={date} setDate={setDate} />
                                <p>Presets</p>
                                <div className={styles.periods_btn_container}>
                                    <button
                                        className={
                                            preset === 'week'
                                                ? `${styles.check} ${styles.periods_btn}`
                                                : styles.periods_btn
                                        }
                                        onClick={() => {
                                            setDate({
                                                ...date,
                                                startDate: dayjs(
                                                    Date.now() - 7 * 24 * 60 * 60 * 1000
                                                ),
                                            });
                                            setPreset('week');
                                        }}
                                    >
                                        Week
                                    </button>
                                    <button
                                        className={
                                            preset === 'month'
                                                ? `${styles.check} ${styles.periods_btn}`
                                                : styles.periods_btn
                                        }
                                        onClick={() => {
                                            setDate({
                                                ...date,
                                                startDate: dayjs(
                                                    Date.now() - 30 * 24 * 60 * 60 * 1000
                                                ),
                                            });
                                            setPreset('month');
                                        }}
                                    >
                                        Month
                                    </button>
                                    <button
                                        className={
                                            preset === '3month'
                                                ? `${styles.check} ${styles.periods_btn}`
                                                : styles.periods_btn
                                        }
                                        onClick={() => {
                                            setDate({
                                                ...date,
                                                startDate: dayjs().subtract(3, 'month'),
                                            });
                                            setPreset('3month');
                                        }}
                                    >
                                        3 month
                                    </button>
                                    <button
                                        className={
                                            preset === '6month'
                                                ? `${styles.check} ${styles.periods_btn}`
                                                : styles.periods_btn
                                        }
                                        onClick={() => {
                                            setDate({
                                                ...date,
                                                startDate: dayjs().subtract(6, 'month'),
                                            });
                                            setPreset('6month');
                                        }}
                                    >
                                        6 month
                                    </button>
                                </div>
                                <MyGrid
                                    data={data}
                                    setData={setData}
                                    setDeleteID={setDeleteID}
                                    setPopUp={setPopUp}
                                />
                            </div>
                            <div className={styles.data_container}>
                                <MyEcharts data={data} date={date} type="Line" />
                                <h1 className={styles.echart_name}>Body mass index</h1>
                                <MyEcharts data={data} date={date} type="Grade" />
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </LocalizationProvider>
    );
}
