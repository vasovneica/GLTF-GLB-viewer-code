export const UI_GLTF_wrapper = ({ children }: IUIWrapProps): JSX.Element => {
    return (
        <div className=' p-2 h-full 
             border-dashed border-slate-400 border-2 
             overflow-hidden
            backdrop: grow'>
            {children}
        </div>
    )
}