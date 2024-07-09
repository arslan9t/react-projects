import { deleteDoc, doc } from "firebase/firestore";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import useDisclose from "../hooks/useDisclose";
import AddAndUpdate from "./AddAndUpdate";
import { useState } from "react";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
	const { onClose, onOpen, isOpen } = useDisclose();

	const [isUpdate, setIsUpdate] = useState(false);
	const onUpdate = () => {
		setIsUpdate(true);
	};

	const deleteContact = async (id) => {
		try {
			
			await deleteDoc(doc(db, "contacts", id));
			toast.success("Deleted Successfully");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="flex items-center justify-between rounded-lg bg-yellow p-2 mt-3">
				<div className="flex gap-1 items-center">
					<HiOutlineUserCircle className="text-4xl text-orange" />
					<div className="">
						<h2 className="font-medium">{contact.name}</h2>
						<p className="text-sm">{contact.email}</p>
					</div>
				</div>
				<div className="flex text-3xl">
					<RiEditCircleLine
						onClick={() => {
							onOpen();
							onUpdate();
						}}
						className="cursor-pointer"
					/>
					<IoMdTrash
						onClick={() => deleteContact(contact.id)}
						className="cursor-pointer text-orange"
					/>
				</div>
			</div>
			<AddAndUpdate
				onClose={onClose}
				isOpen={isOpen}
				isUpdate={isUpdate}
				contact={contact}
			/>
		</>
	);
};

export default ContactCard;
