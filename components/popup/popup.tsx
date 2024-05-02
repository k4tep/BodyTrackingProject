import { useState } from 'react';
import MyDatePicker from '../date-picker/echarts-container/echarts/date';
import MyInput from '../input/input';
import styles from './popup.module.scss';
import dayjs from 'dayjs';
import { postData } from '@/api/data/post-data';

export default function MyPopUp(props: { setPopUp: any; popUp: boolean }) {
    const [newData, setNewData] = useState({
        date: dayjs(Date.now()),
        value: 0,
    });

    return (
        <div
            className={props.popUp ? styles.popup_container : styles.popup_container_none}
            onClick={() => {
                props.setPopUp(false);
            }}
        >
            <div
                className={styles.popup_input_container}
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                <h1>Enter your data</h1>
                <MyDatePicker label="Date" date={newData} setDate={setNewData} />
                <MyInput
                    placeholder="Weight"
                    type="number"
                    onBlur={(event: { target: { value: number } }) =>
                        setNewData({
                            ...newData,
                            value: Number(event.target.value),
                        })
                    }
                />
                <button
                    className={styles.auth_btn}
                    onClick={() => {
                        postData({
                            ...newData,
                            date: newData.date.format('YYYY-MM-DD'),
                        });
                        props.setPopUp(false);
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    );
}
