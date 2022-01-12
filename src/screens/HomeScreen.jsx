import React, { useEffect, useState } from 'react';
import { Card, Form, Table } from 'react-bootstrap';
import data from '../data/mockData';
import { ScaleLoader } from 'react-spinners';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const override = `
    display: flex;
    justify-content: center;
    align-items: center;
    border-color: red;
    `;  

  const DataSet = [
    {
      columns: [
        {title: "Name", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels
        {title: "Date", style: {font: {sz: "18", bold: true}}, width: {wch: 30}}, // width in characters
        {title: "Feature", style: {font: {sz: "18", bold: true}}, width: {wpx: 100}}, // width in pixels
        {title: "Subject", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels
        {title: "Hours", style: {font: {sz: "18", bold: true}}, width: {wpx: 100}}, // width in pixels
        
    ],
    data: userData.timesheet.map((data) => [
        {value: userData.name, style: {font: {sz: "14"}}},
        {value: data.date, style: {font: {sz: "14"}}},
        {value: data.feature, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "3461eb"}}}},
        {value: data.subject, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "eb1207"}}}},
        {value: data.hours, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "4bd909"}}}},
    ])
    }
  ]

  const getUsers = () => {
    var userArr = [];
    data.forEach(function (obj) {
      userArr.push(obj.name);
    })
    console.log(userArr);
    setUsers(userArr);
  }

  useEffect(() => {
    getUsers();
  }, [])

  const userChangeHandler = (e) => {
    setIsLoading(true);
    console.log(e.target.value);
    var item = data.find(item => item.name === e.target.value);
    setUserData(item);
    console.log({userData})
    setIsLoading(false);
    console.log({ a: users.includes(userData.name) });
  }

  return (
    <div className="container">
      <Card>
        <Card.Body>
          <Card.Title>Excel Report</Card.Title>
          <Form>
            <Form.Label className="text-danger font-weight-bold">
              Select User
            </Form.Label>
            <Form.Select as="select" defaultValue="choose" onChange={(e) => userChangeHandler(e)}>
              <option>choose</option>
              {
                users.map((user, i) =>
                <>
                  <option key={i} value={user}>{user}</option>
                  </>
                )}

            </Form.Select>
          </Form>
          {userData.length !== 0 ? (
            <ExcelFile
              fileName={userData.name}
              element={<button type="button" className="btn btn-success float-right m-3">Export Data</button>}>
              <ExcelSheet dataSet={DataSet} name="Timesheet" />
            </ExcelFile>
          ) : null}
          <Table responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Feature</th>
                  <th>Subject</th>
                  <th>Hours</th>
                </tr>
              </thead>
              <tbody>
                {userData.lenght === 0 ? (
                  <tr>
                    <td colspan="10">
                      <ScaleLoader css={override} size={150} color={"#123abc"} loading={isLoading} />
                    </td>
                  </tr>
                ) : (
                  <>

                  {users.includes(userData.name) ? userData.timesheet.map((item, i) =>
                    <tr key={i}>
                      <td>{userData.name}</td>
                      <td>{item.date}</td>
                      <td>{item.feature}</td>
                      <td>{item.subject}</td>
                      <td>{item.hours}</td>
                    </tr>
                  ) : (<h1>
                    Select user
                  </h1>)}
                  </>
                )}
              </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  )
}

export default HomeScreen
