import {sendApiFromEmail} from '../../actions/actionCreator';
import connect from "react-redux/es/connect/connect";

const sendApiToServer = (props) => {
    props.sendApiFromEmail(props.params);
    return null;
};

const mapDispatchToProps = (dispatch) => ({
    sendApiFromEmail: (value) => dispatch(sendApiFromEmail(value)),
});
export default connect(null, mapDispatchToProps)(sendApiToServer);