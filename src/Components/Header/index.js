import React, { useContext, useState } from "react";
import { Container, Form, FormControl, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AppContext } from "../../context";

const HeaderComponent = () => {
  const { search_movie, setSearch_movie } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const navData = [
    { name: "Popular", link: "/" },
    { name: "Top Rated", link: "/top-rated" },
    { name: "Upcoming", link: "/upcoming" },
  ];

  const handleSearchChange = (event) => {
    setSearch_movie(event.target.value);
    // setSearchTerm(event.target.value);
};

    const handleSubmit = (e)=>{
        e.preventDefault();
        setSearch_movie(search_movie);
        // console.log(search_movie);
    }

  return (
    <header className="header">
      <Navbar bg="dark" expand="lg">
        <Container>
          <Link to="/" style={{cursor:"pointer",textDecoration:"none"}}><Navbar.Brand>MovieDb</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {navData.map((item) => {
                return (
                  <Nav key={item.name}>
                    <Link to={item.link}>{item.name}</Link>
                  </Nav>
                );
              })}
            </Nav>
            <Form className="d-flex" autoComplete="off" onSubmit={handleSubmit}>
              <FormControl
                type="search"
                placeholder="Movie Search"
                className="me-2"
                aria-label="search"
                value={search_movie}
                onChange={handleSearchChange}
              ></FormControl>
              <Button variant="secondary" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default HeaderComponent;
