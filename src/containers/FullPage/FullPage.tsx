import React, { useCallback, useEffect, useState } from "react";
import { useAppConfig } from "../../common/hooks/useAppConfig";
import "../index.css";
import "./FullPage.css";
import { useAppSdk } from '../../common/hooks/useAppSdk';

const FullPageExtension = () => {
  const appConfig = useAppConfig();
  const [assetUID, setAssetUID] = useState("");
  const [contentType, setContentType] = useState("");
  const [entryUID, setEntryUID] = useState("");
  const [error, setError] = useState("");
  const appSDK = useAppSdk();

  useEffect(() => {
    const stack = appSDK?.stack
    const branch = stack?.getAllBranches()
    branch && console.log('FullPageExtension branch', branch);

    const allStack = stack?.getAllStacks()
    branch && console.log('FullPageExtension allStack', allStack);

    const env = stack?.getEnvironments()
    branch && console.log('FullPageExtension env', env);

    const local = stack?.getLocales()
    branch && console.log('FullPageExtension local', local);

    const workflow = stack?.getWorkflows()
    branch && console.log('FullPageExtension workflow', workflow);

    const global = stack?.getGlobalFields()
    branch && console.log('FullPageExtension global', global);

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
        console.log('FullPageExtension asset', asset);
      }
      if (contentType && entryUID) {
        const entry = await appSDK?.stack?.ContentType(contentType).Entry(entryUID).fetch()
        console.log('FullPageExtension entry', entry);
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
    sampleAppConfig.length > 19 ? `${sampleAppConfig.substring(0, 19)}...` : sampleAppConfig;

  return (
    <div className="layout-container">
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
  );
};
export default FullPageExtension;
