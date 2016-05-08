import * as wizardActions from "../../actions/wizard";
import React from 'react';
import {
    ListView,
    Text,
    View,
    StyleSheet,
    TabBarIOS,
    Touch,
    TouchableHighlight,
    InteractionManager
} from "react-native";
import Component from "../../framework/component";
import {renderPlaceholderView} from "../../framework/general";
import {generalStyles} from "../../framework/general";
import I18n from 'react-native-i18n';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import WizardListItem from "../../components/lists/listItems/WizardListItem";

class Wizard extends Component {
    getInitState() {
        return ({
            renderPlaceholderOnly: true,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        })
    }

    componentDidMount() {
        if (this.props.wizard.appId === this.props.appId) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.props.wizard.wizardData.steps),
                renderPlaceholderOnly: false
            })
        } else if (this.props.auth.isAuthenticated) {
            this.props.initAppArenaWizard(this.props.appId, this.props.auth.token);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.wizard !== nextProps.wizard ||
            this.state.renderPlaceholderOnly !== nextState.renderPlaceholderOnly ||
            this.state.dataSource !== nextState.dataSource
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.wizard) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.wizard.wizardData.steps),
                renderPlaceholderOnly: false
            })
        }
    }

    renderRow(rowData) {
        return (
            <WizardListItem {...this.props} appId={this.props.appId} rowData={rowData}/>
        );
    }

    render() {
        if (this.state.renderPlaceholderOnly) {
            return renderPlaceholderView();
        }

        return (
            <View style={styles.page}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
        );
    }
}

const styles = Object.assign({}, generalStyles, StyleSheet.create({

}));

export default connect(
    (state) => ({
        auth: state.auth,
        wizard: state.wizard
    }),
    (dispatch) => ({
        ...bindActionCreators(wizardActions, dispatch)
    })
)(Wizard);
