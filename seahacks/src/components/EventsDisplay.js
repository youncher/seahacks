import React, { Component } from 'react';
import SpotifyPreview from "../SpotifyPreview";
import {ListRow, ListContainer} from '@ticketmaster/aurora';
import {Row} from 'reactstrap'

export default class EventsDisplay extends Component {



    render() {
        let item = {
            rowId: "567",
            title: "Del Mar Fairgrounds",
            subTitle: "KABOO 3-Day Pass",
            dateTitle: "apr 23",
            dateSubTitle: "Thu, 8:00 PM",
            buttonText: "See Tickets",
            variant: "standard",
            onClick: () => {},
            url: "/"
            };
        const events = this.props.selectedEvents.map((event, index) => {
                            return (
                                <ListRow rowItem={{
                                                          variant: "withLink",
                                                          linkTitle: "Ticket Options Available",
                                                          linkUrl: "",
                                                          linkSubTitle: "on Partner Site",
                                                          label: "On sale: MON \u2022 AUG 27 \u2022 10 AM",
                                                          labelVariant: "positive"
                                                      }}
                                         index={index}
                                         onOverflowClick={() => alert('Overflow Clicked')}>
                                 </ListRow>
//                                <div><br />{event.name}</div>
                            )});

        return (
            <div>
                <Row style={{ height: '70vh', overflowY: 'auto' }}>
                    {this.props.selectedEvents.length > 0 && <ListContainer>{events}</ListContainer>}
                </Row>
                <Row style={{ height: '30vh' }}>
                    {/* fill box */}
                    <SpotifyPreview artistName={"Adele"} />
                </Row>
            </div>
        );
    }
}