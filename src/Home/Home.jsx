import React, { Component } from "react";
import { Button } from "antd";
import SeatPicker from "react-seat-picker";
import Stage from "../Assets/pngwing.com.png";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_requests: "201",
      pending: "12",
      loading: false,
      approved: "190",
      rejected: "21",
    };
  }
  addSeatCallback = ({ row, number, id }, addCb) => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        // await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(`Added seat ${number}, row ${row}, id ${id}`);
        const newTooltip = `tooltip for id-${id} added by callback`;
        addCb(row, number, id, newTooltip);
        this.setState({ loading: false });
      }
    );
  };

  addSeatCallbackContinuousCase = (
    { row, number, id },
    addCb,
    params,
    removeCb
  ) => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        if (removeCb) {
          // await new Promise((resolve) => setTimeout(resolve, 750));
          console.log(
            `Removed seat ${params.number}, row ${params.row}, id ${params.id}`
          );
          removeCb(params.row, params.number);
        }
        // await new Promise((resolve) => setTimeout(resolve, 750));
        console.log(`Added seat ${number}, row ${row}, id ${id}`);
        const newTooltip = `tooltip for id-${id} added by callback`;
        addCb(row, number, id, newTooltip);
        this.setState({ loading: false });
      }
    );
  };

  removeSeatCallback = ({ row, number, id }, removeCb) => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        // await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(`Removed seat ${number}, row ${row}, id ${id}`);
        // A value of null will reset the tooltip to the original while '' will hide the tooltip
        const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
        removeCb(row, number, newTooltip);
        this.setState({ loading: false });
      }
    );
  };

  render() {
    const rows = [
      [
        { id: 1, number: 1, isSelected: true, tooltip: "Reserved by you" },
        { id: 2, number: 2 },
        { id: 3, number: 3 },
        { id: 4, number: 4 },
        { id: 5, number: 5 },
        { id: 6, number: 6 },
        { id: 7, number: 7 },
        null,
        null,
        {
          id: 8,
          number: "8",
          isReserved: true,
          tooltip: "Reserved by Rogger",
        },
        { id: 9, number: "9" },
        { id: 10, number: 10 },
        { id: 11, number: 11 },
        { id: 12, number: 12 },
        { id: 13, number: 13 },
        { id: 14, number: 14 },
      ],
      [
        { id: 1, number: 1, isSelected: true, tooltip: "Reserved by you" },
        { id: 2, number: 2 },
        { id: 3, number: 3 },
        { id: 4, number: 4 },
        { id: 5, number: 5 },
        { id: 6, number: 6 },
        { id: 7, number: 7 },
        null,
        null,
        {
          id: 8,
          number: "8",
          isReserved: true,
          tooltip: "Reserved by Rogger",
        },
        { id: 9, number: "9" },
        { id: 10, number: 10 },
        { id: 11, number: 11 },
        { id: 12, number: 12 },
        { id: 13, number: 13 },
        { id: 14, number: 14 },
      ],
      [
        { id: 1, number: 1, isSelected: true, tooltip: "Reserved by you" },
        { id: 2, number: 2 },
        { id: 3, number: 3 },
        { id: 4, number: 4 },
        { id: 5, number: 5 },
        { id: 6, number: 6 },
        { id: 7, number: 7 },
        null,
        null,
        {
          id: 8,
          number: "8",
          isReserved: true,
          tooltip: "Reserved by Rogger",
        },
        { id: 9, number: "9" },
        { id: 10, number: 10 },
        { id: 11, number: 11 },
        { id: 12, number: 12 },
        { id: 13, number: 13 },
        { id: 14, number: 14 },
      ],
      [
        { id: 1, number: 1, isSelected: true, tooltip: "Reserved by you" },
        { id: 2, number: 2 },
        { id: 3, number: 3 },
        { id: 4, number: 4 },
        { id: 5, number: 5 },
        { id: 6, number: 6 },
        { id: 7, number: 7 },
        null,
        null,
        {
          id: 8,
          number: "8",
          isReserved: true,
          tooltip: "Reserved by Rogger",
        },
        { id: 9, number: "9" },
        { id: 10, number: 10 },
        { id: 11, number: 11 },
        { id: 12, number: 12 },
        { id: 13, number: 13 },
        { id: 14, number: 14 },
      ],
      [
        { id: 1, number: 1, isSelected: true, tooltip: "Reserved by you" },
        { id: 2, number: 2 },
        { id: 3, number: 3 },
        { id: 4, number: 4 },
        { id: 5, number: 5 },
        { id: 6, number: 6 },
        { id: 7, number: 7 },
        null,
        null,
        {
          id: 8,
          number: "8",
          isReserved: true,
          tooltip: "Reserved by Rogger",
        },
        { id: 9, number: "9" },
        { id: 10, number: 10 },
        { id: 11, number: 11 },
        { id: 12, number: 12 },
        { id: 13, number: 13 },
        { id: 14, number: 14 },
      ],
      [
        { id: 1, number: 1, isSelected: true, tooltip: "Reserved by you" },
        { id: 2, number: 2 },
        { id: 3, number: 3 },
        { id: 4, number: 4 },
        { id: 5, number: 5 },
        { id: 6, number: 6 },
        { id: 7, number: 7 },
        null,
        null,
        {
          id: 8,
          number: "8",
          isReserved: true,
          tooltip: "Reserved by Rogger",
        },
        { id: 9, number: "9" },
        { id: 10, number: 10 },
        { id: 11, number: 11 },
        { id: 12, number: 12 },
        { id: 13, number: 13 },
        { id: 14, number: 14 },
      ],
      [
        { id: 1, number: 1, isSelected: true, tooltip: "Reserved by you" },
        { id: 2, number: 2 },
        { id: 3, number: 3 },
        { id: 4, number: 4 },
        { id: 5, number: 5 },
        { id: 6, number: 6 },
        { id: 7, number: 7 },
        null,
        null,
        {
          id: 8,
          number: "8",
          isReserved: true,
          tooltip: "Reserved by Rogger",
        },
        { id: 9, number: "9" },
        { id: 10, number: 10 },
        { id: 11, number: 11 },
        { id: 12, number: 12 },
        { id: 13, number: 13 },
        { id: 14, number: 14 },
      ],
      [
        { id: 1, number: 1, isSelected: true, tooltip: "Reserved by you" },
        { id: 2, number: 2 },
        { id: 3, number: 3 },
        { id: 4, number: 4 },
        { id: 5, number: 5 },
        { id: 6, number: 6 },
        { id: 7, number: 7 },
        null,
        null,
        {
          id: 8,
          number: "8",
          isReserved: true,
          tooltip: "Reserved by Rogger",
        },
        { id: 9, number: "9" },
        { id: 10, number: 10 },
        { id: 11, number: 11 },
        { id: 12, number: 12 },
        { id: 13, number: 13 },
        { id: 14, number: 14 },
      ],
      [
        { id: 1, number: 1, isSelected: true, tooltip: "Reserved by you" },
        { id: 2, number: 2 },
        { id: 3, number: 3 },
        { id: 4, number: 4 },
        { id: 5, number: 5 },
        { id: 6, number: 6 },
        { id: 7, number: 7 },
        null,
        null,
        {
          id: 8,
          number: "8",
          isReserved: true,
          tooltip: "Reserved by Rogger",
        },
        { id: 9, number: "9" },
        { id: 10, number: 10 },
        { id: 11, number: 11 },
        { id: 12, number: 12 },
        { id: 13, number: 13 },
        { id: 14, number: 14 },
      ],
      [
        { id: 1, number: 1, isSelected: true, tooltip: "Reserved by you" },
        { id: 2, number: 2 },
        { id: 3, number: 3 },
        { id: 4, number: 4 },
        { id: 5, number: 5 },
        { id: 6, number: 6 },
        { id: 7, number: 7 },
        null,
        null,
        {
          id: 8,
          number: "8",
          isReserved: true,
          tooltip: "Reserved by Rogger",
        },
        { id: 9, number: "9" },
        { id: 10, number: 10 },
        { id: 11, number: 11 },
        { id: 12, number: 12 },
        { id: 13, number: 13 },
        { id: 14, number: 14 },
      ],
    ];
    const { loading } = this.state;
    return (
      <div>
        <div className="home_container">
          <div className="row mt-5">
            <div className="col-12">
              {/* <h6 style={{textAlign: "center"}}>Seat Picker</h6>
                  <div style={{ marginTop: "100px" }}>
                    <SeatPicker
                      addSeatCallback={this.addSeatCallback}
                      removeSeatCallback={this.removeSeatCallback}
                      rows={rows}
                      maxReservableSeats={3}
                      alpha
                      visible
                      selectedByDefault
                      loading={loading}
                      tooltipProps={{ multiline: true }}
                    />
                  </div> */}
              <h6 style={{ textAlign: "center" }}>
                <img
                  src={Stage}
                  width="200"
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                ></img>
                All eyes this way please!
              </h6>
              <div style={{ marginTop: "100px" }}>
                <SeatPicker
                  addSeatCallback={this.addSeatCallback}
                  removeSeatCallback={this.removeSeatCallback}
                  rows={rows}
                  maxReservableSeats={3}
                  alpha
                  visible
                  selectedByDefault
                  loading={loading}
                  tooltipProps={{ multiline: true }}
                  // continuous
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "35px",
                }}
              >
                <Button type="primary" size="large">
                  Book Seats
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
