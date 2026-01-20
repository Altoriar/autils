/**
 * 自定义 toast
 */

import { FC, ReactNode, useEffect, useRef, useState } from 'react';

interface ToastProps {
	message?: string | ReactNode;
	duration?: number;
	onClose?: () => void;
}

export const Toast: FC<ToastProps> = ({
	message = '',
	duration = 2000,
	onClose,
}) => {
	const [visible, setVisible] = useState(true);
	const toastRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const onClickOutSide = (e: MouseEvent) => {
			// 如果当前节点不是 toast 的子元素，则说明点击的是外部元素，此时关闭
			if (
				toastRef.current &&
				!toastRef.current.contains(e.target as Node)
			) {
				setVisible(false);
				onClose?.();
			}
		};

		document.addEventListener('click', onClickOutSide);

		return () => {
			document.removeEventListener('click', onClickOutSide);
		};
	}, [onClose]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
		}, duration);

		return () => {
			clearTimeout(timer);
		};
	}, [visible]);

	return (
		<>
			{visible ? (
				<div className='totast' ref={toastRef}>
					{message}
				</div>
			) : null}
		</>
	);
};
