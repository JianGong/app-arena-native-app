import React, {AsyncStorage, PickerIOS, Text, View} from "react-native";
import axios from "axios";
import config from "../config/global";

axios.defaults.baseURL = config.api_base_url;

export function updateConfigValueAction(appId, identifier, value) {
    return axios.put(`${config.api_app_route}/${appId}/configs/${identifier}`,
        {
            value
        },
        {headers: config.api.headers});
}

export function loginUser(email, password) {
    return axios.post(`/auth/token`,
        {
            email,
            password
        },
        {headers: config.api.headers});
}

export function updateWizardAction(appId, wizardJson) {
    return axios.put(`${config.api_app_route}/${appId}/wizard/update`,
        wizardJson,
        {headers: config.api.headers});
}

export function getCurrentUserAction(companyId, userId) {
    return axios.get(`${config.api_company_route}/${companyId}/users/${userId}`,
        {headers: config.api.headers}).then((dataObj) => {
        return dataObj;
    });
}

export function getNewsAction() {
    return axios.get(`https://blog.app-arena.com/wp-json/wp/v2/posts?categories=545`,
        {headers: config.api.headers}).then((dataObj) => {
        return dataObj;
    });
}



export function updateTranslationStringAction(appId, identifier, translation) {
    return axios.put(`${config.api_app_route}/${appId}/translations/${identifier}`,
        {
            translation
        },
        {headers: config.api.headers});
}

export function uploadCompanyMediaAction(companyId, file) {
    var data = new FormData();
    data.append('file', file);
    return axios.post(`${config.api_company_route}/${companyId}/media/upload`,
        data);
}

export function getConfigElement(appId, identifier) {
    return axios.get(`${config.api_app_route}/${appId}/configs/${identifier}`,
        {headers: config.api.headers}).then((dataObj) => {
        return dataObj;
    });
}

export function getAllMediaAction(companyId, types = "") {
    var params = Object.assign({headers: config.api.headers}, {params: {types}});
    return axios.get(`${config.api_company_route}/${companyId}/media`, params
    ).then((dataObj) => {
        return dataObj;
    });
}

export function getAllTranslationStringsAction(appId) {
    return axios.get(`${config.api_app_route}/${appId}/translations`,
        {headers: config.api.headers}).then((dataObj) => {
        return dataObj;
    });
}

export function getAllConfig(appId) {
    return axios.get(`${config.api_app_route}/${appId}/configs`,
        {headers: config.api.headers}).then((dataObj) => {
        return dataObj;
    }).catch((response) => {
        console.log(response);
    });
}

export function getAppInfoAction(appId) {
    return axios.get(`${config.api_app_route}/${appId}`,
        {headers: config.api.headers}).then((dataObj) => {
        return dataObj;
    }).catch((response) => {
        console.log(response);
    });
}

export function getApps(token, params) {
    params = params || {};
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.get(`${config.api_app_route}`,
        {params: params, headers: config.api.headers}).then((dataObj) => {
        return dataObj;
    }).catch((response) => {
        console.log(response);
    });
}

export function getWizardJSON(appId) {
    return axios.get(`${config.api_app_route}/${appId}/wizard`,
        {headers: config.api.headers}).then((dataObj) => {
        return dataObj;
    }).catch((response) => {
        console.log(response);
    });
}

export function getAll(appId) {
    return axios.all([getAllConfig(appId), getWizardJSON(appId), getAppInfoAction(appId)])
        .then(axios.spread((config, wizard, app) => {
            return {config, wizard, appId, app};
        })).catch((response) => {
            console.warn(response);
        });
}
