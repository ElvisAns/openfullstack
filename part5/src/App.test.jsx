import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { store } from './store'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'
import App from './App';

describe('App', () => {
    it('User can login and get to his profile page', async () => {
        const user = userEvent.setup()
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        const loginButton = screen.getAllByText(/Login/i);
        expect(loginButton[0]).toBeInTheDocument();

        await user.click(loginButton[0]);
        const loginScreen = screen.getByText(/Login now!/i);
        expect(loginScreen).toBeInTheDocument();

        const emailInput = screen.getByRole('textbox',{type:'email'})
        const passwordInput = screen.getByTestId('passwordInput')
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        await user.type(emailInput,'ansimapersic@gmail.com');
        await user.type(passwordInput,'12345678');

        expect(emailInput).toHaveValue('ansimapersic@gmail.com')
        expect(passwordInput).toHaveValue('12345678')


        const submitButton = screen.getByRole('button',{name:'Login'}); 
        //role is like type of element and name is the content (for my undertanding) role can be listitem,list,heading,textbox(for inputs),button,link (for a element)
        expect(submitButton).toBeInTheDocument();
        await user.click(submitButton)
        expect(screen.getByText('Ansima')).toBeInTheDocument()

    });
});