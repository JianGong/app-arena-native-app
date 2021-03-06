/* @flow */
/*eslint-disable prefer-const */
import React from "react";
import {StyleSheet, Text, ListView, View, TouchableHighlight, Image} from "react-native";
import Component from "../../../framework/component";
import {generalStyles} from "../../../framework/general";
import _ from "lodash";
import moment from "moment";

export default class AppList extends Component {
    _route() {
        this.props.navigator.push({
            screen: "elements.HtmlView",
            passProps: {rowData: this.props.rowData},
        });
    }

    render() {
        var uri = (this.props.rowData._embedded['https://api.w.org/featuredmedia']) && this.props.rowData._embedded['https://api.w.org/featuredmedia'][0].source_url;
        return (
            <View>
                <TouchableHighlight onPress={this._route.bind(this)}>
                    <View style={styles.newsItem}>
                        {this._renderNewsImage(uri)}
                        <View style={styles.row}>
                            <Text style={styles.rowText}>
                                {_.unescape(this.props.rowData.title.rendered.replace("&#8211;", '-'))}
                            </Text>
                            <Text style={styles.rowDate}>
                                {moment(this.props.rowData.date).format("DD.MM.YYYY")}
                            </Text>
                        </View>
                        <View style={styles.rowTwo}>
                            <Text style={styles.rowAuthor}>
                                {this.props.rowData._embedded.author[0].name}
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    _renderNewsImage(uri) {
        if (uri) {
            return (
                <Image
                    resizeMode="cover"
                    style={styles.rowImage}
                    source={{uri}}
                />
            )
        }
    }
}

const styles = Object.assign({}, generalStyles, StyleSheet.create({
    rowTwo: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingBottom: 15,
        flex: 1,
        flexDirection: 'row'
    },
    rowText: {
        fontSize: 12,
        textAlign: 'left',
        flex: 0.7
    },
    rowImage: {
        flex: 1,
        height: 100,
        overflow: "hidden"
    },
    rowDate: {
        fontSize: 12,
        fontWeight: '300',
        textAlign: 'right',
        flex: 0.3
    },
    rowAuthor: {
        fontSize: 10,
        fontWeight: '300',
        textAlign: 'left',
        flex: 1
    },
    rowTextDesc: {
        paddingTop: 2,
        fontSize: 12,
        fontWeight: 'normal'
    }
}));
