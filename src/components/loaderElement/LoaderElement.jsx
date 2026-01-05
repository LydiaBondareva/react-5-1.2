import { useOutletContext } from 'react-router';
import styles from './LoaderElement.module.css';

export default function LoaderElement() {
	const { isLoading } = useOutletContext();
	if (isLoading)
		return (
			<div className={styles['spinner-container']}>
				<div className={styles.spinner}></div>
			</div>
		);
}
