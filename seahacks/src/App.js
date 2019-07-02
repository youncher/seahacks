import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import { Header, Heading} from '@ticketmaster/aurora'

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
          Filter
        </Row>
        <Row>
          <Col xs={8} style={{ border: '2px solid black' }}>
            Map
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
