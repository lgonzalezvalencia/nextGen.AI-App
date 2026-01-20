import MenuIcon from "@mui/icons-material/Menu";
import { Dialog, IconButton } from "@mui/material";
import ModalMenu from "../modalMenu/ModalMenu";
import "./BurgerMenu.scss";
import { useState } from "react";

const BurgerMenu = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ModalMenu open={open} onClose={handleClose}></ModalMenu>
      <IconButton id="burger-menu" formMethod="dialog" onClick={handleOpen}>
        <MenuIcon id="menu-icon" />
      </IconButton>
      <p id="status" style={{ color: "white" }}></p>
    </>
  );
};

export default BurgerMenu;
