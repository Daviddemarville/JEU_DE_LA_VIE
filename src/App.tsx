import "./index.css";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Header from "./components/Header";

function App() {
	return (
		<>
			<div className="flex flex-col min-h-screen">
				<Header />
				<main className="flex-grow">
					<Menu />
				</main>
				{/* Footer */}
				<Footer />
			</div>
		</>
	);
}

export default App;
