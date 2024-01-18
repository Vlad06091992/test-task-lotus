import React, { ChangeEvent } from "react";

type Props = {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

class Input extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <input
                type="text"
                value={this.props.value}
                onChange={this.props.onChange}
                placeholder="Введите имя персонажа"
            />
        );
    }
}

export default Input