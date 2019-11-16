import React from 'react';
import style from './WhySquadhelp.module.scss';
import {BLOCKS} from './../../../constants/WhySquadhelp';
import Title from "../../commonToAll/Title/Title";
import TextBlocks from "./TextBlocks/TextBlocks";


function WhySquadhelp() {

    return (<div>

            <Title title={"Why Squadhelp?"}
                   text={""}
                   color={"black"} borderColor={"#455a89"}
            />

            <div className={style.TextBlocksContainer}>
                <TextBlocks img={BLOCKS[0].img} title={BLOCKS[0].title} text1={BLOCKS[0].text1} text2={BLOCKS[0].text2}
                            link={"/Name-Ideas"} linkText={'business name ideas'}/>
                <TextBlocks img={BLOCKS[1].img} title={BLOCKS[1].title} text1={BLOCKS[1].text} text2={""} link={""}
                            linkText={''}/>
                <TextBlocks img={BLOCKS[2].img} title={BLOCKS[2].title} text1={BLOCKS[2].text} text2={""} link={""}
                            linkText={''}/>
            </div>


        </div>
    )

}


export default WhySquadhelp;
