import React, {Component} from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import "../../../../styles/prehabInfo_style.css";


class TabOne extends Component {

    constructor(props) {
        super(props);
        this.state = {
          slideIndex: 0,
          tabDates: [],
          tabContent: undefined
          
        };
    }
    
    componentWillReceiveProps(){
        if(this.props.tabDates === undefined)
            return;
        let new_state = Object.assign({}, this.state); 
        let a = new_state.tabDates;
        this.props.tabDates.forEach((element, index) => {
            a[index] = element;
        });
        this.setState(
            {tabDates: a, tabContent: this.props.tabContent}            
        );


    }

    handleChange = (value) => {
        this.setState({
          slideIndex: value,
        });
    };

    renderTabs = () => {
        let tabs = [];
        this.props.tabDates.forEach((element, index) => {
            tabs.push(<Tab label={this.props.tabDates[index]} key={index} value={index} />)
        });

        return tabs;
    }

    renderTabsContent = () => {
        let content = [];

        if(this.props.tabContent === undefined){
            return;
        }
        this.props.tabDates.forEach( (date, index) => {    
            content.push( 
                <div key={index}>
                    { this.props.tabContent[date].map( (task, index) => (
                        <div className="row tabContent" key={index} >
                            <div className="col-md-12"  > 
                            <p>{task.title} ({task.task_type})</p>
                            </div> 
                            <div className="col-md-6"  > 
                                < p>{task.description}</ p>
                            </div> 
                            <div className="col-md-3"  > 
                                < p>Estado:{task.status}</p>
                            </div> 
                        </div>
                    ))}
                </div>
                )
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
                    
                >
                    {this.renderTabsContent()}
                </SwipeableViews>
			</div>
		);
	}
}

export default TabOne;