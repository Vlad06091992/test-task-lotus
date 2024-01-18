import React, { ChangeEvent, createRef, RefObject } from "react";
import s from './input.module.css';

type Props = {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

class Input extends React.Component<Props> {
    ref: RefObject<HTMLInputElement>;

    constructor(props: Props) {
        super(props);
        this.ref = createRef<HTMLInputElement>();
    }

    componentDidMount() {
        if (this.ref.current) {
            this.ref.current.focus();
        }
    }
    render() {
        return (
            <input
                ref={this.ref}
                className={s.input}
                type="text"
                value={this.props.value}
                onChange={this.props.onChange}
                placeholder="Введите имя персонажа"
            />
        );
    }
}

export default Input;
