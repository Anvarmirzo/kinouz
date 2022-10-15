import React, {ReactNode, useState} from 'react';
import Select, {FormatOptionLabelMeta, GroupBase, OptionsOrGroups} from 'react-select';
import AsyncSelect from 'react-select/async';
import {IAutoComplete, IAutoCompleteParams} from '../../../core/models';

interface Option {
	value: string;
	label: string;
	img?: string;
	isFixed?: boolean;
	isDisabled?: boolean;
}

interface State {
	isClearable: boolean;
	isDisabled: boolean;
	isLoading: boolean;
	isRtl: boolean;
	isSearchable: boolean;
}

interface AppSelectProps extends Partial<State> {
	options: Option[];
	defaultValue?: Option;
	className?: string;
	isAsync?: boolean;
	searchOptions?: (params: string) => Promise<IAutoComplete | void>;
	formatOptionLabel?:
		| ((data: Option, formatOptionLabelMeta: FormatOptionLabelMeta<Option>) => ReactNode)
		| undefined;
}

export const AppSelect = ({
	options,
	searchOptions,
	defaultValue = options[0],
	formatOptionLabel,
	className = '',
	isAsync = false,
	...props
}: AppSelectProps) => {
	const [{isClearable, isSearchable, isDisabled, isLoading, isRtl}, setState] = useState<State>({
		isClearable: props.isClearable ?? false,
		isDisabled: props.isDisabled ?? false,
		isLoading: props.isLoading ?? false,
		isRtl: props.isRtl ?? false,
		isSearchable: props.isSearchable ?? false,
	});

	const toggleSearchable = () =>
		setState((state) => ({...state, isSearchable: !state.isSearchable}));
	const toggleClearable = () => setState((state) => ({...state, isClearable: !state.isClearable}));
	const toggleDisabled = () => setState((state) => ({...state, isDisabled: !state.isDisabled}));
	const toggleLoading = () => setState((state) => ({...state, isLoading: !state.isLoading}));
	const toggleRtl = () => setState((state) => ({...state, isRtl: !state.isRtl}));

	const loadOptions = (
		inputValue: string,
		callback: (options: OptionsOrGroups<Option, GroupBase<Option>>) => void
	) => {
		if (searchOptions) {
			searchOptions(inputValue)?.then((result) => {
				if (result) {
					callback(result.hits.map((h) => ({label: h.title || h.name || '', value: `${h.id}`})));
				}
			});
		}
	};

	const styles = {
		option: (provided: any, state: any) => ({
			...provided,
			color: '#fff',
			backgroundColor: state.isFocused ? '#0267ff' : '#14183e',
			cursor: state.isFocused ? 'pointer' : 'default',
		}),
	};

	return isAsync ? (
		<AsyncSelect
			classNamePrefix={`select ${className}`}
			defaultValue={defaultValue}
			isDisabled={isDisabled}
			isLoading={isLoading}
			isClearable={isClearable}
			isRtl={isRtl}
			isSearchable={isSearchable}
			loadOptions={loadOptions}
			styles={styles}
			formatOptionLabel={formatOptionLabel}
			{...props}
		/>
	) : (
		<Select
			classNamePrefix={`select ${className}`}
			defaultValue={defaultValue}
			isDisabled={isDisabled}
			isLoading={isLoading}
			isClearable={isClearable}
			isRtl={isRtl}
			isSearchable={isSearchable}
			options={options}
			styles={styles}
			formatOptionLabel={formatOptionLabel}
			{...props}
		/>
	);
};
