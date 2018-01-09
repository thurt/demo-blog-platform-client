import * as React from "react";
import * as ReactDOM from "react-dom";
import * as api from "typescript-fetch-api";

import { Hello } from "./components/Hello";

const myApi = api.CmsApiFactory(fetch, 'http://172.17.0.1:8282')

myApi.isSetup().then(isSetup => console.log("received value:",typeof isSetup)).catch(err => console.error("encountered error:",err))
ReactDOM.render(
    <Hello compiler="Typescript" framework="React" />,
    document.getElementById("example")
);

