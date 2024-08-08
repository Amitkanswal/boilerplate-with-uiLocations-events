
import React from "react";
import "../index.css";
import "./StackDashboard.css";
import { TestTableComponent } from '../../components/TestTableComponent';

const StackDashboardExtension = () => {

  return (
    <div className="layout-container">
      <div className="ui-location">
        <TestTableComponent initEventData={[]} />
      </div>
    </div>
  );
};

export default StackDashboardExtension;
