import React, {Component} from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import TabOne from "./List/TabOne";

<<<<<<< Updated upstream
import {Card, CardText} from 'material-ui/Card';

=======
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
                   <TabOne key={index} tabDates={element} tabContent={this.props.tabContent} />
=======
                   <div className="detailsListContentTab"><TabOne key={index} tabDates={element} tabContent={this.props.tabContent} contentType={this.props.contentType} /></div>
>>>>>>> Stashed changes
                </div>
            );
        });

        return tabContent;
    }

	render() {
		return (
			<div>
<<<<<<< Updated upstream
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    {this.renderTabs()}
                </Tabs>
                <Card>
                    <CardText>
                        <SwipeableViews
                            index={this.state.slideIndex}
                            onChangeIndex={this.handleChange}
                        >                    
                            {this.renderTabContent()}
                        </SwipeableViews>
                    </CardText>
                </Card>
=======
                <div className="detailsListTabsHeader">
                    <Tabs
                        onChange={this.handleChange}
                        value={this.state.slideIndex}
                    > 
                        {this.renderTabs()}
                        
                    </Tabs>
                </div>

                    <div className="myPanel">
                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.handleChange}
                        >
                        {this.renderTabContent()}
                    </SwipeableViews>
                   </div>
>>>>>>> Stashed changes
			</div>
		);
	}
}

export default DetailList;