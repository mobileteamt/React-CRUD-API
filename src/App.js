import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import Header from './components/Header';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from './components/List';
import Blog from './components/Blog';
import Create from './components/Create';
import Update from './components/Update';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header/>    
      <Container className="main">
        <Row>
          <Col>
            <h3 className="text-center pt-4">CRUD using React</h3>
          </Col>
        </Row>
        <Row>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<List/>}></Route>
              <Route path="/home" element={<List/>}></Route>
              <Route path="/blog/:id" element={<Blog/>}></Route>
              <Route path="/create" element={<Create/>}></Route>
              <Route path="/update/:id" element={<Update/>}></Route>
            </Routes>
          </BrowserRouter>
        </Row>
      </Container>
      <Footer/>
    </>
  );
}

export default App;
