import React from 'react';
import 'react-dates/initialize';
import { DateRangePicker, DayPickerRangeController } from 'react-dates';
import { Button, ButtonGroup, Row, Col, Input} from 'reactstrap';
import { Column, DropDownGroup, DropDownOption} from '@ticketmaster/aurora'

export default class Filterbar extends React.Component {

    constructor() {
        super();
        this.state = {
            focusedInput: null,
            startDate: null,
            endDate: null
        }
    }

    render() {
        return (
            <React.Fragment>
            <Col xs={4}>
                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
            </Col>
            <Col xs={4}>
                <input type='text' className='DateInput_input DateInput_input_1' placeholder='Location'></input>
            </Col>

            <Column medium={4}>
                <DropDownGroup size="small" variant={1} placeholder="Distance">
                    <DropDownOption value="5" index={0}>5 miles</DropDownOption>
                    <DropDownOption value="10" index={1}>10 miles</DropDownOption>
                    <DropDownOption value="15" index={2}>15 miles</DropDownOption>
                    <DropDownOption value="25" index={3}>25 miles</DropDownOption>
                    <DropDownOption value="50" index={4}>50 miles</DropDownOption>
                </DropDownGroup>
            </Column>
            </React.Fragment>
        );
    }
}