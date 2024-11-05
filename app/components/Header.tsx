import { NavLink } from "@remix-run/react";

export default function Header() {
    return (

        <header className="p-8 h-24 w-1/3 flex items-center bg-slate-500 text-slate-800">
            <nav className="flex  items-center justify-between gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
                <p className="leading-6 text-gray-700 dark:text-gray-200">
                    Fast GLTF editor
                </p>
                <ul>
                    <NavLink className='mx-2 hover:text-slate-300' to={'/'}>Editor</NavLink>
                    <NavLink className='mx-2 hover:text-slate-300' to={'/what'}>What?</NavLink>
                </ul>
            </nav>
        </header>


    );
}