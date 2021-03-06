import React from 'react';

import { Container, Row, Col, Input, InputGroup, InputGroupText, InputGroupAddon } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { toast } from 'react-toastify';

import { API } from '../api/axiosConf';
import Event from './event';
import FilterEventsSideBar from './FilterEventsSideBar';


export default class SearchingEvents extends React.Component{
    constructor(props) {
      super(props);

      this.state = {
          numberofpages: 2,
          curentpage: 1,
          eventList:[],
          categories__in: '',
          order_by: '-date',
          name__icontains: '',
          loading: true
      };
    }

    changePages = async(index) => {
        await this.setState({curentpage:index})
        await this.getData()
    }

    getData = async() => {
        try {
          let response = await API.post('/events/search', {
               name__icontains: this.state.name__icontains,
               location__icontains: '',
               categories__in: this.state.categories__in,
               order_by: this.state.order_by
         },
         {
             params: {
                 page:this.state.curentpage,
             }
         }
     )
          this.setState({
              numberofpages:response.data.num_of_pages,
              eventList:response.data.data,
              loading: false
          })
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    async componentDidMount () {
        await this.getData();
    }

    changePrevNext = async(param) => {
        await this.setState({curentpage:(this.state.curentpage+param)});
        await this.getData();
    }

    handleCategoriesList = async (value) => {
        await this.setState({categories__in: value, curentpage:1});
        await this.getData();
      }

    handleSortData = async (value) => {
        await this.setState({order_by: value, curentpage:1});
        await this.getData();
      }

    handleSearchData = async (event) => {
        const value = event.target.value;
        await this.setState({
            name__icontains: value,
            curentpage: 1});
        await this.getData();
      }

    render(){
        const pages = []
        for(let i=1; i<=this.state.numberofpages; i++){
             pages.push(
                 <a   href={`#!${i}`}
                      className="cdp_i"
                      key={i+1}
                      onClick={(e) => this.changePages(i)}
                  >
                 {i}</a>
             )
         }

         let visibpag = 'visible';
         if (this.state.numberofpages < 2) {
             visibpag = 'hidden'
         }

    return (
        <div id="SearchingCourses" style={{minHeight:'80vh'}}>
              <FilterEventsSideBar sendCategoriesData={this.handleCategoriesList}
              />
              <div id="page-wrap">
                  <Router>
                      <Container>
                          <div id="wrap">
                              <form action="" autoComplete="on">
                                  <input id="search" 
                                         name="search" 
                                         type="text" 
                                         placeholder="What're you looking for?"
                                         onChange = {(event) => {this.handleSearchData(event)}}
                                  />
                                  <input id="search_submit" value="Rechercher" type="submit"/>
                              </form>
                          </div>
                          <Row>
                              <Col>
                                  <h1 className="title-events">Events</h1>
                              </Col>
                          </Row>
                          <Row className="search-input-group">
                              <Col>
                                  <InputGroup className="search-input">
                                      <InputGroupAddon addonType="prepend">
                                          <InputGroupText className="search-input-icon">
                                              <FontAwesomeIcon icon="sort-amount-up"/>
                                          </InputGroupText>
                                      </InputGroupAddon>
                                      <InputGroupAddon addonType="append" className="search-input-select">
                                          <Input type="select" name="select" id="search-input-select">
                                              <option value="no" selected>Sort by</option>
                                              <option onClick={() => this.handleSortData("date")}>Date by ascending</option>
                                              <option onClick={() => this.handleSortData("-date")}>Date by descending</option>
                                          </Input>
                                      </InputGroupAddon>
                                  </InputGroup>
                              </Col>
                          </Row>
                          <Route
                              path='/events/search:page'
                              render={() => <Event eventList={this.state.eventList} loading={this.state.loading} lg={3}/>}
                          />
                          <Route
                              exact
                              path='/events/search'
                              render={() => <Event eventList={this.state.eventList} loading={this.state.loading} lg={3}/>}
                            />
                          <Row>
                              <Col style={{visibility:visibpag}}>
                                  <div className="content_detail__pagination cdp" actpage={this.state.curentpage}>
                                			<a href="#!-1"
                                                className="cdp_i"
                                                onClick={(e) => this.changePrevNext(-1)}
                                            >Prev</a>
                                                {pages}
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
