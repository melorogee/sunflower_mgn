import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Table, Divider, Tag, Row, Col, Button, Input, Icon, message, Modal,Calendar ,Select} from 'antd';
import { cpus } from 'os';
import moment from 'moment';

const { confirm } = Modal;
const { Option } = Select;

@connect(({ courseInfo }) => ({
  courseInfo,
}))
class studentCourseInfo extends PureComponent {
  showModal (operator,item) {
    

    this.setState({
      visible: true,
      op: operator,
      tempCourseId : item.courseId,
      tempStudentId : item.studentId
    });
  };


  studentClassShow () {
    this.setState({
      studentClassVisible: true,
    
    });
  };


  showDetail(item){

    const { dispatch } = this.props;
    const params = {
      tempCourseId: item.courseId,
      tempStudentId: item.studentId,
    };
    console.log("here")
    console.log(params)
    dispatch({
      type: 'courseInfo/getDetailList',
      payload: params,
    }).then(response => {
      const { courseInfo } = this.props;
      const { detailList } = courseInfo;
      this.setState({
        detailList,
      });
    });


    this.setState({
      detailVisible: true,
      // detailStudentId: item.studentId,
      // detailCourseId: item.courseId,
    });
  }

   handleChange(value) {
      this.setState({
        defaultNum: value,
      });
    }

    classHandleChange(value){
      this.setState({
        tempClass: value,
      });
    }

    studentHandleChange(value){
      this.setState({
        tempStudent: value,
      });
    }


  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  studentClassHandleCancel= () => {
    this.setState({
      studentClassVisible: false,
    });
  };

  
  detailHandleCancel = () => {
    this.setState({
      detailVisible: false,
    });
  };

  detailHandleOk = () => {
    this.setState({
      detailVisible: false,
    });
  };

  constructor(props) {
    super(props);
    //初始化页面数据
    var  date = moment().format('YYYYMMDD');

    this.state = {
      studentClassVisible :false,
      detailVisible :false,
      visible: false,
      op:"",
      nowDate:date,
      tempCourseId:"",
      tempStudentId:"",
      defaultNum:1,
      detailStudentId:"",
      detailCourseId:"",
      courseList: [
        // {
        //   courseId: 1,
        //   courseName: "周五晚六点45（美术）",
        //   data:[
        //     {
        //       left_class: 28,
        //       studentId: 3,
        //       student_name: "闫芷汀",
        //       courseId: 1
        //     }
        //   ]
        // } 
      ],

      detailList: [
        
            // {
            //   course_name: "美术1",
            //   date_time: "20190909",
            //   student_name: "闫芷汀",
            //   num: "-1"
            // },
            // {
            //   course_name: "美术1",
            //   date_time: "20190910",
            //   student_name: "闫芷汀",
            //   num: "-1"
            // }
         
      ],

      classList: [
        <Option value="">请选择班级</Option>,
          <Option value="1">测试班级</Option>
      ],

      studentList: [
        <Option value="">请选择学生</Option>,
        <Option value="1">测试学生</Option>
      ],
      studentClassNum : "",
      tempClass:"",
      tempStudent:""

    };
  }

  componentWillMount() {
    this.getCourseList();
    this.getClassList();
    this.getStudentList();
  }


  getClassList(){
    const { dispatch } = this.props;
    const params = {};
    dispatch({
      type: 'courseInfo/getClassListLite',
      payload: params,
    }).then(response => {
      const { courseInfo } = this.props;

      const { classList } = courseInfo;

      this.setState({
        classList,
      });
    });
  }

  getStudentList(){
    const { dispatch } = this.props;
    const params = {};
    dispatch({
      type: 'courseInfo/getStudentListLite',
      payload: params,
    }).then(response => {
      const { courseInfo } = this.props;

      const { studentList } = courseInfo;

      this.setState({
        studentList,
      });
    });
  }

  getCourseList() {
    const { dispatch } = this.props;
    const params = {};
    dispatch({
      type: 'courseInfo/getStudentCourse',
      payload: params,
    }).then(response => {
      const { courseInfo } = this.props;
      console.log(courseInfo);

      const { courseList } = courseInfo;

      console.log(courseList);
      this.setState({
        courseList,
      });
    });
  }

  onPanelChange(value, mode) {
    this.setState({
      nowDate: value,
    });
  }


   //变更input数据
   changeText(type,e){
      this.setState({
        studentClassNum:  event.target.value
      });
  }
  
  studentClassHandleOk(){
    const { dispatch } = this.props;

    // console.log(this.state.tempStudent)
    // console.log(this.state.tempClass)
    // console.log(this.state.studentClassNum)

    if(this.state.tempStudent == "" || this.state.tempClass=="" || this.state.studentClassNum==""){
      message.error('请正确选择学生，班级 和填入课时')
    }else{
    const params = {
      nowDate: moment().format('YYYYMMDD'),
      studentId: this.state.tempStudent,
      classId: this.state.tempClass,
      num: this.state.studentClassNum,
      };
      dispatch({
        type: 'courseInfo/addStudentClass',
        payload: params,
      }).then(response => {
        const { courseInfo } = this.props;
        const { success } = courseInfo;
        this.setState({
          studentClassVisible: false,
          tempStudent :"",
          tempClass :"",
          studentClassNum :""
        });
        if(success){
          //为true则为成功
          message.success('保存成功')
          this.getCourseList();
        }else{
          message.error('保存失败')
        }
      });
    }
  }
  
  handleOk(){
    const { dispatch } = this.props;

    console.log(moment( this.state.nowDate).format('YYYYMMDD'))
    console.log(this.state.op)
    console.log(this.state.tempCourseId)
    console.log(this.state.tempStudentId)
    console.log(this.state.defaultNum)
    const params = {
      nowDate: moment( this.state.nowDate).format('YYYYMMDD'),
      op: this.state.op,
      tempCourseId: this.state.tempCourseId,
      tempStudentId: this.state.tempStudentId,
      defaultNum: this.state.defaultNum,
    };
    dispatch({
      type: 'courseInfo/addClass',
      payload: params,
    }).then(response => {
      const { courseInfo } = this.props;
      const { success } = courseInfo;
      this.setState({
        visible: false,
      });
      if(success){
        //为true则为成功
        message.success('修改成功')
        this.getCourseList();
      }else{
        message.error('修改失败')
      }
    });

  }

  onSelect = value => {
    this.setState({
      nowDate: value
    });
  };

  // changeCourse(type, item) {
  //   const { dispatch } = this.props;
  //   confirm({
  //     title: type == 'minus'?'是否确认扣减课时':'是否确认新增课时',
  //     onOk() {
  //       const params = {
  //         courseId: item.courseId,
  //         studentId: item.studentId,
  //       };
  //       //判断change类型，minus为减0
  //       if(type == 'minus'){
  //         params.op = 0
  //       }else{
  //         params.op = 1
  //       }
  //       dispatch({
  //         type: 'courseInfo/addClass',
  //         payload: params,
  //       }).then(response => {
  //         const { courseInfo } = this.props;
  //         const { success } = courseInfo;
  //         if(success){
  //           //为true则为成功
  //           message.success('修改成功')
  //           this.getCourseList();
  //         }else{
  //           message.error('修改失败')
  //         }
  //       });
  //     },
  //     onCancel() {
  //       console.log('Cancel');
  //     },
  //   });
    
  // }

  render() {
    
    //从状态存储器里取出值
    const { courseList } = this.state;
    //定义表格表头
    const courseBtn = {
      height: "24px",
      padding: "0 7px",
      fontSize: "14px",
      borderRadius: "4px",
      display:'inline-block',
      cursor:'pointer',

    }
    const courseBtnText = {
      height: "24px",
      padding: "0 7px",
      fontSize: "14px",
      borderRadius: "4px",
      width:"40px",
      display:'inline-block',
      border:"1px solid #e8e8e8"
    }
    const courseColumns = [
      {
        title: '学生id',
        dataIndex: 'studentId',
        key: 'studentId',
        width: 60,
      },
      {
        title: '班级id',
        dataIndex: 'courseId',
        key: 'courseId',
        width: 60,
      },
      {
        title: '姓名',
        dataIndex: 'student_name',
        key: 'student_name',
        render: (text, record) => (
          <div>
            <a  onClick={this.showDetail.bind(this,record)} >{record.student_name}</a>
          </div>
        ),
      },
      {
        title: '课时',
        key: 'left_class',
        width: 140,
        render: (text, record) => (
          <div>
            {/* <span style={courseBtn} onClick={this.changeCourse.bind(this,'minus', record)}>
              <Icon type="minus" />
            </span> */}

            <span style={courseBtn} onClick={this.showModal.bind(this,'minus',record)}>
              <Icon type="minus" />
            </span>
            <span style={courseBtnText}>{record.left_class}</span>
            {/* <Input disabled value={record.left_class} style={{ width: '50px' }} /> */}
            <span style={courseBtn} onClick={this.showModal.bind(this,'plus',record)}>
              <Icon type="plus" />
            </span>
          </div>
        ),
      },
    ];



    const detailColumns = [
      {
        title: '课程',
        dataIndex: 'course_name',
        key: 'course_name',
        width: 80,
      },
      {
        title: '姓名',
        dataIndex: 'student_name',
        key: 'student_name',
        width: 50,
      },
      {
        title: '日期',
        dataIndex: 'date_time',
        key: 'date_time',
        width: 50,
      },
      {
        title: '数量',
        dataIndex: 'num',
        key: 'num',
        width: 50,
      }
    ];

    const courseTable = courseList =>
      courseList.map((item, index) => {
        return (
          <Col span={8} style={{ marginBottom: '16px',height:"450px",overflow:'scroll',borderBottom:'1px dashed #e8e8e8' }}>
            <Table
              size="small"
              title={() => item.courseName}
              columns={courseColumns}
              dataSource={item.data}
              pagination={false}
              scroll={{ y: 350 }}
            />
          </Col>
        );
      });

    return (
      <div>
        <Card title="课时管理" extra={<a  onClick={this.studentClassShow.bind(this)}>新增学生排课</a>}>
          <Row gutter={16}>{courseTable(courseList)}</Row>
        </Card>

          
  
        <Modal
            visible={this.state.visible}
            onOk={this.handleOk.bind(this)}
            onCancel={this.handleCancel}
            destroyOnClose
            >
            <div style={{width:500,border:'1px soild #d9d9d9', borderRadius:4}}>
              <Select defaultValue="1" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                <Option value="1">1课时</Option>
                <Option value="10">10课时</Option>
                <Option value="15">15课时</Option>
                <Option value="20">20课时</Option>
                <Option value="25">25课时</Option>
                <Option value="30">30课时</Option>
                <Option value="35">35课时</Option>
                <Option value="40">40课时</Option>
             </Select>
              <Calendar fullscreen={false} onPanelChange={this.onPanelChange}     onSelect={this.onSelect}/>
            </div>

        </Modal>


        <Modal
            visible={this.state.detailVisible}
            onOk={this.detailHandleOk.bind(this)}
            onCancel={this.detailHandleCancel}
            destroyOnClose
            bodyStyle={{height:500,overflow:scroll}}
            >
            <Table dataSource={this.state.detailList} columns={detailColumns} 
                  pagination={false}  scroll={{ y: 400 }}
              />
        </Modal>

        <Modal
            visible={this.state.studentClassVisible}
            onOk={this.studentClassHandleOk.bind(this)}
            onCancel={this.studentClassHandleCancel}
            destroyOnClose
            width={700}
            >
            <div style={{width:'700px',border:'1px soild #d9d9d9', borderRadius:4}}>
              <Select defaultValue="" style={{ width: '40%' ,marginRight:'10px'}} onChange={this.classHandleChange.bind(this)} >
                {this.state.classList}
               </Select>
             <Select defaultValue="" style={{ width: '20%' ,marginRight:'10px'}} onChange={this.studentHandleChange.bind(this)} >
                {this.state.studentList}
             </Select>
             <Input placeholder="课时" 
                value={this.state.studentClassNum}   
              onChange={this.changeText.bind(this)}
              style={{width:'20%',marginLeft:'10px'}}
            />
            </div>

        </Modal>
      </div>

    );
  }
}

export default studentCourseInfo;
