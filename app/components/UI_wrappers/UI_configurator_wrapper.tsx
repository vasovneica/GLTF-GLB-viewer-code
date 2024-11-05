export const UI_configurator_wrapper = ({ children }: IUIWrapProps): JSX.Element => {
    return (
        <section className='p-2 my-3
                  border-dashed border-slate-400 border-2
                  overflow-y-auto 
                  lg:overflow-y-auto lg:overflow-x-hidden
                  grow
                  lg:h-1/2
                  '>
            {children}
        </section>
    )
}


