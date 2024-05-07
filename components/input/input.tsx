import styles from './input.module.scss';

export default function MyInput(props: { placeholder: string; type: string; onBlur: any }) {
    return (
        <input
            className={styles.input}
            placeholder={props.placeholder}
            type={props.type}
            onBlur={props.onBlur}
            min={20}
            max={200}
        ></input>
    );
}
