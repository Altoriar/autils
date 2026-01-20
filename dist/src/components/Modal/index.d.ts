import { FC, ReactNode } from 'react';
interface ModalProps {
    visible: boolean;
    title?: string;
    onClose: () => void;
    children: ReactNode;
    footer: ReactNode;
    maskClosable?: boolean;
}
export declare const Modal: FC<ModalProps>;
export {};
//# sourceMappingURL=index.d.ts.map