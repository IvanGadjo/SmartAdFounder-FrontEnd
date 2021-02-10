import React from 'react';
import './AddUserInterest.css';

const AddUserInterest = ({ onSubmit, handleInputChange, editInt }) => {
    return(
        <div> {console.log(editInt)}
            <form className="pa4 black-80">
                <div>
                    <label htmlFor="keyword" className="f6 b db mb2">Search</label>
                    <textarea id="keyword" name="keywords" className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2" aria-describedby="keyword-desc"
                    onChange={handleInputChange}></textarea>
                </div>
                <div className="box">
                    <select name="category" id="category" required onChange={handleInputChange}>
                        <option value="">Изберете категорија</option>
                        <option value="Avtomobili">Автомобили</option>
                        <option value="Kukji/Vili">Куќи/Вили</option>
                        <option value="Stanovi">Станови</option>
                        <option value="Mobilni telefoni">Мобилни телефони</option>
                        <option value="Desktop kompjuteri">Десктоп компјутери</option>
                        <option value="Laptop kompjuteri">Лаптоп компјутери</option>
                        <option value="">Останато</option>
                    </select>
                    <div className="mt3">
                    <select name="region" id="region" required onChange={handleInputChange}>
                        <option value="">Изберете регион</option>
                        <option value="Skopje">Скопје</option>
                        <option value="Bitola">Битола</option>
                        <option value="Kumanovo">Куманово</option>
                        <option value="Prilep">Прилеп</option>
                        <option value="Tetovo">Тетово</option>
                        <option value="Veles">Велес</option>
                        <option value="Stip">Штип</option>
                        <option value="Ohrid">Охрид</option>
                        <option value="Gostivar">Гостивар</option>
                        <option value="Strumica">Струмица</option>
                        <option value="Kavadarci">Кавадарци</option>
                        <option value="Kocani">Кочани</option>
                        <option value="Kicevo">Кичево</option>
                        <option value="Struga">Струга</option>
                        <option value="Radovis">Радовиш</option>
                        <option value="Gevgelija">Гевгелија</option>
                        <option value="Debar">Дебар</option>
                        <option value="Kriva Palanka">Крива Паланка</option>
                        <option value="Sveti Nikole">Свети Николе</option>
                        <option value="Negotino">Неготино</option>
                        <option value="Delcevo">Делчево</option>
                        <option value="Vinicia">Виница</option>
                        <option value="Resen">Ресен</option>
                        <option value="Probistip">Пробиштип</option>
                        <option value="Berovo">Берово</option>
                        <option value="Kratovo">Кратово</option>
                        <option value="Krusevo">Крушево</option>
                        <option value="Makedonski brod">Македонски брод</option>
                        <option value="Valandovo">Валандово</option>
                        <option value="Demir hisar">Демир Хисар</option>
                    </select>
                    </div>
                </div>
                <button className="f6 link dim br-pill ba bw2 ph3 pv2 mb2 dib dark-green" onClick={onSubmit}>Button Text</button>
            </form>
        </div>
    );
}

export default AddUserInterest;