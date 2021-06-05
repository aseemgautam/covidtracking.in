import React from 'react';
import { useRouter } from 'next/router';
import { Select } from 'antd';
import _ from 'lodash';
import IndianStates from '../../public/india-states.json';
import Utils from '../../classes/Utils';

const { Option } = Select;

export default function StateDropdown() {
	const menuItems = [];
	const router = useRouter();
	let selectedValue = 'IN';
	menuItems.push(<Option key="IN" value="IN" label="IN"><b>India</b></Option>);
	menuItems.push(...IndianStates.states.reduce((acc, val) => {
		if (router.query && router.query.name
			&&	router.query.name === Utils.getPathString(val.name)) {
			selectedValue = val.code;
		}
		// This should be below above if, in case of DH selectedValue not
		// assigned
		if (val.code === 'DH') {
			acc.push(<Option key={val.code} value={val.code} label={val.code}>Dadra, Daman & Diu</Option>);
			return acc;
		}
		acc.push(<Option key={val.code} value={val.code} label={val.code}>{val.name}</Option>);
		return acc;
	}, []));
	function onChange(stateCode) {
		if (stateCode === 'IN') {
			router.push('/');
		} else	{
			const state = _.find(IndianStates.states, { code: stateCode });
			const url = `/coronavirus-cases/${Utils.getPathString(state.name)}`;
			router.push(url);
		}
	}
	const menu = (
		<Select
			style={{ width: '68px' }}
			defaultValue="IN"
			value={selectedValue}
			showArrow
			optionLabelProp="label"
			dropdownMatchSelectWidth={false}
			dropdownAlign={{
				offset: [-100, 4]
			}}
			onChange={onChange}
		>
			{menuItems}
		</Select>
	);
	return menu;
}
