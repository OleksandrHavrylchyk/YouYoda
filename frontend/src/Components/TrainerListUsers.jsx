import React from 'react';

import {Row, Col, Table} from "reactstrap";

import { API } from '../api/axiosConf';


export default class TrainerListUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: [],
            id_course: this.props.course,
        };
    }

    componentWillMount = () => {
        this.getListUsers();
      }

    getListUsers = async() => {
        try {
            let response = await API.get('course/list/users',
                {
                    params: {
                        course_id: this.state.id_course,
                }
            }
        )
            this.setState({
                 dataList: response.data.map(
                  item => {
                  item.first_name = item.participant.first_name;
                  item.last_name = item.participant.last_name;
                  item.username = item.participant.username;
                  item.email = item.participant.email;
                return item
              }
            ),
            })
        } catch (error) {
        }
    }

    renderUsers(user, i) {
        return (
            <tr >
                <th scope="row">{i+1}</th>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.username}</td>
            </tr>
        )
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <h4 className='title-table-list-subscribers'>Subscribers to your course</h4>
                    </Col>
                </Row>
                <Row >
                    <Col>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.dataList.map( (user, index) => this.renderUsers(user, index) )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }
}
