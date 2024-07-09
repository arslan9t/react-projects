import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ isOpen, onClose, children }) => {
	return (
		isOpen && (
			<>
				<div
					
					className=" h-[100%] z-10 w-[370px] backdrop-blur absolute top-0 "
				>
					<div className="p-2 m-auto relative mt-[50%] z-40 h-[230px] bg-white w-[70%] rounded-lg">
						<div className="flex flex-col">
							<AiOutlineClose
								onClick={onClose}
								className="self-end text-2xl cursor-pointer"
							/>
						</div>
						{children}
					</div>
				</div>
			</>
		)
	);
};

export default Modal;
