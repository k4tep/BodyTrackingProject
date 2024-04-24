import MyInput from '@/components/input/input';
import styles from './page.module.scss';
import Link from 'next/link';

export default function Auth() {
    // const { authType, setAuthType };

    return (
        <div className={styles.container}>
            <img src="background.png" className={styles.auth_img}></img>
            <div className={styles.auth_container}>
                {/* <img src="logo.png" className={styles.logo_img}></img> */}
                <h1 className={styles.auth_text}>Sign In</h1>
                <div className={styles.auth_input_container}>
                    <MyInput placeholder="Email" type="email"></MyInput>
                    <MyInput placeholder="Password" type="password"></MyInput>
                    <button className={styles.auth_change_btn}>But maybe you wanna Sign Up</button>
                    <Link href="/your-body" scroll={false}>
                        <button className={styles.auth_btn}>Sign In</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
