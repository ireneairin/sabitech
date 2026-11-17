/**
 * Icon.jsx — <Icon name='trash' size='lg' /> → <span class="icon icon--lg icon-trash">, drawn by css/icons.css.
 * aria-hidden: decorative; the button or link next to it has its own text.
 */
export default function Icon({ name, size }) {
	const className = size ? `icon icon--${size} icon-${name}` : `icon icon-${name}`;
	return (
		<span
			className={className}
			aria-hidden='true'
		/>
	);
}
