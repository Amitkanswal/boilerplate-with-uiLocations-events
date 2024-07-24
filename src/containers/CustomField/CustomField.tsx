import React, { useCallback, useEffect, useState } from "react";
import { useAppConfig } from "../../common/hooks/useAppConfig";
import "../index.css";
import "./CustomField.css";
import { useAppSdk } from '../../common/hooks/useAppSdk';

const CustomFieldExtension = () => {
  const appConfig = useAppConfig();
  const [assetUID, setAssetUID] = useState("");
  const [contentType, setContentType] = useState("");
  const [entryUID, setEntryUID] = useState("");
  const [error, setError] = useState("");
  const appSDK = useAppSdk();

  useEffect(() => {
    const stack = appSDK?.stack
    const branch = stack?.getAllBranches()
    branch && console.log('CustomField branch', branch);

    const allStack = stack?.getAllStacks()
    branch && console.log('CustomField allStack', allStack);

    const env = stack?.getEnvironments()
    branch && console.log('CustomField env', env);

    const local = stack?.getLocales()
    branch && console.log('CustomField local', local);

    const workflow = stack?.getWorkflows()
    branch && console.log('CustomField workflow', workflow);

    const global = stack?.getGlobalFields()
    branch && console.log('CustomField global', global);

    appSDK?.location.CustomField?.entry.onChange((data) => {
      console.log("CustomField onChange", data);
    });

    appSDK?.location.CustomField?.entry.onSave((data) => {
      console.log("CustomField onSave", data);
    });

    appSDK?.location.CustomField?.entry.onPublish((data) => {
      console.log("CustomField onPublish", data);
    });

    appSDK?.location.CustomField?.entry.onUnPublish((data) => {
      console.log("CustomField onUnPublish", data);
    });

    console.log("CustomField getData", appSDK?.location.CustomField?.entry.getData());
     const titleField = appSDK?.location.CustomField?.entry.getField("title")
     titleField?.onChange?.((data) => {
      console.log("CustomField onField Change", data);
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
        console.log('CustomField asset', asset);
      }
      if (contentType && entryUID) {
        const entry = await appSDK?.stack?.ContentType(contentType).Entry(entryUID).fetch()
        console.log('CustomField entry', entry);
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
    sampleAppConfig.length > 17 ? `${sampleAppConfig.substring(0, 17)}...` : sampleAppConfig;

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

export default CustomFieldExtension;
