import SearchIcon from "@mui/icons-material/Search";
import "./ModalMenu.scss";
import userData from "./../../../public/data/users.json";

type ModalMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function ModalMenu({ open, onClose }: ModalMenuProps) {
  return (
    <>
      <dialog open={open} id="modal-menu" onMouseDown={() => onClose()}>
        <div id="modal-menu__content">
          <div id="search">
            <input id="search__input" placeholder="Search"></input>
            <SearchIcon id="search__icon" />
          </div>
          <p className="entries">Entries</p>
          <div id="clients">
            {Object.entries(userData).map(([id, user]) => (
              <div className="client" key={id}>
                <p className="client__name">{user.name}</p>
                <p className="client__last-update">{user.date} </p>
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
