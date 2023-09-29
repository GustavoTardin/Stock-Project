import { ChangeEvent } from 'react';
import { months } from '../../../Utils/constInfos';
import { IDate } from './interfaces';

interface IProps {
  date: IDate,
  setDate: React.Dispatch<React.SetStateAction<IDate>>;
}

function SalesDate({ date, setDate }: IProps) {
  const handleYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputYear = Number(e.target.value);
    if (Number.isNaN(inputYear)) {
      setDate({ ...date, year: 2023 });
    } else {
      setDate({ ...date, year: inputYear });
    }
  };

  return (
    <div>
      <label htmlFor="month">
        Mês:
        <select
          id="month"
          name="month"
          onChange={ (e: ChangeEvent<HTMLSelectElement>) => setDate(
            { ...date, month: e.target.value },
          ) }
        >
          {
            months.map((e: string, i: number) => (
              <option value={ e } key={ i }>{e}</option>
            ))
          }
        </select>
      </label>
      <label htmlFor="year">
        Ano:
        <input
          type="text"
          id="year"
          value={ date.year }
          onChange={ handleYear }
        />
      </label>
    </div>
  );
}

export default SalesDate;
