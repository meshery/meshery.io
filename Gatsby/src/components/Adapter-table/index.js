import React from "react";
import AdapterTableWrapper from "./adapterTable.styles";
import Adapterdata from "./adapter-data";

const AdapterTable = () => {
  let alpha = Adapterdata.filter(
    (Adapterdata) => Adapterdata.category === "alpha"
  );
  let stable = Adapterdata.filter(
    (Adapterdata) => Adapterdata.category === "stable"
  );
  let beta = Adapterdata.filter(
    (Adapterdata) => Adapterdata.category === "beta"
  );

  return (
    <AdapterTableWrapper>
      <div className="text ">
        <h2>
          Interoperate <strong>multiple</strong> service meshes
        </h2>
        <p>
          Service mesh adapters provision, configure, and manage their
          respective service meshes.
        </p>
      </div>
      <div className="text">
        <table className="adapters" CELLSPACING="0">
          <thead style={{ display: "none" }}>
            <tr>
              <th>Status</th>
              <th>Adapter</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan={9} className="stable-adapters">
                stable
              </td>
            </tr>
            <tr>
              <td colSpan={12} className="stable-adapters empty" />
            </tr>
            {stable.map((stable) => {
              return stable.subdata.map((subdata) => {
                return (
                  <tr>
                    <td>
                      <a href={subdata.link}>
                        <img
                          src={subdata.img}
                          alt="Istio Service Mesh adapter"
                          className="adapter-logo"
                          loading="lazy"
                        />
                        Meshery adapter for {subdata.name}
                      </a>
                    </td>
                  </tr>
                );
              });
            })}
            <tr>
              <td colSpan={2} className="stable-adapters empty" />
            </tr>
            <tr>
              <td rowSpan={8} className="beta-adapters">
                beta
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="beta-adapters empty" />
            </tr>
            {beta.map((beta) => {
              return beta.subdata.map((subdata) => {
                return (
                  <tr>
                    <td>
                      <a href={subdata.link}>
                        <img
                          src={subdata.img}
                          alt="Citrix CPX Service Mesh"
                          className="adapter-logo"
                          loading="lazy"
                        />
                        Meshery adapter for {subdata.name}
                      </a>
                    </td>
                  </tr>
                );
              });
            })}

            <tr>
              <td colSpan={2} className="beta-adapters empty" />
            </tr>
            <tr>
              <td rowSpan={6} className="alpha-adapters">
                alpha
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="alpha-adapters empty" />
            </tr>
            {alpha.map((alpha) => {
              return alpha.subdata.map((subdata) => {
                return (
                  <tr>
                    <td>
                      <a href={subdata.link}>
                        <img
                          src={subdata.img}
                          alt="Tanzu Service Mesh"
                          className="adapter-logo"
                          loading="lazy"
                        />
                        Meshery adapter for {subdata.name}
                      </a>
                    </td>
                  </tr>
                );
              });
            })}
            <tr>
              <td colSpan={2} className="alpha-adapters empty" />
            </tr>
          </tbody>
        </table>
        <p />
      </div>
    </AdapterTableWrapper>
  );
};

export default AdapterTable;
