import React, {Component} from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import {ObjectLength} from "../../../../utils/helper";


class TabOne extends Component {

    constructor(props) {
        super(props);
        this.state = {
          slideIndex: 0,
          tabDates: [],
          tabContent: undefined
          
        };
    }

    componentWillReceiveProps(nextProps, oldProps){

        if(nextProps.tabDates === undefined)
            return;
        let new_state = Object.assign({}, this.state); 
        let a = new_state.tabDates;
        nextProps.tabDates.forEach((element, index) => {
            a[index] = element;
        });
        this.setState(
            {tabDates: a, tabContent: nextProps.tabContent}            
        );

        console.log(this.state);
        console.log(ObjectLength(nextProps.tabContent));
    }

    handleChange = (value) => {
        this.setState({
          slideIndex: value,
        });
    };

    renderTabs = () => {
        let tabs = [];
        this.state.tabDates.forEach((element, index) => {
            tabs.push(<Tab label={this.state.tabDates[index]} key={index} value={index} />)
        });

        return tabs;
    }

    renderTabsContent = () => {
        let content = [];

        if(this.state.tabContent === undefined){
            console.log("Shit");
            return;
        }
            
        else
            console.log("Damm");

       /* this.state.tabContent.forEach((element, index) => {
            content.push( 
                <div className="row">
                    <div className="col-md-12"> 
                        {element.task_type}
                    </div> 
                    <div className="col-md-12"> 
                        {element.description}
                    </div> 
                </div>
                )
        });*/

        Object.entries(this.state.tabContent).forEach(([key, value]) => {
            value.forEach(element => {
                //console.log(element);
                content.push( 
                    <div className="row" style={{overflow: 'hidden'}}>
                        <div className="col-md-10" style={{overflow: 'hidden'}}> 
                            {element.task_type}
                        </div> 
                        <div className="col-md-4" style={{overflow: 'hidden'}}> 
                            {element.description}
                        </div> 
                        <div className="col-md-6" style={{overflow: 'hidden'}}> 
                            {element.status}
                        </div> 
                    </div>
                    )
            });
        });

        return content;
    }

	render() {
		return (
			<div style={{marginTop: '30px'}}>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    {this.renderTabs()}
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                    style={{overflow: 'hidden'}}
                >
                    {this.renderTabsContent()}
                </SwipeableViews>
			</div>
		);
	}
}

export default TabOne;