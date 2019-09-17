import React, { PureComponent } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
const { TextArea } = Input;

class FeatureQueryForm extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            product: '',
            customer: ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    };
    onChange = (type, e) => {
        let pro = [], cust = [];
        if (type == 'product') {
            pro = this.strSplice(e.target.value);
            this.setState({
                product: pro.length != 0 ? pro.join(',') : ''
            })
        } else {
            cust = this.strSplice(e.target.value);
            this.setState({
                customer: cust.length != 0 ? cust.join(',') : ''
            })
        }
    };
    // 转换文本框值并处理
    strSplice (str) {// 字符串分割成数组，去掉空格/,
        var arr = str.split(/[\n,]/g);
        for (var i = 0; i < arr.length; i++) {
            let num = arr[i].replace(/[^0-9]/ig,"");
            if (num.match(/^\s*$/)) {
                arr.splice(i, 1);
                //删除数组索引位置应保持不变
                i--;
            }
        }
        return arr;
    };
    // 查询，调用父组件
    queryFeature = (obj) => {
        this.props.getChild(obj)
    };
    checkIsNum (rule, value, callback) {
        var isNum = new RegExp("^[0-9]*$");// 是否为数字
        if (isNum.test(item)) {
            callback();
        } else {
            callback('请输入数字');
        }
   };
    render () {
        const { getFieldDecorator } = this.props.form;
        const { product, customer } = this.state; 
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        };
        return (
            <div>
                <Form onSubmit={this.handleSubmit} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                    <Row>
                        <Col span={10}>
                            <Form.Item label="产品号" >
                                {getFieldDecorator('product', {
                                    rules: [
                                        { required: true, message: '请输入产品号!' },
                                        // { validator: this.checkIsNum } 
                                    ],
                                })(<TextArea placeholder="请输入产品号!" autosize onChange={this.onChange.bind(this,'product')}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item label="客户号">
                                {getFieldDecorator('customer', {
                                    rules: [
                                        { required: true, message: '请输入客户号!' },
                                        // { validator: this.checkIsNum } 
                                    ],
                                })(<TextArea placeholder="请输入客户号!" autosize onChange={this.onChange.bind(this,'customer')}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item wrapperCol={{ span: 16 }}>
                                <Button type="primary" htmlType="submit" onClick={this.queryFeature.bind(this, { product: this.state.product, customer: this.state.customer })}>查询</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    
                </Form>
            </div>
        )
    }
}
const featureQuery = Form.create()(FeatureQueryForm);
export default featureQuery;