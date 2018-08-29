import React from 'react';
import nba from 'nba';
// stats.nba的咨询
import * as d3 from 'd3';
import { hexbin } from 'd3-hexbin';
import { court, shots } from 'd3-shotchart';
import PropTypes from 'prop-types';

window.d3_hexbin = {hexbin : hexbin}; // workaround library problem
// 让d3这个与react library不兼容的可以使用

export class ShotChart extends React.Component {
    static propTypes = {
        playerId: PropTypes.number.isRequired,
        //PropTypes: 使用shotchart传进来的类型
        minCount: PropTypes.number.isRequired,
        displayToolTip: PropTypes.bool.isRequired,
        chartType: PropTypes.string.isRequired,

    }

    componentDidUpdate() {
        nba.stats.shots({//得到某一个球员所有出手的咨询
            PlayerID: this.props.playerId
        }).then((response) => {
            const final_shots = response.shot_Chart_Detail.map(shot => ({
                //response.shot_Chart_Detail就是player所有的出手
                x: (shot.locX + 250) / 10,
                y: (shot.locY + 50) / 10,
                action_type: shot.actionType,
                shot_distance: shot.shotDistance,
                shot_made_flag: shot.shotMadeFlag,//看shot有没有成功
                //转成d3 shot chat规定的格式
            }));

            const courtSelection = d3.select("#shot-chart");//d3library必须要先使用到shot-chart上的library
            // 使用shot chat调用完d3 library然后进行绘图
            // d3并不知道div里面的状况
            courtSelection.html('');
            // 把courtSelection里面的div东西清空
            const chart_court = court().width(500);
            const chart_shots = shots()
                .shotRenderThreshold(this.props.minCount)
                .displayToolTips(this.props.displayToolTip)
                .displayType(this.props.chartType);
            //有两次shotRender的地方才显示出来
            courtSelection.call(chart_court);
            courtSelection.datum(final_shots).call(chart_shots);
        });
    }
    render() {
        return (
            <div id="shot-chart"></div>
        );
    }
}
