import React, { useCallback, useEffect, useState } from "react";
import { useAppConfig } from "../../common/hooks/useAppConfig";
import "../index.css";
import "./AssetSidebar.css";
import { useAppSdk } from '../../common/hooks/useAppSdk';
import { TestTableComponent } from '../../components/TestTableComponent';
import StatusPill from '../../components/TestTableComponent/StatusPill';
import { useExtensionEvents } from '../../common/hooks/useExtensionEvents';

const AssetSidebarExtension = () => {
  const appSDK = useAppSdk();

  const assetSideBarEvent = useExtensionEvents();
  const [localState, setLocalState] = useState(assetSideBarEvent);

  useEffect(() => {
    appSDK?.location.AssetSidebarWidget?.onChange((data) => {
      console.log("AssetSidebarWidget onChange", data);
      setLocalState((prev) => {
        return prev.map((item) => {
          if (item.eventName === 'onChange') {
            return { ...item, status: <StatusPill status="done" /> }
          }
          return item
        })
      })
    });

    appSDK?.location.AssetSidebarWidget?.onSave((data) => {
      console.log("AssetSidebarWidget onSave", data);
  
      setLocalState((prev) => {
        return prev.map((item) => {
          if (item.eventName === 'onSave') {
            return { ...item, status: <StatusPill status="done" /> }
          }
          return item
        })
      })
    });

    appSDK?.location.AssetSidebarWidget?.onPublish((data) => {
      console.log("AssetSidebarWidget onPublish", data);
      setLocalState((prev) => {
        return prev.map((item) => {
          if (item.eventName === 'onPublish') {
            return { ...item, status: <StatusPill status="done" /> }
          }
          return item
        })
      })
    });
    console.log("appSDK", appSDK);
    
    appSDK?.location.AssetSidebarWidget?.onUnPublish((data) => {
      console.log("AssetSidebarWidget onUnPublish", data);
      setLocalState((prev) => {
        return prev.map((item) => {
          if (item.eventName === 'onUnPublish') {
            return { ...item, status: <StatusPill status="done" /> }
          }
          return item
        })
      })
    });

  }, [])


  return (
    <div className="layout-container">
      <div className="ui-location-wrapper">
        <div className="ui-location">
          <div className="ui-location">
            <TestTableComponent initEventData={assetSideBarEvent} updatedEventData={localState}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetSidebarExtension;
