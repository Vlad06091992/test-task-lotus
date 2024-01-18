import React from "react";
import { PersonType } from "../../types";
import s from './person.module.css'
import {formattedDate} from "../../uitls/formattedDate";

type Props = {
    person: Partial<PersonType>;
};

type hz = {[key: number]: string};

class Person extends React.Component<Props> {
    createdDate: string | null = null;
    constructor(props: Props) {
        super(props);
        if (this.props.person.created) {
            this.createdDate = formattedDate(this.props.person.created);
        }
    }

    render() {
        return (
            <div className={s.person}>
                <div>Имя: {this.props.person.name}</div>
                <div>Дата рождения: {this.props.person.birth_year}</div>
                <div>Рост: {this.props.person.height}</div>
                <div>Вес: {this.props.person.mass}</div>
                <div>Создан: {this.createdDate}</div>
                <div>Цвет глаз: {this.props.person.eye_color}</div>
                <div>Цвет волос: {this.props.person.hair_color}</div>
                <div>Цвет кожи: {this.props.person.skin_color}</div>
            </div>
        );
    }
}

export default Person;