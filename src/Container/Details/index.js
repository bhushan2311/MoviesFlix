import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./details.css";
import axios from "axios";
import DarkVariantExample from "../../Components/Carousel";
import { img_300, img_not_available, img_500 } from "../../Config";

const DetailsContainer = () => {
  const params = useParams();
  const [content, setContent] = useState();
  const [credits, setCredits] = useState();
  const titleName =
    content && content.name && content.name !== ""
      ? content.name
      : content && content.title && content.title !== ""
      ? content.title
      : "";

  // console.log('params', params);
  const id = params.movieid || "";

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
      ); // task
      setContent(data);
      console.log("fetchData details", data);
    } catch (error) {
      console.error(error);
    }
  };

  const creditsFetch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
      ); // task
      setCredits(data.cast);
      console.log("sdata", data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    creditsFetch();
  }, []);

  const renderDataHtml = () => {
    const ImageURL = content.poster_path
      ? img_300 + content.poster_path
      : img_not_available;
    const tagline = content.tagline || "";
    const vote_average = parseInt(content.vote_average);
    const original_language = content.original_language || "";
    const adult = !content.adult ? "10+" : "18+";
    const origin_country =
      content.origin_country && content.origin_country[0]
        ? content.origin_country[0]
        : content.production_countries &&
          content.production_countries[0] &&
          content.production_countries[0].name
        ? content.production_countries[0].name
        : "";
    const overview = content.overview;
    const first_air_date = content.first_air_date || content.release_date;
    const genres =
      content.genres && content.genres.length > 0
        ? content.genres.map((item) => <span key={item.id}>{item.name},</span>)
        : "";
    const run_time = content.runtime;
    return (
      <Row>
        <Col className="col-12">
          <h1>
            {titleName}
            {tagline && tagline !== "" ? <small> {tagline}</small> : ""}
          </h1>
        </Col>
        <Col className="col-12 col-xl-6">
          <div className="card card--details">
            <div className="card__cover">
              <img src={ImageURL} alt="myimage" />
            </div>
            <div className="card__content">
              <div className="card__wrap">
                <span className="card__rate"> {vote_average}</span>

                <ul className="card__list">
                  <li>{original_language}</li>
                  <li>{adult}</li>
                </ul>
              </div>
              <ul className="card__meta">
                <li>
                  <span>Genre:</span>
                  <span className="linkTag">{genres}</span>
                </li>
                <li>
                  <span>Runtime:</span>
                  <span className="linkTag">{run_time} min</span>
                </li>

                <li>
                  <span>Release year:</span>{" "}
                  <span className="linkTag">{first_air_date}</span>
                </li>

                <li>
                  <span>Country:</span>{" "}
                  <span className="linkTag">{origin_country}</span>{" "}
                </li>
              </ul>
              <span style={{ fontSize: "x-large", fontWeight: "600",color:"white" }}>
                Overview:
              </span>
              <div className="description_readmore_wrapper " style={{color:"white"}}>{overview}</div>
            </div>
          </div>
        </Col>
        <Col className="col-12 col-xl-6" >
          <div className="text-center">
            <img
              src={`${img_500}/${content.backdrop_path}`}
              alt="poster"
              className="img-fluid" // Bootstrap's class for responsive images
              style={{ width: "100%", backgroundSize:"cover",backgroundPosition: "center", position: "relative",}} // Custom styling for additional responsiveness
            />
          </div>
        </Col>
      </Row>
    );
  };
  return (
    <>
      <main className="detailsPage">
        <Container>
          {titleName && titleName !== "" ? renderDataHtml() : "Loading..."}
        </Container>
        <section className="section">
          <div className="contentHead">
            <Container>
              <Row>
                <Col className="col-12">
                  {credits && credits.length > 0 ? (
                    <DarkVariantExample data={credits} />
                  ) : (
                    "Loading data..."
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      </main>
    </>
  );
};

export default DetailsContainer;
