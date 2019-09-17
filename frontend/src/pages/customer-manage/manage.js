import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import { Form, Input, Button, Table } from 'antd';
import Link from 'umi/link';

const { Search } = Input;
class Manage extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }
    searchChange = e => {
        const { value } = e.target;
        console.log(value, 'change')
    }
    render() {
        const columns = [
            {
                title: '客群ID',
                dataIndex: 'custId',
                key: 'custId',
                render: val => <span>{val ? val : '-'}</span>
            },
            {
                title: '客群名称',
                dataIndex: 'custName',
                key: 'custName',
                render: val => <span>{val ? val : '-'}</span>
            },
            {
                title: '客群描述',
                dataIndex: 'custDes',
                key: 'custDes',
                render: val => <span>{val ? val : '-'}</span>
            },
            {
                title: '创建方式',
                dataIndex: 'createFun',
                key: 'createFun',
                render: val => <span>{val ? val : '-'}</span>
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                render: val => <span>{val ? val : '-'}</span>
            },
            {
                title: '客群数量',
                dataIndex: 'custNum',
                key: 'custNum',
                render: val => <span>{val ? val : '-'}</span>
            },
            {
                title: '操作',
                key: 'action',
                width: 220,
                render: (text, record, rowkey) => (
                    <span>
                        <Link to={"/customer-portrait/index"}>洞 察</Link>
                        <Button type="link">删除</Button>
                    </span>
                )
            }
        ];
        const data = {
            content: {
                currentPage: 1,
                pageSize: 10,
                count: 1,
                data: [
                    {
                        custId: 'ID12345',
                        custName: '付款：某某房产中介',
                        custDes: '办公室租金',
                        createFun: '办公室租金',
                        createTime: '2019-09-01',
                        custNum: '1000'
                    }
                ]
            }
        }
        return (
            <div>
                <h1>客群管理</h1>
                <div>
                    <div className="clearfix" style={{ marginBottom: 10 }}>
                        <span style={{ float: 'left', height: 32, lineHeight: '32px', display: 'inline-block' }}>营销课群&nbsp;&nbsp;&nbsp;总计：1人</span>
                        <Search
                            placeholder="客群id/客群名称"
                            onSearch={value => console.log(value, 'search')}
                            onChange={this.searchChange}
                            style={{ float: 'right', width: 200 }}
                        />
                    </div>
                    <Table
                        size="small"
                        rowKey="custId"
                        dataSource={data.content.data}
                        columns={columns}
                        pagination={{
                            currentPage: data.content.currentPage,
                            pageSize: data.content.pageSize,
                            total: data.content.total,
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default Manage;