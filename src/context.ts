/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from "react";
export const RenderInDialogContext = React.createContext<{
  onClose: (params: any) => void;
}>(null!);
export const useRenderInDialog = () => useContext(RenderInDialogContext);
