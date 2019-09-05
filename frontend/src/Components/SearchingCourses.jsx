import React from 'react';

import { Container, Row, Col, Form, Input, Button, InputGroup, InputGroupText, InputGroupAddon } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FilterSideBar from './FilterSideBar';
import { toast } from 'react-toastify';

import { API } from '../api/axiosConf';
import Cours from './cours';
import '../api/pagination';


export default class SearchingCourses extends React.Component{
    constructor(props) {
      super(props);

      this.state = {
        numberofpages: 0,
        curentpage: 1,
        coursesList:[]
      };
    }


    changePages = async(index) => {
        await this.setState({curentpage:index})
        await this.getData()
    }

    getData = async() => {
        try {
          let response = await API.get('/courses/search', {
            params: {
                pagenumber:this.state.curentpage,
                coursename: 'cour',
            }
          })

          this.setState({
              numberofpages:response.data.num_of_pages,
              coursesList:response.data.data
          })
          toast.success("after" + this.state.curentpage)
        }
        catch (error) {
          toast.error(error.message)
        }
    }

    async componentDidMount () {
        await this.getData()
    }

    changePrevNext = async(param) => {
        await this.setState({curentpage:(this.state.curentpage+param)})
        await this.getData()
    }

  render(){
      const PAGES = []
      for(let i=1; i<=this.state.numberofpages; i++){
           PAGES.push(
               <a   href={`#!${i}`}
                    className="cdp_i"
                    key={i+1}
                    onClick={() => this.changePages(i)}
                >
               {i}</a>
           )
       }

    return (
        <div id="SearchingCourses">
            <FilterSideBar />
            <div id="page-wrap">
                <Router>
                    <Container>
                        <Row>
                            <Col>
                                <h1 className="title-events">Courses</h1>
                            </Col>
                        </Row>
                        <Row className="search-input-group">
                            <Col>
                                <InputGroup className="search-input">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className="search-input-icon">
                                            <FontAwesomeIcon icon="search"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                        {/*<Input placeholder="Search by trainer, events, tag" />*/}
                                    <InputGroupAddon addonType="append" className="search-input-select">
                                        <Input type="select" name="select" id="search-input-select">
                                            <option value="" selected>Sort by</option>
                                            <option>Duration</option>
                                            <option>Start date</option>
                                            <option>Cost</option>
                                            <option>Rate</option>
                                        </Input>
                                    </InputGroupAddon>              
                                </InputGroup>
                            </Col>
                                {/*<Col xs="8" md="4">
                                    <Button color="warning" className="btn-search-events">
                                        <span className="btn-search-events-title">SEARCH</span>
                                    </Button>  
                                </Col>*/}
                        </Row> 
                        <Route
                            path='/courses/search:page'
                            render={() => <Cours coursesList={this.state.coursesList}/>}
                        />
                        <Route
                            exact
                            path='/courses/search'
                            render={() => <Cours coursesList={this.state.coursesList}/>}
                        />
                        <Row>
                            <Col>
                                <div className="content_detail__pagination cdp" actpage="1">
                                    <a href="#!-1"
                                        className="cdp_i"
                                        onClick={(e) => this.changePrevNext(-1)}
                                        >Prev</a>
                                        {PAGES}
                                    <a href="#!+1"
                                        className="cdp_i"
                                        onClick={(e) => this.changePrevNext(1)}
                                        >Next</a>
                                </div>
                            </Col>
                        </Row>
                    </Container>  
                </Router>
            </div>
        </div>
   )
  }
};


        
     
