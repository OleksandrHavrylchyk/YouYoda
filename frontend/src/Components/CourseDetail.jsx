import React from 'react';

import Calendar from '@lls/react-light-calendar'
import { Container,Row,Button,Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { Redirect, Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import { toast } from 'react-toastify';

import { API } from '../api/axiosConf';
import { CommentList, CommentForm } from './CommentList';
import { defaultPhoto, isAuthenticated } from '../utils';

export default class CourseDetail extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          comments: [],
          loading: true
      };
    }
    getCommnts = async() => {
        try {
            let response = await API.get('/courses/comments',
                {
                    params: {
                        course_id: this.props.course.id,
                }
            }
        )

            this.setState({
                comments: response.data,
                loading: false
            })
        } catch (error) {
            toast.error(error.message)
        }
    }
    componentWillMount = async() => {
        await this.getCommnts();
      }

    addComment = async() => {
        await this.getCommnts()
    }
    subscribeCourse = () => {
        if(localStorage.getItem('token') == null){
            toast.info('You must Sign Up or Sign In for subscribes course')

        } else {

        }
    }
    render(){
        let defImg = "/media/car-racing-4394450_1920.jpg";
        let coverImg = defaultPhoto(defImg, this.props.course.cover_url);
        let courseDate = this.props.course.start_date;
        let newCourseDate = moment(courseDate).format('Do MM, h:mm a');
        let courseDuration = this.props.course.duration;
        let newCourseDuration = moment.duration(courseDuration).days();
        let date = new Date(courseDate);
        let startDate = date.getTime()
        let endDate = new Date(startDate).setDate(date.getDate() + newCourseDuration)
        let statuscolor;
        if(this.props.course.status == "Open"){
            statuscolor = "#54DB63"
        } else if (this.props.course.status == "Closed") {
            statuscolor = "#FC5252"
        } else {
            statuscolor = "#ffce54"
        }
        return(

            <div className="home-event ">
                <div className='cd-header'>
                <div className="d-flex justify-content-between flex-wrap container">
                    <h1 className="course-det-header">
                        {this.props.course.coursename}
                        <span className="course-detail-status" style={{color:statuscolor}}>
                            {this.props.course.status}
                        </span>
                    </h1>
                    <div className="main-text star d-flex">
                        <StarRatingComponent starCount={10} className="course-star-rating"
                                             value={this.props.course.rate} />
                        <div className="rate-num">
                            <span className="rate-big">{this.props.course.rate}/</span>
                            <span className="rate-small">10</span>
                        </div>
                    </div>
                </div>
                </div>
                <div >
                    <div style={{
                            minHeight: '510px',
                            backgroundImage: `url(${coverImg})`,
                            backgroundColor: '#000',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            minWidth:'98vw',
                            height: "94vh",
                            width: '100%'
                        }}
                         alt={this.props.course.coursename}></div>

                    <div className="cd-info-block">
                        <Container className="d-flex flex-wrap">
                        <div className="cd cd-trainer">
                            <i className="fas fa-user-tie"/>
                            <span className="main-text">
                            <Link to="" style={{color:"#fff"}}>
                            {this.props.course.owner}</Link></span>
                        </div>
                        <div className="cd cd-cost">
                            <i class="fas fa-dollar-sign"></i>
                            <span className="main-text">
                                {this.props.course.cost}</span>
                        </div>
                        <div className="cd cd-loc">
                            <i class="fas fa-map-marker-alt"></i>
                            <span className="main-text cd-loc">
                                {this.props.course.location}</span>
                        </div>
                        <div className="cd cd-date">
                            <i class="far fa-calendar-alt"></i>

                            <span className="main-text cd-date">
                                {newCourseDate}</span>
                        </div>
                        </Container>
                    </div>
                </div>

            <Container>
            <Row>
                <Col md="6" xs="12" className="course-detail-first-col">
                    <h4 className="course-detail-h4">About:</h4>
                    <p className="main-text">{this.props.course.description}</p>
                    <p className="main-text cd-limit" ><span className="main-text-span">Limit of members: </span> {this.props.course.members_limit}</p>

                    <p className="main-text"><span className="main-text-span">Category: </span><Link to="" style={{color:"#000"}}>{this.props.course.categories}</Link></p>
                    <p className="main-text">Duration: {newCourseDuration} days </p>
                </Col>
                <Col md="6" xs="12" className="course-detail-second-col">
                    <Calendar startDate={startDate} endDate={endDate} />
                </Col>
            </Row>
            <Row className="btn-group-course-detail d-flex justify-content-between">    
               
                    <Col>
                        <Button
                            className='btn-sign'
                            color="warning"
                            style={{margin:'0 33px 10px 33px'}}
                            onClick={this.subscribeCourse}
                        >Join</Button>
                    </Col>
                    <Col>
                        <Link to="/"><Button color="secondary" className="btn-sign" style={{margin:'0 33px 10px 33px'}}>Cancel</Button></Link>
                    </Col>
                
            </Row>
            <Row style={{marginTop:'100px'}}>
              <Col md="4"  className = {`pt-3 border-right ${isAuthenticated("show")}`}>
                <h6>Say something about this course</h6>
                    <CommentForm
                        addComment = {this.addComment}
                        course = {this.props.course.id}
                        comments = {this.state.comments}
                    />
              </Col>
              <Col className = "pt-3 bg-white">
                  <CommentList
                     comments = {this.state.comments}
                     loading = {this.state.loading}
                    />
              </Col>
            </Row>


                
            
            </Container>
            </div>
        
        )
    }
};
