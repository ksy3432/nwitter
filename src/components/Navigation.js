import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Navigation = ({ userObj }) => (
    <nav>
      <ul style={{ display: "flex", justifyContent: "center", margin: 50 }}>
        <li>
          <Link to="/" style={{ marginRight: 10}}>
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
          </Link>
        </li>
        <li>
          <Link to="/profile" style={{
            marginLeft: 10,
            display: "flex",
            alignItems: "center",
            fontSize : 12,
          }}>
            <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
            <span style={{ margin: 10 }}>
              {userObj.displayName ? `${userObj.displayName}'s Profile` : "Profile"}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );

export default Navigation;

