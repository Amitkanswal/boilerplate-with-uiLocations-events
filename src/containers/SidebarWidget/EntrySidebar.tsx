import React, { useCallback, useEffect, useState } from "react";
import { useAppConfig } from "../../common/hooks/useAppConfig";
import "../index.css";
import "./EntrySidebar.css";
import { useAppSdk } from '../../common/hooks/useAppSdk';

const EntrySidebarExtension = () => {
  const appConfig = useAppConfig();
  const [assetUID, setAssetUID] = useState("");
  const [contentType, setContentType] = useState("");
  const [entryUID, setEntryUID] = useState("");
  const [error, setError] = useState("");
  const appSDK = useAppSdk();

  useEffect(() => {
    try {
      const stack = appSDK?.stack
    const branch = stack?.getAllBranches()
    branch && console.log('SidebarWidget branch', branch);

    const allStack = stack?.getAllStacks()
    branch && console.log('SidebarWidget allStack', allStack);

    const env = stack?.getEnvironments()
    branch && console.log('SidebarWidget env', env);

    const local = stack?.getLocales()
    branch && console.log('SidebarWidget local', local);

    const workflow = stack?.getWorkflows()
    branch && console.log('SidebarWidget workflow', workflow);

    const global = stack?.getGlobalFields()
    branch && console.log('SidebarWidget global', global);

    appSDK?.location.SidebarWidget?.entry.onChange((data) => {
      console.log("SidebarWidget onChange", data);
    });

    appSDK?.location.SidebarWidget?.entry.onSave((data) => {
      console.log("SidebarWidget onSave", data);
    });

    appSDK?.location.SidebarWidget?.entry.onPublish((data) => {
      console.log("SidebarWidget onPublish", data);
    });

    appSDK?.location.SidebarWidget?.entry.onUnPublish((data) => {
      console.log("SidebarWidget onUnPublish", data);
    });
    console.log("SidebarWidget getData", appSDK?.location.SidebarWidget?.entry.getData());

     const titleField = appSDK?.location.SidebarWidget?.entry.getField("title")
     titleField?.onChange?.((data) => {
      console.log("SidebarWidget onField Change", data);
     })
    } catch (error) {
      console.error('error on events', error);
      
    }

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
        console.log('SidebarWidget asset', asset);
      }
      if (contentType && entryUID) {
        const entry = await appSDK?.stack?.ContentType(contentType).Entry(entryUID).fetch()
        console.log('SidebarWidget entry', entry);
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
    sampleAppConfig.length > 15 ? `${sampleAppConfig.substring(0, 15)}...` : sampleAppConfig;

  return (
    <div className="layout-container">
      <div className="ui-location-wrapper">
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

export default EntrySidebarExtension;
