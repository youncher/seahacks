import React from 'react';
import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import {Col} from 'reactstrap';
import {DropDownGroup, DropDownOption, Button as AuroraButton} from '@ticketmaster/aurora';
import PropTypes from 'prop-types';

export default class FilterBar extends React.Component {

    static propTypes = {
        onDateSelected: PropTypes.func.isRequired,
        onDateChange: PropTypes.func.isRequired,
        onDistanceChange: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        onButtonClick: PropTypes.func.isRequired,
        startDate: PropTypes.object,
        endDate: PropTypes.object,
        zipcode: PropTypes.string.isRequired,
        distance: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            focusedInput: null
        }
    }

    render() {
        return (
            <React.Fragment>
                <Col xs={1}>
                    <span style={{fontWeight: 'bold'}}>
                    Filters:
                    </span>
                </Col>
                <Col xs={2}>
                    <DropDownGroup size="small" variant={1} placeholder="Select dates"
                                   onChange={this.props.onDateSelected}>
                        <DropDownOption value="" selected index={0}>Select dates</DropDownOption>
                        <DropDownOption value="today" index={0}>Today</DropDownOption>
                        <DropDownOption value="tomorrow" index={1}>Tomorrow</DropDownOption>
                        <DropDownOption value="weekend" index={2}>This Weekend</DropDownOption>
                    </DropDownGroup>
                </Col>

                <Col xs={3}>
                    <DateRangePicker
                        startDate={this.props.startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={this.props.endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        //onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                        onDatesChange={({startDate, endDate}) => this.props.onDateChange(startDate, endDate)}
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({focusedInput})} // PropTypes.func.isRequired,
                    />
                </Col>

                <Col xs={2}>
                    <input type='number' value={this.props.zipcode} min={0} className='DateInput_input DateInput_input_1' placeholder='Zipcode'
                           onChange={(e) =>
                               this.props.onChange("zipcode", e.target.value)}/>
                </Col>

                <Col xs={2}>
                    <DropDownGroup size="small" variant={1} placeholder="Distance"
                                   onChange={this.props.onDistanceChange}>
                        <DropDownOption value="5" index={0}>5 miles</DropDownOption>
                        <DropDownOption value="10" index={1}>10 miles</DropDownOption>
                        <DropDownOption value="15" index={2}>15 miles</DropDownOption>
                        <DropDownOption value="25" index={3}>25 miles</DropDownOption>
                        <DropDownOption value="50" index={4}>50 miles</DropDownOption>
                    </DropDownGroup>
                </Col>
                <Col xs={2}>
                    <AuroraButton onClick={this.props.onButtonClick}>Refresh</AuroraButton>
                </Col>
            </React.Fragment>
        );
    }
}