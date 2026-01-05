import { useOutletContext } from 'react-router';
import styles from './ErrorElement.module.css';

export default function ErrorElement() {
	const { error } = useOutletContext();
	if (error) return <div className={styles.error}>{error}</div>;
}
