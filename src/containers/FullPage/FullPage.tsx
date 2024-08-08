import React, { useCallback, useEffect, useState } from "react";
import { useAppConfig } from "../../common/hooks/useAppConfig";
import "../index.css";
import "./FullPage.css";
import { useAppSdk } from '../../common/hooks/useAppSdk';
import { TestTableComponent } from '../../components/TestTableComponent';

const FullPageExtension = () => {
  return (
    <div className="layout-container">
      <div className="ui-location">
      <div className="ui-location">
      <TestTableComponent initEventData={[]}/>
      </div>
      </div>
    </div>
  );
};
export default FullPageExtension;
