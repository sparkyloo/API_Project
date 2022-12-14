import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const history = useHistory();

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <div className="profile-dropdown shadowed">
          <div className="profile-info">
            <div className="username">{user.username}</div>
            <div className="email">{user.email}</div>
          </div>
          <div className="profile-buttons">
            <button onClick={() => history.push("/my-groups")}>
              My Groups
            </button>
            <button onClick={logout}>Log Out</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
