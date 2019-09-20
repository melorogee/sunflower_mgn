import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Table, Divider, Tag, Radio, DatePicker, Button, Modal, Row, Col, Form, Input, TimePicker, InputNumber, message } from 'antd';
import $ from 'jquery';
import moment from 'moment';

const { MonthPicker, RangePicker } = DatePicker;
const { TextArea } = Input;

const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';
const timeFormat = 'HH:mm';

let nowDate = new Date();
let year = nowDate.getFullYear();
let month = nowDate.getMonth()+1;
let day = nowDate.getDate();
let hour = nowDate.getHours();
let min = nowDate.getMinutes();
if (month >= 1 && month <= 9) {
  month = "0" + month;
}
if (day >= 0 && day <= 9) {
  day = "0" + day;
}

@connect(({ crmtInfo }) => ({
  crmtInfo,
}))
class crmtInfo extends PureComponent {
  constructor(props) {
    super(props);
    //初始化页面数据
    this.state = {
      //模拟接口返回收支管理数据格式
      crmtList: [
        {
          budget_date:'2019-09-20',
          income:100,
          expenditure:20,
          surplus:80
        },
        {
          budget_date:'2019-09-20',
          income:100,
          expenditure:20,
          surplus:80
        },
        {
          budget_date:'2019-09-20',
          income:100,
          expenditure:20,
          surplus:80
        }
      ],
      crmtType:'month', //查询的类型，默认按月 month ，按天为 day，
      crmtMonth:year+'-'+month,     //存储月份的字段，默认当月
      crmtDay:year+'-'+month+'-'+day,       //存储日期的字段，默认当天
      //明细弹窗
      detailModal:false,
      detailDate:'',
      //模拟收入明细数据
      incomeData:[
        {
          time:'15:14',
          detail:'学费',
          money:200
        },
        {
          time:'15:14',
          detail:'学费',
          money:200
        },
        {
          time:'15:14',
          detail:'学费',
          money:200
        },
        {
          time:'15:14',
          detail:'学费',
          money:200
        },
        {
          time:'15:14',
          detail:'学费',
          money:200
        },
        {
          time:'15:14',
          detail:'学费',
          money:200
        },{
          time:'15:14',
          detail:'学费',
          money:200
        }
      ],
      //模拟支出明细数据
      expenditureData:[
        {
          time:'15:14',
          detail:'置办费',
          money:20
        }
      ],
      //新增明细
      addModal:false,
      addType:'income',
      addDate:year+'-'+month+'-'+day,
      addTime:hour+':'+min,
      addMoney:0,
      addDesc:''
    };
  }

  componentWillMount() {
    //请求收支管理列表
    this.getCrmtList();
  }

  getCrmtList() {
    //请求收支管理列表
    const { dispatch } = this.props;
    const { crmtType, crmtMonth, crmtDay } = this.state;
    const params = {
      type: crmtType
    };
    if(crmtType == 'month'){
      params.date = crmtMonth.replace(/\-/g,'');
    }else{
      params.date = crmtDay.replace(/\-/g,'');
    }
    //接口传参参数，type，date，
    //如果是按月，type为month，date例201909，
    //如果按天，type为day，date例20190920
    dispatch({
      type: 'crmtInfo/getCrmtList',
      payload: params,
    }).then(response => {
      const { crmtInfo } = this.props;
      const { crmt } = crmtInfo;
      this.setState({
        crmtList: crmt,
      });
    });
  }

  changeType(e){
    this.setState({
      crmtType: e.target.value
    })
  }

  changeDate(type, date, dateString){
    console.log(type, date, dateString);
    if(type == 'month'){
      this.setState({
        crmtMonth: dateString
      })
    }else{
      this.setState({
        crmtDay: dateString
      })
    }
  }

  viewDetail(item){
    this.getCrmtDetail(item.budget_date);
    this.setState({
      detailModal: true,
      detailDate: item.budget_date
    })
  }

  //获取收入明细和支出明细的方法
  getCrmtDetail(date){
    const { dispatch } = this.props;
    const params = {
      date: date.replace(/\-/g,'')
    };
    dispatch({
      type: 'crmtInfo/getCrmtDetail',
      payload: params,
    }).then(response => {
      const { crmtInfo } = this.props;
      const { IncomeDetail, expenditureDetail } = crmtInfo;
      this.setState({
        expenditureData: expenditureDetail,
        incomeData: IncomeDetail
      });
    });
  }

  handleCancel(){
    this.setState({
      detailModal: false
    })
  }

  addDetail(){
    this.setState({
      addModal: true
    })
  }

  addOk(){
    //保存新增数据
    const { addDate, addTime, addType, addMoney, addDesc} = this.state;
    const params = {
      addDate: addDate.replace(/\-/g,''), 
      addTime, 
      addType, 
      addMoney, 
      addDesc
    }
    if(addMoney == ''){
      message.error('请填写金额');
      return false;
    }
    if(addDesc == ''){
      message.error('请填写描述');
      return false;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'crmtInfo/addDetail',
      payload: params,
    }).then(response => {
      const { crmtInfo } = this.props;
      const { success } = crmtInfo;
      if(success){
        //为true则为成功
        message.success('新增成功')
        this.addCancel();
        this.getCrmtList();
      }else{
        message.error('新增失败')
      }
    });
  }

  addCancel(){
    this.setState({
      addModal: false,
      addType:'income',
      addDate:year+'-'+month+'-'+day,
      addTime:hour+':'+min,
      addMoney:0,
      addDesc:''
    })
  }

  changeAddInfo(type, data, dateString){
    if(type == 'date'){
      this.setState({
        addDate: dateString
      })
    }else if(type == 'min'){
      this.setState({
        addTime: dateString
      })
    }else if(type == 'money'){
      this.setState({
        addMoney: data
      })
    }else if(type == 'type'){
      this.setState({
        addType: data.target.value
      })
    }else if(type == 'desc'){
      this.setState({
        addDesc: data.target.value
      })
    }
  }

  render() {
    //从状态存储器里取出值
    const { 
      crmtList, 
      crmtType, 
      crmtMonth, 
      crmtDay, 
      detailModal, 
      expenditureData, 
      incomeData, 
      detailDate, 
      addType, 
      addModal,
      addDate,
      addTime
    } = this.state;
    const thWidth = ($(window).width()-280)/4;
    //定义表格表头
    const crmtColumns = [
      {
        title: '日期',
        dataIndex: 'budget_date',
        key: 'budget_date',
        width:thWidth,
        render: (text, record) => (
          <div style={{color:'#1890FF',cursor:'pointer'}} onClick={this.viewDetail.bind(this,record)}>{text}</div>
        )
      },
      {
        title: '收入（元）',
        dataIndex: 'income',
        key: 'income',
        width:thWidth,
      },
      {
        title: '支出（元）',
        dataIndex: 'expenditure',
        key: 'expenditure',
        width:thWidth,
      },
      {
        title: '剩余（元）',
        dataIndex: 'surplus',
        key: 'surplus',
      },
    ];

    const detailColumns = [
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        width:70
      },
      {
        title: '描述',
        dataIndex: 'detail',
        key: 'detail',
        width:210
      },
      {
        title: '金额',
        dataIndex: 'money',
        key: 'money',
        width:60
      }
    ]

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
        <Card title={(<div style={{overflow:'hidden'}}><span>收支管理</span><Button style={{float:'right'}} onClick={this.addDetail.bind(this)}>新增</Button></div>)}>
          <Radio.Group defaultValue={crmtType} onChange={this.changeType.bind(this)} style={{marginBottom:'14px',marginRight:'14px'}}>
            <Radio.Button value="month">按月份</Radio.Button>
            <Radio.Button value="day">按日期</Radio.Button>
          </Radio.Group>
          {
            crmtType == 'month'?
            <MonthPicker allowClear={false} defaultValue={moment(crmtMonth, monthFormat)} onChange={this.changeDate.bind(this,'month')}/>:
            <DatePicker allowClear={false} defaultValue={moment(crmtDay, dateFormat)} onChange={this.changeDate.bind(this,'day')}/>
          }  
          <Button type="primary" icon="search" style={{marginLeft:'14px'}} onClick={this.getCrmtList.bind(this)}>搜索</Button>
          <Table
            size="small"
            columns={crmtColumns}
            dataSource={crmtList}
            pagination={false}
            ref="tableWidth"
          />
        </Card>
        <Modal
          title={detailDate+' 明细'}
          width={760}
          visible={detailModal}
          destroyOnClose={true}
          footer={[
            <Button key="back" type="primary" onClick={this.handleCancel.bind(this)}>
              确定
            </Button>
          ]}
          onCancel={this.handleCancel.bind(this)}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Table
                columns={detailColumns}
                dataSource={incomeData}
                bordered
                pagination={false}
                size="small"
                scroll={{y:200}}
                destroyOnClose={true}
                title={() => '收入明细'}
              />
            </Col>
            <Col span={12}>
              <Table
                columns={detailColumns}
                dataSource={expenditureData}
                bordered
                pagination={false}
                size="small"
                scroll={{y:200}}
                destroyOnClose={true}
                title={() => '支出明细'}
              />
            </Col>
          </Row>
        </Modal>
        <Modal
          title={'新增明细'}
          width={400}
          visible={addModal}
          destroyOnClose={true}
          onOk={this.addOk.bind(this)}
          onCancel={this.addCancel.bind(this)}
        >
          <Form {...formItemLayout}>
            <Form.Item label="日期" style={{marginBottom:'5px'}}>
              <DatePicker allowClear={false} defaultValue={moment(addDate, dateFormat)} onChange={this.changeAddInfo.bind(this,'date')} style={{width:'175px'}}/>
            </Form.Item>
            <Form.Item label="时间" style={{marginBottom:'5px'}}>
              <TimePicker defaultValue={moment(addTime, timeFormat)} format={timeFormat} onChange={this.changeAddInfo.bind(this,'min')} style={{width:'175px'}}/>
            </Form.Item>
            <Form.Item label="金额" style={{marginBottom:'5px'}}>
              <InputNumber min={1} style={{width:'175px'}} onChange={this.changeAddInfo.bind(this,'money')}/>
            </Form.Item>
            <Form.Item label="收入/支出" style={{marginBottom:'5px'}}>
              <Radio.Group value={addType} onChange={this.changeAddInfo.bind(this,'type')}>
                <Radio value='income'>收入</Radio>
                <Radio value='expenditure'>支出</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="描述" style={{marginBottom:'5px'}}>
              <TextArea rows={2} style={{width:'175px'}} onChange={this.changeAddInfo.bind(this,'desc')}/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default crmtInfo;
