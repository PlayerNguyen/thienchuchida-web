import React, { useEffect, useState } from "react";
import Config from "../../config/server.config";
import BookService from "../../services/BookService";
import "./Home.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faClock } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import moment from "../../helpers/momentHelper";
import Header from "../Header/Header";
import imageHelper from "../../helpers/imageHelper";
import { Container, Row, Col } from "react-bootstrap";
import CardItem from "../General/CardItem";

// function CardItem({ data }) {
//   return (
//     <Link className="bookcard" to={`/truyen/${data ? data.slug : null}`}>
//       <div className="bookcard__body">
//         <div className="bookcard__body__thumbnail">
//           <img
//             src={
//               data.thumbnail
//                 ? imageHelper.getRawResourceUrl(data.thumbnail)
//                 : Config.DEFAULT_THUMBNAIL
//             }
//             alt="Thumbnail"
//           />
//         </div>
//       </div>
//       <div className="bookcard__footer">
//         <div className="bookcard__footer__title">
//           {data.title ? data.title : `Untitled`}
//         </div>
//         <div className="bookcard__footer__information">
//           <div>
//             <span>
//               <FontAwesomeIcon icon={faEye} />
//             </span>
//             <span>{data && data.views}</span>
//           </div>
//           <div>
//             <span>
//               <FontAwesomeIcon icon={faClock} />
//             </span>
//             <span>
//               {data && moment(new Date(data.updatedAt)).fromNow(true)}
//             </span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default function Home() {
//   const [lastUpdated, setLastUpdated] = useState(null);

//   useEffect(() => {
//     BookService.getLatestUpdateBook(4, 1).then(({ data }) => {
//       setLastUpdated(data.data);
//     });
//   }, []);

//   return (
//     <div className="home__wrapper">
//       <div className="home__header">
//         <Header />
//       </div>
//       {/* Container of the page */}
//       <Container className="home__content">
//         <Col className="mt-5">
//           {/* New content */}
//           <Row className="category__box" md={8} sm={12}>
//             <Row className="category" sm={12}>
//               <div className="category__title">
//                 <Link to="/truyen-moi-cap-nhat" className="link link--primary">
//                   <span>Truyện mới cập nhật</span>
//                   <span className="text text--secondary nav__icon">
//                     <FontAwesomeIcon icon={faChevronRight} />
//                   </span>
//                 </Link>
//               </div>
//               <div className="category__content cardbox d-flex">
//                 {lastUpdated &&
//                   lastUpdated.map((ele, index) => {
//                     return <CardItem key={index} data={ele && ele} />;
//                   })}
//               </div>
//             </Row>
//             <Row className="category">
//               <div className="category__title">
//                 <Link to="/" className="link link--primary">
//                   <span>Truyện mới đăng</span>
//                   <span className="text text--secondary nav__icon">
//                     <FontAwesomeIcon icon={faChevronRight} />
//                   </span>
//                 </Link>
//               </div>
//               <div className="category__content cardbox">
//                 {/* {lastUpdated
//                 ? lastUpdated.map((ele, index) => {
//                     return <CardItem key={index} data={ele && ele} />;
//                   })
//                 : null} */}
//               </div>
//             </Row>
//             <div className="category">
//               <div className="category__title">
//                 <Link to="/" className="link link--primary">
//                   <span>Truyện mới</span>
//                   <span className="text text--secondary nav__icon">
//                     <FontAwesomeIcon icon={faChevronRight} />
//                   </span>
//                 </Link>
//               </div>
//               <div className="category__content cardbox">
//                 {/* {lastUpdated
//                 ? lastUpdated.map((ele, index) => {
//                     return <CardItem key={index} data={ele && ele} />;
//                   })
//                 : null} */}
//               </div>
//             </div>
//           </Row>

//           {/* Aside */}
//           <Row className="aside__box" md={4} sm={12}>
//             <div>
//               <h1>Thông báo</h1>
//             </div>
//           </Row>
//         </Col>
//       </Container>
//     </div>
//   );
// }

export default function Home() {
  const [latest, setLatestUpdate] = useState(null);

  useEffect(() => {
    BookService.getLatestUpdateBook(4, 1).then((response) => {
      const { data } = response.data;
      setLatestUpdate(data);
    });
  }, []);

  return (
    <div>
      <div className="home__header">
        <Header />
      </div>
      <Container fluid="sm" className="home__container">
        <Row className="home__content">
          {/* Content */}
          <Col sm={12} md={8}>
            <Col className="category">
              <Row className="category__header">
                <h1 className="text-light">Truyện mới cập nhật</h1>
              </Row>
              <Row>
                {latest &&
                  latest.map((e, i) => {
                    return <CardItem key={i} data={e} />;
                  })}
              </Row>
            </Col>
          </Col>

          {/* Aside bar */}
          <Col sm={12} md={4}>
            <Row>
              <h1 className="text-light">Thông báo</h1>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
