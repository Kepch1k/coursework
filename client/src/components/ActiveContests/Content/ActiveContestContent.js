import React, {useState} from 'react';
import style from './ActiveContestContent.module.scss';
import FilerForm from "./FilterForm/FilterForm";
import Content from '../../../constants/formFilterContent';
import ResultFilterContests from './ListOfReceivedContest/ResultFilterContests';
import {changeFilterTags, sendFilterData} from "../../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import prepareData from "../dataPreparing";

const _ = require('lodash');
const promises = () => new Promise(resolve => resolve());

const ActiveContestContent = (props) => {
    const [formValues, setFormValues] = useState({});
    const reFilter = (values) => {
        return promises().then(async () => {
            try {
                const valuesClone = _.cloneDeep(values);
                if (valuesClone.hasOwnProperty('id')) {
                    if ((valuesClone['id'].indexOf(' ') !== -1) || (valuesClone['id'] === '')) {
                        delete valuesClone['id']
                    }
                }
                if (!_.isEqual(formValues, valuesClone)) {
                    setFormValues(valuesClone);
                    props.changeFilterTags(valuesClone);
                    const url = prepareData(valuesClone);
                    props.sendFilterData(url);
                }
            } catch (e) {

            }
        });
    };

    const names = [];
    Content.FILTERS.map((item) => {
        item.fields.map((field) => {
            names.push(field.name)
        });
    });
    return (
        <div className={style.activeContestMain}>

            <div className={style.banner}>
                <div className={style.title}>
                    <h4>ACTIVE CONTESTS</h4>
                </div>
            </div>

            <div className={style.filterContest}>
                <div className={style.flexTwoColumn}>
                    <div className={style.formFilter}>
                        <FilerForm initialValues={null} form={'filterForm'}
                                   asyncChangeFields={names}
                                   asyncValidate={reFilter}
                        />
                    </div>
                    <div className={style.resultFilter}>
                        <ResultFilterContests/>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        filter: state.ActiveContestFilterReducer
    };
};

const mapDispatchToProps = (dispatch) => ({
    changeFilterTags: (contestTypes) => dispatch(changeFilterTags(contestTypes)),
    sendFilterData: (contestTypes) => dispatch(sendFilterData(contestTypes)),


});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveContestContent);
