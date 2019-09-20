import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Table, Divider, Tag, Row, Col, Button, Input, Icon, message, Modal } from 'antd';
import { cpus } from 'os';

const { confirm } = Modal;

@connect(({ courseInfo }) => ({
  courseInfo,
}))
class studentCourseInfo extends PureComponent {
  constructor(props) {
    super(props);
    //初始化页面数据
    this.state = {
      courseList: [
        {
          courseId: 1,
          courseName: "周五晚六点45（美术）",
          data:[
            {
              left_class: 28,
              studentId: 3,
              student_name: "闫芷汀"
            },
            {
              left_class: 0,
              studentId: 4,
              student_name: "葛允诺"
            },
            {
              left_class: 28,
              studentId: 3,
              student_name: "闫芷汀"
            },
            {
              left_class: 0,
              studentId: 4,
              student_name: "葛允诺"
            },
            {
              left_class: 28,
              studentId: 3,
              student_name: "闫芷汀"
            },
            {
              left_class: 0,
              studentId: 4,
              student_name: "葛允诺"
            }
          ]
        },
        {
          courseId: 1,
          courseName: "周五晚六点45（美术）",
          data:[
            {
              left_class: 28,
              studentId: 3,
              student_name: "闫芷汀"
            },
            {
              left_class: 0,
              studentId: 4,
              student_name: "葛允诺"
            },
            {
              left_class: 28,
              studentId: 3,
              student_name: "闫芷汀"
            },
            {
              left_class: 0,
              studentId: 4,
              student_name: "葛允诺"
            }
          ]
        },
        {
          courseId: 1,
          courseName: "周五晚六点45（美术）",
          data:[
            {
              left_class: 28,
              studentId: 3,
              student_name: "闫芷汀"
            },
            {
              left_class: 0,
              studentId: 4,
              student_name: "葛允诺"
            }
          ]
        },
        {
          courseId: 1,
          courseName: "周五晚六点45（美术）",
          data:[
            {
              left_class: 28,
              studentId: 3,
              student_name: "闫芷汀"
            },
            {
              left_class: 0,
              studentId: 4,
              student_name: "葛允诺"
            },
            {
              left_class: 28,
              studentId: 3,
              student_name: "闫芷汀"
            },
            {
              left_class: 0,
              studentId: 4,
              student_name: "葛允诺"
            },{
              left_class: 28,
              studentId: 3,
              student_name: "闫芷汀"
            },
            {
              left_class: 0,
              studentId: 4,
              student_name: "葛允诺"
            },{
              left_class: 28,
              studentId: 3,
              student_name: "闫芷汀"
            },
            {
              left_class: 0,
              studentId: 4,
              student_name: "葛允诺"
            },{
              left_class: 28,
              studentId: 3,
              student_name: "闫芷汀"
            },
            {
              left_class: 0,
              studentId: 4,
              student_name: "葛允诺"
            }
          ]
        }
      ],
    };
  }

  componentWillMount() {
    this.getCourseList();
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

  changeCourse(type, item) {
    const { dispatch } = this.props;
    confirm({
      title: type == 'minus'?'是否确认扣减课时':'是否确认新增课时',
      onOk() {
        const params = {
          courseId: item.courseId,
          studentId: item.studentId,
        };
        //判断change类型，minus为减0
        if(type == 'minus'){
          params.op = 0
        }else{
          params.op = 1
        }
        dispatch({
          type: 'courseInfo/addClass',
          payload: params,
        }).then(response => {
          const { courseInfo } = this.props;
          const { success } = courseInfo;
          if(success){
            //为true则为成功
            message.success('修改成功')
            this.getCourseList();
          }else{
            message.error('修改失败')
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    
  }

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
        title: 'id',
        dataIndex: 'studentId',
        key: 'studentId',
        width: 50,
      },
      {
        title: '姓名',
        dataIndex: 'student_name',
        key: 'student_name',
      },
      {
        title: '课时',
        key: 'left_class',
        width: 130,
        render: (text, record) => (
          <div>
            <span style={courseBtn} onClick={this.changeCourse.bind(this,'minus', record)}>
              <Icon type="minus" />
            </span>
            <span style={courseBtnText}>{record.left_class}</span>
            {/* <Input disabled value={record.left_class} style={{ width: '50px' }} /> */}
            <span style={courseBtn} onClick={this.changeCourse.bind(this,'plus', record)}>
              <Icon type="plus" />
            </span>
          </div>
        ),
      },
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
        <Card title="课时管理">
          <Row gutter={16}>{courseTable(courseList)}</Row>
        </Card>
      </div>
    );
  }
}

export default studentCourseInfo;
