import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Table, Divider, Tag } from 'antd';

@connect(({ studentInfo }) => ({
  studentInfo,
}))
class studentInfo extends PureComponent {
  constructor(props) {
    super(props);
    //初始化页面数据
    this.state = {
      studentList: [],
    };
  }

  componentWillMount() {
    this.getStudentList();
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
          <Table
            size="small"
            columns={studentColumns}
            dataSource={studentList}
            pagination={false}
            scroll={{ y: 1200 }}
          />
        </Card>
      </div>
    );
  }
}

export default studentInfo;
