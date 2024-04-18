import styles from './myInput.module.scss';

export default function MyInput(props: { placeholder: string; type: string }) {
    return (
        <input className={styles.input} type={props.type} placeholder={props.placeholder}></input>
    );
}
