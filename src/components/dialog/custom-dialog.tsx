import {DialogContent, DialogTitle, Modal, ModalDialog} from "@mui/joy";
import Divider from "@mui/joy/Divider";
import React, {type ReactNode} from "react";
import RowStack from "../layout/row-stack.tsx";

const fullScreenDialogStyle = {
  borderRadius: 0,
  transform: 'none',
  maxWidth: 'unset',
};

interface CustomDialogProps {
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  title: string | ReactNode;
  titleSide?: ReactNode;
  open: boolean;
  onClose: () => void;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
                                                     size,
                                                     children,
                                                     title,
                                                     titleSide,
                                                     open = false,
                                                     onClose,
                                                     ...others
                                                   }) => (
  <Modal open={open} onClose={onClose} sx={{backdropFilter: 'blur(8px)'}}>
    <ModalDialog
      sx={(theme) => ({
        [theme.breakpoints.only('sm')]: fullScreenDialogStyle,
        [theme.breakpoints.only('xs')]: fullScreenDialogStyle,
        [theme.breakpoints.only('md')]: {
          minWidth: size === 'md' ? '60%' : '350px',
          maxWidth: size === 'md' && '75%',
        },
        [theme.breakpoints.only('lg')]: {
          minWidth: size === 'lg' ? '60%' : '350px',
          maxWidth: size === 'lg' && '75%',
        },
      })}
      {...others}
    >
      <RowStack alignX="spread" alignY="center">
        <DialogTitle>{title}</DialogTitle>
        {titleSide}
      </RowStack>
      <Divider inset="context"/>
      <DialogContent>{children}</DialogContent>
    </ModalDialog>
  </Modal>
);

export default CustomDialog;
