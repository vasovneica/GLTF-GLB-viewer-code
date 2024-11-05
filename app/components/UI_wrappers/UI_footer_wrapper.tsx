export const UI_footer_wrapper = ({ children }: IUIWrapProps): JSX.Element => {
    return (
        <div className='
              h-1/8 flex flex-col justify-center
              md:h-2/4 
              lg:h-1/5
              
        
        '>
            {children}
        </div>
    )
}