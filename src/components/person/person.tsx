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
                <div className={s.personData}>Имя: {this.props.person.name}</div>
                <div className={s.personData}>Дата рождения: {this.props.person.birth_year}</div>
                <div className={s.personData}>Рост: {this.props.person.height}</div>
                <div className={s.personData}>Вес: {this.props.person.mass}</div>
                <div className={s.personData}>Создан: {this.createdDate}</div>
                <div className={s.personData}>Цвет глаз: {this.props.person.eye_color}</div>
                <div className={s.personData}>Цвет волос: {this.props.person.hair_color}</div>
                <div className={s.personData}>Цвет кожи: {this.props.person.skin_color}</div>
            </div>
        );
    }
}

export default Person;