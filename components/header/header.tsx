import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './header.module.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function MyHeader() {
    library.add(fas);
    return (
        <header className={styles.header}>
            <h1 className={styles.header_name_text}>Body Tracking</h1>
            <Link href="/auth" onClick={() => localStorage.removeItem('token')}>
                <FontAwesomeIcon icon={['fas', 'arrow-right-from-bracket']} size="2xl" />
            </Link>
        </header>
    );
}
