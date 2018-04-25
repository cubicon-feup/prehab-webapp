import React,{Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

class Alerts extends Component{

    constructor(props){
        super(props);
        this.state = {

            alerts:[
                {id:1,
                seen: false,
                 message: "Dificuldade com atividade de respiração",
                },
                {id:2,
                seen: false,
                 message: "Dificuldade com atividade de alongamento",
                },
                {id:3,
                seen: false,
                 message: "Não execução da atividade de respiração por 2 dias",
                }
            ]
        };
    }

    handleClick = () =>{
        this.setState({seen:true});
        console.log(this.state.alerts);
    }

    render(){
        let filteredAlerts = this.state.alerts.filter(
            (row) => {
                return row.id !== -1;
            }
        );

        return(
            <div>
                <List>
                {filteredAlerts.map( (row) => (
                  <ListItem primaryText={row.message} onClick={this.handleClick}/>
                  ))}

                </List>
             </div>
        );
    }

}
export default Alerts;
