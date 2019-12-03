import React from 'react';
import User from './User/user';
import style from './userList.module.scss';
import {userBaned} from '../../actions/actionCreator';
import connect from 'react-redux/es/connect/connect';
import {toast} from 'react-toastify';

function UserList(props) {
    const notify = () => toast.error("You cannot ban administrators", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 6000,
    });
    const clickOnSelect = (id, status) => {
        props.userBaned(id, status);
    };
    const usersArray = props.users;
    const usersToDraw = usersArray.map((user) => {
            const func = (user.role === "ADMIN") ? notify : clickOnSelect;
            return <span key={user.id}>
                <div className={style.contact}>
                        <User
                            click={func}
                            id={user.id}
                            img={"http://www.simonhoegsberg.com/faces_of_new_york/images/11_faces.jpg"}
                            name={user.firstName + "   " + user.lastName}
                            displayName={user.displayName}
                            role={user.role}
                            isBanned={user.isBaned}
                        />
                </div>
                  <div className={style.line}/>
            </span>
        }
    );
    return (
        <div className={style.list}>
            {usersToDraw}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        users: state.getAllUsersReducer.data
    };
};
const mapDispatchToProps = (dispatch) => ({
    userBaned: (id, status) => dispatch(userBaned(id, status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
