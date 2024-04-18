import MyInput from '@/components/my-input/myInput';
import styles from './page.module.scss';

export default function Home() {
    // const { authType, setAuthType };

    return (
        <div className={styles.container}>
            <img src="swirls.png" className={styles.auth_img}></img>
            <div className={styles.auth_container}>
                <h1 className={styles.auth_text}>Sign In</h1>
                <div className={styles.auth_input_container}>
                    <MyInput placeholder="Email" type="email"></MyInput>
                    <MyInput placeholder="Password" type="password"></MyInput>
                    <button className={styles.auth_change_btn}>But maybe you wanna Sign Up</button>
                    <button className={styles.auth_btn}>Sign In</button>
                </div>
            </div>
        </div>
    );
}
