import React from 'react';
import {Col, InputNumber, Row, Slider} from "antd";

export class CountSlider extends React.Component {//33
    state = {
        value: this.props.defaultValue
    }

    onChange = (value) => {
        // 因为当输入的不是数字的时候，浏览器会崩溃，所以需要强制转换一下
        // const cleanValue = parseInt(value, 10) ? value : this.state.value;
        const cleanValue = Number(value) ? value : this.state.value;
        this.setState({
            value: cleanValue
        });
        this.props.onCountSliderChange(cleanValue);
    }

    render() {
        const {value} = this.state;
        return (
            <Row>
                <Col offset={4} span={12}>
                    <Slider min={2} max={20} onChange={this.onChange} value={value} />
                </Col>
                <Col span={4}>
                    <InputNumber
                        min={2}
                        max={20}
                        style={{ marginLeft: 16 }}
                        value={value}
                        onChange={this.onChange}
                        // onChange={this.onCountSliderChange}
                    />
                </Col>
            </Row>
        );
    }
}