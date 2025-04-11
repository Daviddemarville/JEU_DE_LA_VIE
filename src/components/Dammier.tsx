function Dammier({ size }: { size: number }) {
	const cells = [];
	for (let i = 1; i <= size * size; i++) {
		cells.push(<div key={i} className="h-5 w-5 border-1 border-black" />);
	}
	const sectionStyle = {
		height: `${20 * size}px`,
		width: `${20 * size}px`,
	};
	return (
		<>
			<section
				style={sectionStyle}
				className="bg-slate-400 flex flex-wrap m-auto"
			>
				{cells}
			</section>
		</>
	);
}

export default Dammier;
