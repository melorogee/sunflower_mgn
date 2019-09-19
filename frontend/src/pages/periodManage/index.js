import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Table, Divider, Tag, Row, Col, Button, Input, Icon } from 'antd';
import { cpus } from 'os';

@connect(({ courseInfo }) => ({
  courseInfo,
}))
class studentCourseInfo extends PureComponent {
  constructor(props) {
    super(props);
    //初始化页面数据
    this.state = {
      courseList: [],
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

  changeCourse(type, item) {}

  render() {
    //从状态存储器里取出值
    const { courseList } = this.state;
    //定义表格表头
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
        width: 180,
        render: (text, record) => (
          <div>
            <Button>
              <Icon type="minus" onClick={this.changeCourse('minus', record)} />
            </Button>
            <Input value={record.left_class} style={{ width: '50px' }} />
            <Button>
              <Icon type="plus" onClick={this.changeCourse('plus', record)} />
            </Button>
          </div>
        ),
      },
    ];

    const courseTable = courseList =>
      courseList.map((item, index) => {
        return (
          <Col span={12} style={{ marginBottom: '16px', height: '620px' }}>
            <Table
              size="small"
              title={() => item.courseName}
              columns={courseColumns}
              dataSource={item.data}
              pagination={false}
              scroll={{ y: 520 }}
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
