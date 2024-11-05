import { useGLTF } from '@react-three/drei';
import { GLTFExporter, GLTFLoader } from 'three/examples/jsm/Addons.js';
import { PresentationControls, Stage, Grid } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCustomization } from "~/components/Customization";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import { Object3D } from 'three';
import { useNavigate } from '@remix-run/react';



interface MyModelNodes {
    mesh?: Object3D;
}
interface MyModelMaterials {
    material: THREE.Material;
}
interface MyModel {
    nodes: MyModelNodes;
    materials: { [key: string]: any };
    scene: Object3D;
    error: any;
}

const FallbackModel = () => (
    <div style={{ color: 'red', textAlign: 'center', fontSize: '24px' }}>
        Error
    </div>
);


export const GLTFComponent = (props: { path: string }) => {


    const navigate = useNavigate();
    const { scene, materials, nodes, } = useGLTF<MyModel>(props.path) as MyModel;

    const {
        material, setMaterial,
        bodyColors,
        bodyColor, setBodyColor,
        wireframeMode, setWireframeMode,

        updateModel,
        selectedModelMaterial,
        nameSelectedModelMaterial, setNameSelectedMaterial,
        editMode,
        polygons, setPolygons

    } = useCustomization();

    const meshRef: React.MutableRefObject<undefined> = useRef();


    const meshNames = useMemo(() => Object.keys(nodes), [nodes]);

    useEffect(() => {
        updateModel(props.path);
    }, [props.path])

    useEffect(() => {
        let totalPolygons = 0;

        // Функция для рекурсивного обхода всех детей
        const countPolygons = (object: any) => {
            if (object.isMesh && object.geometry) {
                // Если есть индексная геометрия, используем её
                // Если её нет, рассчитываем количество на основе атрибутов
                const count = object.geometry.index
                    ? object.geometry.index.count / 3
                    : object.geometry.attributes.position.count / 3;
                totalPolygons += count;
            }

            // Перебираем всех детей
            object.children.forEach((child: any) => countPolygons(child));
        };

        countPolygons(scene);
        setPolygons(totalPolygons);
    }, [scene]);

    useEffect(() => {
        setNameSelectedMaterial(meshNames[selectedModelMaterial])
    }, [selectedModelMaterial])

    // 3 подход сохранения модели
    const clearAuxNodes = (node: any) => {

        node.children = node.children.filter(child => !child.name.startsWith('AuxScene'));
    };

    const exportGLB = () => {
        const exporter = new GLTFExporter();
        console.log(meshRef.current);

        // Удалите старые узлы перед экспортом
        if (meshRef.current) {
            clearAuxNodes(meshRef.current);
        }

        if (meshRef.current) { // Убедитесь, не равен undefined 
            exporter.parse(
                meshRef.current,
                (result) => {
                    const blob = new Blob([result as ArrayBuffer], { type: 'application/octet-stream' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'model.glb';
                    a.click();
                    URL.revokeObjectURL(url);
                },
                function (error) {
                    console.log('An error happened', error);
                },
                { binary: true }
            );
        } else {
            console.error("Mesh reference is not set.");
        }
    };

    return (
        <>
            < button
                onClick={exportGLB}
                className={`relative top-2 left-2
          p-1 
          border-solid border-2 
          ${editMode
                        ? 'border-pink-500 border-dashed'
                        : 'border-slate-400'}`
                }>

                {editMode ? 'DWNLD GLB' : `${polygons} polygons`}</button >
            <Canvas>

                <PresentationControls
                    speed={1.5}
                    global
                    polar={[-2.5, Math.PI / 4]}
                    rotation={[Math.PI / 8, Math.PI / 4, 0]}
                    zoom={5}>
                    <Stage environment='city'
                        intensity={0.75}
                        shadows >
                        <Grid
                            position-y={-0.95}
                            sectionSize={1}
                            sectionColor={"#ec4899"}
                            sectionThickness={1}
                            cellSize={0.5}
                            cellColor={"#ec4899"}
                            cellThickness={0.6}
                            infiniteGrid
                            fadeDistance={50}
                            fadeStrength={5}
                        />

                        <group ref={meshRef}>
                            {meshNames.map((meshName, index) => {
                                let currentMaterial;

                                if (editMode && index === selectedModelMaterial) {
                                    currentMaterial = (
                                        <meshStandardMaterial
                                            color={bodyColor.color}
                                            roughness={material === "Матовый" ? 0.95 : 0.15}
                                        />
                                    );
                                } if (editMode && index !== selectedModelMaterial) {
                                    currentMaterial = (
                                        <meshStandardMaterial
                                            color={bodyColor[index]} // Используем сохраненный цвет
                                            roughness={material === "Матовый" ? 0.95 : 0.15}
                                        />
                                    );
                                }
                                if (!editMode) {
                                    // Если не в режиме редактирования, возвращаем null или оригинальный материал
                                    currentMaterial = null; // Или любой другой материал, если это необходимо
                                }

                                return (
                                    <mesh
                                        key={meshName}
                                        name={meshName}
                                        geometry={nodes[meshName].geometry}
                                        material={nodes[meshName].material}
                                    >
                                        {wireframeMode && (
                                            <meshStandardMaterial color={'#4d4d4d'} wireframe={wireframeMode} roughness={0.15} />
                                        )}

                                        {currentMaterial}
                                    </mesh>
                                );
                            })}
                        </group>
                    </Stage>
                </PresentationControls>
            </Canvas >

        </>
    )
}