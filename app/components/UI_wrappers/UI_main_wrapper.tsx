export const UI_main_wrapper = ({ children }: IUIWrapProps): JSX.Element => {
  return (
    <div className='h-full w-full p-8 
               flex justify-between items-
               flex-col
             bg-slate-950 text-slate-400 
               sm:flex-col
               md:flex-col 
               lg:flex-row lg:h-lvh'>
      {children}
    </div>
  )
}

