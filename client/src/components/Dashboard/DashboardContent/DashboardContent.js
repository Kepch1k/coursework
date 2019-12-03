import React from 'react';
import style from './DashboardContent.module.scss';
import connect from 'react-redux/es/connect/connect';
import DashboardContestStatus from '../DashboardContestStatus/DashboardContestStatus';
import DashboardContentContestBlock from './DashboardContentContestBlock';
import DashboardContentBlock from './DashboardContentBlock/DashboardContentBlock';
import DashboardContentHelpfulArticles from './DashboardContentHelpfullArticles/DashboardContentHelpfulArticles';
import {Link} from "react-router-dom";

const TEMP = [{
    img: "https://www.squadhelp.com/story_images/visual_images/10224397.jpg",
    link: "https://www.squadhelp.com/name/Jobixo"
}, {
    img: "https://www.squadhelp.com/story_images/visual_images/12281560-01.jpg",
    link: "https://www.squadhelp.com/name/Jobixo"
}, {
    img: "https://www.squadhelp.com/story_images/visual_images/10485907.jpg",
    link: "https://www.squadhelp.com/name/Jobixo"
}, {
    img: "https://www.squadhelp.com/story_images/visual_images/10485907.jpg",
    link: "https://www.squadhelp.com/name/Jobixo"
}, {
    img: "https://www.squadhelp.com/story_images/visual_images/10224397.jpg",
    link: "https://www.squadhelp.com/name/Jobixo"
}, {
    img: "https://www.squadhelp.com/story_images/visual_images/10224397.jpg",
    link: "https://www.squadhelp.com/name/Jobixo"
}, {
    img: "https://www.squadhelp.com/story_images/visual_images/10224397.jpg",
    link: "https://www.squadhelp.com/name/Jobixo"
}, {
    img: "https://www.squadhelp.com/story_images/visual_images/10224397.jpg",
    link: "https://www.squadhelp.com/name/Jobixo"
}
    , {
        img: "https://www.squadhelp.com/story_images/visual_images/10485907.jpg",
        link: "https://www.squadhelp.com/name/Jobixo"
    }, {
        img: "https://www.squadhelp.com/story_images/visual_images/10485907.jpg",
        link: "https://www.squadhelp.com/name/Jobixo"
    }, {
        img: "https://www.squadhelp.com/story_images/visual_images/10485907.jpg",
        link: "https://www.squadhelp.com/name/Jobixo"
    }, {
        img: "https://www.squadhelp.com/story_images/visual_images/10485907.jpg",
        link: "https://www.squadhelp.com/name/Jobixo"
    }];


function dashboardContent(props) {
    return (

        <div className={style.dashboardContent}>
            <DashboardContestStatus/>
            {props.userContests.InDraft && <DashboardContentBlock title={"Contests in Draft"}>
                {
                    props.userContests.InDraft.map((item, id) => {
                        return <DashboardContentContestBlock key={id} contest={item}
                                                             nickName={(props.user) ? props.user.displayName : null}/>
                    })
                }
            </DashboardContentBlock>}
            {props.userContests.InLaunch && <DashboardContentBlock title={"Contests in Launch"}>
                {
                    props.userContests.InLaunch.map((item, id) => {
                        return <DashboardContentContestBlock key={id} contest={item}
                                                             nickName={(props.user) ? props.user.displayName : null}/>
                    })
                }
            </DashboardContentBlock>}


            <DashboardContentBlock title={"Helpful Articles"}>
                <div className={style.helpfulArticles}>
                    <DashboardContentHelpfulArticles>
                        <Link
                            to="https://helpdesk.squadhelp.com/contest-holders-starter-kit/the-art-of-writing-a-perfect-contest-brief">
                            The Art of Writing Perfect Contest Brief</Link>
                    </DashboardContentHelpfulArticles>
                    <DashboardContentHelpfulArticles>
                        <Link to="https://helpdesk.squadhelp.com/squadhelp-services/squadhelp-managed-contest-service">
                            Need Expert Assistance? Learn About Squadhelp Managed Contest Service</Link>
                    </DashboardContentHelpfulArticles>
                    <DashboardContentHelpfulArticles>
                        <Link
                            to="https://helpdesk.squadhelp.com/contest-holders-launching-a-contest/squadhelp-contest-bundles">
                            Save With Squadhelp Contest Bundle Packages</Link>
                    </DashboardContentHelpfulArticles>
                </div>
            </DashboardContentBlock>


            <DashboardContentBlock title={"Recommendations From Our Marketplace"} marginBottom={"60px"}>
                {
                    TEMP.map((Recommendation, id) => {
                        return <div className={style.Recommendation} key={id}>
                            <div className={style.RecommendationImg}>
                                <Link className={style.RecommendationLink} to={Recommendation.link}>
                                    <img alt={"Recommendation"} className={style.RecommendationImgInside}
                                         src={Recommendation.img}>

                                    </img>
                                </Link>
                            </div>
                        </div>
                    })}

            </DashboardContentBlock>
        </div>);
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducers.user,
        userContests: state.userContestsReducers,
    };
};
export default connect(mapStateToProps)(dashboardContent);
