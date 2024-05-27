import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './header.module.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useState } from 'react';

export default function MyHeader(props: { type: string }) {
    library.add(fas);
    const [div, setDiv] = useState(false);

    return (
        <header className={styles.header}>
            <h1 className={styles.header_name_text}>Body Tracking</h1>
            <FontAwesomeIcon
                icon={['fas', 'user-gear']}
                size="2xl"
                onClick={() => {
                    setDiv(!div);
                }}
            />
            <div className={div ? styles.show_div : styles.hide_div}>
                {props.type === 'profile' ? (
                    <Link href="/your-body">
                        <FontAwesomeIcon icon={['fas', 'user']} size="2xl" />
                        <h3>Your Body</h3>
                    </Link>
                ) : (
                    <Link href="/profile">
                        <FontAwesomeIcon icon={['fas', 'gear']} size="2xl" />
                        <h3>Account & Settings</h3>
                    </Link>
                )}

                <Link href="/auth" onClick={() => localStorage.removeItem('token')}>
                    <FontAwesomeIcon icon={['fas', 'arrow-right-from-bracket']} size="2xl" />
                    <h3>Log Out</h3>
                </Link>
            </div>
        </header>
    );
}
