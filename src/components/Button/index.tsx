import { FC, ReactNode } from 'react';

interface Props {
	type?: 'primary' | 'secondary' | 'default' | 'link';
	icon?: ReactNode;
	loading?: boolean;
	disabled?: boolean;
	children?: ReactNode;
}

export const Button: FC<Props> = ({
	type = 'default',
	icon,
	loading,
	disabled,
	children,
}) => {
	return (
		<button className={type}>
			{icon && <>{icon}</>}
			{children}
		</button>
	);
};
