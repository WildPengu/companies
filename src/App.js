import React from "react";
import Company from "./Company";
import "./style/App.css";

const axios = require("axios");

class App extends React.Component {
  state = {
    companies: [],
    lastSorted: "",
    howToSort: "ascending",
  };

  getCompanySum = (orders, id) => {
    let sum = 0;

    for (let i = 0; i < orders.length; i++) {
      if (orders[i].companyId === id + 1) {
        sum += orders[i].amount;
      }
    }
    return sum;
  };

  getCompanyAverage = (orders, id) => {
    let average = 0;
    let amount = 0;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].companyId === id + 1) {
        average += orders[i].amount;
        amount++;
      }
    }
    if (!average) {
      return 0;
    } else {
      return Math.round((average / amount) * 100) / 100;
    }
  };

  setCompaniesToState = (readyCompanies) => {
    this.setState({
      companies: readyCompanies,
    });
  };

  setCompanies = (orders, companies) => {
    const readyCompanies = [];

    for (let i = 0; i < companies.length; i++) {
      let sum = this.getCompanySum(orders, i);
      let average = this.getCompanyAverage(orders, i);
      const company = {
        id: companies[i].id,
        name: companies[i].name,
        amount: sum,
        average: average,
      };
      readyCompanies.push(company);
    }
    this.setCompaniesToState(readyCompanies);
  };

  getCompanies = () => {
    return axios
      .get("https://my-json-server.typicode.com/lbadocha87/orders/companies")
      .then((response) => {
        return response.data;
      });
  };

  getOrders = (companiesArray) => {
    const self = this;
    axios
      .get("https://my-json-server.typicode.com/lbadocha87/orders/orders")
      .then(function (response) {
        self.setCompanies(response.data, companiesArray);
        return response.data;
      });
  };

  componentDidMount() {
    this.getCompanies().then((companies) => {
      this.getOrders(companies);
    });
  }

  sort = (sign, companies, value) => {
    for (let i = 0; i < companies.length; i++) {
      for (let j = 1; j < companies.length; j++) {
        if (eval(companies[j - 1][value] + sign + companies[j][value])) {
          let temp = companies[j];
          companies[j] = companies[j - 1];
          companies[j - 1] = temp;
        }
      }
    }
  };

  sortCompanies = (value) => {
    const companies = this.state.companies;
    if (
      this.state.lastSorted === value &&
      this.state.howToSort === "descending"
    ) {
      this.sort("<", companies, value);
      this.setState({ howToSort: "ascending" });
    } else {
      this.sort(">", companies, value);
      this.setState({ howToSort: "descending" });
    }

    this.setState({ companies, lastSorted: value });
  };

  render() {
    return (
      <div>
        <Company
          companies={this.state.companies}
          sortCompanies={this.sortCompanies}
        />
      </div>
    );
  }
}

export default App;
