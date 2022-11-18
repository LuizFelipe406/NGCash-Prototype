import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Context from '../../../context';
import requestApi from '../../../utils/requestApi';
import "./FilterForm.css";

let days = [];
let monthsString = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let months = [];
let years = ["2022", "2023"];

for (let i = 1; i <= 31; i++) {
  days.push(i);
}

for (let i = 0; i <= 11; i++) {
  months.push(i);
}

function FilterForm() {
  const { updateTransactions, token } = useContext(Context);
  const [type, setType] = useState("both");
  const [day, setDay] = useState("all");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const handleTypeChange = ({ target }) => {
    const { value } = target;
    setType(value);
  };

  const handleDayChange = ({ target }) => {
    const { value } = target;
    setDay(value);
  };

  const handleMonthChange = ({ target }) => {
    const { value } = target;
    setMonth(value);
  };

  const handleYearChange = ({ target }) => {
    const { value } = target;
    setYear(value);
  };

  const filter = async () => {
    let apiUrl = 'transaction/filtered/';

    apiUrl = apiUrl + `?type=${type}&month=${month}&year=${year}`;

    if (day !== 'all') {
      apiUrl = apiUrl + `?day=${day}`;
    }
    
    const { data } = await requestApi('GET', apiUrl, {}, { authorization: token });

    updateTransactions(data);
  };

  return (
    <div>
      <Form className="white-box filter-container mt-3 mb-3">
        <Row>
          <Form.Group as={Col}>
            <Form.Label className="text">Tipo</Form.Label>
            <Form.Select
              value={type}
              onChange={handleTypeChange}
              className="text filter-select"
            >
              <option value="both">ambos</option>
              <option value="cash-in">cash-in</option>
              <option value="cash-out">cash-out</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label className="text">Dia</Form.Label>
            <Form.Select
              value={day}
              onChange={handleDayChange}
              className="text filter-select"
            >
              <option value="all">todos</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="text">Mês</Form.Label>
            <Form.Select
              value={month}
              onChange={handleMonthChange}
              className="text filter-select"
            >
              {months.map((month) => (
                <option key={month} value={month + 1}>
                  {monthsString[month]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className="text">Ano</Form.Label>
            <Form.Select
              value={year}
              onChange={handleYearChange}
              className="text filter-select"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Col>
            <button
              type="button"
              className="black-box mt-4 text filter-btn"
              onClick={ filter }
            >
              Filtrar
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default FilterForm;
