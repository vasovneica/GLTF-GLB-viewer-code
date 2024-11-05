import { NavLink } from "@remix-run/react";

export default function Index() {
  return (
    <div className="p-8 flex h-screen items-center justify-center bg-slate-950 text-slate-400">

      <header className="flex items-center">
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            Fast GLTF editor
          </p>
          <ul>
            <NavLink to={'/'}>Editor</NavLink>
            <NavLink to={'/what'}>What?</NavLink>
          </ul>
        </nav>
      </header>

    </div>
  );
}