export const UI_viewsection_wrapper = ({ children }: IUIWrapProps): JSX.Element => {
    return (
        <section className='p-4 m-1 
                h-full w-full 
                bg-slate-700
                lg:w-3/4 '>
            {children}
        </section>
    )
}