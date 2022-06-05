import React, {useState} from "react";
import  CardWrapper  from "./Card.style";
import ReactModal from "react-modal";
import {AiOutlineClose} from '@react-icons/all-files/ai/AiOutlineClose'


const Card = ({ data }) => {

  const [modalIsOpen,setIsOpen] = useState(false);

const openModal = () => setIsOpen(true);

const closeModal = () => setIsOpen(false);  

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


  return (
    <CardWrapper >
      <div className="card" onClick={openModal}>
      <div className="chip">
          <small className="pattern-type"> {data.type}</small>
        </div>
          <h4 className="pattern-name">
            {data.name}
          </h4>
          <img
            src = {data.image}
            imgStyle={{ objectFit: "contain" }}
            alt={data.name}
            className="pattern-image"
          />

          <h6 className="pattern-id">  {data.Id}</h6>
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
          <AiOutlineClose  style={{right:"1rem",top: "1rem", position: "fixed", cursor: "pointer"}} onClick={closeModal}  />
          <div className="chip ">
            <h6 className="pattern-type"> {data.type}</h6>
          </div>
          <div style={{display: "flex", gap:"1rem"}}>
          <p /><div className="modal-image-container"><div className="modal-image"><img style={{width: "50rem"}} src={data.image}/> <h4 className="related-patterns">Related Patterns</h4>
              {/* MINICARD-START */}
              {/* {'{'}% include related-patterns.html %{'}'} */}
            </div>
          </div>
          {/* MINICARD-END */}
          <div className="test" style={{marginTop:"-4rem"}}>
          <h3 style={{textAlign: 'center'}}>{data.name}</h3>
          <h4>What this pattern does:</h4><p>{data.patternInfo}</p>
          <h4>Caveats and Consideration: </h4><p>{data.patternCaveats}</p><p />
          <h4>Compatibilty:</h4>
          <img style={{width:"2rem"}} src={data.compatibility} />
          {/* {{'{'}% include copy-and-download.html %{'}'}  */}
          </div>
        </div></div></div>
              </ReactModal>

      
    </CardWrapper>
  );
};

export default Card;
