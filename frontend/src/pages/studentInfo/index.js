import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Table, Divider, Tag,Button,Modal,Input,message } from 'antd';
import $ from 'jquery';
@connect(({ studentInfo }) => ({
  studentInfo,
}))
class studentInfo extends PureComponent {
  constructor(props) {
    super(props);
    //初始化页面数据
    this.state = {
      studentList: [],
      visible: false,
      studentNo : "",
      studentName:"",
      nickName:"",
      grade:"",
      birthDay:"",
      age:"",
      parentName:"",
      parentPhone:"",
      studentDesc:"",
      desc:"",
      channel:"",
      time:""
    };
  }

  componentWillMount() {
    this.getStudentList();
  }


  //点击弹框取消
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  //点击确定提交学生信息
  handleOk(){
    this.setState({
      visible: false,
    });
    //打印参数
    // console.log(this.state.studentNo)
    // console.log(this.state.studentName)
    // console.log(this.state.nickName)
    // console.log(this.state.grade)
    // console.log(this.state.birthDay)
    // console.log(this.state.age)
    // console.log(this.state.parentName)
    // console.log(this.state.parentPhone)
    // console.log(this.state.studentDesc)
    // console.log(this.state.desc)
    // console.log(this.state.channel)
    // console.log(this.state.time)

    const { dispatch } = this.props;
    const params = {
      studentNo: this.state.studentNo,
      studentName: this.state.studentName,
      nickName: this.state.nickName,
      grade: this.state.grade,
      birthDay: this.state.birthDay,
      age: this.state.age,
      parentName: this.state.parentName,
      parentPhone: this.state.parentPhone,
      studentDesc: this.state.studentDesc,
      desc: this.state.desc,
      channel: this.state.channel,
      time: this.state.time,
    };

    dispatch({
      type: 'studentInfo/addStudent',
      payload: params,
    }).then(response => {
      const { studentInfo } = this.props;
      const { success } = studentInfo;
      this.setState({
        visible: false,
      });
      if(success){
        //为true则为成功
        message.success('保存成功')
        this.getStudentList();
        this.clearConfirm().bind(this)
      }else{
        message.error('保存失败')
      }
    });

  }

  clearConfirm(){
    this.setState({
      studentNo: "",
      studentName: "",
      nickName: "",
      grade: "",
      birthDay: "",
      age: "",
      parentName: "",
      parentPhone: "",
      studentDesc: "",
      desc: "",
      channel: "",
      time: "",
    });
  }
  //打开新增框
  showModal () {
    this.setState({
      visible: true
    });
  };
  //变更input数据
  changeText(type,e){
    if(type == 'studentNo'){
      this.setState({
        studentNo:  event.target.value
      });
    }

    if(type == 'studentName'){
      this.setState({
        studentName:  event.target.value
      });
    }

    if(type == 'nickName'){
      this.setState({
        nickName:  event.target.value
      });
    }

    if(type == 'grade'){
      this.setState({
        grade:  event.target.value
      });
    }
    
    if(type == 'birthDay'){
      this.setState({
        birthDay:  event.target.value
      });
    }

    if(type == 'age'){
      this.setState({
        age:  event.target.value
      });
    }

    if(type == 'parentName'){
      this.setState({
        parentName:  event.target.value
      });
    }
    
    if(type == 'parentPhone'){
      this.setState({
        parentPhone:  event.target.value
      });
    }
    
    if(type == 'studentDesc'){
      this.setState({
        studentDesc:  event.target.value
      });
    }

    if(type == 'desc'){
      this.setState({
        desc:  event.target.value
      });
    }

    if(type == 'channel'){
      this.setState({
        channel:  event.target.value
      });
    }

    if(type == 'time'){
      this.setState({
        time:  event.target.value
      });
    }
  }

  

  getStudentList() {
    const { dispatch } = this.props;
    const params = {};
    dispatch({
      type: 'studentInfo/getStudentList',
      payload: params,
    }).then(response => {
      // this.setState({
      //     loading: false
      // })
      const { studentInfo } = this.props;
      const { studentList } = studentInfo;
      this.setState({
        studentList,
      });
    });
  }
  render() {
    //从状态存储器里取出值
    const { studentList } = this.state;

    const tableHeight = $(window).height()-280
    //定义表格表头
    const studentColumns = [
      {
        title: 'id',
        dataIndex: 'student_Id',
        width: 50,
        key: 'student_Id',
      },
      {
        title: '姓名',
        dataIndex: 'student_name',
        width: 120,
        key: 'student_name',
      },
      {
        title: '小名',
        dataIndex: 'student_nick_name',
        width: 120,
        key: 'student_nick_name',
      },
      {
        title: '班级',
        dataIndex: 'school_class',
        width: 120,
        key: 'school_class',
      },
      {
        title: '生日',
        dataIndex: 'birth_day',
        width: 120,
        key: 'birth_day',
      },
      {
        title: '年龄',
        dataIndex: 'age_now',
        width: 120,
        key: 'age_now',
      },
      {
        title: '家长',
        dataIndex: 'parent_name_1',
        width: 120,
        key: 'parent_name_1',
      },
      {
        title: '家长电话',
        dataIndex: 'parent_phone_1',
        width: 200,
        key: 'parent_phone_1',
      },

      {
        title: '学生性格',
        dataIndex: 'student_desc',
        width: 120,
        key: 'student_desc',
      },
      {
        title: '描述',
        dataIndex: 'desc',
        width: 200,
        key: 'desc',
      },
      {
        title: '报名渠道',
        dataIndex: 'channel',
        width: 120,
        key: 'channel',
      },
      {
        title: '报名时间',
        dataIndex: 'join_time',
        width: 120,
        key: 'join_time',
      },
    ];

    return (
      <div>

        <Card title="学生信息">
        <div style={{ marginBottom: '15px' }}>
          <Button type="primary" onClick={this.showModal.bind(this)} 
          >新增学生</Button>
        </div>
          <Table
            size="small"
            columns={studentColumns}
            dataSource={studentList}
            pagination={false}
            scroll={{y: tableHeight}}        
              />
        </Card>

        <Modal
        visible={this.state.visible}
        onOk={this.handleOk.bind(this)}
        onCancel={this.handleCancel}
        destroyOnClose
        bodyStyle={{height:'500px',overflow:'scroll'}}
        >
         <Card title="新增学生信息">
            <Input placeholder="学号" value={this.state.studentNo}   
             onChange={this.changeText.bind(this,"studentNo")}
             style={{marginBottom:'10px'}}
            />
            <Input placeholder="姓名" value={this.state.studentName}   
             onChange={this.changeText.bind(this,"studentName")}
             style={{marginBottom:'10px'}}
            />
            <Input placeholder="昵称" value={this.state.nickName}   
             onChange={this.changeText.bind(this,"nickName")}
             style={{marginBottom:'10px'}}
            />
            <Input placeholder="年级" value={this.state.grade}   
             onChange={this.changeText.bind(this,"grade")}
             style={{marginBottom:'10px'}}
            />
            <Input placeholder="生日yyyyMMDD" value={this.state.birthDay}   
             onChange={this.changeText.bind(this,"birthDay")}
             style={{marginBottom:'10px'}}
            />
            <Input placeholder="年龄" value={this.state.age}   
             onChange={this.changeText.bind(this,"age")}
             style={{marginBottom:'10px'}}
            />
             <Input placeholder="家长" value={this.state.parentName}   
             onChange={this.changeText.bind(this,"parentName")}
             style={{marginBottom:'10px'}}
            />
            <Input placeholder="家长电话" value={this.state.parentPhone}   
             onChange={this.changeText.bind(this,"parentPhone")}
             style={{marginBottom:'10px'}}
            />
             <Input placeholder="性格" value={this.state.studentDesc}   
             onChange={this.changeText.bind(this,"studentDesc")}
             style={{marginBottom:'10px'}}
            />
             <Input placeholder="描述" value={this.state.desc}   
             onChange={this.changeText.bind(this,"desc")}
             style={{marginBottom:'10px'}}
            />
             <Input placeholder="渠道" value={this.state.channel}   
             onChange={this.changeText.bind(this,"channel")}
             style={{marginBottom:'10px'}}
            />
             <Input placeholder="加入时间yyyyMMDD" value={this.state.time}   
             onChange={this.changeText.bind(this,"time")}
             style={{marginBottom:'10px'}}
            />
         </Card>
        </Modal>
      </div>

       
    );
  }
}

export default studentInfo;
