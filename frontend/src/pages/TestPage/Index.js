import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import router from 'umi/router';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FeatureQuery from '@/pages/TestPage/FeatureQueryForm';
import { Breadcrumb, Form, Input, Button, Table } from 'antd';
import Link from 'umi/link';

const BreadcrumbItem = Breadcrumb.Item;

const columns = [
    {
        title: '产品号',
        dataIndex: 'product',
        key: 'product',
        render: val => <span>{val ? val : '-'}</span>
    },
    {
        title: '客户号',
        dataIndex: 'customer',
        key: 'customer',
        render: val => <span>{val ? val : '-'}</span>
    },
    {
        title: '打分',
        dataIndex: 'predict',
        key: 'predict',
        render: val => <span>{val ? val : '-'}</span>
    }
];
@connect(({ featureQuery }) => ({ featureQuery }))
export default class QueryPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }
    componentWillMount() {
        // this.getFeature();
    }
    // 获取关系图谱
    getFeature(obj) {
        const { dispatch } = this.props;
        let product = obj && obj.product ? obj.product : '', customer = obj && obj.customer ? obj.customer : '';
        this.setState({
            loading: true
        })
        dispatch({
            type: 'featureQuery/getFeature',
            payload: {
                customerIds: product,
                productCodes: customer
            },
        }).then(response => {
            this.setState({
                loading: false
            })
        });
    }
    render () {
        const { featureQuery } = this.props;
        const { featureArr } = featureQuery;
        return (
            <div>
                <div style={{ padding: '16px 32px 0 32px', borderBottom: '1px solid #e8e8e8', margin: '-24px -24px 0px' }}>
                    <Breadcrumb style={{ marginBottom: '14px' }}>
                        <BreadcrumbItem>测试</BreadcrumbItem>
                        <BreadcrumbItem>测试页</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <FeatureQuery getChild={this.getFeature.bind(this)}/>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Table
                        dataSource={featureArr}
                        columns={columns}
                        rowKey="product"
                        loading={this.state.loading}
                        // pagination={{
                        //     current: data.content.currentPage,
                        //     pageSize: data.content.pageSize,
                        //     total: data.content.count,
                        // }}
                    />
                </div>
            </div>
        )
    }
}