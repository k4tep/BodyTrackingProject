import styles from './input.module.scss';

export default function MyInput(props: { placeholder: string; type: string }) {
    return (
        <input className={styles.input} placeholder={props.placeholder} type={props.type}></input>
    );
}
