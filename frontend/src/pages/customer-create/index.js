import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

class Index extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }
    render() {
        return (
            <h1>客群创建</h1>
        )
    }
}

export default Index;