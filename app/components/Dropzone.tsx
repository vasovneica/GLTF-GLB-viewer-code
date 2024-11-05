import { useState } from "react";


export const Dropzone = ({ onDrop }) => {

    const [name, setName] = useState(null)

    const handleDrop = (e) => {

        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            const file = files[0];
            console.log(file);

            if (file.name.endsWith('.glb')) {
                const url = URL.createObjectURL(file);
                setName(file.name)
                onDrop(url);
            } else {
                alert('Please drop a valid .glb file!');
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className='p-2 h-1/4 
        flex justify-center items-center 
        border-dashed border-slate-400 border-2'
        >
            {name == null ? <p>Drag and drop a .glb model here </p> : <p>{name}</p>}
        </div>
    );
};