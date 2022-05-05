import React from "react";
import { Link } from "react-router-dom";
import {Button, Result} from "antd";

//common component for 404 display.
export default class NotFound extends React.Component {
    render() {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={[
                    <Link to="/">
                        <Button type="primary" key="console">
                            Go to Home
                        </Button>
                    </Link>
                ]}
            />
        );
    }
}