import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { globalSiteTitle } from "~/utils/global";
import { useSidebarStore } from "~/utils/store";
import ZtnetLogo from "docs/images/logo/ztnet_100x100.png";

const Themes = ["light", "dark", "black", "business", "system", "forest"];

const Header = () => {
	const session = useSession();
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	const { toggle, open } = useSidebarStore();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<header className="header bg-base-200 px-4 py-1 shadow">
			<div className="header-content flex flex-row items-center">
				<div className="hidden md:inline-flex">
					<a href="#" className="inline-flex flex-row items-center gap-2">
						<Image
							style={{ width: 25, height: 25 }}
							alt="ztnet logo"
							title="ztnet logo"
							src={ZtnetLogo}
						/>
						<span className="ml-1 text-2xl font-bold uppercase leading-10 text-accent">
							{globalSiteTitle}
						</span>
					</a>
				</div>
				<div className="md:pl-12 flex items-center pt-1">
					<label className={`${open ? "swap-active" : ""} swap swap-rotate`}>
						<div className="swap-off">
							<svg
								className="fill-current"
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 512 512"
								onClick={toggle}
							>
								<path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
							</svg>
						</div>
						<div className="swap-on">
							<svg
								className="fill-current"
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 512 512"
								onClick={toggle}
							>
								<polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
							</svg>
						</div>
					</label>
				</div>
				<div className="ml-auto flex">
					{/* <div className="sidebar-header flex items-center justify-center py-4"> */}

					{/* <a href="#" className="flex flex-row items-center"> */}
					<div className="dropdown dropdown-end">
						<label tabIndex={0} className="btn btn-primary btn-sm m-1">
							{theme.toUpperCase()}
						</label>
						<ul
							tabIndex={0}
							className="menu dropdown-content rounded-box z-30 w-52 bg-primary p-2 shadow"
						>
							{Themes.map((theme) => {
								return (
									<li key={theme} onClick={() => setTheme(theme)}>
										<a>{theme.toUpperCase()}</a>
									</li>
								);
							})}
						</ul>
					</div>
					<span className="ml-2 flex flex-col justify-center">
						<span className="truncate font-semibold leading-none tracking-wide">
							{session.data?.user?.name}
						</span>
						<span className="mt-1 w-20 truncate text-xs leading-none text-gray-500">
							{session.data?.user?.role}
						</span>
					</span>
					{/* </a> */}
				</div>
			</div>
		</header>
	);
};

export default Header;
