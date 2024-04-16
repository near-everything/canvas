import { Widget, useAccount } from "near-social-vm";
import React, { useState } from "react";
import {
  NavLink,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import { LogOut } from "./icons/LogOut";
import { Pretend } from "./icons/Pretend";
import { StopPretending } from "./icons/StopPretending";
import { User } from "./icons/User";
import PretendModal from "./navigation/PretendModal";
import Draggable from "react-draggable";

const CoreBackdrop = styled.div`
  position: fixed;
  left: 0;
  bottom: 30%;
  transform: translateY(-50);
  width: 70px;
  height: auto;
  display: flex;
`;

const CoreBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 0 10px 5px rgba(0, 0, 0, 0.3);

  &:hover {
    box-shadow: 0px 8px 3px rgba(0, 0, 0, 0.2);
  }

  &:active {
    box-shadow: 0px 5px 2px rgba(0, 0, 0, 0.2);
  }

  a {
    text-decoration: none;
    color: black;
  }

  @media (max-width: 1898px) {
    .dropdown.show .dropdown-menu {
      display: block;
    }
  }
`;

const StyledDropdown = styled.div`
  .dropdown-toggle {
    display: flex;

    &:after {
      border-top-color: var(--slate-dark-11);
    }

    img {
      border-radius: 50% !important;
    }

    .profile-info {
      margin: 5px 10px;
      line-height: normal;
      max-width: 140px;

      .profile-name,
      .profile-username {
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .profile-name {
        color: black;
      }
      .profile-username {
        color: var(--slate-dark-11);
      }
    }
  }

  ul {
    width: 100%;
    padding: 0;
    border: 1px solid rgb(249, 250, 251);
    border-radius: 13px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    @media (max-width: 768px) {
      position: absolute;
      left: 50%; /* Center horizontally */
      top: 50%;
      transform: translateX(-50%, -50%); /* Center horizontally */
    }
    li {
      padding: 6px;
    }

    button,
    a {
      color: #2d2d2d;
      min-height: 52px;
      min-width: 52px;
      padding: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: transparent;
      font-size: 18px;
      gap: 0px;
      text-shadow: 1px 1px #fff;

      border: 1px solid #e5e5e5;
      border-radius: 13px;

      &:active {
        background-color: #d5d5d5;
        color: #000;
      }

      &:hover {
        background-color: #e5e5e5;
        color: #111;
      }

      svg {
        margin-right: 7px;
        min-width: 24px;
        path {
          stroke: var(--slate-dark-9);
        }
      }
    }
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 6px;
`;

const ArrowButton = styled.button`
  flex-grow: 1;
`;

const Button = styled.button`
  all: unset;
  color: #2d2d2d;
  height: 52px;
  width: 52px;
  min-height: 52px;
  min-width: 52px;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: transparent;
  font-size: 18px;
  gap: 0px;
  text-shadow: 1px 1px #fff;

  &:active {
    color: #000;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.042);
    border-radius: 6px;
  }
`;

const Core = (props) => {
  const account = useAccount();
  const location = useLocation();

  const [showPretendModal, setShowPretendModal] = useState(false);

  let history = useHistory();
  const canvasToFeed = () => {
    history.push("/feed");
  };
  const feedToHome = () => {
    history.push("/");
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTouchStart = () => {
    if (window.innerWidth <= 1900) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const [dropdownPosition, setdropdownPosition] = useState(false);

  const handleDrag = (a, ui) => {
    const spaceBelow = window.innerHeight - (ui.y + ui.node.offsetHeight);
    if (spaceBelow < 200) {
      setdropdownPosition({ y: ui.y - ui.node.offsetHeight - 10 });
    } else {
      setdropdownPosition(null);
    }
  };

  const handleDrapStop = (e, ui) => {
    if (dropdownPosition) {
      ui.y = dropdownPosition.y;
    }
  };

  return (
    <Draggable
      position={null}
      axis="y"
      bounds="parent"
      onDrag={handleDrag}
      onStop={handleDrapStop}
    >
      <CoreBackdrop className="core__auth">
        <CoreBox className="classic" style={{ dropdownPosition }}>
          <div className="d-flex align-items-center">
            <div>
              {location.pathname === "/feed" ? (
                <NavLink to={"/"}>
                  <Button onTouchStart={feedToHome}>
                    <i className="bi bi-house" />
                  </Button>
                </NavLink>
              ) : (
                <NavLink to={"/feed"}>
                  <Button onTouchStart={canvasToFeed}>
                    <i className="bi bi-view-list" />
                  </Button>
                </NavLink>
              )}
              {props.signedIn ? (
                <Button
                  type="button"
                  id="dropdownMenu2222"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onTouchStart={handleTouchStart}
                >
                  <Widget
                    src={"mob.near/widget/ProfileImage"}
                    props={{
                      accountId: account.accountId,
                      className: "d-inline-block core__profile-image",
                      imageClassName: "w-100 h-100 ",
                    }}
                  />
                </Button>
              ) : (
                <Button onClick={props.requestSignIn} style={{ padding: 0 }}>
                  <i className="bi bi-key-fill" />
                  {/* <i className="bi bi-brush" /> */}
                  {/* <i className="bi bi-brush-fill" /> */}
                  {/* <i className="bi bi-hammer" /> */}
                  {/* <i className="bi bi-pen" /> */}
                  {/* <i className="bi bi-vector-pen" /> */}
                </Button>
              )}

              {/* {isDropdownOpen && ( */}
              <StyledDropdown
                className={`dropdown ${
                  isDropdownOpen ? "show" : ""
                } ${dropdownPosition}`}
              >
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenu2222"
                  style={{ minWidth: "fit-content" }}
                >
                  <li>
                    <a
                      className="dropdown-item"
                      style={{ maxWidth: "300px" }}
                      type="button"
                      href={`https://${account.accountId}.social`}
                    >
                      <Widget
                        src={"mob.near/widget/Profile.InlineBlock"}
                        props={{
                          accountId: account.accountId,
                        }}
                      />
                    </a>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      type="button"
                      to={`/${account.accountId}`}
                    >
                      <User />
                      my everything
                    </NavLink>
                  </li>
                  {account.pretendAccountId ? (
                    <li>
                      <button
                        className="dropdown-item"
                        disabled={!account.startPretending}
                        onClick={() => account.startPretending(undefined)}
                      >
                        <StopPretending />
                        Stop pretending
                      </button>
                    </li>
                  ) : (
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => setShowPretendModal(true)}
                      >
                        <Pretend />
                        Pretend to be another account
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => props.logOut()}
                    >
                      <LogOut />
                      Sign Out
                    </button>
                  </li>
                  <li>
                    <ButtonRow>
                      <ArrowButton>
                        <i className="bi bi-arrow-left"></i>
                      </ArrowButton>
                      <NavLink type="button" to={"/"}>
                        <i className="bi bi-house"></i>
                      </NavLink>
                      <ArrowButton>
                        <i className="bi bi-arrow-right"></i>
                      </ArrowButton>
                    </ButtonRow>
                  </li>
                </ul>
              </StyledDropdown>
              {/* )} */}
            </div>

            <div>
              <i
                className="bi bi-grip-vertical"
                style={{ marginLeft: "4px", marginRight: "-4px" }}
              ></i>
            </div>
          </div>
          <PretendModal
            show={showPretendModal}
            onHide={() => setShowPretendModal(false)}
            widgets={props.widgets}
          />
        </CoreBox>
      </CoreBackdrop>
    </Draggable>
  );
};

export default Core;
