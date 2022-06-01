import React, { useState, useRef } from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Link } from "gatsby";

const ScrollspyMenu = ({ menuItems, ...props }) => {
  const addAllClasses = [""];

  const [state, setState] = useState({
    active: menuItems[0],
  });

  const wrapRef = useRef(null);

  const handleMouseOver = (index) => {
    setState({
      active: menuItems[index],
    });
  };

  if (props.className) {
    addAllClasses.push(props.className);
  }

  const wrapDisplay = () => {
    if (wrapRef.current) {
      wrapRef.current.style.display = "block";
    }
  };

  const wrapNone = () => {
    if (wrapRef.current) {
      wrapRef.current.style.display = "none";
    }
  };

  const { active } = state;

  return (
    <ul
      className={addAllClasses.join(" ")}
      onMouseOver={wrapDisplay}
      onMouseOut={wrapNone}
    >
      {menuItems.map((menu, index) => (
        <li
          key={index}
          className={
            menu.subItems !== undefined ? "nav-item has-dropdown" : "nav-item"
          }
          onMouseOver={() => handleMouseOver(index)}
        >
          <AnchorLink to={menu.path} className="menu-link">
            <span>{menu.name}</span>
          </AnchorLink>
        </li>
      ))}
      {active.subItems !== undefined && (
        <React.Fragment>
          <ul className="dropdown" style={{ zIndex: "101" }}>
            {/* <div className="nav-grid"> */}
            <div className="hr">
              {active.subItems.map((subItem, i) => (
                <li key={i}>
                  {subItem.name === "Forum" ? (
                    <a
                      href={subItem.path}
                      target="_blank"
                      className="sub-item"
                      rel="noreferrer"
                    >
                      {subItem.name}
                    </a>
                  ) : (
                    <Link
                      to={subItem.path}
                      partiallyActive={true}
                      className={subItem.sepLine && "sub-item"}
                    >
                      {subItem.name}
                    </Link>
                  )}
                </li>
              ))}
              {/* </div> */}
            </div>
          </ul>
          <div className="wrap" ref={wrapRef} style={{ zIndex: "100" }} />
        </React.Fragment>
      )}
    </ul>
  );
};

export default ScrollspyMenu;
