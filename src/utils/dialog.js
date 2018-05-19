import React, {Component} from "react";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";

class DialogBox extends Component{

    constructor(props){
        super(props);
        this.state = ({
            openDialog : this.props.openDialog,
            message : this.props.message
        })
    }

    handleClose = () => {
        this.props.action;
        this.setState({openDialog: false});
    };


    render(){

     const actions = [
        <RaisedButton
            label="Ok"
            primary={true}
            onClick={this.handleClose}
        />,
    ];

        return(
            <div>
                <Dialog
                    contentStyle={{width: "350px",}}
                    title="Notificação de registo"
                    actions={actions}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={this.handleClose}>
                    {this.state.message}
                </Dialog>
            </div>
        );
    }

}

export default DialogBox