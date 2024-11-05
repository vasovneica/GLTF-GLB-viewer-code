import { createContext, useContext, useState } from "react";

interface IBodyColor {
  color: string; 
  name: string;
}

const bodyColors:IBodyColor[] = [
  {
    color: "#FF2400",
    name: "Scarlet",
  },
  {
    color: "#FFA500",
    name: "Orange",
  },
  {
    color: "#FFD700",
    name: "Gold",
  },
  {
    color: "#00FF00",
    name: "Lime",
  },
  {
    color: "#B0E0E6",
    name: "Dust",
  },
  {
    color: "#1E90FF",
    name: "Jeans",
  },

  {
    color: "#4B0082",
    name: "Indigo",
  },
  {
    color: "#010101",
    name: "Black",
  },
  {
    color: "#eee",
    name: "White",
  },
];

export type TCustomization={
  selectedModelMaterial:number;
  setSelectedModelMaterial:(material: number) => void;
  material:string;
  setMaterial:(material: string) => void;
  bodyColors:IBodyColor[];
  bodyColor:IBodyColor;
  setBodyColor:(material: IBodyColor) => void;
  wireframeMode:boolean;
  setWireframeMode:(mode: boolean) => void;
  editMode:boolean;
  setEditMode:(mode: boolean) => void;
  nameSelectedModelMaterial:string;
  setNameSelectedMaterial: (material: string) => void; 
  polygons:number;
  setPolygons:(polygons: number) => void;
  updateModel:(material: string) => void; 

}

const defaultCustomization: TCustomization = {
  selectedModelMaterial: 0,
  setSelectedModelMaterial: () => {},
  material: '',
  setMaterial: () => {},
  bodyColors: [],
  bodyColor:  {
    color: "#FF2400",
    name: "Scarlet",
  },
  setBodyColor: () => {},
  wireframeMode: false,
  setWireframeMode: () => {},
  editMode:false,
  setEditMode:() => {},
  nameSelectedModelMaterial:'',
  setNameSelectedMaterial: () => {},
  polygons:0,
  setPolygons:() => {},
  updateModel:()=>{}
};

const CustomizationContext = createContext <TCustomization>(defaultCustomization);

export const CustomizationProvider = (props: any) => {

  
  const [selectedModelMaterial, setSelectedModelMaterial] = useState(0);
  const [nameSelectedModelMaterial, setNameSelectedMaterial] = useState('none');
  const [polygons, setPolygons] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [material, setMaterial] = useState<string>("Матовый");
  const [bodyColor, setBodyColor] = useState<IBodyColor>(bodyColors[0]);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [currentModel, setCurrentModel] = useState<string | null>(null);

  const updateModel = (modelUrl: string):void => {
   // Сброс значении по умолчани
    setCurrentModel(modelUrl);
    setEditMode(false);
    setSelectedModelMaterial(0);
    setMaterial("Матовый");
    setBodyColor(bodyColors[0]);
    setWireframeMode(false);
  };

  return (
    <CustomizationContext.Provider
      value={{
        selectedModelMaterial, setSelectedModelMaterial,
        material, setMaterial,
        bodyColors,
        bodyColor, setBodyColor,
        wireframeMode, setWireframeMode,
        updateModel,
        nameSelectedModelMaterial, setNameSelectedMaterial,
        editMode, setEditMode,
        polygons, setPolygons
      }}
    >
      {props.children}
    </CustomizationContext.Provider>
  );
};



// первый вариант
export const useCustomization =  (): TCustomization => {
  const context = useContext(CustomizationContext);
    return context;

};
