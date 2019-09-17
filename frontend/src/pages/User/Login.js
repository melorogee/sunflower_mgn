import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Checkbox, Alert, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import layoutstyles from '@/layouts/UserLayout.less';
import logo from '@/assets/logo.png';
import Login from '@/components/Login';
import styles from './Login.less';

const { UserName, Submit } = Login;

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> {new Date().getFullYear()} 向日葵版权所有
  </Fragment>
);

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  componentWillMount() {
    document.title = '登录 -  向日葵管理中心';
    // this.getLoginInfo();
  }

  handleSubmit = (err, values) => {
    if (!err) {
      this.getLoginInfo({
        ...values,
      });
    }
  };

  getLoginInfo = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/login',
      payload: params,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { isShowLogin } = login;
    return (
      <div>
        {isShowLogin ? (
          <div className={layoutstyles.container}>
            <div className={layoutstyles.content}>
              <div className={layoutstyles.top}>
                <div className={layoutstyles.header}>
                  <Link to="/">
                    <img alt="logo" className={layoutstyles.logo} src={logo} />
                    <span className={layoutstyles.title}> 向日葵管理中心</span>
                  </Link>
                </div>
              </div>
              <div className={styles.main}>
                <Login
                  onSubmit={this.handleSubmit}
                  ref={form => {
                    this.loginForm = form;
                  }}
                >
                  <div
                    key="account"
                    tab={formatMessage({ id: 'app.login.tab-login-credentials' })}
                    style={{ marginTop: '50px' }}
                  >
                    {login.status === 'error' &&
                      !submitting &&
                      this.renderMessage(
                        formatMessage({ id: 'app.login.message-invalid-credentials' })
                      )}
                    <UserName
                      name="user_name"
                      placeholder="username"
                      onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
                    />
                  </div>
                  <Submit loading={submitting}>
                    <FormattedMessage id="app.login.login" />
                  </Submit>
                </Login>
              </div>
            </div>
            <GlobalFooter copyright={copyright} />
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default LoginPage;
