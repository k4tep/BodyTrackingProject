import styles from './grid.module.scss';

export default function MyGrid(props: { data: any }) {
    return (
        <div className={styles.grid_container}>
            <div className={styles.grid_row}>
                <input className={styles.grid_item} disabled value={'Date'}></input>
                <input className={styles.grid_item} disabled value={'Weight/kg'}></input>
            </div>
            {props.data.map((e: any) => (
                <div className={styles.grid_row}>
                    <input className={styles.grid_item} value={`${e.date.slice(0, 10)}`}></input>
                    <input className={styles.grid_item} value={`${e.value} kg`}></input>
                </div>
            ))}
        </div>
    );
}
