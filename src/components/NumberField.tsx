import * as React from 'react';
import {NumberField as BaseNumberField} from '@base-ui/react/number-field';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClearIcon from '@mui/icons-material/Clear';

export default function NumberField({
                                        id: idProp,
                                        label,
                                        error,
                                        size = 'medium',
                                        ...other
                                    }: BaseNumberField.Root.Props & {
    label?: React.ReactNode;
    size?: 'small' | 'medium';
    error?: boolean;
}) {
    const [internalValue, setInternalValue] = React.useState<number | null>(
        other.defaultValue ?? null,
    );
    const value = other.value !== undefined ? other.value : internalValue;
    let id = React.useId();
    if (idProp) {
        id = idProp;
    }
    return (
        <BaseNumberField.Root
            {...other}
            format={{...other.format, maximumFractionDigits: 0}}
            step={1}
            smallStep={1}
            value={value}
            onValueChange={(nextValue, details) => {
                const integerValue = nextValue === null ? null : Math.trunc(nextValue);
                if (other.value === undefined) {
                    setInternalValue(integerValue);
                }
                other.onValueChange?.(integerValue, details);
            }}
            render={(props, state) => (
                <FormControl
                    size={size}
                    ref={props.ref}
                    disabled={state.disabled}
                    required={state.required}
                    error={error}
                    variant="outlined"
                >
                    {props.children}
                </FormControl>
            )}
        >
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <BaseNumberField.Input
                id={id}
                render={(props, state) => (
                    <OutlinedInput
                        aria-describedby={`${id}-helper-text`}
                        label={label}
                        inputRef={props.ref}
                        value={state.inputValue}
                        onBlur={props.onBlur}
                        onChange={props.onChange}
                        onKeyUp={props.onKeyUp}
                        onKeyDown={props.onKeyDown}
                        onFocus={props.onFocus}
                        slotProps={{
                            input: props,
                        }}
                        endAdornment={
                            <InputAdornment
                                position="end"
                                sx={{
                                    maxHeight: 'none',
                                    alignSelf: 'center',
                                    ml: 0,
                                }}
                            >
                                <IconButton
                                    size={size}
                                    sx={{p: 0.5}}
                                    aria-label="Clear"
                                    disabled={state.disabled || state.readOnly || state.value === null}
                                    onClick={(event) => {
                                        if (other.value === undefined) {
                                            setInternalValue(null);
                                        }
                                        other.onValueChange?.(null, {
                                            trigger: undefined,
                                            isCanceled: false,
                                            reason: 'input-clear',
                                            event: event.nativeEvent,
                                            cancel: () => {
                                            },
                                            allowPropagation: () => {
                                            },
                                            direction: undefined,
                                            isPropagationAllowed: false
                                        });
                                    }}
                                >
                                    <ClearIcon fontSize="small"/>
                                </IconButton>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderLeft: '1px solid',
                                    }}
                                >
                                    <BaseNumberField.Increment
                                        render={<IconButton size={size} sx={{p: 0}} aria-label="Increase"/>}
                                    >
                                        <KeyboardArrowUpIcon
                                            fontSize={size}
                                            sx={{transform: 'translateY(2px)'}}
                                        />
                                    </BaseNumberField.Increment>
                                    <BaseNumberField.Decrement
                                        render={<IconButton size={size} sx={{p: 0}} aria-label="Decrease"/>}
                                    >
                                        <KeyboardArrowDownIcon
                                            fontSize={size}
                                            sx={{transform: 'translateY(-2px)'}}
                                        />
                                    </BaseNumberField.Decrement>
                                </div>
                            </InputAdornment>
                        }
                        sx={{pr: 0}}
                    />
                )}
            />
        </BaseNumberField.Root>
    );
}