import { NavLink } from 'react-router';
import styles from './Page404.module.css';

export default function Page404() {
	return (
		<div className={styles.container}>
			<div className={styles.text}>Страница не найдена</div>
			<NavLink to="/" className={styles.link}>
				На главную
			</NavLink>
		</div>
	);
}
