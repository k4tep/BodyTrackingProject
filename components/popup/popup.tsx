import { useState } from 'react';
import MyDatePicker from '../date-picker/date';
import MyInput from '../input/input';
import styles from './popup.module.scss';
import dayjs from 'dayjs';
import { postData } from '@/api/data/post-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

export default function MyPopUp(props: { setPopUp: any; popUp: boolean }) {
    library.add(fas);
    const [newData, setNewData] = useState({
        date: dayjs(Date.now()),
        value: 0,
    });

    async function postNewData() {
        try {
            await postData({
                ...newData,
                date: newData.date.format('YYYY-MM-DD'),
            });

            setNewData({
                date: dayjs(Date.now()),
                value: 0,
            });
            props.setPopUp(false);
        } catch (error) {
            console.log(`${error}`);
        }
    }

    return (
        <div className={props.popUp ? styles.popup_container : styles.popup_container_none}>
            <FontAwesomeIcon
                icon={['fas', 'circle-xmark']}
                size="2xl"
                className={styles.close_btn}
                onClick={() => {
                    props.setPopUp(false);
                }}
            />
            <div
                className={styles.popup_input_container}
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                <h1>Enter your data</h1>
                <MyDatePicker label="" date={newData} setDate={setNewData} />
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
                    className={styles.save_btn}
                    onClick={() => {
                        postNewData();
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    );
}
