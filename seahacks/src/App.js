import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import { Header, Heading} from '@ticketmaster/aurora'
import SimpleMap from './components/SimpleMap';
import Filterbar from './Filterbar';

function App() {
  return (
    <div className="App">
      <Header
          withSpotLight
      >
        <Heading level={1}>
          <Heading.Strong>Explore</Heading.Strong>
          {/*{" "}*/}
          {/*<Heading.Span>Header</Heading.Span>*/}
        </Heading>
      </Header>
      <Container>
        <Row style={{ border: '2px solid black' }}>
         <Filterbar></Filterbar>

        </Row>
        <Row>
          <Col xs={8} style={{ border: '2px solid black' }}>
            <SimpleMap></SimpleMap>
          </Col>
          <Col xs={4} style={{ border: '2px solid black' }}>
            Scroll

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
