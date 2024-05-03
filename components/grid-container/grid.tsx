import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './grid.module.scss';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { deleteData } from '@/api/data/delete-data';
import { useEffect, useState } from 'react';
import { putData } from '@/api/data/put-data';

export default function MyGrid(props: {
    data: any;
    setData: any;
    setDeleteID: any;
    setPopUp: any;
}) {
    library.add(fas);
    const [editData, setEditData] = useState({ id: 0, value: 0 });

    useEffect(() => {
        async function putUpdateData() {
            try {
                await putData(editData);
                props.setDeleteID(0);
            } catch (error) {
                console.log(`${error}`);
            }
        }
        if (editData.value != 0) {
            putUpdateData();
        }
    }, [editData]);

    return (
        <>
            <div
                className={
                    props.data.length <= 5
                        ? styles.grid_container
                        : `${styles.grid_container} ${styles.grid_container_overflow}`
                }
            >
                <div className={styles.grid_row}>
                    <input className={styles.grid_item} disabled defaultValue={'Date'}></input>
                    <input className={styles.grid_item} disabled defaultValue={'Weight/kg'}></input>
                    <FontAwesomeIcon
                        icon={['fas', 'circle-plus']}
                        size="xl"
                        style={{ cursor: 'pointer' }}
                        onClick={() => props.setPopUp(true)}
                    />
                </div>
                {props.data.length === 0 ? (
                    <h1>No data here</h1>
                ) : (
                    props.data
                        .sort((a: any, b: any) => Date.parse(b.date) - Date.parse(a.date))
                        .map((e: any) => (
                            <div className={styles.grid_row} key={e.id + e.value}>
                                <input
                                    disabled
                                    className={styles.grid_item}
                                    defaultValue={`${e.date.slice(0, 10)}`}
                                ></input>
                                <input
                                    className={styles.grid_item}
                                    defaultValue={e.value}
                                    onBlur={(event) => {
                                        setEditData({
                                            id: e.id,
                                            value: Number(event.target.value),
                                        });
                                    }}
                                ></input>
                                <FontAwesomeIcon
                                    icon={['fas', 'trash-can']}
                                    size="xl"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        props.setDeleteID(e.id);
                                        deleteData(e.id);
                                    }}
                                />
                            </div>
                        ))
                )}
            </div>
        </>
    );
}
