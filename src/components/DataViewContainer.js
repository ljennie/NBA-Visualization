import React from "react";
import {ShotChart} from "./ShotChart";
import {Radio, Switch } from 'antd';
import {CountSlider} from "./CountSlider";
import _ from 'lodash';

const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component {

    state = {
        minCount: 2,
        chartType: "hexbin",
        displayToolTip: true
    }

    onCountSliderChange = (value) => {
        //console.log(value);
        this.setState({
            minCount: value,
        });
    }

    onChartTypeChange = (e) => {
        this.setState({
            chartType: e.target.value
            // hexbin 和 scatter可以自动切换
        });
    }

    onTooltipChange = (value) => {
        this.setState({
            displayToolTip: value
        });
    }

    render() {
        const { minCount, chartType } = this.state;
        // console.log(chartType);
        return (
            <div className="data-view">
                <ShotChart
                    playerId={this.props.playerId}
                    minCount={this.state.minCount}
                    displayToolTip={this.state.displayToolTip}
                    chartType={this.state.chartType}
                />
                {
                    this.state.chartType === "hexbin" ?
                        <CountSlider
                            onCountSliderChange={_.debounce(this.onCountSliderChange, 500)}
                            defaultValue={this.state.minCount}
                        /> : null
                }
                {/*// CountSlider: 1, Dataviewcounter:CountSlider:onCountSliderChange: 0, true*/}
                {/*// CountSlider: 10, Dataviewcounter:CountSlider:onCountSliderChange: 0, true*/}
                {/*// wait 500ms*/}
                {/*// Dataview: CountSlider:onCountSliderChange:1*/}

                <RadioGroup onChange={this.onChartTypeChange} value={chartType}>
                    <Radio value="hexbin">hexbin</Radio>
                    <Radio value="scatter">scatter</Radio>
                </RadioGroup>
                <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked
                    onChange={this.onTooltipChange}
                />
            </div>

        );
    }
}