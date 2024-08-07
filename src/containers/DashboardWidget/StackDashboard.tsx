/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useAppConfig } from "../../common/hooks/useAppConfig";
import { useAppSdk } from '../../common/hooks/useAppSdk';
import "../index.css";
import "./StackDashboard.css";
import { TestTableComponent } from '../../components/TestTableComponent';
// import Stack from '@contentstack/app-sdk/dist/src/stack';
// import { generateIsLoadingArray } from '../../common/utils/functions';

const StackDashboardExtension = () => {
  const appConfig = useAppConfig();
  console.log("appConfig", appConfig);

  const [assetUID, setAssetUID] = useState("");
  const [contentType, setContentType] = useState("");
  const [entryUID, setEntryUID] = useState("");
  const [error, setError] = useState("");
  const appSDK = useAppSdk();

  // const ignoredMethods = ['Asset', 'ContentType', '_connection', '_data'];
  // const methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(appSDK?.stack))
  // //@ts-ignore
  //     .filter(name => typeof stack[name] === 'function' && name !== 'constructor' && !ignoredMethods.includes(name));
  // const [loadingMap, setLoadingMap] = useState(generateIsLoadingArray(methodNames.length)|| [])
  // const [eventName, setEventName] = useState(methodNames.map(name=>  Object.getOwnPropertyNames(name)).flat())

  useEffect(() => {
    // stack?.Asset
    // stack?.ContentType
    // stack?._connection
    // stack?._data
    // // stack?.search
    // const branch = stack?.getAllBranches()
    // branch && console.log('branch', branch);

    // const allStack = stack?.getAllStacks()
    // branch && console.log('allStack', allStack);

    // const env = stack?.getEnvironments()
    // branch && console.log('env', env);

    // const local = stack?.getLocales()
    // branch && console.log('local', local);

    // const workflow = stack?.getWorkflows()
    // branch && console.log('workflow', workflow);

    // const global = stack?.getGlobalFields()
    // branch && console.log('global', global);
    // const stack = appSDK?.stack;

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
        console.log('asset', asset);
      }
      if (contentType && entryUID) {
        const entry = await appSDK?.stack?.ContentType(contentType).Entry(entryUID).fetch()
        console.log('entry', entry);
      }
    } catch (error: any) {
      console.error('error while fetching', error);
      setError("something went wrong while fetching");
    }
  }

  const onAssetUIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setTimeout
    setAssetUID(e.target.value);
  }

  return (
    <div className="layout-container">
      <div className="ui-location">
        <TestTableComponent initEventData={[]} />
        {/* <div className='asset-uid'>
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
        {<div className='error' style={{ opacity: error ? 1 : 0, transition: "opacity 200ms ease-out" }}>{error} </div>} */}
      </div>
    </div>
  );
};

export default StackDashboardExtension;
