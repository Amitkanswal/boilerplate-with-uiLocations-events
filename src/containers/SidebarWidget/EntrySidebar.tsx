import React, { useCallback, useEffect, useState } from "react";
import { useAppConfig } from "../../common/hooks/useAppConfig";
import "../index.css";
import "./EntrySidebar.css";
import { useAppSdk } from '../../common/hooks/useAppSdk';
import { TestTableComponent } from '../../components/TestTableComponent';
import { useExtensionEvents } from '../../common/hooks/useExtensionEvents';
import StatusPill from '../../components/TestTableComponent/StatusPill';

const EntrySidebarExtension = () => {
  const appSDK = useAppSdk();
  const sideBarEvent = useExtensionEvents();
  const [localState, setLocalState] = useState(sideBarEvent);


  useEffect(() => {
    appSDK?.location.SidebarWidget?.entry.onChange((data) => {
      console.log("SidebarWidget onChange", data);
      setLocalState((prev) => {
        return prev.map((item) => {
          if (item.eventName === 'onChange') {
            return { ...item, status: <StatusPill status="done" /> }
          }
          return item
        })
      })
    });

    appSDK?.location.SidebarWidget?.entry.onSave((data) => {
      console.log("SidebarWidget onSave", data);
  
      setLocalState((prev) => {
        return prev.map((item) => {
          if (item.eventName === 'onSave') {
            return { ...item, status: <StatusPill status="done" /> }
          }
          return item
        })
      })
    });

    appSDK?.location.SidebarWidget?.entry.onPublish((data) => {
      console.log("SidebarWidget onPublish", data);
      setLocalState((prev) => {
        return prev.map((item) => {
          if (item.eventName === 'onPublish') {
            return { ...item, status: <StatusPill status="done" /> }
          }
          return item
        })
      })
    });

    appSDK?.location.SidebarWidget?.entry.onUnPublish((data) => {
      console.log("SidebarWidget onUnPublish", data);
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
            <TestTableComponent initEventData={sideBarEvent} updatedEventData={localState} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrySidebarExtension;
