import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

class Portrait extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }
    render() {
        return (
            <h1>客群画像</h1>
        )
    }
}

export default Portrait;