import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import { FaBars } from "@react-icons/all-files/fa/FaBars";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import ScrollspyMenu from "./utility/ScrollspyMenu";

import NavigationWrap from "./navigation.style";
import { Container } from "../../reusecore/Layout";

import MenuItems from "./utility/menu-items.js";

import MesheryText from "../../assets/images/meshery-logo.svg";

const Navigation = () => {
  const [expand, setExpand] = useState(false);
  const [scroll, setScroll] = useState(false);
  const dropDownRef = useRef();
  useEffect(() => {
    window.addEventListener("scroll", () =>
      window.pageYOffset > 50 ? setScroll(true) : setScroll(false)
    );
  }, []);

  const changeDropdownState = () => {
    setExpand(!expand);
  };

  const openDropDown = () => {
    dropDownRef.current.classList.add("expand");
  };

  const closeDropDown = () => {
    dropDownRef.current.classList.remove("expand");
  };

  return (
    <NavigationWrap className={`nav-block ${scroll ? "scrolled" : ""}`}>
      <Container
        className="nav-container"
        style={{ maxWidth: "1140px", margin: "auto" }}
      >
        <div className="navbar-wrap">
          <Link to="/">
            <img
              src={MesheryText}
              style={{ margin: "2rem 0" }}
              alt="MesheryText"
              height="45"
            />
          </Link>
          <nav className="nav">
            {expand ? (
              <IoMdClose
                className="mobile-menu-icon open"
                onClick={function () {
                  setExpand(!expand);
                  closeDropDown();
                }}
              />
            ) : (
              <FaBars
                className="mobile-menu-icon"
                onClick={function () {
                  setExpand(!expand);
                  openDropDown();
                }}
              />
            )}
            <div className="mobile-dropdown-container" ref={dropDownRef}>
              <div className="mobile-dropdown">
                <ul className="mobile-collapsed">
                  {MenuItems.map((items, index) => (
                    <li
                      key={index}
                      className={
                        items.subItems !== undefined
                          ? "mobile-nav-item has-dropdown"
                          : "mobile-nav-item"
                      }
                    >
                      <Link
                        to={items.path}
                        onClick={changeDropdownState}
                        className="menu-item"
                      >
                        {items.name}
                      </Link>
                      <ul>
                        {items.subItems !== undefined &&
                          items.subItems.map((subItems, index) => (
                            <li key={index} className="mobile-nav-subitem">
                              {subItems.name === "Forum" ? (
                                <a
                                  href={subItems.path}
                                  target="_blank"
                                  onClick={changeDropdownState}
                                  className="sub-menu-item"
                                  rel="noreferrer"
                                >
                                  {subItems.name}
                                </a>
                              ) : (
                                <Link
                                  to={subItems.path}
                                  onClick={changeDropdownState}
                                  className="sub-menu-item"
                                >
                                  {subItems.name}
                                </Link>
                              )}
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <ScrollspyMenu
              className={`collapsed ${expand ? "is-expanded" : ""}`}
              menuItems={MenuItems}
            />
          </nav>
        </div>
        <div className="meshery-cta">
          <button to="#getting-started" className="runmesherybtn">
            Run Meshery
          </button>
        </div>
      </Container>
    </NavigationWrap>
  );
};

export default Navigation;
