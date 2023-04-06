import { render, screen } from '@testing-library/react';
import ChangePage from './ChangePage';
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate
}));

describe('Change page',()=>{

  test('renders Change Page correct heading without typeOfCard props', () => {
    render(
    <BrowserRouter>
      <ChangePage />
    </BrowserRouter>
    );
    expect(
      screen.getByRole('heading', { name: "Измените данные" })
    ).toBeInTheDocument();
  });

  test('renders Change Page correct heading with typeOfCard props', () => {
    render(
    <BrowserRouter>
      <ChangePage typeOfCard='new'/>
    </BrowserRouter>
    );
    expect(
      screen.getByRole('heading', { name: "Введите данные" })
    ).toBeInTheDocument();
  });

})
