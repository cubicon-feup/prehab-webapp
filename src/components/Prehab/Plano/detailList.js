import React, {Component} from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import TabOne from "./List/TabOne";

class DetailList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          slideIndex: 0,
          number_of_weeks: 2,
          tabDates: [],
        };
    }

    handleChange = (value) => {
        this.setState({
          slideIndex: value,
        });
    };

    renderTabs = () => {
        let tabs = [];
        for(var i = 0; i < this.props.number_of_weeks; i++){
            tabs.push(
                <Tab style={{width: '300px'}} label={"Semana "+(i+1)} key={i} value={i} />
            )
        }
        return tabs;
    }

    renderTabContent = () => {
        let tabContent = [];
        this.props.tabDates.forEach((element, index) => {
            tabContent.push( 
                <div key={index} >
                   <div className="detailsListContentTab"><TabOne key={index} tabDates={element} tabContent={this.props.tabContent} contentType={this.props.contentType} /></div>
                </div>
            );
        });

        return tabContent;
    }

	render() {
		return (
			<div>
                <div className="detailsListTabsHeader">

                    <Tabs
                        onChange={this.handleChange}
                        value={this.state.slideIndex}
                    > 
                        {this.renderTabs()}
                        
                    </Tabs>
                </div>
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