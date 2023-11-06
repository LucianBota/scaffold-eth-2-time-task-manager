import React, { ReactNode } from "react";

interface ModalProps {
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className="modal">
			<div className="modal-content">
				<span className="modal-close" onClick={onClose}>
					&times;
				</span>
				{children}
			</div>
		</div>
	);
};

export default Modal;
