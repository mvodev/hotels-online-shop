import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChangePage from './ChangePage';

import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import AdminPage from './AdminPage';

describe('Change page test correct heading',() => {

  beforeAll(()=>{
    const mockedUsedNavigate = jest.fn();

    jest.mock("react-router-dom", () => ({
      ...(jest.requireActual("react-router-dom") as any),
      useNavigate: () => mockedUsedNavigate
    }));
  })

  test('renders Change Page correct heading without typeOfCard props', () => {
    render(
    <MemoryRouter>
      <ChangePage />
    </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: "Измените данные" })
    ).toBeInTheDocument();
  });

  test('renders Change Page correct heading with typeOfCard props', () => {
    render(
    <MemoryRouter>
      <ChangePage typeOfCard='new'/>
    </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: "Введите данные" })
    ).toBeInTheDocument();
  });

  afterAll(() => {
    jest.clearAllMocks();
  })

})


describe('Change page test correct transition after click on bread crumbs',() => {

  beforeAll(()=>{
    const mockedUsedNavigate = jest.fn();

    jest.mock("react-router-dom", () => ({
      ...(jest.requireActual("react-router-dom") as any),
      useNavigate: () => mockedUsedNavigate
    }));
  })

  test('router Change Page bread crunbs', () => {
    render(
    <MemoryRouter>
      <AdminPage />
      <ChangePage typeOfCard='new'/>
    </MemoryRouter>
    );

    const link = screen.getByRole('link',{ name: "Страница администратора" });
    userEvent.click(link);
    expect(screen.getByRole('heading',{ name: "Страница администратора" })).toBeInTheDocument();
  });

  afterAll(() => {
    jest.clearAllMocks();
  })

})
