import React from 'react';
import style from './contestCategories.module.scss';
import CardCategories from '../CardCategories/CardCategories';
import {CONTEST_IMGS} from '../../../constants/contestImgs';
import Title from '../../commonToAll/Title/Title';
import {contestProgressing, selectedContestType} from "../../../actions/actionCreator";
import connect from 'react-redux/es/connect/connect';

function ContestCategories(props) {
    return (
        <div className={style.contestCategories}>
            <div className={style.contestCategoriesHeading}>
                <Title title={"Our Most Popular Categories"}
                       text={"Pick from our most popular categories, launch a contest and begin receiving submissions right away"}
                       color={"white"} borderColor={"white"}
                />
                <div className={style.flexCategories}>
                    <CardCategories name={"Name"} text={"Get up and running with the perfect name. "}
                                    img={[CONTEST_IMGS.name]} contestType={['NAME']} currentStage={2}
                                    styles={"white"}
                                    link={'/contest_creating_step1'} click={props.selectedContestType}
                                    alsoClick={props.contestProgressing}/>
                    <CardCategories name={"Logo"} text={"Kickstart your venture with a unique, memorable logo "}
                                    img={[CONTEST_IMGS.logo]} contestType={['LOGO']} currentStage={2}
                                    styles={"white"} link={'/home'} click={props.selectedContestType}
                                    alsoClick={props.contestProgressing}/>
                    <CardCategories name={"Tagline or Slogan"} contestType={['TAGLINE_OR_SLOGAN']}
                                    text={"Connect deeply with your target audience with an on-target tagline "}
                                    img={[CONTEST_IMGS.taglineOrSlogan]} currentStage={2}
                                    styles={"white"} link={'/home'} click={props.selectedContestType}
                                    alsoClick={props.contestProgressing}/>
                </div>
            </div>
        </div>
    )
}//contestType={['LOGO','NAME','TAGLINE_OR_SLOGAN']}
const mapStateToProps = (state) => {
    return {
        state,
    };
};
const mapDispatchToProps = (dispatch) => ({
    selectedContestType: (contestTypes) => dispatch(selectedContestType(contestTypes)),
    contestProgressing: (currentStage, type) => dispatch(contestProgressing(currentStage, type)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContestCategories);
//export default ContestCategories;
