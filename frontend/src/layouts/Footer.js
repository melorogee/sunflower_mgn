import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
    <Footer style={{ padding: 0 }}>
        <GlobalFooter
            copyright={
                <Fragment>
                    Copyright <Icon type="copyright" /> {new Date().getFullYear()} 华泰证券股份有限公司版权所有
        </Fragment>
            }
        />
    </Footer>
);
export default FooterView;
