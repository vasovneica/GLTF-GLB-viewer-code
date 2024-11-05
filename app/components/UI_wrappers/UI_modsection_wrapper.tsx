export const UI_modsection_wrapper = ({ children }: IUIWrapProps): JSX.Element => {
    return (
        <section className='p-4 m-1 h-full 
            flex flex-col justify-between
            w-full
            bg-slate-700
            sm:w-full 
            md:w-full 
            lg:w-1/4
            xl:justify-start
            '>
            {children}
        </section>
    )
}