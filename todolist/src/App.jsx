import { useState } from "react";
import "./App.css";

function App() {
	const [count, setCount] = useState(
		localStorage.getItem("array")
			? JSON.parse(localStorage.getItem("array"))
			: "",
	);

	const [data, setData] = useState("");

	const handler = () => {
		data ? setCount([...count, data]) : "";
		data ? localStorage.setItem("array", JSON.stringify([...count, data])) : "";

		setData("");
	};
	const del = (item) => {
		let newListTodo = [...count];

		setCount(
			newListTodo.filter(function (it) {
				return item !== it;
			}),
		);

		localStorage.setItem(
			"array",
			JSON.stringify(
				newListTodo.filter(function (it) {
					return item !== it;
				}),
			),
		);
	};
	return (
		<>
			<main className="main">
				<div className="section1">
					<h1 className="h1">TO DO LIST</h1>
					<form
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<input
							onChange={(e) => {
								setData(e.target.value);
							}}
							value={data}
							type="text"
							className="input"
							placeholder="Add new task.."
							name="hi"
						/>
						<button className="add-btn" onClick={handler}>
							ADD
						</button>
					</form>

					<button
						className="del-btn"
						onClick={() => {
							localStorage.setItem("array", []);
						}}
					>
						DELETE ALL
					</button>
				</div>
				<div className="section2">
					{count
						? count.map((item, id) => {
								return (
									<div key={id} className="box">
										<div
											onClick={() => {
												return del(item);
											}}
										>
											<img src="./trash-solid.svg" alt="" />
										</div>
										<div>{item}</div>
									</div>
								);
							})
						: ""}
				</div>
			</main>
		</>
	);
}

export default App;
