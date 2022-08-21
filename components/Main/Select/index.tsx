import React, {ReactNode, useState} from 'react';
import Select, {FormatOptionLabelMeta} from 'react-select';

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
    formatOptionLabel?: ((data: Option, formatOptionLabelMeta: FormatOptionLabelMeta<Option>) => ReactNode) | undefined;
}

export const AppSelect = ({
                              options,
                              defaultValue = options[0],
                              formatOptionLabel,
                              className = '',
                              ...props
                          }: AppSelectProps) => {
    const [{isClearable, isSearchable, isDisabled, isLoading, isRtl}, setState] = useState<State>({
        isClearable: props.isClearable ?? false,
        isDisabled: props.isDisabled ?? false,
        isLoading: props.isLoading ?? false,
        isRtl: props.isRtl ?? false,
        isSearchable: props.isRtl ?? false,
    });

    const toggleSearchable = () => setState((state) => ({...state, isSearchable: !state.isSearchable}));
    const toggleClearable = () => setState((state) => ({...state, isClearable: !state.isClearable}));
    const toggleDisabled = () => setState((state) => ({...state, isDisabled: !state.isDisabled}));
    const toggleLoading = () => setState((state) => ({...state, isLoading: !state.isLoading}));
    const toggleRtl = () => setState((state) => ({...state, isRtl: !state.isRtl}));

    // TODO: remove any
    const styles = {
        // control: (styles: any) => ({...styles, backgroundColor: 'white'}),
        option: (provided: any, state: any) => ({
            ...provided,
            color: '#fff',
            backgroundColor: state.isFocused ? '#0267ff' : '#14183e',
            cursor: state.isFocused ? 'pointer' : 'default',
        })
    };
    return (
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
        />
    );
}