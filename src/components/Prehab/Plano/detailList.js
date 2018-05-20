import React, {Component} from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import TabOne from "./List/TabOne";



class DetailList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          slideIndex: 0,
          number_of_weeks: 1,
          tabDates: [],
        };
    }

    handleChange = (value) => {
        this.setState({
          slideIndex: value,
        });
    };

    componentWillReceiveProps(nextProps, oldProps){
        //console.log(nextProps);
        this.setState({
            number_of_weeks: nextProps.number_of_weeks,
            tabDates: nextProps.tabDates
        });
    }

    renderTabs = () => {
        let tabs = [];
        for(var i = 0; i < this.state.number_of_weeks; i++){
            tabs.push(<Tab style={{Width: '300'}} inkBarStyle={{width: '50'}} label={"Semana "+(i+1)} key={i} value={i} />)
        }
        return tabs;
    }

    renderTabContent = () => {
        let tabContent = [];
        for(var i = 0; i < this.state.number_of_weeks; i++){
            tabContent.push( 
                <div key={i} >
                   <TabOne tabDates={this.state.tabDates[i] }  tabContent={this.props.tabContent} />
                </div>
            );
        }
        return tabContent;
    }



	render() {
		return (
			<div>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    {this.renderTabs()}
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >                    
                    {this.renderTabContent()}
                </SwipeableViews>
			</div>
		);
	}
}

export default DetailList;