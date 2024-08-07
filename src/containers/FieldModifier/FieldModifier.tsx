import React, { useEffect, useState } from "react";
import { useAppConfig } from "../../common/hooks/useAppConfig";
import { useAppSdk } from '../../common/hooks/useAppSdk';
import { TestTableComponent } from '../../components/TestTableComponent';
import { useExtensionEvents } from '../../common/hooks/useExtensionEvents';
import "../index.css";
import styles from "./FieldModifier.module.css";
import StatusPill from '../../components/TestTableComponent/StatusPill';

const FieldModifierExtension = () => {
  const appConfig = useAppConfig();
  const appSDK = useAppSdk();

  const fieldModifierEvent = useExtensionEvents();
  const [localState, setLocalState] = useState(fieldModifierEvent);

  useEffect(() => {
    appSDK?.location.FieldModifierLocation?.entry.onChange((data) => {
      console.log("FieldModifierLocation onChange", data);
      setLocalState((prev) => {
        return prev.map((item) => {
          if (item.eventName === 'onChange') {
            return { ...item, status: <StatusPill status="done" /> }
          }
          return item
        })
      })
    });

    appSDK?.location.FieldModifierLocation?.entry.onSave((data) => {
      console.log("FieldModifierLocation onSave", data);
  
      setLocalState((prev) => {
        return prev.map((item) => {
          if (item.eventName === 'onSave') {
            return { ...item, status: <StatusPill status="done" /> }
          }
          return item
        })
      })
    });

    appSDK?.location.FieldModifierLocation?.entry.onPublish((data) => {
      console.log("FieldModifierLocation onPublish", data);
      setLocalState((prev) => {
        return prev.map((item) => {
          if (item.eventName === 'onPublish') {
            return { ...item, status: <StatusPill status="done" /> }
          }
          return item
        })
      })
    });

    appSDK?.location.FieldModifierLocation?.entry.onUnPublish((data) => {
      console.log("FieldModifierLocation onUnPublish", data);
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


  const sampleAppConfig = appConfig?.["sample_app_configuration"] || "";
  const trimmedSampleAppConfig =
    sampleAppConfig.length > 10 ? `${sampleAppConfig.substring(0, 10)}...` : sampleAppConfig;

  return (
    <div className={`layout-container ${styles.layoutContainer}`}>
      <div className={`ui-location-wrapper ${styles.uiLocationWrapper}`}>
        <div className="ui-location">
          <div className="ui-location">
            <TestTableComponent initEventData={fieldModifierEvent} updatedEventData={localState}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldModifierExtension;
