import { CustomizationProvider } from "~/components/Customization";
import type { MetaFunction } from "@remix-run/node";
import { Suspense, useCallback, useState } from "react";
import Configurator from "~/components/Configurator";
import { GLTFComponent } from "~/components/GLTFComponent";
import { Dropzone } from "~/components/Dropzone";
import { UI_main_wrapper } from "~/components/UI_wrappers/UI_main_wrapper";
import { UI_configurator_wrapper } from "~/components/UI_wrappers/UI_configurator_wrapper";
import { UI_footer_wrapper } from "~/components/UI_wrappers/UI_footer_wrapper";
import { UI_copyright_wrapper } from "~/components/UI_wrappers/UI_copyright_wrapper";
import { UI_setting_head } from "~/components/UI_components/UI_setting_head";
import { UI_modsection_wrapper } from "~/components/UI_wrappers/UI_modsection_wrapper";
import { UI_viewsection_wrapper } from "~/components/UI_wrappers/UI_viewsection_wrapper";
import { UI_GLTF_wrapper } from "~/components/UI_wrappers/UI_GLTF_wrapper";
import { UI_noone_warn } from "~/components/UI_components/UI_noone_warn";

import defaultModel from '../../public/models_local/gw2.glb';



export const meta: MetaFunction = () => {
  return [
    { title: "Viewer GLTF | alpha" },
    { name: "description", content: "GLTF fast viewer" },
  ];
};

// best template / main page 
export default function Index() {

  const [modelUrl, setModelUrl] = useState<string | null>(defaultModel);

  const handleDrop = useCallback((url: string | null) => {
    setModelUrl(url);
  }, []);

  return (
    <CustomizationProvider>

      {/* header */}
      <UI_main_wrapper>

        <UI_modsection_wrapper>

          <Dropzone onDrop={handleDrop} />

          {/* Modificate section */}
          <UI_configurator_wrapper>

            {/* Setting label */}
            <UI_setting_head />

            {/* Configurator component */}
            <Configurator />

          </UI_configurator_wrapper>

          {/* footer */}
          <UI_footer_wrapper>

            <UI_copyright_wrapper />

          </UI_footer_wrapper>
        </UI_modsection_wrapper>

        {/* View section */}
        <UI_viewsection_wrapper>
          <UI_GLTF_wrapper>

            {modelUrl == null
              ? <UI_noone_warn />
              : <Suspense fallback={<div className=' text-pink-500 text-2xl'>Loading</div>}>

                {/* 3d view component */}
                <GLTFComponent path={modelUrl} />

              </Suspense>}

          </UI_GLTF_wrapper>
        </UI_viewsection_wrapper>
      </UI_main_wrapper>
    </CustomizationProvider>
  )
};