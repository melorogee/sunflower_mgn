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
    });
  }
  render() {
    //从状态存储器里取出值
    const { studentList } = this.state;
    //定义表格表头
    const studentColumns = [
      {
        title: '学生id',
        dataIndex: 'student_id',
        key: 'student_id',
      },
      {
        title: '学生姓名',
        dataIndex: 'student_name',
        key: 'student_name',
      },
      {
        title: '小名',
        dataIndex: 'student_nick_name',
        key: 'student_nick_name',
      },
      {
        title: '班级',
        dataIndex: 'school_class',
        key: 'school_class',
      },
      {
        title: '生日',
        dataIndex: 'birth_day',
        key: 'birth_day',
      },
      {
        title: '年龄',
        dataIndex: 'age_now',
        key: 'age_now',
      },
      {
        title: '家长1姓名',
        dataIndex: 'parent_name_1',
        key: 'parent_name_1',
      },
      {
        title: '家长1电话',
        dataIndex: 'parent_phone_1',
        key: 'parent_phone_1',
      },
      {
        title: '家长2姓名',
        dataIndex: 'parent_name_2',
        key: 'parent_name_2',
      },
      {
        title: '家长2电话',
        dataIndex: 'parent_phone_2',
        key: 'parent_phone_2',
      },
      {
        title: '学生性格',
        dataIndex: 'student_desc',
        key: 'student_desc',
      },
      {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '报名渠道',
        dataIndex: 'channel',
        key: 'channel',
      },
      {
        title: '报名时间',
        dataIndex: 'join_time',
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
          />
        </Card>
      </div>
    );
  }
}

export default studentInfo;
