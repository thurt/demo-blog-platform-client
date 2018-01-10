import * as React from "react";

export class Setup extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const id = event.currentTarget.elements.namedItem("id")
        if (!(id instanceof HTMLInputElement)) {
            throw new Error("want form element named \"id\" to be instanceof HTMLInputElement")
        }
        const password = event.currentTarget.elements.namedItem("password")
        if (!(password instanceof HTMLInputElement)) {
            throw new Error("want form element named \"password\" to be instanceof HTMLInputElement")
        }
        alert("Your submission\n" + id.value + ":" + password.value)
    }

    render() {
        return (
            <div>
                <h2>Setup Admin account</h2>
                <p>{"Since this is your first time accessing your blog, you will first need to create an admin account. Please choose your id and password."}</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Id: <input name="id" type="text" />
                    </label>
                    <label>
                        Password: <input name="password" type="password" />
                    </label>
                    <input type="submit" value="Create Account" />
                </form>
            </div>
        )
    }
}
