import { useCustomization } from './Customization';



const Configurator = () => {
    const {
        selectedModelMaterial, setSelectedModelMaterial,
        material, setMaterial,
        bodyColors,
        bodyColor, setBodyColor,
        wireframeMode, setWireframeMode,
        nameSelectedModelMaterial, setNameSelectedMaterial,
        editMode, setEditMode,
        polygons, setPolygons,

    } = useCustomization();

    const selectMeshMaterial = (selectedModelMaterial: number, direction: number): void => {
        setSelectedModelMaterial(selectedModelMaterial + direction);
    }


    return (
        <div className=''>
            <div className='p-4 gruppo-regular transition-all	'>

                <button className={editMode ? `p-1 
                         border-solid border-pink-500 
                         border-2
                         w-full
                         ` : `p-1 
                         border-solid border-slate-400 
                         border-2
                         w-full
                       hover:border-pink-500
                         hover:border-dashed`}
                    onClick={() => setEditMode(!editMode)}
                >
                    {editMode ? 'Edit Mode' : 'View Mode'}

                </button>
                <div className='text-center font-black text-2xl'

                ><span onClick={() => selectMeshMaterial(selectedModelMaterial, -1)}>&lt;</span>
                    {nameSelectedModelMaterial}
                    <span onClick={() => selectMeshMaterial(selectedModelMaterial, 1)}> &gt;</span></div>
                <div className='flex justify-between'>
                    <div
                        className={`${wireframeMode ? 'text-blue-700' : 'text-slate-500'}`}
                        onClick={() => setWireframeMode(!wireframeMode)}
                    >
                        <div className=''>Grid</div>
                    </div>
                    <div
                        //   className={`${material === "Матовый" ? `${styles.item} ${styles.itemActive}` : styles.item}`}
                        onClick={() => setMaterial("Матовый")}
                    >
                        <div className=''>Matte</div>
                    </div>
                    <div
                        //   className={`${material === "Глянцевый" ? `${styles.item} ${styles.itemActive}` : styles.item}`}
                        onClick={() => setMaterial("Глянцевый")}
                    >
                        <div className=''>Glossy</div>
                    </div>
                </div>

            </div>

            <div className='p-6 '>
                <div className=''>
                    <div className='text-center font-black text-2xl'>Color</div>
                    <div className='flex flex-wrap justify-center'>

                        {bodyColors.map((item, index) => (

                            <div
                                key={index}
                                className='m-2 h-14 w-14 flex flex-col items-center'
                                onClick={() => setBodyColor(item)}
                            >
                                <div
                                    className={`${item.color === bodyColor.color ? 'w-14 h-14 flex-none' : 'w-6 h-6'}`}
                                    style={{ backgroundColor: item.color }}
                                />
                                <div className={`${item.color === bodyColor.color ? 'hidden' : 'text-lg text-center'}`}>{item.name}</div>
                            </div>

                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Configurator;