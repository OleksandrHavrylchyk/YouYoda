import React from 'react';
import Header from '../Components/Header';
import FillEditPage from "../Components/FillEditPage";
import Footer from "../Components/Footer";
// import FillEditPage from "./Components/FillEditPage";

class EditPageProfile extends React.Component{

    render(){
        return(
            <>
            <Header/>
            <FillEditPage/>
            <Footer/>

            </>
        )
    }
}
export default EditPageProfile ;
