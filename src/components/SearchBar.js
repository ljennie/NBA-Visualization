import React from 'react';
import { Icon, Input, AutoComplete } from 'antd';
import nba from 'nba';
import {PROFILE_IMG_URL_PREFIX} from "../constants";

const Option = AutoComplete.Option;

export class SearchBar extends React.Component {//1.48
    state = {
        dataSource: [],
    }

    handleSearch = (value) => {
        this.setState({
            dataSource: nba.searchPlayers(value)
                .map(({playerId, fullName}) =>
                    <Option key={playerId} value={fullName}>
                        <img
                            className="player-option-image"
                            src={`${PROFILE_IMG_URL_PREFIX}/${playerId}.png`}
                            alt={`${fullName}`}
                            // alt是替代内容
                        />
                        <span className="player-option-label">
                            {`${fullName}`}
                        </span>

                    </Option>
                )
            // search bar中把fullname找出来然后return map出来新的array
        });
    }

    onSelect = (value) => {
        console.log(value);
        this.props.loadPlayerInfo(value);
    }

    render() {
        const { dataSource } = this.state;
        return (
            <AutoComplete
                dataSource={dataSource}
                style={{ width: '100%'}}
                size="large"
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="Search NBA player"
                className="search-bar"
                optionLabelProp="value"
            >
                <Input suffix={<Icon type="search" />} />
            </AutoComplete>
        );
    }
}
