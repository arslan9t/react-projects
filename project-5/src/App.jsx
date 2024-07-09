import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAndUpdate from "./components/AddAndUpdate";
import ContactCard from "./components/ContactCard";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import { db } from "./config/firebase";
import useDisclose from "./hooks/useDisclose";
const App = () => {
	const [contacts, setContacts] = useState([]);
	const { onOpen, onClose, isOpen } = useDisclose();

	useEffect(() => {
		const getContacts = async () => {
			try {
				const contactsRef = collection(db, "contacts");

				onSnapshot(contactsRef, (snapshot) => {
					const contactsList = snapshot.docs.map((doc) => {
						return {
							id: doc.id,
							...doc.data(),
						};
					});
					setContacts(contactsList);
					return contactsList;
				});

				console.log(contactsList);
			} catch (error) {
				console.log(error);
			}
		};
		getContacts();
	}, []);

	const filteredContact=(e)=>{
		const val=e.target.value;
		try {
			const contactsRef = collection(db, "contacts");

			onSnapshot(contactsRef, (snapshot) => {
				const contactsList = snapshot.docs.map((doc) => {
					return {
						id: doc.id,
						...doc.data(),
					};
				});

				const filteredContact=contactsList.filter((contact)=>{
					return contact.name.toLowerCase().includes(val.toLowerCase());
				})

				setContacts(filteredContact);
				return filteredContact;
			});

			console.log(contactsList);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div className="max-w-[370px] mx-auto ">
				<Navbar />
				<div className="flex items-center">
					<FiSearch className="text-white text-3xl absolute ml-1" />
					<input
						onChange={filteredContact}
						type="text"
						className="bg-transparent border pl-9 border-white text-white h-10 rounded-md flex-grow"
					/>
					<FaCirclePlus
						onClick={onOpen}
						className="text-white text-3xl m-1 cursor-pointer"
					/>
				</div>
				<div>
					{contacts.length <= 0 ? (
						<NotFound />
					) : (
						contacts.map((contact) => {
							return <ContactCard key={contact.id} contact={contact} />;
						})
					)}
				</div>
				<AddAndUpdate isOpen={isOpen} onClose={onClose} />
			</div>

			<ToastContainer position="bottom-center" />
		</>
	);
};

export default App;
