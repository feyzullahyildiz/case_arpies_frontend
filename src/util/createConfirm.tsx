import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  header: string;
  acceptButtonText?: string | null;
  cancelButtonText?: string | null;
  content: JSX.Element | string;
  onClose: (accepted: boolean) => void;
}
// eslint-disable-next-line react-refresh/only-export-components
const Confirm: React.FC<Props> = ({
  header,
  content,
  onClose,
  acceptButtonText = "Ok",
  cancelButtonText = "Cancel",
}) => {
  const [open, setOpen] = useState(true);
  const transitionDuration = 300;
  const startClosing = (accepted: boolean) => {
    setTimeout(() => {
      onClose(accepted);
    }, transitionDuration);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => startClosing(false)}
      transitionDuration={transitionDuration}
    >
      <DialogTitle>{header}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={() => startClosing(false)}>
          {cancelButtonText}
        </Button>
        <Button
          variant="contained"
          
          onClick={() => startClosing(true)}
          autoFocus
        >
          {acceptButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

type Options = {
  header: string;
  acceptButtonText?: string | null;
  cancelButtonText?: string | null;
};
export const createConfirm = (contentText: string, options: Options) => {
  let promiseResolveFunction: ((val: boolean) => void) | null = null;

  const promptContainer = document.createElement("div");
  promptContainer.classList.add("confirm-container");
  document.body.appendChild(promptContainer);

  const root = ReactDOM.createRoot(promptContainer);
  const destroy = () => {
    root.unmount();
    document.body.removeChild(promptContainer);
  };

  const onCloseFunction = (confirmed: boolean) => {
    promiseResolveFunction!(confirmed);
    destroy();
  };

  root.render(
    <Confirm
      onClose={onCloseFunction}
      header={options.header}
      content={contentText}
      acceptButtonText={options.acceptButtonText}
      cancelButtonText={options.cancelButtonText}
    />,
  );
  const promise = new Promise((resolve) => {
    promiseResolveFunction = resolve;
  });
  return promise;
};
