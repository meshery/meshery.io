import styled from "styled-components";

const InfoBannerStyle = styled.section`
  margin: 0rem 0 5rem
  position: relative;
  overflow: hidden;
  
  .Btn{
      align-items: center;
      margin: auto;
    button{
    color: #fff;
    text-decoration: none;
    padding: 10px 30px;
    background: #3c494f;
    border-radius: 3px;
    border: 1px solid rgba(255,255,255,0.5);
    width: auto;
      }
  }
  .noimg{
      display: none;
  }
   .heading_img{
       max-width: 30%;
    //    height: 20%;
       margin-right : 1rem;
    
       img{
           margin-bottom :0;
       margin-right : 1rem;
        
       }
   }
  .nobtn{
    display: none;
  }
  .cont-row-reverse{
      flex-direction: row-reverse;
      margin: 4rem 0;
  }
  .cont-row{
    margin: 4rem 0;
  }
  .title { 
    text-transform: uppercase;
    color: #A0AAAA;
  }
  .title_img{
      img{
      margin: 0 0 -4rem;
      }
    }
  .side-text {
      display: flex;
    font-size: 1.45rem;
    font-weight: 600;
    line-height: 2rem;
    color: black;
    margin: 50px 0 24px 0;
    span {
           font-weight: 600;
            color: ${(props) => props.theme.keppelColor};
        }

        h1{
            font-size: 2.2rem;
        }
   }
   .side{
       vertical-align: center;
      
   }
   .mesh-image{
        width: 100%; 
   }
   .icon{
       padding: 0px;
       margin: 3px;
       cursor: pointer;
       vertical-align: middle;
       }
   
   .description{
       margin-bottom: 24px;
       font-style: normal;
       font-weight: 300;
       font-size: 1rem;
       line-height: 27px;
   }
   .strikethrough {
    text-decoration: line-through;
    font-weight: 400;
   }



  @media only screen and (max-width: 780px) {
    .mesh-image{
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    .section-title{
        margin-bottom: 1.5rem;
        /* padding-bottom: 1.5rem; */
        
    }
    .side-text{
        padding-top: 0rem;
        font-weight: 500;
        font-size: 1.25rem;
        text-align: center;
        line-height: 2rem;
        margin-top: 1rem;
        span {
           font-weight: 600;
            color: black;
        }
    }
    .big-title{
        margin: 0;
        padding: 0;
    }

    .description{
        text-align: center;
        padding-left: 20px;
        padding-right: 20px;
        font-weight: 300;
        margin: 0;
    }
    .backBtn{
        text-align: center;
    }

  }
  @media only screen and (max-width: 568px) {
    padding: 60px 0 40px 0;
      .section-title{
          margin: 0;
          padding: 0;
      }
     .section-title,
     .content-wrap{
        text-align: center;
    }
    .mesh-image{
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 80%;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .side-text{
            font-size: 1.25rem;
            font-weight: 400;
            text-align: center;
            line-height: 21px;
            span {
                font-weight: 400;
            }
            
    }
    .big-title{
        margin: 0;
        padding: 0;
    }
    
    .description{
        text-align: center;
        padding-left: 20px;
        padding-right: 20px;
        font-weight: 300;
        margin: 0;
    }

  @media only screen and (max-width: 480px) {
    padding: 40px 20px 60px 20px;
    .section-title{
          margin-bottom: 1rem;
          padding: 0;
      }

    .description{
        margin: 0px;
    }
  }

  }
  
`;
export default InfoBannerStyle;
