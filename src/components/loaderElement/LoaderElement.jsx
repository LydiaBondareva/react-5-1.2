import styles from './LoaderElement.module.css';

export default function LoaderElement() {
	return (
		<div className={styles['spinner-container']}>
			<div className={styles.spinner}></div>
		</div>
	);
}
