import React, { useEffect, useState } from "react";
import { useAppConfig } from "../../common/hooks/useAppConfig";
import "../index.css";
import styles from "./FieldModifier.module.css";
import { useAppSdk } from '../../common/hooks/useAppSdk';

const FieldModifierExtension = () => {
  const appConfig = useAppConfig();
  const [assetUID, setAssetUID] = useState("");
  const [contentType, setContentType] = useState("");
  const [entryUID, setEntryUID] = useState("");
  const [error, setError] = useState("");
  const appSDK = useAppSdk();

  useEffect(() => {
    const stack = appSDK?.stack
    const branch = stack?.getAllBranches()
    branch && console.log('FieldModifierLocation branch', branch);

    const allStack = stack?.getAllStacks()
    branch && console.log('FieldModifierLocation allStack', allStack);

    const env = stack?.getEnvironments()
    branch && console.log('FieldModifierLocation env', env);

    const local = stack?.getLocales()
    branch && console.log('FieldModifierLocation local', local);

    const workflow = stack?.getWorkflows()
    branch && console.log('FieldModifierLocation workflow', workflow);

    const global = stack?.getGlobalFields()
    branch && console.log('FieldModifierLocation global', global);

    const entryEvent = appSDK?.location.FieldModifierLocation?.entry
    entryEvent?.onChange((data) => {
      console.log("FieldModifierLocation onChange", data);
    });

    entryEvent?.onSave((data) => {
      console.log("FieldModifierLocation onSave", data);
    });

    entryEvent?.onPublish((data) => {
      console.log("FieldModifierLocation onPublish", data);
    });

    entryEvent?.onUnPublish((data) => {
      console.log("FieldModifierLocation onUnPublish", data);
    });

    console.log("FieldModifierLocation getData", entryEvent?.getData());

     const titleField = entryEvent?.getField("title")
     titleField?.onChange?.((data) => {
      console.log("FieldModifierLocation onField Change", data);
     })

  }, [])

  useEffect(() => {
    if (!error) return
    setTimeout(() => {
      setError('')
    }, 1500)
  }, [error])

  const onSubmit = async () => {
    try {
      if (assetUID) {
        const asset = await appSDK?.stack?.Asset.getAsset(assetUID).fetch()
        console.log('FieldModifierLocation asset', asset);
      }
      if (contentType && entryUID) {
        const entry = await appSDK?.stack?.ContentType(contentType).Entry(entryUID).fetch()
        console.log('FieldModifierLocation entry', entry);
      }
    } catch (error: unknown) {
      console.error('error while fetching', error);
      setError("something went wrong while fetching");
    }
  }

  const onAssetUIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setTimeout
    setAssetUID(e.target.value);
  }

  const sampleAppConfig = appConfig?.["sample_app_configuration"] || "";
  const trimmedSampleAppConfig =
    sampleAppConfig.length > 10 ? `${sampleAppConfig.substring(0, 10)}...` : sampleAppConfig;

  return (
    <div className={`layout-container ${styles.layoutContainer}`}>
      <div className={`ui-location-wrapper ${styles.uiLocationWrapper}`}>
        <div className="ui-location">
        <div className="ui-location">
        <div className='asset-uid'>
          <label htmlFor='asset-input' className='asset-input'>
            <span>Asset UID</span>
            <input name='asset-input' type='text' value={assetUID} onChange={onAssetUIDChange} />
          </label>
          <label htmlFor='entry' className='entry-inputs'>
            <span>Content Type UID</span>
            <input name='entry' type='text' value={contentType} onChange={(e) => { setContentType(e.target.value) }} />

            <span style={{ opacity: contentType ? 1 : 0.5 }}>Entry UID</span>
            <input style={{ opacity: contentType ? 1 : 0.5 }} name='entry' type='text' value={entryUID} onChange={(e) => { setEntryUID(e.target.value) }} disabled={!contentType} />
          </label>
          <div className='button-group'>
            <button disabled={!((assetUID !== "" && contentType === "" && entryUID === "") || (assetUID === "" && contentType !== "" && entryUID !== ""))} onClick={onSubmit}>Fetch</button>
           <button onClick={() => {
              setAssetUID('')
              setContentType('')
              setEntryUID('')
              setError('')
            }}>clear</button>
          </div>
        </div>
        {<div className='error' style={{ opacity: error ? 1 : 0, transition: "opacity 200ms ease-out" }}>{error} </div>}
      </div>
        </div>
      </div>
    </div>
  );
};

export default FieldModifierExtension;
