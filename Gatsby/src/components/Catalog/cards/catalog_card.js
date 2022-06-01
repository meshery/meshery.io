import React, {useState} from "react";
import patternslogo from "../../../assets/images/service-mesh-pattern.svg";
import ReactModal from "react-modal";
import CardWrapper from "./card.styles";
// import {CloseIcon} from '@mui/icons-material/Close';
 import {AiOutlineClose} from '@react-icons/all-files/ai/AiOutlineClose'
const Catalogcard = ({ pattern }) => {

  const customStyles = {
    content: {
      top: '25rem',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      overflow: "auto",
      overflowX: "hidden",
      height: "35rem",
      borderRadius: "1rem", 
      width: "60%",
    },
  };

  const [modalIsOpen,setIsOpen] = useState(false);
  
  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);
  return (
    <CardWrapper>
      <div className="card" onClick={openModal}  >
        <div className="chip">
          <small className="pattern-type"> {pattern.filters.type}</small>
        </div>

        <h4 className="pattern-name">{pattern.name}</h4>
        <img className="pattern-image" src={pattern.image} />
        <div>
          <h6 className="pattern-id">
            <img className="smp" src={patternslogo} loading="lazy" />
            {pattern.patternId}
          </h6>
        </div>
      </div>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Contact Form"
      >
      <div id="open-modal" className="modal-window">
        <div>
          <AiOutlineClose  style={{right:"1rem",top: "1rem", position: "fixed", cursor: "pointer"}} onClick={closeModal} />
          <div className="chip ">
            <h6 className="pattern-type"> {pattern.filters.type}</h6>
          </div>
          <div style={{display: "flex", gap:"1rem"}}>
          <p /><div className="modal-image-container"><div className="modal-image"><img style={{width: "50rem"}} src={pattern.image}/> <h4 className="related-patterns">Related Patterns</h4>
              {/* MINICARD-START */}
              {/* {'{'}% include related-patterns.html %{'}'} */}
            </div>
          </div>
          {/* MINICARD-END */}
          <div className="test" style={{marginTop:"-4rem"}}>
          <h3 style={{textAlign: 'center'}}>{pattern.name}</h3>
          <h4>What this pattern does:</h4><p>{pattern.patternInfo}</p>
          <h4>Caveats and Consideration: </h4><p>{pattern.patternCaveats}</p><p />
          <h4>Compatibilty:</h4>
          <img style={{width:"2rem"}} src={pattern.compatibility} />
          {/* {{'{'}% include copy-and-download.html %{'}'}  */}
          </div>
        </div></div></div>
              </ReactModal>
              
    </CardWrapper>

  );
};

export default Catalogcard;
