import React from "react";
import "./style/Company.css";

const Company = (props) => {
  const companies = props.companies.map((company) => (
    <div className="company-container" key={company.id}>
      <div className="cell">{company.id}</div>
      <div className="cell">{company.name}</div>
      <div className="cell">{company.amount}</div>
      <div className="cell">{company.average}</div>
    </div>
  ));

  return (
    <>
      <div className="company-container">
        <div
          className="company-topic cell"
          onClick={() => props.sortCompanies("id")}
        >
          ID
        </div>
        <div
          className="company-topic cell"
          onClick={() => props.sortCompanies("name")}
        >
          Name
        </div>
        <div
          className="company-topic cell"
          onClick={() => props.sortCompanies("amount")}
        >
          Amount
        </div>
        <div
          className="company-topic cell"
          onClick={() => props.sortCompanies("average")}
        >
          Average
        </div>
      </div>
      {companies}
    </>
  );
};

export default Company;
