import React, { useImperativeHandle, useRef, useState } from 'react';
import { FC, ReactNode } from 'react';

interface ModalProps {
	visible: boolean;
	title?: string;
	onClose: () => void;
	children: ReactNode;
	footer: ReactNode;
	maskClosable?: boolean;
}

export const Modal: FC<ModalProps> = ({
	visible,
	title,
	onClose,
	maskClosable,
	children,
	footer,
}) => {
	return (
		<div
			className='modal-mask'
			onClick={() => {
				if (maskClosable) {
					onClose();
				}
			}}
		>
			{visible ? (
				<div className='modal'>
					<header className='modal-header'>{title}</header>
					<div className='modal-body'>{children}</div>
					<footer className='modal-footer'>{footer}</footer>
				</div>
			) : null}
		</div>
	);
};

// interface ModalOptions {
// 	visible: boolean;
// 	title?: string;
// 	onClose: () => void;
// 	children: ReactNode;
// 	footer: ReactNode;
// 	maskClosable?: boolean;
// }

// interface ModalRef {
// 	onShow: (opt?: ModalOptions) => void;
// 	onHide: () => void;
// }
// export const Modal2 = React.forwardRef((_, ref) => {
// 	const [visible, setVisible] = useState(false);
// 	const [options, setOptions] = useState<ModalOptions>();

// 	useImperativeHandle(ref, () => ({
// 		onShow(opt?: ModalOptions) {
// 			setVisible(true);
// 			setOptions(opt);
// 		},
// 		hide() {
// 			setVisible(false);
// 		},
// 	}));

// 	return (
// 		<div
// 			className='modal-mask'
// 			onClick={() => {
// 				if (maskClosable) {
// 					onClose();
// 				}
// 			}}
// 		>
// 			{visible ? (
// 				<div className='modal'>
// 					<header className='modal-header'>{title}</header>
// 					<div className='modal-body'>{children}</div>
// 					<footer className='modal-footer'>{footer}</footer>
// 				</div>
// 			) : null}
// 		</div>
// 	);
// });

// const App = () => {
// 	const ModalRef = useRef<ModalRef | null>(null);
// 	return (
// 		<>
// 			<button
// 				onClick={() => {
// 					ModalRef.current?.onShow();
// 				}}
// 			></button>
// 			<Modal2 ref={ModalRef}></Modal2>
// 		</>
// 	);
// };
