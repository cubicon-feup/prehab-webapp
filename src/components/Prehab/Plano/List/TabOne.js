import React, {Component} from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import "../../../../styles/prehabInfo_style.css";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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

    renderTaskContent = (task) => {
        let content = [];
        content.push(
            <div className="col-md-12 noScroll"  > 
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <p>{task.title}</p>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                <div className="row">
                    <div className="col-md-6"  > 
                        < p>{task.description}</ p>
                    </div> 
                    <div className="col-md-6"  > 
                        < p>Estado:{task.status}</p>
                    </div>
                </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            </div>

        );
        return content;
    }

    renderMealContent = (meal) => {
        let content = [];
        content.push(
            <div className="col-md-12 noScroll"  > 
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <p>{meal.title}</p>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="row">
                            <div className="col-md-6"  > 
                                < p>{meal.description}</ p>
                            </div> 
                            <div className="col-md-6"  > 
                                <p>Tipo:{meal.meal_order}</p>
                            </div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
        return content;
    }

    renderTabsContent = () => {
        let content = [];
        if(this.props.tabContent === undefined){
            return;
        }
        this.props.tabDates.forEach( (date, index) => {    
            content.push( 
                <div className="noScroll" key={index}>
                    { this.props.tabContent[date].map( (task, index) => (
                        <div className="row tabContent" key={index} >
                             {this.props.contentType === "Plan" ? (
                                    this.renderTaskContent(task)
                                ) : (
                                    this.renderMealContent(task)
                                )}
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

                <div className="myCardContent">
                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.handleChange}
                        className="noScroll"
                        >
                        {this.renderTabsContent()}
                    </SwipeableViews>
                </div>
                    
			</div>
		);
	}
}

export default TabOne;