import React, { useState, useEffect, useRef } from "react";
import DOTS from "vanta/dist/vanta.dots.min";

const App = () => {
	const [repos, setRepos] = useState([]);
	const [vantaEffect, setVantaEffect] = useState(null);
	const myRef = useRef(null);
	useEffect(() => {
		if (!vantaEffect) {
			setVantaEffect(
				DOTS({
					el: myRef.current,
					mouseControls: true,
					touchControls: true,
					gyroControls: false,
					minHeight: 850.0,
					minWidth: 200.0,
					scale: 1.0,
					scaleMobile: 1.0,
					color: "#192f61",
					color2: "#192f61",
					backgroundColor: "#000000",
					size: 2.6,
					spacing: 11.0,
					showLines: true,
					backgroundAlpha: 0.0,
				})
			);
		}
		return () => {
			if (vantaEffect) vantaEffect.destroy();
		};
	}, [vantaEffect]);

	useEffect(() => {
		const fetchRepos = async () => {
			const res = await fetch("https://api.github.com/users/CiscoFran10/repos");
			const json = await res.json();

			const filteredRepos = json.filter(
				(item) => (item.homepage !== null) & (item.homepage !== "")
			);
			setRepos(filteredRepos);
		};
		fetchRepos();
	}, []);

	return (
		<div ref={myRef} className="w-full overflow-hidden p-4">
			<div className="flex flex-col max-w-3xl mx-auto justify-center shadow-2xl p-6 rounded-2xl space-y-4 bg-black/50  sm:space-x-6 items-center  sm:flex-row">
				<div>
					<img
						className="h-24 ring-1 ring-slate-500  mx-auto  rounded-full object-cover"
						src="https://github.com/CiscoFran10.png"
						alt=""
					/>
				</div>
				<div className="flex flex-grow flex-col">
					<h1 className="text-2xl font-semibold text-slate-200 md:text-3xl">
						Thiago Rodrigues
					</h1>
					<span className="text-slate-400 text-center font-sans font-normal sm:text-left">
						Front-End Developer
					</span>
				</div>
				<div className="flex items-center space-x-4">
					<a
						className=" animate-pulse bg-slate-900 rounded-full hover:bg-slate-700 transition"
						href="https://www.linkedin.com/in/francisco-th-rodrigues/"
					>
						<img
							className="h-10 pointer-events-none p-2"
							src="/linkedin-logo.svg"
							alt="Linkedin"
						/>
					</a>
					<a
						className="animate-pulse bg-slate-900 rounded-full hover:bg-slate-700 transition "
						href="https://github.com/CiscoFran10"
					>
						<img
							className="h-10 pointer-events-none p-2"
							src="/github-logo.svg"
							alt="Linkedin"
						/>
					</a>
				</div>
			</div>
			<ul className="grid grid-cols-2 max-w-5xl mx-auto my-10 gap-5 max-[430px]:grid-cols-1 md:grid-cols-3">
				{repos.map((repo) => (
					<li
						key={repo.id}
						className="flex flex-col backdrop-blur-sm space-y-6 border border-slate-900 p-3 rounded-2xl  md:space-y-8"
					>
						<h2 className="text-slate-200 text-xl">{repo.name}</h2>
						<p className="text-slate-500 text-sm flex-grow">
							{repo.description}
						</p>
						<a
							className="justify-end w-full text-sm text-slate-300 text-center bg-slate-900 rounded-xl py-2 hover:bg-slate-700 transition"
							href={repo.homepage}
						>
							Acessar Página
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
