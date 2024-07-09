import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { db } from "../config/firebase";
import Modal from "./Modal";
import * as Yup from "yup";

const AddAndUpdate = ({ isOpen, onClose, isUpdate, contact }) => {
	const addcontact = async (contact) => {
		try {
			onClose();
			const contactRef = collection(db, "contacts");
			await addDoc(contactRef, contact);

			toast.success("Added Successfully");
		} catch (error) {
			console.log(error);
		}
	};

	const updateContact = async (value, id) => {
		try {
			const contactRef = doc(db, "contacts", id);
			await updateDoc(contactRef, value);
			onClose();
			toast.success("Updated Successfully");
		} catch (error) {
			console.log(error);
		}
	};

	const contactSchemaValidation = Yup.object().shape({
		name: Yup.string().required("Name is Required"),
		email: Yup.string().email("Invalid Email").required("Email is Required"),
	});

	return (
		<div>
			<Modal isOpen={isOpen} onClose={onClose}>
				<Formik
					validationSchema={contactSchemaValidation}
					initialValues={
						isUpdate
							? {
									name: contact.name,
									email: contact.email,
								}
							: {
									name: "",
									email: "",
								}
					}
					onSubmit={(values) => {
						isUpdate ? updateContact(values, contact.id) : addcontact(values);
					}}
				>
					<Form className="flex flex-col gap-1 ">
						<div className="flex flex-col  ">
							<label htmlFor="name">Name</label>
							<Field name="name" className=" border rounded-lg" />
							<div className="text-red-500 text-xs">
								<ErrorMessage name="name" />
							</div>
						</div>
						<div className="flex flex-col ">
							<label htmlFor="email">Email</label>
							<Field type="email" name="email" className=" border rounded-lg" />
							<div className="text-red-500 text-xs">
								<ErrorMessage name="email" />
							</div>
						</div>
						<button className=" rounded-lg bg-orange p-1 mt-1.5">
							{isUpdate ? "Update-Contact" : "Add-Contact"}
						</button>
					</Form>
				</Formik>
			</Modal>
		</div>
	);
};

export default AddAndUpdate;
