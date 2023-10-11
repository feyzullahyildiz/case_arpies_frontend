/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { RenderInDialogContext } from "../context";
import { DialogActions, DialogTitle } from "@mui/material";

interface Props {}
export const renderComponentOnDialog = (comp: JSX.Element) => {
  let promiseResolveFunction: ((val: any) => void) | null = null;
  const div = document.createElement("div");
  div.classList.add("custom-dialog-container");
  document.body.appendChild(div);

  const root = ReactDOM.createRoot(div);
  const destroy = (params: any) => {
    root.unmount();
    document.body.removeChild(div);
    promiseResolveFunction!(params);
  };

  const component = <CustomDialog onClose={destroy}>{comp}</CustomDialog>;
  root.render(component);
  return new Promise((resolve) => {
    promiseResolveFunction = resolve;
  });
};

interface Props {
  children: JSX.Element;
  onClose: (params: any) => void;
}
// eslint-disable-next-line react-refresh/only-export-components
const CustomDialog: React.FC<Props> = ({ children, onClose }) => {
  const transitionDuration = 300;
  const [open, setOpen] = useState(true);
  const startClosing = (params: any) => {
    setOpen(false);
    setTimeout(() => {
      onClose(params);
    }, transitionDuration);
  };
  return (
    <Dialog
      open={open}
      onClose={startClosing}
      transitionDuration={transitionDuration}
      // component={"span"}
    >
      <DialogContent>
        <DialogTitle>Edit JOB</DialogTitle>
        <DialogContentText>
          <RenderInDialogContext.Provider value={{ onClose: startClosing }}>
            {children}
          </RenderInDialogContext.Provider>
        </DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};
