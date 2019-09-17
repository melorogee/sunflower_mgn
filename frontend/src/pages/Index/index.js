import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
@connect(({ login }) => ({ login }))
class Index extends PureComponent {
  constructor(props) {
    super(props);
    const { login } = this.props;
  }

  componentWillMount() {}
  render() {
    return <h1>首页</h1>;
  }
}

export default Index;
