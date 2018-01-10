import * as React from "react";
import { CmsApi } from "typescript-fetch-api";
import { Homepage } from "./Homepage";
import { Setup } from "./Setup";
import { api } from "../api";

interface MainState {
    isSetup: boolean
}

export class Main extends React.Component<{}, MainState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            isSetup: false
        }
    }

    componentDidMount() {
        api.isSetup()
            .then(isSetup => { 
                this.setState({ isSetup: Boolean(isSetup) })
                return isSetup
            })
            .catch(err => console.error("encountered error:",err))
    }

    render() { 
        return (
            <div>
            <h1>Demo Blog Platform</h1>
                {this.state.isSetup ? <Homepage /> : <Setup />}
            </div>
        )
    }
}
